import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import {createClass} from '../../store/actions/classActions'
import Avatar, { genConfig } from 'react-nice-avatar'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

const ManageClass = () => {
    const dispatch = useDispatch();
    const [className, setClassName] = useState("");
    const { msg: errMsg, id: errID } = useSelector((state) => state.error)
    console.log(errMsg)
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
            <div className='submitwrapper'>
                <div className='createcon animated  fadeInLeft'>
                    <div className='title animated '>创建班级</div>
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
                        {errID === "CLASS_ERROR" ? (
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