const express = require('express');
const router = express.Router();
const pool = require("../config/pool.js")

//注册
router.post('/create', (req, res) => {
	//解构赋值
	const { name,passwd,type } = req.body;

	if (!name) {
		return res.status(400).json({ msg: "请输入用户名" })
	}
	if(!passwd){
		return res.status(400).json({ msg: "请输入密码" })
	}
	if (!type){
		return res.status(400).json({ msg: "请选择用户类型" })
	}
	//sql查询
	let sqlCheck = 'SELECT * from users where uname=?'
	let sqlInsert = `INSERT INTO users SET ?`
	pool.query(sqlCheck, name, (err, user) => {
		if (user.length > 0) {
			return res.status(400).json({ msg:`用户名已存在` })
		}
		const data = {
			uname: name,//ccredit是数据库属性，fcredit是json属性
			upasswd: passwd,
			utype: type
		}
		pool.query(sqlInsert, data, (err, result) => {
			if (err) {
				throw err;
				return res.status(400).json({ msg: "无法插入" });
			}
			return res.status(200).json({data,msg:'创建用户成功'})
		})
	})

})

//登陆
router.post('/login', (req, res) => {
	//解构赋值
	const { name,passwd } = req.body;
   

	if (!name) {
		return res.status(400).json({ msg: "请输入用户名" })
	}
	if(!passwd){
		return res.status(400).json({ msg: "请输入密码" })
	}
	
	//sql查询
	let sqlCheck = 'SELECT * from users where uname=? and upasswd=?'
	pool.query(sqlCheck, [name,passwd], (err, user) => {
		if (user.length > 0) {
			return res.status(200).json({ user,msg:`登录成功` })
		}
        else{
            return res.status(400).json({msg:'用户名或密码错误'})

        }	
	})

})



//获取用户
router.get('/', (req, result) => {
	//两张表之间的关系
	let getQuery = `SELECT * FROM users`
	pool.query(getQuery, (err, res) => {
		return result.status(200).json(res)
	})
})




module.exports = router;

