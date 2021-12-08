import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "animate.css";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
/*css */
import './styles.css'
import './animated.css'
import './icon.css'


/*avatar */
import Avatar, { genConfig } from 'react-nice-avatar'



/* Redux store */
import store from './store/store.js';
import { getClasses } from "./store/actions/classActions";
import { getStudents } from "./store/actions/studentActions";
import { getCourses } from "./store/actions/courseActions";

/*courses页面 */
import Managecourse from "./components/courses/ManageCourse";
import Courses from './components/courses/Course'
import ViewCourse from './components/courses/ViewCourse'
import UpdateCourse from "./components/courses/UpdateCourse";





/*class页面 */





/*student页面 */




/*初始化数据 一定要按顺序 students-class-courses*/
store.dispatch(getStudents())
store.dispatch(getCourses())




/*avatar */
const config = genConfig({
  'hairStyle': 'normal',
  'sex': 'man',
  'eyeStyle': 'oval'
})


const HomeComponet = () => {
  const { courses } = useSelector((state) => state.cou)
  console.log(courses)
  return (
    <div className='container'>
      <div className='wrapper_left'>
        <div className='content'>
          <div className='webname'>课程管理系统</div>
          <div className='avatarbox animated flipInX '>
            <Avatar style={{ width: '100px', height: '100px' }} {...config} />
          </div>
          <div className='stufflist'>
            <div className='title'>技术人员</div>
            <li>梁梓轩</li>
            <li>黄景增</li>
            <li>张信宇</li>
            <li>胡瀚文</li>
            <li>汪杰烽</li>
          </div>
        </div>
      </div>
      <div className='wrapper_right'>
        {courses.length > 0 ? (

          <div className='rightcontainer'>
            <div className='createfunctions'>
              {/* <Link><div className='createstudent create'>创建学生</div></Link>
              <Link><div className='createcourse create'>创建课程</div></Link>
              <Link><div className='createclass create'>创建班级</div></Link> */}
              <div className='createstudent create animated flipInX'><Link>创建学生</Link></div>
              <div className='createcourse create animated flipInX'><Link to='/create-course'>创建课程</Link></div>
              <div className='createclass create animated flipInX'><Link>创建班级</Link></div>

              
            </div>
            <div className='managefunctions'>
              {/* <Link><div className='managestudnet manage'>管理学生</div></Link>
              <Link><div className='managecourse manage'>管理课程</div></Link>
              <Link><div className='manageclass manage'>管理班级</div></Link> */}

              <div className='managestudnet manage animated flipInX'><Link>管理学生</Link></div>
              <div className='managecourse manage animated flipInX'><Link>管理课程</Link></div>
              <div className='manageclass manage animated flipInX'><Link>管理班级</Link></div>
            </div>




          </div>
        )
          : (<div className='content'>
            <div className='tip animated bounce '>你还未建立任何课程</div>
            <Link to="/create-course">
              <div className='tocreate animated pulse infinite'>建立课程</div>
            </Link>
          </div>)
        }
      </div >
    </div >
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/create-course" exact component={Managecourse} />
          <Route path="/about-course/:cno" exact component={ViewCourse} />
          <Route path="/courses" exact component={Courses} />
          <Route path="/course/update/:cno" exact component={UpdateCourse} />
          <Route component={HomeComponet} />
        </Switch>
      </Router>
    </Provider>
  )



}

export default App;