const mysql = require("mysql");
//创建连接池对象
let pool=mysql.createPool({
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	user: process.env.DBUSER,
	password:process.env.DBPASSWORD,
	connectionLimit:10
});
pool.getConnection(function (err) {
      if (!err) {
        console.log("Database is connected!");
      } else {
		  throw err;
        console.log("Error connecting database!");
      }
    });
// 导出连接池对象
module.exports=pool;
