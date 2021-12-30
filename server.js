const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
/* const courseRouter=require("./routes/courses.js") */
const app = express();


/* Bodyparser Middleware */
app.use(express.json());

/* 导入配置 */
dotenv.config({ path: "./config.env" });

//* 打印日志
if (process.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* 导入 Routes */
app.use('/api/course/',require("./routes/courses.js"))
app.use('/api/student/',require("./routes/students.js"))
app.use('/api/teacher/',require("./routes/teachers.js"))
app.use('/api/classes/',require("./routes/classes.js"))
app.use('/api/user/',require("./routes/user.js"))
const port = process.env.PORT || 8080; //react端口
//*监听
app.listen(port, () => console.log(`Server started on port ${port}`));


// const test=(x)=>{
// 	x=x+1
// }
// const fo={
//   "a":1,
//   "b":2
// }
// console.log({...fo,fo})
// console.log({...fo})
// console.log({fo})
// console.log({...{fo}})

