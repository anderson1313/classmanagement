import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'
import { clearErros } from "../../store/actions/errorActions";
import Avatar, { genConfig } from 'react-nice-avatar'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})



const Managecourse = () => {
    const dispatch = useDispatch();

    //返回就清楚错误
    window.addEventListener("popstate", function(e) { 
        dispatch(clearErros());//根据自己的需求实现自己的功能 
        }, false);
    
    
    
    const [courseName, setCourseName] = useState("");
    const [courseCredit, setcourseCredit] = useState("");
    const { msg: errMsg, id: errID } = useSelector((state) => state.error)
    const { msg: sucMsg, id: sucID, created } = useSelector((state) => state.cou)
    //跳转
    useEffect(() => {
        if (created) {
            window.location.href = "/courses";
        }
    }, [created]);

    //提交
    const onSubmit = (e) => {
        console.log(e)
        e.preventDefault();   
        dispatch(createCourse({ name: courseName, credit: courseCredit }));
    }

    return (

        <div className='container'>
            <div className='wrapper_left '>
                <div className='content'>
                    <div className='webname' ><Link to='/'>课程管理系统</Link></div>
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
            <div className='submitwrapper'>
                <div className='createcon animated  headShake'>
                    <div className='title'>创建课程</div>
                    <div className='blank'></div>
                    <form {...{ onSubmit }} method='POST'>
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
                        {sucID === "COURSE_SUCCESS" ? (
                            <div
                                className="suc-msgs"

                            >
                                {sucMsg}
                            </div>
                        ) : null}



                        {errID === "COURSE__ERROR" ? (
                            <div
                                className="err-msgs"

                            >
                                {errMsg}
                            </div>
                        ) : null}
                        <button color="dark"  >
                            创建课程
                        </button>
                    </form>

                </div>


            </div>

        </div>

    )

}
export default Managecourse;