import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { createClass } from '../../store/actions/classActions'
import { clearErros } from "../../store/actions/errorActions";
import Avatar, { genConfig } from 'react-nice-avatar'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import XLSX from 'xlsx';

const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

const ManageClass = () => {
    const dispatch = useDispatch();

    window.addEventListener("popstate", function (e) {
        dispatch(clearErros());
    }, false);

    const [className, setClassName] = useState("");
    const { msg: errMsg, id: errID } = useSelector((state) => state.error)
    const { msg: sucMsg, id: sucID, created } = useSelector((state) => state.cla)

    useEffect(() => {
        if (created) {
            window.location.href = "/classes";
        }
    }, [created]);

    const onSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        dispatch(createClass({ clname: className }));
    }

    const importExcel = (e) => {
        var files = e.target.files;
        var name = files.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const rawdata = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            const data = rawdata.split('\n')
            for (var i = 1; i < data.length - 1; i++) {
                if (data[i].length != 0) {
                    console.log(data[i].split(','))
                    const className = data[i].split(',')[0]
                    // const courseCredit = parseFloat(data[i].split(',')[1])
                    console.log(className)
                    dispatch(createClass({ name: className }));
                }
            }
        };
        reader.readAsBinaryString(files[0]);
    }


    return (
        <div className='container classbgc'>
            <div className='cswrapper'>
                <div className='mccon'>
                    <div className='titlecon animated  '>
                        <div className='title'>创建班级</div>
                        <div className='nav'>
                            <div className='func'><Link to='/'>首页</Link></div>
                            <div className='func'><Link to='/create-student'>创建学生</Link></div>
                            <div className='func'><Link to='/students'>管理学生</Link></div>
                            <div className='func this'><Link to='/create-class'>创建班级</Link></div>
                            <div className='func'><Link to='/classes'>管理班级</Link></div>
                            <div className='func'><Link to='/create-course'>创建课程</Link></div>
                            <div className='func '><Link to='/courses'>管理课程</Link></div>
                            
                        </div>
                    </div>

                    <div className='submitwrapper'>
                        <div className='createcon'>
                            <form {...{ onSubmit }} method='POST'>
                                <div className="form-group">
                                    <div className='subname  animated  flipInX'>
                                        <label htmlFor="name" className='labelname'>班级名称</label>
                                        <input
                                            type="text"
                                            name="classname"
                                            id="classname"
                                            placeholder="班级名"
                                            className="mb-3"
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {sucID === "CLASS_SUCCESS" ? (
                                    <div className="suc-msgs">{sucMsg}</div>)
                                    : null}
                                {errID === "CLASS_ERROR" ? (
                                    <div className="err-msgs">{errMsg}</div>)
                                    : null}
                                <button color="dark" className='animated  flipInX' >创建班级</button>
                            </form>

                            <div className='batchupload animated  flipInX'>
                                <div className='tips'>批量导入</div>
                                <div className='uploadbtn' onChange={importExcel}>
                                    选择文件
                                    <input type="file" className="hide_file" />
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='buttomblock'>



                    </div>
                </div>
            </div>
        </div>
    )


}
export default ManageClass;