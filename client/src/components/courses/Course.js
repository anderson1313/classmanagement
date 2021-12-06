import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/*avatar */
import Avatar, { genConfig } from 'react-nice-avatar'





const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})


const Courses = () => {
    const { courses } = useSelector((state) => state.cou);
    console.log(courses)

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
         

                {courses.length > 0 ? (
                    <div className='allcoursescon'>
                           <div className='coursestitle animated fadeInLeft '>你的课程</div>
                           <div className='allcourses'>              
                        {courses.map((item,index)=>{
                            return(
                                <Link to='`/about-course/${item.cno}`'>
                                     <div key={index} className='eachcourse animated  '>{item.cname}</div>
                                </Link>
                            )
                        })}
                    </div>
                    </div>
                    
                   
                ) :
                    (<div className='content'>
                        <div className='tip animated bounce '>你还未建立任何课程</div>
                        <Link to="/create-course">
                            <div className='tocreate animated pulse infinite'>建立课程</div>
                        </Link>
                    </div>

                    )}




            </div>


        </div>

    );
};

export default Courses;
