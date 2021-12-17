import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCourse } from '../../store/actions/courseActions'
import Tagify from "@yaireo/tagify";

import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
  'hairStyle': 'normal',
  'sex': 'man',
  'eyeStyle': 'oval'
})

const UpdateCourse = () => {
  let { cno: cpara } = useParams(); //第一个参数是url参数
  const dispatch = useDispatch();
  const { courses, updated } = useSelector((state) => state.cou)
  const { students } = useSelector((state) => state.stu);
  const courseDetail = courses.filter(({ cno }) => cno == cpara)[0]; //cno是state里面的属性
  console.log(courseDetail)
  const { msg: errMsg, id: errID } = useSelector((state) => state.error); //errMsg=state.error.msg
  const [courseName, setCourseName] = useState("");
  const [courseCredit, setcourseCredit] = useState("");


  //获取到课程信息之后

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");
    if (courseDetail) {
      const studentList = students.map(({ scourses, sname }) => {
        if (scourses.includes(courseDetail.cno)) {
          return sname
        }
        return null;
      }).filter((s) => s != undefined);
      if (studentList.length > 0) {
        new Tagify(input1, {
          whitelist: [...studentList],
          dropdown: {
            classname: "color-blue",
            enabled: 0,
            maxItems: 5,
            position: "text",
            closeOnSelect: false,
            highlightFirst: true,
          },
        });

      }
    }
    if (courseDetail) {
      setCourseName(courseDetail.cname);
    }
  }, [courseDetail])

  useEffect(() => {
    if (updated) {
      window.location.href = "/courses";
    }
  }, [updated]);



  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCourse({
        cno:courseDetail.cno,
        newname: courseName,
        newcredit:courseCredit
        
      })
    );


  }


  return (
    <div className='container'>
      <div className='wrapper_left course_left'>
        <div className='content'>
          <div className='webname'>课程管理系统</div>
          <div className='avatarbox  '>
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

      <div className='courseinfowrapper'>
        <div className='courseinfocon'>
          {courseDetail ? (<>
            <div className='up'>
              <div className='title animated fadeInLeft'>{courseDetail.cname}</div>
              <div className='title animated fadeInLeft'>课程信息更改</div>
            </div>

            <div className='submitcon animated flipInX'>
              <form  {...{onSubmit}}>
                <div className="form-group">
                  <div className='subname'>
                    <label htmlFor="name" className='labelname'>课程名称</label>
                    <input
                      type="text"
                      name="coursename"
                      id="coursename"
                      placeholder="课程名"
                      className="mb-3"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  </div>

                  <div className='subcredit'>

                    <label htmlFor="credit" className='labelname'>学分</label>
                    <input
                      type="text"
                      name="credit"
                      id="credit"
                      placeholder="学分"
                      className="mb-3"
                      value={courseCredit}
                      onChange={(e) => setcourseCredit(e.target.value)}
                    />
                  </div>


                </div>

                {errID === "UPDATE_COURSE_ERROR" ? (
                  <div
                    className="err-msgs"
                  >
                    {errMsg}
                  </div>
                ) : null}
                <button color="dark"  >
                  更新课程
                </button>
              </form>
            </div>
          </>) : <>

          <div className='nodate'>没有此课程信息或者数据库未连接</div>
          
          </>}

        </div>
      </div>
    </div>
  )
}


export default UpdateCourse;
