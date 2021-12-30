import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from '../../store/actions/courseActions'
import { clearErros } from "../../store/actions/errorActions";

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

    const [pageList, setpageList] = useState([]);
    const [all_pageList, setall_pageList] = useState([]);
    const [page_index, setpage_index] = useState(0);
    window.addEventListener("popstate", function (e) {
        dispatch(clearErros());//根据自己的需求实现自己的功能 
    }, false);
    const forwardPage = () => {
        console.log(page_index)
        if (page_index == 0) {

            return
        }
        setpage_index(page_index - 1)

    }
    const backwardPage = () => {
        if (page_index + 1 >= pageList.length) {
            return
        }
        setpage_index(page_index + 1)
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

            <div className='courses_wrapper'>

                <div className='allcoursescon'>
                    <div className='titlecon animated  '>
                        <div className='title'>你的课程</div>
                        <div className='nav'>
                            <div className='func'><Link to='/'>首页</Link></div>
                            <div className='func'><Link to='/create-student'>创建学生</Link></div>
                            <div className='func'><Link to='/students'>管理学生</Link></div>
                            <div className='func'><Link to='/create-class'>创建班级</Link></div>
                            <div className='func'><Link to='/classes'>管理班级</Link></div>
                            <div className='func this'><Link to='/create-courses'>管理课程</Link></div>
                            <div className='func'><Link to='/create-course'>创建课程</Link></div>

                        </div>
                    </div>

                    {
                        courses.length > 0 ? ( 
                            <>
                        <div className='allcourses animated headShake'>
                            <div className='courseslist'>
                                
                                {courses.map((item, index) => {
                                    return (
                                        <>
                                            {index >= page_index * 6 && index < (6 * (page_index + 1)) == 1 ? (<div key={index} className='eachcourse animated' >
                                                <div className='mask'></div>
                                                <div className='coursename animated flipInX'><Link to={`/about-course/${item.cno}`}>{item.cname}</Link></div>
                                            </div>) : null}
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='pagebox'>
                            <div className='btn iconfont icon-iconfontzuo' onClick={forwardPage}></div>
                            <div className='animated flipInX'>第{pageList[page_index]}页</div>
                            <div className='btn iconfont icon-xiayiyehouyiye' onClick={backwardPage}></div>
                        </div>
                        </>) : (

                            <>
                                <div className='nocoursecon'>
                                    <div className='content'>
                                        <div className='tip animated bounce '>你还未建立任何课程</div>
                                        
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <div className='buttomblock'>

                    </div>
                </div>

            </div>


        </div>

    );
};

export default Courses;
