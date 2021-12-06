const express=require('express');
const router=express.Router();
const pool=require("../config/pool.js")

//module.exports=router

//测试：localhost:8080/api/student
//新增班级
router.post('/create', (req, res) => {
	//解构赋值
	const {clno,clname } = req.body;
	console.log(clno)
	if (!clno) {
		return res.status(400).json({ msg: "请输入班级号" })
	}
	//sql查询
	let sqlCheck = 'SELECT * from classes where clno=?'
	let sqlInsert = `INSERT INTO classes SET ?`
	pool.query(sqlCheck, clno, (err, classs) => {
		if (classs.length > 0) {
			return res.status(400).json({ msg: "班级号已被使用" })
		}
		const data = {
			clno:clno, //clno是数据库属性，no是json属性
			clname:clname
			
		}
		pool.query(sqlInsert, data, (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法插入" });
			}
			return res.status(200).json({ data })
		})
	})

})

//查找班级信息
router.get('/', (req, result) => {
	//两张表之间的关系
	let getQuery = `SELECT * FROM classes`
	pool.query(getQuery, (err, res) => {
		return result.status(200).json(res)
	})
})

//删除班级信息
router.delete("/", (req, res) => {
	//解构赋值
	const { clno } = req.body;
	let delQuery3 = "DELETE FROM sc WHERE EXISTS (SELECT sno FROM students WHERE sclno = ?) ";
	pool.query(delQuery3, [clno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});
	
	let delQuery1 = "DELETE FROM students WHERE sclno = ?";
	pool.query(delQuery1, [clno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});
	
	

	let delQuery2 = "DELETE FROM classes WHERE clno = ?";
	pool.query(delQuery2, [clno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});
	
});

//更新班级信息
router.put('/', (req, res) => {
	const { clno,newname } = req.body
	console.log(clno)
	console.log(newname)

//	console.log(newclasses)
//	if (newclasses.length == 0) return res.status(400).json({ msg: "请添加学生" })
	
	var updatesql = "UPDATE classes SET clname=? WHERE clno = ?";
	
	pool.query(updatesql, 
		[newname,
		clno], (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法更新" });
			}
			return res.status(200).json({ msg: "更新完成" })
		})
})
module.exports = router;