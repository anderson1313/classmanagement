const express=require('express');
const router=express.Router();
const pool=require("../config/pool.js")

//module.exports=router

//测试：localhost:8080/api/student
//新增学生信息
router.post('/create', (req, res) => {
	//解构赋值
	const { sno,sname,ssex,sage,sclno,scno } = req.body;
	console.log(sno)
	if (!sno) {
		return res.status(400).json({ msg: "请输入学号" })
	}
	//sql查询
	let sqlCheck = 'SELECT * from students where sno=?'
	let sqlInsert = `INSERT INTO students SET ?`
	pool.query(sqlCheck, sno, (err, student) => {
		if (student.length > 0) {
			return res.status(400).json({ msg: "学号已被使用" })
		}
		const data = {
			sno:sno, //sno是数据库属性，no是json属性
			sname:sname,
			ssex:ssex,
			sage:sage,
			sclno:sclno,
			scourses:scno.toString()
			
			
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
	let getQuery = `SELECT * FROM students`
	pool.query(getQuery, (err, res) => {
		return result.status(200).json(res)
	})
})

//删除学生信息
router.delete("/", (req, res) => {
	//解构赋值
	const { sno } = req.body;
	let delQuery1 = "DELETE FROM sc WHERE sno = ?";
	pool.query(delQuery1, [sno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});

	let delQuery2 = "DELETE FROM students WHERE sno = ?";
	pool.query(delQuery2, [sno], (err, result) => {
		if (err) {
			res.send(err).status(400);
		} else {
			res.json({ success: true }).status(200);
		}
	});
	
});

//更新学生信息
router.put('/', (req, res) => {
	const { sno,newname,newsex,newage,newclno,newscno } = req.body
	console.log(sno)
	console.log(newname)
	console.log(newsex)
	console.log(newage)
	console.log(newclno)

//	console.log(newstudents)
//	if (newstudents.length == 0) return res.status(400).json({ msg: "请添加学生" })
	
	var updatesql = "UPDATE students SET sname = ?, ssex = ?, sage= ? , sclno = ? ,scourses= ? WHERE sno = ?";
	
	pool.query(updatesql, 
		[newname,
		newsex,
		newage,
		newclno,
		newscno.toString(),
		sno], (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法更新" });
			}
			return res.status(200).json({ msg: "更新完成" })
		})
})
module.exports = router;