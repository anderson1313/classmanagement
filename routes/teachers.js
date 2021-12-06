const express=require('express');
const router=express.Router();
const pool=require("../config/pool.js")

//module.exports=router

//测试：localhost:8080/api/student
//新增教师信息
router.post('/create', (req, res) => {
	//解构赋值
	const { tno,tname,tpwd,temail,tphone } = req.body;
	console.log(tno)
	if (!tno) {
		return res.status(400).json({ msg: "请输入工号" })
	}
	//sql查询
	let sqlCheck = 'SELECT * from teachers where tno=?'
	let sqlInsert = `INSERT INTO teachers SET ?`
	pool.query(sqlCheck, tno, (err, teacher) => {
		if (teacher.length > 0) {
			return res.status(400).json({ msg: "学号已被使用" })
		}
		const data = {
			tno:tno, //tno是数据库属性，no是json属性
			tname:tname,
			tpwd:tpwd,
			temail:temail,
			tphone:tphone		
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

//查找学生信息
router.get('/', (req, result) => {
	//两张表之间的关系
	let getQuery = `SELECT * FROM teachers`
	pool.query(getQuery, (err, res) => {
		return result.status(200).json(res)
	})
})

//删除学生信息
router.delete("/", (req, res) => {
	//解构赋值
	const { tno } = req.body;
	let delQuery1 = "DELETE FROM tc WHERE tno = ?";
	pool.query(delQuery1, [tno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});

	let delQuery2 = "DELETE FROM teachers WHERE tno = ?";
	pool.query(delQuery2, [tno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});
	
});

//更新学生信息
router.put('/', (req, res) => {
	const { tno,newname,newpwd,newemail,newphone } = req.body
	console.log(tno)
	console.log(newname)
	console.log(newpwd)
	console.log(newemail)
	console.log(newphone)

//	console.log(newteachers)
//	if (newteachers.length == 0) return res.status(400).json({ msg: "请添加学生" })
	
	var updatesql = "UPDATE teachers SET tname = ?, tpwd = ?, temail= ? , tphone = ? WHERE tno = ?";
	
	pool.query(updatesql, 
		[newname,
		newpwd,
		newemail,
		newphone,
		tno], (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法更新" });
			}
			return res.status(200).json({ msg: "更新完成" })
		})
})
module.exports = router;