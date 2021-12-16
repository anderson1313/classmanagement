import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import {createClass} from '../../store/actions/classActions'
import {deleteClass} from '../../store/actions/classActions'
import Avatar, { genConfig } from 'react-nice-avatar'
import { Link, useParams } from "react-router-dom";

const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

function ViewClass() {
    let {clno: cpara } = useParams();
    const {classes, deleted} = useSelector((state) => state.cla);
    const classDetail = classes.filter(({ clno }) => clno == cpara)[0];
    const {students} = useSelector((state) => state.stu);
    const [classStudents, setClassStudents] = useState("");
    const dispatch=useDispatch()
    const onDelete = (id) => dispatch(deleteClass(id));

    useEffect(() => {
        if (classDetail) {
            const studentList = students.map(({ sclno, sname }) => {
                if (sclno.includes(classDetail.sname)) {
                    return sname;
                }
            }).filter((student) => student != undefined)
            setClassStudents(studentList);
        }
    }, [classDetail]);


    useEffect(() => {
        if (deleted) {
            window.location.href = "/classes";
        }
    }, [deleted]);
    
    return (
        <div className='container'>
            <div className='wrapper_left class_left'>
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

            <div className='classinfowrapper'>
                <div className='classinfocon'>
                    {classDetail ? (<>
                        <div className='up'>
                            <div className='title  animated fadeInLeft'>{classDetail.clname}</div>
                            <div className='functions animated fadeInLeft'>
                                <Link to={`/class/update/${classDetail.clno}`} className='updateclass'>
                                    更新班级
                                </Link>
                                <button className="deleteclass" onClick={() => onDelete(classDetail.clno)}>删除班级</button>
                            </div>
                        </div>
                        <div className='basicinfo'>
                            <div className='title'>
                                <div className='iconfont icon-xuexiao_xuesheng'></div>
                                <div>班级学生</div>

                            </div>
                            {classStudents.length > 0 ? (
                                <div className='studentscon  '>
                                    {classStudents.map((c) => (
                                        <div className='eachs animated flipInX'>{c}</div>
                                    ))}
                                </div>
                            ) : (
                                <div className='errcon'>
                                    <div className='err'>你还未添加任何学生</div>
                                </div>
                            )}
                        </div>
                        <div className='otherinfo'>

                        </div>
                    </>) : (<div className='infonotused'>班级信息不可用</div>)}

                </div>
            </div>
        </div>
    );
}
export default ViewClass;