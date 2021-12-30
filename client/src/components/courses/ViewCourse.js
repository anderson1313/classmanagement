import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'
import { deleteCourse } from '../../store/actions/courseActions'
import Avatar, { genConfig } from 'react-nice-avatar'
import { clearErros } from "../../store/actions/errorActions";
import Animal from "react-animals";
import { updateCourse } from '../../store/actions/courseActions'



const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'smile',

})

function ViewCourse() {
    let { cno: cpara } = useParams();
    console.log(cpara);
    const { courses, deleted, updated } = useSelector((state) => state.cou);
    const courseDetail = courses.filter(({ cno }) => cno == cpara)[0];
    const { students } = useSelector((state) => state.stu);
    const [courseStudents, setCourseStudents] = useState("");
    const dispatch = useDispatch()
    const [showuppdate, setshowuppdate] = useState(false)
    const [showdelete, setshowdelete] = useState(false)
    const onDelete = (id) => dispatch(deleteCourse(id));

    const { msg: errMsg, id: errID } = useSelector((state) => state.error);
    //errMsg=state.error.msg
    const [courseName, setCourseName] = useState("");
    const [courseCredit, setcourseCredit] = useState("");
    const [courseNo, setcourseNo] = useState("");

    window.addEventListener("popstate", function (e) {
        dispatch(clearErros());//根据自己的需求实现自己的功能 
    }, false);

    useEffect(() => {

        if (courseDetail) {
            setCourseName(courseDetail.cname);
            setcourseNo(courseDetail.cno)
        }
    }, [courseDetail])

    useEffect(() => {
        if (courseDetail && students) {
            const studentList = students.map(({ scourses, sname }) => {
                if (scourses.includes(courseDetail.cname)) {
                    return sname;
                }
            }).filter((student) => student != undefined)
            setCourseStudents(studentList);
        }
    }, [courseDetail]);
    console.log(courseStudents)

    const changeupdate = () => {
        setshowdelete(false)
        if (showuppdate == false) {
            setshowuppdate(true)
        }
        else {
            setshowuppdate(false)
        }
    }

    const changedelete = () => {
        setshowuppdate(false)

        if (showdelete == false) {
            setshowdelete(true)
        }
        else {
            setshowdelete(false)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateCourse({
                cno: courseDetail.cno,
                newname: courseName,
                newcredit: courseCredit

            })
        );

    }


    useEffect(() => {
        if (updated) {
            window.location.href = "/about-course/" + courseNo;
        }
    }, [updated]);



    useEffect(() => {
        if (deleted) {
            window.location.href = "/courses";
        }
    }, [deleted]);


    return (
        <div className='container'>
            <div className='topnav animated animate__fadeInDown'>
                <div className='func topblock'></div>
                <div className='func'><Link to='/'>首页</Link></div>
                <div className='func'><Link to='/create-student'>创建学生</Link></div>
                <div className='func'><Link to='/students'>管理学生</Link></div>
                <div className='func'><Link to='/create-class'>创建班级</Link></div>
                <div className='func'><Link to='/classes'>管理班级</Link></div>
                <div className='func this'><Link to='/courses'>管理课程</Link></div>
                <div className='func'><Link to='/create-course'>创建课程</Link></div>
            </div>

            <div className='courseinfowrapper'>
                <div className='courseinfocon'>
                    {courseDetail ? (<>
                        <div className='left'>

                            <div className={showdelete == true && showuppdate == false ? 'showdelete' : 'hide'}>
                                <div className='warning'>你确定要删除该课程吗？</div>
                                <div className='options'>
                                    <button onClick={() => onDelete(courseDetail.cno)} className='sure'>确定</button>
                                    <button onClick={() => changedelete()} className='cancel'>取消</button>
                                </div>
                            </div>


                            <div className={showuppdate == true && showdelete == false ? 'showupdate' : 'hide'}>

                                <div className='submitcon animated animate__headShake'>
                                    <form  {...{ onSubmit }}>
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

                            </div>

                            <div className={['ori animated  animate__zoomIn', showuppdate == false && showdelete == false ? '' : 'hide'].join(' ')}>

                                <div className='iconfont icon-kecheng-'></div>
                                <div className='title animated '>{courseDetail.cname}</div>
                                <div className='divider animated '></div>
                                <div className='text animated '>你可以点击下方按钮管理自己的课程</div>
                            </div>
                            <div className='functions animated '>
                                <button className='updatecourse' onClick={() => changeupdate()}>
                                    {showuppdate == false ? '更新课程' : '返回'}
                                </button>
                                <button
                                    className="deletecourse"
                                    onClick={() => changedelete()}
                                >
                                    删除课程
                                </button>
                            </div>

                        </div>

                        <div className='basicinfo'>
                            <div className='ccreditcon'>
                                <div className='subtitle'>
                                    <div className='iconfont icon-chengji-'></div>
                                    <div className='titletext'>课程学分:{courseDetail.ccredit}</div>
                                </div>
                                
                            </div>


                            <div className='cscon'>
                                <div className='subtitle'>
                                    <div className='iconfont icon-xuesheng'></div>
                                    <div className='titletext'>课程学生</div>
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

                        </div>

                    </>) : (<div className='infonotused'>课程信息不可用</div>)}
                </div>
            </div>
        </div >

    );

}
export default ViewCourse;