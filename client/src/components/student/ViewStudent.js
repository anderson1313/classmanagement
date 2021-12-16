import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from '../../store/actions/studentActions'
import Avatar, { genConfig } from 'react-nice-avatar'


const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

function ViewStudent() {
    let { sno: spara } = useParams();
    console.log(spara);
    const { students, deleted } = useSelector((state) => state.stu);
    const studentDetail = students.filter(({ sno }) => sno == spara)[0];
    const { courses } = useSelector((state) => state.cou);
    const [courseStudents, setCourseStudents] = useState("");
    const dispatch=useDispatch()
    
    // dispatch(deleteCourse(38))
    
    // dispatch(createCourse({ name: 'TEST4', credit: 3 }));
   

    useEffect(() => {
        if (studentDetail) {
            const courseList = courses.map(({ scourses, cname }) => {
                if (scourses.includes(studentDetail.sname)) {
                    return cname;
                }
            }).filter((course) => course != undefined)
            setCourseStudents(courseList);
        }
    }, [studentDetail]);
    console.log(courseStudents)
    useEffect(() => {
        if (deleted) {
            window.location.href = "/students";
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

            <div className='studentinfowrapper'>
                <div className='courseinfocon'>
                    {studentDetail ? (<>
                        <div className='up'>
                            <div className='title  animated fadeInLeft'>{studentDetail.sname}</div>
                            <div className='functions animated fadeInLeft'>
                                <Link to={`/student/update/${studentDetail.sno}`} className='updatecourse'>
                                    更新学生信息
                                </Link>
                                <button
                  className="deletecourse"
                  
                >
                  删除学生信息
                </button>
                                {/* <button className='deletecourse' onClick={()=>onDelete(courseDetail.cno)}>删除课程</button> */}
                            </div>
                        </div>
                        <div className='basicinfo'>
                            <div className='title'>
                                <div className='iconfont icon-xuexiao_xuesheng'></div>
                                <div>学生课程</div>

                            </div>
                            {courseStudents.length > 0 ? (
                                <div className='studentscon  '>
                                    {courseStudents.map((c) => (
                                        <div className='eachs animated flipInX'>{c}</div>
                                    ))}
                                </div>
                            ) : (
                                <div className='errcon'>
                                    <div className='err'>该课程中还没有任何学生</div>
                                </div>
                            )}

                        </div>
                        <div className='otherinfo'>

                        </div>
                    </>) : (<div className='infonotused'>学生信息不可用</div>)}

                </div>



            </div>
        </div>

    );

}
export default ViewStudent;