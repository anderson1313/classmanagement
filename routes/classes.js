const express=require('express');
const router=express.Router();
const pool=require("../config/pool.js")

//module.exports=router

//测试：localhost:8080/api/classes
//新增班级
router.post('/create', (req, res) => {
	//解构赋值
	const {clname } = req.body;

	if (!clname) {
		return res.status(400).json({ msg: "请输入班级名称" })
	}
	//sql查询
	let sqlCheck = 'SELECT * from classes where clname=?'
	let sqlInsert = `INSERT INTO classes SET ?`
	pool.query(sqlCheck, clname, (err, classs) => {
		if (classs.length > 0) {
			return res.status(400).json({ msg: "班级名称已被使用" })
		}
		const data = {
			clname:clname
			
		}
		pool.query(sqlInsert, data, (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法插入" });
			}
			return res.status(200).json({ data ,msg:'班级创建成功'})
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
	const { clno,newclname } = req.body
	console.log(clno)
	console.log(newclname)
	if (!newclname) {
		return res.status(400).json({ msg: "请输入班级名称" })
	}

//	console.log(newclasses)
//	if (newclasses.length == 0) return res.status(400).json({ msg: "请添加学生" })
	
	var updatesql = "UPDATE classes SET clname=? WHERE clno = ?";
	
	pool.query(updatesql, 
		[newclname,
		clno], (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法更新" });
			}
			return res.status(200).json({ msg: "更新完成" })
		})
})
module.exports = router;