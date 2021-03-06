import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import {createClass} from '../../store/actions/classActions'
import {deleteClass} from '../../store/actions/classActions'
import Avatar, { genConfig } from 'react-nice-avatar'
import { Link, useParams } from "react-router-dom";
import { clearErros } from "../../store/actions/errorActions";
import { updateClass } from '../../store/actions/classActions'

const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

function ViewClass() {
    let {clno: cpara } = useParams();
    const {classes, deleted, updated} = useSelector((state) => state.cla);
    const classDetail = classes.filter(({ clno }) => clno == cpara)[0];
    const {students} = useSelector((state) => state.stu);
    const [classStudents, setClassStudents] = useState("");
    const dispatch=useDispatch()
    const onDelete = (id) => dispatch(deleteClass(id));
    const [showuppdate, setshowuppdate] = useState(false)
    const [showdelete, setshowdelete] = useState(false)

    const { msg: errMsg, id: errID } = useSelector((state) => state.error);
    const [className, setClassName] = useState("");
    const [classNo, setClassNo] = useState("");

    window.addEventListener("popstate", function (e) {
        dispatch(clearErros());
    }, false);

    useEffect(() => {
        if (classDetail) {
            setClassName(classDetail.clname);
            setClassNo(classDetail.clno)
        }
    }, [classDetail]);

    useEffect(() => {
        if (classDetail && students) {
            const studentList = students.map(({ sclno, sname }) => {
                if (sclno === (classDetail.clno)) {
                    return sname;
                }
            }).filter((student) => student != undefined)
            setClassStudents(studentList);
        }
    }, [classDetail]);

    const changeupdate = () => {
        setshowdelete(false)
        if (showuppdate == false) {
            setshowuppdate(true)
        }
        else {
            setshowuppdate(false)
        }
    }

    const changedelete = () => {
        setshowuppdate(false)
        if (showdelete == false) {
            setshowdelete(true)
        }
        else {
            setshowdelete(false)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateClass({
                clno: classDetail.clno,
                newname: className,
            })
        );

    }

    useEffect(() => {
        if (updated) {
            window.location.href = "/about-class/" + classNo;
        }
    }, [updated]);

    useEffect(() => {
        if (deleted) {
            window.location.href = "/classes";
        }
    }, [deleted]);
    
    return (
        <div className='container'>
            <div className='topnav animated animate__fadeInDown'>
                <div className='func topblock'></div>
                <div className='func'><Link to='/'>??????</Link></div>
                <div className='func'><Link to='/create-student'>????????????</Link></div>
                <div className='func'><Link to='/students'>????????????</Link></div>
                <div className='func'><Link to='/create-class'>????????????</Link></div>
                <div className='func this'><Link to='/classes'>????????????</Link></div>
                <div className='func'><Link to='/create-course'>????????????</Link></div>
                <div className='func'><Link to='/courses'>????????????</Link></div>
            </div>


            <div className='courseinfowrapper'>
                <div className='courseinfocon'>
                    {classDetail ? (<>
                        <div className='left'>

                            <div className={showdelete == true && showuppdate == false ? 'showdelete' : 'hide'}>
                                <div className='warning'>?????????????????????????????????</div>
                                <div className='options'>
                                    <button onClick={() => onDelete(classDetail.clno)} className='sure'>??????</button>
                                    <button onClick={() => changedelete()} className='cancel'>??????</button>
                                </div>
                            </div>

                            <div className={showuppdate == true && showdelete == false ? 'showupdate' : 'hide'}>
                                <div className='submitcon animated animate__headShake'>
                                    <form  {...{ onSubmit }}>
                                        <div className="form-group">
                                            <div className='subname'>
                                                <label htmlFor="name" className='labelname'>????????????</label>
                                                <input
                                                    type="text"
                                                    name="classname"
                                                    id="classname"
                                                    placeholder="?????????"
                                                    className="mb-3"
                                                    value={className}
                                                    onChange={(e) => setClassName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {errID === "UPDATE_CLASS_ERROR" ? (
                                            <div
                                                className="err-msgs"
                                            >
                                                {errMsg}
                                            </div>
                                        ) : null}
                                        <button color="dark"  >
                                            ????????????
                                        </button>
                                    </form>
                                </div>
                            </div>   

                            <div className={['ori animated  animate__zoomIn', showuppdate == false && showdelete == false ? '' : 'hide'].join(' ')}>
                                <div className='iconfont icon-kecheng-'></div>
                                <div className='title animated '>{classDetail.clname}</div>
                                <div className='divider animated '></div>
                                <div className='text animated '>????????????????????????????????????????????????</div>
                            </div>

                            <div className='functions animated '>
                                <button className='updatecourse' onClick={() => changeupdate()}>
                                    {showuppdate == false ? '????????????' : '??????'}
                                </button>
                                <button
                                    className="deletecourse"
                                    onClick={() => changedelete()}
                                >
                                    ????????????
                                </button>
                            </div>


                        </div>



                        <div className='basicinfo'>  
                            <div className='cscon'>
                                <div className='subtitle'>
                                    <div className='iconfont icon-xuesheng'></div>
                                    <div className='titletext'>????????????</div>
                                </div>
                                {classStudents.length > 0 ? (
                                    <div className='studentscon  '>
                                        {classStudents.map((c) => (
                                            <div className='eachs animated flipInX'>{c}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='errcon'>
                                        <div className='err'>???????????????????????????</div>
                                    </div>
                                )}

                            </div>

                        </div>

                    </>) : (<div className='infonotused'>?????????????????????</div>)}

                </div>
            </div>
        </div>


    );
}
export default ViewClass;