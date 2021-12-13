const express = require('express');
const router = express.Router();
const pool = require("../config/pool.js")

//创建课程
router.post('/create', (req, res) => {
	//解构赋值
	const { name,credit } = req.body;
	const fcredit=parseFloat(credit)
	if (!name) {
		return res.status(400).json({ msg: "请输入课程名" })
	}
	if(!credit){
		return res.status(400).json({ msg: "请输入学分" })
	}
	if (credit!=parseFloat(fcredit)){
		return res.status(400).json({ msg: "请输入正确的学分类型" })
	}
	//sql查询
	let sqlCheck = 'SELECT * from courses where cname=?'
	let sqlInsert = `INSERT INTO courses SET ?`
	pool.query(sqlCheck, name, (err, course) => {
		if (course.length > 0) {
			return res.status(400).json({ msg: "课程已存在" })
		}
		const data = {
			ccredit: fcredit,//ccredit是数据库属性，fcredit是json属性
			cname: name,
			cstudents: ''
		}
		pool.query(sqlInsert, data, (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法插入" });
			}
			return res.status(200).json({data,msg:'创建课程成功'})
		})
	})

})

//查找课程
router.get('/', (req, result) => {
	//两张表之间的关系
	let getQuery = `SELECT * FROM courses`
	pool.query(getQuery, (err, res) => {
		return result.status(200).json(res)
	})
})

//删除课程
router.delete("/", (req, res) => {
	//解构赋值
	const { cno } = req.body;
	// let delQuery1 = "DELETE FROM sc WHERE cno = ?";
	// pool.query(delQuery1, [cno], (err, result) => {
	// 	if (err) {
	// 		res.send(err).status(400);
	// 	} else {
	// 		res.json({ success: true }).status(200);
	// 	}
	// });

	let delQuery2 = "DELETE FROM courses WHERE cno = ?";
	pool.query(delQuery2, [cno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});
	
});

//更新课程
router.put('/', (req, res) => {
	const {  newname, newcredit, newstudents ,cno} = req.body
	// if (newstudents.length == 0) return res.status(400).json({ msg: "请添加学生" })
	var updatesql = "UPDATE courses SET cname = ?, cstudents = ?, ccredit = ? WHERE cno = ?";
	pool.query(updatesql, 
		[newname,
		newstudents,
		newcredit,
		cno], (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法更新" });
			}
			return res.status(200).json({ msg: "更新完成" })
		})
})
module.exports = router;

