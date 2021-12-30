import React, { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "animate.css";
import { clearErros } from "./store/actions/errorActions";



import ReactCSSTransitionGroup from "react-addons-css-transition-group";
/*css */
import './styles.css'
import './animated.css'
import './icon.css'
import '../node_modules/@yaireo/tagify/src/tagify.css'


/*avatar */
import Avatar, { genConfig } from 'react-nice-avatar'



/* Redux store */
import store from './store/store.js';
import { getClasses } from "./store/actions/classActions";
import { getStudents } from "./store/actions/studentActions";
import { getCourses } from "./store/actions/courseActions";
import { getUsers } from "./store/actions/userActions";
import { userLogin } from "./store/actions/userActions";
import { createUser } from "./store/actions/userActions";



/*courses页面 */
import Managecourse from "./components/courses/ManageCourse";
import Courses from './components/courses/Course'
import ViewCourse from './components/courses/ViewCourse'
import UpdateCourse from "./components/courses/UpdateCourse";





/*class页面 */
import Classes from "./components/classes/Class";
import ManageClass from "./components/classes/ManageClass";
import UpdateClass from "./components/classes/UpdateClass";
import ViewClass from "./components/classes/ViewClass";




/*student页面 */
import UpdateStudent from './components/student/UpdateStudent'
import Managestudent from './components/student/ManageStudent'
import ViewStudent from './components/student/ViewStudent'
import Students from './components/student/Student'

/*useraction*/


import imgURL from './static/pic1.jpg';

/*初始化数据将数据存到state一定要按顺序 students-class-courses*/
store.dispatch(getStudents());
store.dispatch(getClasses());
store.dispatch(getCourses());






/*avatar */
const config = genConfig({
  'hairStyle': 'normal',
  'sex': 'man',
  'eyeStyle': 'oval'
})



const HomeComponet = () => {
  const [bgsize, setbgsize] = useState("120%")
  const handleScroll = (event) => {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var res = 120 + scrollTop / 4 + "%"
    if (120 + scrollTop < 400) {
      setbgsize(res)

    }


  };
  window.addEventListener('scroll', handleScroll);

  const dispatch = useDispatch();


  const { courses } = useSelector((state) => state.cou)
  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const { msg: sucMsg, id: sucID, login, created } = useSelector((state) => state.user)

  const [showcreate, setshowcreate] = useState(false)
  const [uname, setuname] = useState()
  const [upasswd, setupasswd] = useState()
  const [rname,setrname]=useState()
  const [rpasswd, setrpasswd] = useState()

  const [utype, setutype] = useState()
  const [currentuser,setcurrentuser]=useState()
  const { user } = useSelector((state) => state.user)
  console.log(user)
  

  useEffect(() => {
    if (user.length>0) {
      setcurrentuser(user[0][0])
    }
}, [user]);
 

  useEffect(()=>{
    setshowcreate(false)
    setuname()
    setupasswd()
  },[created])

  const userlogin = (e) => {
    
    e.preventDefault();
    dispatch(userLogin({
      name: uname,
      passwd: upasswd
    }))

    console.log(login)
    console.log(currentuser)

  }
 
  const userregister = (e) => {
    console.log("A")
    e.preventDefault();
    dispatch(createUser({
      name: rname,
      passwd: rpasswd,
      type: utype
    })) 
  }


  return (
    <div className='container'>
      <div className='topconatiner' style={{ "background-size": bgsize }} >
        <div className='downblock animated fadeInUp'>
          <div className='pname'>课程管理系统</div>
          <div className='pperson'>
            <div className='per'>梁梓轩</div>
            <div className='per'>黄景增</div>
            <div className='per'>张信宇</div>
            <div className='per'>胡瀚文</div>
            <div className='per'>汪杰烽</div>
          </div>


          {login == false || currentuser==undefined ? (<><div className='havecourse'>请先登录</div></>) : (<> {currentuser.utype==1?(<><div className='havecourse'>你是学生</div></>):(<>{courses.length < 0 ? (<div className='nocourse'><Link to='/create-course'>创建课程</Link></div>) : (<div className='havecourse' >已建立课程 开始管理</div>)}</>)}
          </>)}

        </div>
      </div>


      {
        login == false || currentuser==undefined ? (<>
          {
            showcreate == false ? (<>
              <div className='logincontainer'>
                <div className='loginwrapper'>
                  <form>
                    <div className="form-group">
                      <div className='uname animated  flipInX'>
                        <label htmlFor="name" className='labelname'>用户名</label>
                        <input
                          type="text"
                          name="uname"
                          id="uname"
                          placeholder="用户名"
                          className="mb-3"
                          value={uname}
                          onChange={(e) => setuname(e.target.value)}
                        />
                      </div>

                      <div className='uname animated  flipInX'>
                        <label htmlFor="name" className='labelname'>用户密码</label>
                        <input
                          type="password"
                          name="upasswd"
                          id="upasswd"
                          placeholder="密码"
                          className="mb-3"
                          value={upasswd}
                          onChange={(e) => setupasswd(e.target.value)}
                        />
                      </div>

                      {sucID === "USER_LOGIN_SUCCESS" ? (
                        <div style={{ marginTop: "10px" }}
                          className="suc-msgs"

                        >
                          {sucMsg}
                        </div>
                      ) : null}

                      {errID == "USER_LOGIN_FAIL" ? (
                        <div
                          className="err-msgs"
                          style={{ marginTop: "10px" }}
                        >
                          {errMsg}
                        </div>
                      ) : null}

                      <button onClick={userlogin}>登陆</button>
                      <div className='toregister'><Link onClick={(e) => {setuname();
                        setupasswd() ;setshowcreate(true)}}>没有用户，去注册</Link></div>
                    </div>
                  </form>
                </div>

              </div>

            </>)

              : (<> <div className='logincontainer'>
                <div className='loginwrapper'>
                  <form>
                    <div className="form-group">
                      <div className='uname animated  flipInX'>
                        <label htmlFor="name" className='labelname'>用户名</label>
                        <input
                          type="text"
                          name="uname"
                          id="uname"
                          placeholder="用户名"
                          className="mb-3"
                          value={uname}
                          onChange={(e) => setrname(e.target.value)}
                        />
                      </div>

                      <div className='uname animated  flipInX'>
                        <label htmlFor="name" className='labelname'>用户密码</label>
                        <input
                          type="text"
                          name="upasswd"
                          id="upasswd"
                          placeholder="密码"
                          className="mb-3"
                          value={upasswd}
                          onChange={(e) => setrpasswd(e.target.value)}
                        />
                      </div>

                      <div className='utype animated  flipInX'>
                        <label htmlFor="name" className='labelname'>用户类型</label>
                        <div className='option'>  <input name="role" type="radio" value="2" onChange={(e) => {console.log(e.target.defaultValue);setutype(parseInt(e.target.defaultValue))}}/><div className='optionname'>教师</div></div>
                        <div className='option'> <input name="role" type="radio" value="1" onChange={(e) => {console.log(e.target.defaultValue);setutype(parseInt(e.target.defaultValue))}} /><div className='optionname'>学生</div></div>
                      </div>
                      {sucID === "USER_CREATE_SUCCESS" ? (
                        <div style={{ marginTop: "10px" }}
                          className="suc-msgs"
                        >
                          {sucMsg}
                        </div>
                      ) : null}

                      {errID == "USER_CREATE_ERROR" ? (
                        <div
                          className="err-msgs"
                          style={{ marginTop: "10px" }}
                        >
                          {errMsg}
                        </div>
                      ) : null}
                      <button onClick={userregister}>注册</button>
                    </div>
                  </form>
                </div>
              </div></>)

          }
        </>)
          : (
            <>
              {
                currentuser.utype == '1' ? (<>

                <div className='logincontainer nofun'>
                  学生功能还未开放
                  
                </div>

                </>) : (<>
                  <div className='middlecontainer'>
                    <div className='midwrapper'>
                      <div className='students'>
                        <div className='title'>学生</div>
                        <div className='intro'>建立学生档案；查看学生信息；支持excel导入。</div>
                        <div className='func'><Link to='/create-student'>创建学生</Link></div>
                        <div className='func'><Link to='/students'>管理学生</Link></div>
                      </div>
                      <div className='classes'>
                        <div className='title'>班级</div>
                        <div className='intro'>建立班级列表；查看班级信息；支持excel导入。</div>
                        <div className='func'><Link to='/create-class'>创建班级</Link></div>
                        <div className='func'><Link to='/classes'>管理班级</Link></div>
                      </div>
                      <div className='courses'>
                        <div className='title'>课程</div>
                        <div className='intro'>建立课程列表；查看课程信息；支持excel导入。</div>
                        <div className='func'><Link to='/create-course'>创建课程</Link></div>
                        <div className='func'><Link to='/courses'>管理课程</Link></div>

                      </div>


                    </div>


                  </div ></>)


              }




            </>)


      }








      <div className='downcontainer'>
        <div className='aboutus'>关于我们</div>
        <div className='info'>
          信息时代的到来意味着工作效率的日渐提交，同时也给课程管理人员带来了更大的压力，课程管理人员必须及时准确地更新每个班级的课程表，每位学生所属的班级以及每门课的开课班级、上课时间。
          无论在初中高中还是大学，一位老师往往负责几个班的教学工作，如果依靠人工来管理每位老师负责的课程，不仅工作量大，而且十分麻烦，容易出错，开发此系统便是为了方便课程管理人员，减小出错概概率。

        </div>



      </div>
    </div >
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/create-course" exact component={Managecourse} />
          <Route path="/create-student" exact component={Managestudent} />
          <Route path='/create-class' exact component={ManageClass}></Route>

          <Route path="/about-course/:cno" exact component={ViewCourse} />
          <Route path="/about-class/:clno" exact component={ViewClass} />
          <Route path="/about-student/:sno" exact component={ViewStudent} />

          <Route path="/courses" exact component={Courses} />
          <Route path="/students" exact component={Students} />
          <Route path="/classes" exact component={Classes} />


          <Route path="/student/update/:sno" exact component={UpdateStudent} />
          <Route path="/course/update/:cno" exact component={UpdateCourse} />
          <Route path='/class/update/:clno' exact component={UpdateClass}></Route>
          <Route component={HomeComponet} />
        </Switch>
      </Router>
    </Provider>
  )



}

export default App;