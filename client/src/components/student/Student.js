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
    // dispatch(createCourse({ name: 'TEST2', credit: 3 }));
    const { students } = useSelector((state) => state.stu);
    console.log(students)
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

            <div className='courses_wrapper'>
         
                {students.length > 0 ? (
                    <div className='allcoursescon'>
                           <div className='coursestitle animated fadeInLeft '>全部学生</div>
                           <div className='allcourses'>              
                        {students.map((item,index)=>{
                            return(
                                <Link to={`/about-course/${item.sno}`}>
                                     <div key={index} className='eachcourse animated'>{item.sname}</div>
                                     <div key={index} className='eachcourse animated'>{item.ssex}</div>
                                     <div key={index} className='eachcourse animated'>{item.sage}</div>
                                     <div key={index} className='eachcourse animated'>{item.sname}</div>
                                </Link>
                            )
                        })}
                    </div>
                    </div>
                    
                   
                ) :
                    (<div className='nocoursecon'>
                        <div className='content'>
                        <div className='tip animated bounce '>还未添加学生</div>
                        <Link to="/create-course">
                            <div className='tocreate animated pulse infinite'>添加学生</div>
                        </Link>
                    </div>
                    </div>
                    

                    )}
            </div>


        </div>

    );
};

export default Students;