import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateStudent } from "../../store/actions/studentActions";
import { clearErros } from "../../store/actions/errorActions";


import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})



const UpdateStudent = () => {
    const dispatch = useDispatch();
     //返回就清除错误
     window.addEventListener("popstate", function(e) { 
        dispatch(clearErros());//根据自己的需求实现自己的功能 
        }, false);
    const { courses } = useSelector((state) => state.cou);
    const { students, updated } = useSelector((state) => state.stu);
    const courseList = courses.map((c) => c.cname);
    let { sno: s_sno } = useParams(); //sno是url传来的参数
    const studentDetail = students.filter(({ sno }) => sno == s_sno)[0];
    const { msg: errMsg, id: errID } = useSelector((state) => state.error);
    const [studentName, setStudentName] = useState("");
    const [studentAge, setStudentAge] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [studentSex, setStudentSex] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentClassCN, setStudentClassCN] = useState("");


    /* Classes */
    const { classes } = useSelector((state) => state.cla);
    const classOptions = classes.map((c) => c.clname);


    //选项values
    const classListValues = classes.map((c) => c.clno)

    //  useEffect(()=>{

    //  },[classes,studentDetail])


    if (courseList.length != 0) {
        var input1 = document.querySelector("input[name=tags]");
        new Tagify(input1, {
            whitelist: [...courseList],
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
        }
    }, [studentDetail]);


    useEffect(() => {
        if (updated) {
            window.location.href = "/courses";
        }
    }, [updated]);


    console.log(studentClassCN)


    const onChange = (e) => {
        console.log('ori', studentClass)
        console.log(e.target.value)
        setStudentClassCN(e.target.value);
        setStudentClass(e.target.value)
        console.log('changed', studentClass)
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
        dispatch(
            updateStudent({
                sno: studentNo,
                newname: studentName,
                newage: studentAge,
                newclno: studentClass,
                newscourse: courseStudents,
                newsex: studentSex
            })
        );
    };

    return (
        <div className="container">

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


            <div className="studentinfowrapper">
                {studentDetail ? (
                    <>
                        <div className='up'>

                            <div className='title animated fadeInLeft'>学生信息更改</div>
                        </div>

                        <div className="submitcon animated flipInX">
                            <form {...{ onSubmit }} method="post">
                                <div className="form-group">

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

                                    <div className='subcourse'>
                                    <label htmlFor="name">为学生添加课程</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        id="assigncourses"
                                        placeholder="添加课程"
                                        className="mb-3"
                                        value={`${studentDetail.scourses}`}
                                    />
                                    </div>

                                    

                                    {errID == "UPDATE_ERROR" ? (
                                        <div
                                            className="err-msgs"
                                            style={{ color: "red", marginTop: "10px" }}
                                        >
                                            {errMsg}
                                        </div>
                                    ) : null}

                                    <button color="dark" style={{ marginTop: "1rem" }} block>
                                        Update Student Records
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default UpdateStudent;
