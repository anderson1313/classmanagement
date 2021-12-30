import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'
import { deleteCourse } from '../../store/actions/courseActions'
import { clearErros } from "../../store/actions/errorActions";
import Avatar, { genConfig } from 'react-nice-avatar'
import { deleteStuent, updateStudent } from "../../store/actions/studentActions";
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
    const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  
    //define data -lzx
    const [studentName, setStudentName] = useState("");
    const [studentAge, setStudentAge] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [studentSex, setStudentSex] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentClassCN, setStudentClassCN] = useState("");
    const [courseStudents, setCourseStudents] = useState("");
    const [sclist,setsclist]=useState([]);
    const [showuppdate, setshowuppdate] = useState(false)
    const [showdelete, setshowdelete] = useState(false)
    const classOptions = classes.map((c) => c.clname);
    const courseList = courses.map((c) => c.cname);

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
            updateStudent({
                sno: studentDetail.sno,
                newname: studentName,
                newsex: studentSex,
                newage: studentAge,
                newclno: studentClass,

            })
        );

    }
    const onChange = (e) => {

        setStudentClassCN(e.target.value);
        setStudentClass(e.target.value)

    };
    const classListValues = classes.map((c) => c.clno)

    if (courseList.length != 0) {
        var input1 = document.querySelector("input[name=tags]");
        new Tagify(input1, {
            whitelist: [...courseList],
            dropdown: {
                classname: "color-blue",
                enabled: 0,
                maxItems: 10,
                position: "text",
                closeOnSelect: false,
                highlightFirst: true,
            },
        });
    }



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

            <div className='studentinfowrapper'>
                <div className='studentinfocon'>
                    {studentDetail ? (<>
                        <div className='stuviewleft'>

                            <div className={showdelete == true && showuppdate == false ? 'showdelete' : 'hide'}>
                                <div className='warning'>你确定要删除该学生吗？</div>
                                <div className='options'>
                                    <button onClick={() => onDelete(studentDetail.sno)} className='sure'>确定</button>
                                    <button onClick={() => changedelete()} className='cancel'>取消</button>
                                </div>
                            </div>


                            <div className={showuppdate == true && showdelete == false ? 'showupdate' : 'hide'}>

                                <div className='submitcon animated animate__headShake'>
                                    <form  {...{ onSubmit }}>
                                    <div className='up-left'>
                                            <div className='subno'>
                                                <label htmlFor="name">学生学号</label>
                                                <input
                                                    type="text"
                                                    name="studentno"
                                                    id="studentno"
                                                    placeholder="学生学号"
                                                    className="mb-3"
                                                    value={studentNo}
                                                    onChange={(e) => setStudentNo(e.target.value)}
                                                />
                                            </div>

                                            <div className='subname'>
                                                <label htmlFor="name">学生姓名</label>
                                                <input
                                                    type="text"
                                                    name="studentname"
                                                    id="studentname"
                                                    placeholder="学生姓名"
                                                    className="mb-3"
                                                    value={studentName}
                                                    onChange={(e) => setStudentName(e.target.value)}
                                                />
                                            </div>

                                            <div className='subsex'>
                                                <label htmlFor="sex">学生性别</label>
                                                <input
                                                    type="text"
                                                    name="studentsex"
                                                    id="studentsex"
                                                    placeholder="学生性别"
                                                    className="mb-3"
                                                    value={studentSex}
                                                    onChange={(e) => setStudentSex(e.target.value)}
                                                />
                                            </div>

                                            <div className='subage'>
                                                <label htmlFor="age">学生年龄</label>
                                                <input
                                                    type="number"
                                                    name="studentage"
                                                    id="studentage"
                                                    placeholder="学生年龄"
                                                    className="mb-3"
                                                    onChange={(e) => setStudentAge(e.target.value)}
                                                    value={studentAge}
                                                />

                                            </div>

                                            <div className="subclass">
                                                <label htmlFor="name">学生班级</label>
                                                <select   {...{ onChange }}>
                                                    {classOptions.map((o, index) => (
                                                        <option key={o} value={classListValues[index]}>
                                                            {o}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div >
                                                <label htmlFor="name">添加课程</label>
                                                <input
                                                    type="text"
                                                    name="tags"
                                                    id="assigncourses"
                                                    placeholder="添加课程"
                                                    className="mb-3"

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
                                            更新学生
                                        </button>
                                    </form>
                                </div>

                            </div>

                            <div className={['ori animated  animate__zoomIn', showuppdate == false && showdelete == false ? '' : 'hide'].join(' ')}>
                                <div className='title animated '>{studentDetail.sname}</div>
                                <div className='information animated '>学号：{studentDetail.sno}</div>
                                <div className='information animated '>学生性别：{studentDetail.ssex}</div>
                                <div className='information animated '>学生年龄：{studentDetail.sage}</div>
                                <div className='information animated '>学生班级：{studentDetail.sclass}</div>
                                <div className='information animated '>学生课程：{studentDetail.scourses}</div>
                                <div className='text animated '>你可以点击下方按钮管理学生</div>
                            </div>
                            <div className='functions animated '>
                                <button className='updatecourse' onClick={() => changeupdate()}>
                                    {showuppdate == false ? '更新学生' : '返回'}
                                </button>
                                <button
                                    className="deletecourse"
                                    onClick={() => changedelete()}
                                >
                                    删除学生
                                </button>
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