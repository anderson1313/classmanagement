import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import {createClass} from '../../store/actions/classActions'
import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

const ManageClass = () => {
    const dispatch = useDispatch();
    const [className, setClassName] = useState("");
    const { msg: errMsg, id: errID } = useSelector((state) => state.error)
    const { msg: sucMsg, id: sucID, created } = useSelector((state) => state.cla)

    useEffect(() => {
        if (created) {
            window.location.href = "/classes";
        }
    }, [created]);

    const onSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        dispatch(createClass({clname: className}));
    }

    return(
        <div className='container'>

            <div className='wrapper_left '>
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

            <div className='submitwrapper'>
                <div className='createcon animated  headShake'>
                    <div className='title animated fadeInLeft'>创建班级</div>
                    <div className='blank'></div>
                    <form {...{ onSubmit }} method='POST'>
                        <div className="form-group">
                            <div className='subname'>
                                <label htmlFor="name" className='labelname'>班级名称</label>
                                <input
                                    type="text"
                                    name="classname"
                                    id="classname"
                                    placeholder="班级名"
                                    className="mb-3"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                />
                            </div>
                        </div>

                        {sucID === "CLASS_SUCCESS" ? (
                            <div className="suc-msgs">{sucMsg}</div>) 
                            : null}
                        {errID === "CLASS__ERROR" ? (
                            <div className="err-msgs">{errMsg}</div>) 
                            : null}
                        <button color="dark" >创建班级</button>
                    </form>
                </div>
            </div>
        </div>
    )


}
export default ManageClass;