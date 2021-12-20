import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'
import { deleteCourse } from '../../store/actions/courseActions'
import { clearErros } from "../../store/actions/errorActions";
import Avatar, { genConfig } from 'react-nice-avatar'
import { deleteStuent } from "../../store/actions/studentActions";
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

function ViewCourse() {
    const dispatch = useDispatch()

    //返回就清除错误
    window.addEventListener("popstate", function (e) {
        dispatch(clearErros());//根据自己的需求实现自己的功能 
    }, false);


    let { sno: spara } = useParams();

    //fecth data-lzx
    const { courses } = useSelector((state) => state.cou);
    const { classes } = useSelector((state) => state.cla);
    const { students,deleted } = useSelector((state) => state.stu);
    const studentDetail = students.filter(({ sno }) => sno == spara)[0];
    console.log(studentDetail)

  
    //define data -lzx
    const [studentName, setStudentName] = useState("");
    const [studentAge, setStudentAge] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [studentSex, setStudentSex] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentClassCN, setStudentClassCN] = useState("");
    const [courseStudents, setCourseStudents] = useState("");
    const [sclist,setsclist]=useState([]);
    
    useEffect(() => {
        if (deleted) {
            window.location.href = "/students";
        }
    }, [deleted]);



    //methods
    const onDelete = (id) => dispatch(deleteStuent(id));

    useEffect(() => {
        if (classes && studentDetail) {
            const sclass = classes.filter(({ clno }) => clno == studentDetail.sclno)[0]
            if (sclass != undefined && sclass.length != 0) {
                setStudentClassCN(sclass.clname)
            }
        }
        if (studentDetail) {
            setStudentName(studentDetail.sname);
            setStudentAge(studentDetail.sage);
            setStudentSex(studentDetail.ssex)
            setStudentNo(studentDetail.sno)
            setStudentClass(studentDetail.sclno);
            const sclist=studentDetail.scourses.split(',')
            setsclist(sclist)
        }
    }, [studentDetail,classes]);



    return (
        <div className='container'>
            <div className='wrapper_left course_left'>
                <div className='content'>
                    <div className='webname'><Link to='/'>课程管理系统</Link></div>
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
                    {studentDetail ? (<>
                        <div className='up'>
                            <div className='title  animated fadeInLeft'>{studentDetail.sname}</div>
                            <div className='functions animated fadeInLeft'>
                                <Link to={`/student/update/${studentDetail.sno}`} className='updatecourse'>
                                    更新学生
                                </Link>
                                <button
                                    className="deletecourse"
                                    onClick={() => onDelete(studentDetail.sno)}
                                >
                                    删除学生
                                </button>
                                {/* <button className='deletecourse' onClick={()=>onDelete(courseDetail.cno)}>删除课程</button> */}
                            </div>
                        </div>
                        <div className='basicinfo'>
                            <div className='title'>
                                <div className='iconfont icon-xuexiao_xuesheng'></div>
                                <div>学生基本信息</div>
                            </div>

                            <div className='infocon'>
                            <div className='sname'>
                                <div className='snametitle'>学生姓名</div>
                                <div className='snamecontent'>{studentDetail.sname}</div>

                            </div>
                            <div className='ssex'>
                                <div className='ssextitle'>学生性别</div>
                                <div className='ssexcontent'>{studentDetail.ssex}</div>

                            </div>
                            <div className='sage'>
                                <div className='sagetitle'>学生年龄</div>
                                <div className='sagecontent'>{studentDetail.sage}</div>
                            </div>
                            <div className='scl'>
                                <div className='scltitle'>学生班级</div>
                                <div className='sclcontent'>{studentClassCN}</div>
                            </div>

                            {sclist.length > 0 ? (
                                <div className='scourses'>
                                <div className='scoursestitle'>学生课程</div>
                                <div className='studentscon  '>
                                    
                                    {sclist.map((c) => (
                                        <div className='eachs animated flipInX'>{c}</div>
                                    ))}
                                </div>
                                </div>
                            ) : (
                                <div className='errcon'>
                                    <div className='err'>该学生还未选择课程</div>
                                </div>
                            )}
                            </div>
                            
                        </div>
                        <div className='otherinfo'>
                        </div>
                    </>) : (<div className='infonotused'>学生信息不可用</div>)}
                </div>
            </div>
        </div>
    );

}
export default ViewCourse;