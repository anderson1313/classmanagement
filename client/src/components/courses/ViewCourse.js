import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'
import { deleteCourse } from '../../store/actions/courseActions'
import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

function ViewCourse() {
    let { cno: cpara } = useParams();
    console.log(cpara);
    const { courses, deleted } = useSelector((state) => state.cou);
    const courseDetail = courses.filter(({ cno }) => cno == cpara)[0];
    const { students } = useSelector((state) => state.stu);
    const [courseStudents, setCourseStudents] = useState("");
    const dispatch=useDispatch()
    const onDelete = (id) => dispatch(deleteCourse(id));
    // dispatch(deleteCourse(38))
    
    // dispatch(createCourse({ name: 'TEST4', credit: 3 }));
   

    useEffect(() => {
        if (courseDetail && students ) {
            const studentList = students.map(({ scourses, sname }) => {
                if (scourses.includes(courseDetail.cname)) {
                    return sname;
                }
            }).filter((student) => student != undefined)
            setCourseStudents(studentList);
        }
    }, [courseDetail]);
    console.log(courseStudents)
    useEffect(() => {
        if (deleted) {
            window.location.href = "/courses";
        }
    }, [deleted]);

    
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
                            <div className='title  animated fadeInLeft'>{courseDetail.cname}</div>
                            <div className='functions animated fadeInLeft'>
                                <Link to={`/course/update/${courseDetail.cno}`} className='updatecourse'>
                                    更新课程
                                </Link>
                                <button
                  className="deletecourse"
                  onClick={() => onDelete(courseDetail.cno)}
                >
                  删除课程
                </button>
                                {/* <button className='deletecourse' onClick={()=>onDelete(courseDetail.cno)}>删除课程</button> */}
                            </div>
                        </div>
                        <div className='basicinfo'>
                            <div className='title'>
                                <div className='iconfont icon-xuexiao_xuesheng'></div>
                                <div>课程学生</div>

                            </div>
                            {courseStudents.length > 0 ? (
                                <div className='studentscon  '>
                                    {courseStudents.map((c) => (
                                        <div className='eachs animated flipInX'>{c}</div>
                                    ))}
                                </div>
                            ) : (
                                <div className='errcon'>
                                    <div className='err'>你还未添加任何学生</div>
                                </div>
                            )}

                        </div>
                        <div className='otherinfo'>

                        </div>
                    </>) : (<div className='infonotused'>课程信息不可用</div>)}

                </div>



            </div>
        </div>

    );

}
export default ViewCourse;