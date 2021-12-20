import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createStudents } from "../../store/actions/studentActions";
import { clearErros } from "../../store/actions/errorActions";
import { CLEAR_ERRORS } from "../../store/actions/types";

import Avatar, { genConfig } from 'react-nice-avatar'
import { Link } from "react-router-dom";
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})



const UpdateStudent = () => {

    const dispatch = useDispatch();
    //返回就清除错误
    window.addEventListener("popstate", function (e) {
        dispatch(clearErros());//根据自己的需求实现自己的功能 
    }, false);
    const { courses } = useSelector((state) => state.cou);
    const { students, updated } = useSelector((state) => state.stu);
    const courseList = courses.map((c) => c.cname);

    const { msg: errMsg, id: errID } = useSelector((state) => state.error);
    const { msg: sucMsg, id: sucID, created } = useSelector((state) => state.stu)
    const [studentName, setStudentName] = useState("");

    const [studentAge, setStudentAge] = useState("");
    const [studentClass, setStudentClass] = useState("1");
    const [studentSex, setStudentSex] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentClassCN, setStudentClassCN] = useState("");
    const [top,settop]=useState('30px')


    /* Classes */
    const { classes } = useSelector((state) => state.cla);
    const classOptions = classes.map((c) => c.clname);


    //选项values
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
    const handleScroll = (event) => {
        const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        const offsetTop = document.getElementsByClassName('content')
        console.log(scrollTop);
        console.log(offsetTop);
        settop(scrollTop+30)
        
      };
    window.addEventListener('scroll', handleScroll);
    
    useEffect(() => {
        if (created) {
            window.location.href = "/students";
        }
    }, [created]);
    const onChange = (e) => {
       
        setStudentClassCN(e.target.value);
        setStudentClass(e.target.value)
        
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let courseStudents = [];
        const tags = document.querySelectorAll(".tagify__tag");
        for (var i = 0; i <= tags.length; i++) {
            if (tags[i]) {
                courseStudents.push(tags[i].getAttribute("value"));
            }
        }
        dispatch(createStudents
            ({
                sno: studentNo,
                sname: studentName,
                sage: studentAge,
                sclno: studentClass,
                scno: courseStudents,
                ssex: studentSex
            })
        );
    };

    return (
        <div className="mscontainer">

            <div className=' ms_left'>
                <div className='content' style={{top:top}} >
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


            <div className="submitwrapper cssubmitwrapper">
                <div className="cscon animated headShake ">
                    <div className='title animated fadeInLeft'>创建学生</div>
                    <form {...{ onSubmit }} method="post">
                        <div className="form-group">
                            <div className='form-group-up'>
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

                                </div>
                                <div className='up-right'>
                                    <div className='subcourse'>
                                        <label htmlFor="name">为学生添加课程</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            id="assigncourses"
                                            placeholder="添加课程"
                                            className="mb-3"

                                        />
                                    </div>

                                    <div className='nocoursetip'>
                                                <div className='tiptext'>没有你想要的课程？</div>
                                                <div className='tiptext'><Link to='/create-course'>点击创建课程</Link></div>

                                    </div>
                                </div>
                            </div>
                            <div className='form-group-down'>
                                {sucID === "STUDENT_SUCCESS" ? (
                                    <div style={{ marginTop: "10px" }}
                                        className="suc-msgs"

                                    >
                                        {sucMsg}
                                    </div>
                                ) : null}

                                {errID == "STUDENT_ERROR" ? (
                                    <div
                                        className="err-msgs"
                                        style={{ marginTop: "10px" }}
                                    >
                                        {errMsg}
                                    </div>
                                ) : null}
                                <button color="dark" style={{ marginTop: "1rem" }} block>
                                    创建学生
                                </button>
                            </div>





                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default UpdateStudent;
