import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import {createClass} from '../../store/actions/classActions'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Avatar, { genConfig } from 'react-nice-avatar'

const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

const Classes = () => {
    const dispatch=useDispatch()
    const { classes } = useSelector((state) => state.cla);
    console.log(classes)
    return (
        <div className="container">

            <div className='wrapper_left'>
                <div className='content'>
                    <div className='webname'>课程管理系统</div>
                    <div className='avatarbox animated flipInX '>
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

            <div className='calsses_wrapper'>
         
                {classes.length > 0 ? (
                    <div className='allclassesclon'>
                            <div className='classestitle animated fadeInLeft '>你的班级</div>
                            <div className='allclasses'>              
                                {classes.map((item,index)=>{
                                    return(
                                        <Link to={`/about-class/${item.clno}`}>
                                            <div key={index} className='eachclass animated'>{item.clname}</div>
                                        </Link>
                                    )
                                })}
                            </div>
                    </div>
                ) :
                    (<div className='noclassclon'>
                        <div className='content'>
                            <div className='tip animated bounce '>你还未建立任何班级</div>
                            <Link to="/create-class">
                                <div className='tocreate animated pulse infinite'>建立班级</div>
                            </Link>
                        </div>
                     </div>
             

                    )}
            </div>

        </div>
    )
};

export default Classes;
