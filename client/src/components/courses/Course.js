import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'

/*avatar */
import Avatar, { genConfig } from 'react-nice-avatar'



const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})


const Courses = () => {
    const dispatch = useDispatch()
    // dispatch(createCourse({ name: 'TEST2', credit: 3 }));
    const { courses } = useSelector((state) => state.cou);
    // var pageList=[]
    // var all_pageList=[]
    // var page_index=0
    const [pageList, setpageList] = useState([]);
    const [all_pageList, setall_pageList] = useState([]);
    const [page_index, setpage_index] = useState(0);

    const forwardPage=()=>{
        setpage_index(page_index-1)
       
    }
    const backwardPage=()=>{
        setpage_index(page_index+1)
    }


    useEffect(() => {
        if (courses) {
            var page = [];
            var j = 1;
            for (var i = 0; i < courses.length; i += 6) {
                page[j - 1] = j;
                j += 1
            }
            if ((j - 1) * 6 < courses.length) {
                console.log("多加一页")
                page[j - 1] = j
            }
            setpageList(page)
            setall_pageList(page)
        }
    }, [courses]);



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
                        <div className='title animated fadeInLeft '>你的课程</div>
                        <div className='allcourses animated headShake'>
                            <div className='seqlist'>
                                <div className='stitle'></div>
                                {courses.map((item, index) => {
                                    return (
                                        <div>
                                        {index >= page_index * 6 && index < (6 * (page_index + 1)) == 1 ? ( <div className='seqnum'>{index + 1}</div>) : null}
                                    </div>
                                       
                                    )
                                })}

                            </div>
                            <div className='courseslist'>
                                <div className='ctitle'></div>
                                {courses.map((item, index) => {
                                    return (
                                        <div>
                                            {index >= page_index * 6 && index < (6 * (page_index + 1)) == 1 ? (<div key={index} className='eachcourse animated' >
                                                <div className='coursename animated flipInX'><Link to={`/about-course/${item.cno}`}>{item.cname}</Link></div>
                                            </div>) : null}
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='pagebox'>
                            <div className='btn iconfont icon-iconfontzuo' onClick={forwardPage}></div>
                            <div className='animated flipInX'>第{pageList[page_index]}页</div>
                            <div className='btn iconfont icon-xiayiyehouyiye' onClick={backwardPage}></div>
                            

                        </div>
                    </div>
                ) :
                    (<div className='nocoursecon'>
                        <div className='content'>
                            <div className='tip animated bounce '>你还未建立任何课程</div>
                            <Link to="/create-course">
                                <div className='tocreate animated pulse infinite'>建立课程</div>
                            </Link>
                        </div>
                    </div>


                    )}
            </div>


        </div>

    );
};

export default Courses;
