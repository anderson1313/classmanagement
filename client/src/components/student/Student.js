import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


import {createStudents} from '../../store/actions/studentActions'

/*avatar */
import Avatar, { genConfig } from 'react-nice-avatar'


const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})


const Students = () => {
    const dispatch=useDispatch()
    
    //获取学生数据
    const { students } = useSelector((state) => state.stu);
    
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

            <div className='right'>

                

                {students.length==0 ? (<div>none</div>):(<div>

                    {students.map((item,index)=>{
                        return(
                            <div>{item.sname}</div>
                        )
                                      
                    })}





                </div>)}


                




                


            </div>

            

        </div>

    );
};

export default Students;