import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../store/actions/classActions";
import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})
const ViewCourse = () => {
    const dispatch = useDispatch();
    let { cno: cno } = useParams();
    const { courses, deleted } = useSelector((state) => state.cou);
    const courseDetail = courses.filter(({ cno }) => cno == cno)[0];
    const { students } = useSelector((state) => state.stu);
    const [courseStudents, setCourseStudents] = useState("");
    const onDelete = (id) => dispatch(deleteCourse(id));
    useEffect(() => {
        if (courseDetail) {
            const studentList = students.map(({ scourses,sname }) => {
                if (scourses.includes(courseDetail.cno)) {
                    return sname;
                }
            }).filter((student) => student!=undefined)
            setCourseStudents(studentList);   
        }
       
    }, [courseDetail]);
    console.log(courseStudents)
    
    useEffect(() => {
        if (deleted) {
            window.location.href = "/courses";
        }
    }, [deleted]);

    //提交


    return (

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

            <div className='courseinfowrapper'>
                <div className='courseinfocon'>


                </div>



            </div>
        </div>

    )

}
export default ViewCourse;