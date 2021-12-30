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
    const { students } = useSelector((state) => state.stu);

    const [studentslist, setstudentlist] = useState([])

    const [pageList, setpageList] = useState([]);
    const [all_pageList, setall_pageList] = useState([]);
    const [page_index, setpage_index] = useState(0);

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
        if (students) {

            var page = [];
            var j = 1;
            for (var i = 0; i < students.length; i += 20) {
                page[j - 1] = j;
                j += 1
            }
            if ((j - 1) * 20 < students.length) {
                console.log("多加一页")
                page[j - 1] = j
            }
            setpageList(page)
            setall_pageList(page)
            setstudentlist(students)

        }
    }, [students]);

    console.log(studentslist)

    const serachstudent = (e) => {
        console.log(e.target.value)
        const searchname = e.target.value
        const res = students.filter(({ sname }) => sname.includes(searchname))
        setstudentlist(res)
        console.log(res)
        if (searchname == '') {
            setstudentlist(students)
        }
    }
    const serachblank = (e) => {
        const searchname = e.target.value
        if (searchname == '') {
            setstudentlist(students)
        }

    }



    return (
        <div className="container studentbgc">
            <div className='cswrapper'>
                <div className='mccon mscon'>
                    <div className='titlecon animated  '>
                        <div className='title'>你的学生</div>
                        <div className='nav'>
                            <div className='func'><Link to='/'>首页</Link></div>
                            <div className='func '><Link to='/create-student'>创建学生</Link></div>
                            <div className='func this'><Link to='/students'>管理学生</Link></div>
                            <div className='func'><Link to='/create-class'>创建班级</Link></div>
                            <div className='func'><Link to='/classes'>管理班级</Link></div>
                            <div className='func '><Link to='/create-course'>创建课程</Link></div>
                            <div className='func '><Link to='/courses'>管理课程</Link></div>
                        </div>
                    </div>

                    {
                        students.length > 0 ? (
                            <>
                                <div className='allcoursescon'>

                                    <input className='searchstudent' onKeyDown={serachstudent} onChange={serachblank} placeholder='请输入你要查找的学生'>
                                    </input>


                                    <div className='allcourses animated headShake'>
                                        <div className='courseslist'>


                                            {studentslist.length > 0 ? (<> {studentslist.map((item, index) => {
                                                return (
                                                    <>
                                                        {index >= page_index * 20 && index < (20 * (page_index + 1)) == 1 ? (<div key={index} className='eachcourse animated' >
                                                            <div className='mask'></div>
                                                            <div className='ssno animated flipInX'>{item.sno}</div>
                                                            <div className='coursename animated flipInX'><Link to={`/about-student/${item.sno}`}>{item.sname}</Link></div>
        
                                                            <div className='ssex animated flipInX'>{item.ssex}</div>
                                                        </div>) : null}
                                                    </>
                                                )
                                            })}</>):(<><div>没有该学生</div></>)}

                                        </div>

                                    </div>
                                    <div className='pagebox'>
                                        <div className='btn iconfont icon-iconfontzuo' onClick={forwardPage}></div>
                                        <div className='animated flipInX'>第{pageList[page_index]}页</div>
                                        <div className='btn iconfont icon-xiayiyehouyiye' onClick={backwardPage}></div>


                                    </div>
                                </div>
                            </>) : (

                            <>
                                <div className='nocoursecon'>
                                    <div className='content'>
                                        <div className='tip '>你还未建立任何学生</div>

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




