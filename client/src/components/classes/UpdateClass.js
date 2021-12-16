import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateClass } from '../../store/actions/classActions'
import Tagify from "@yaireo/tagify";

import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
  'hairStyle': 'normal',
  'sex': 'man',
  'eyeStyle': 'oval'
})

const UpdateClass = () => {
    let { clno: cpara } = useParams(); 
    const dispatch = useDispatch();
    const { classes, updated } = useSelector((state) => state.cla)
    const { students } = useSelector((state) => state.stu);
    const classDetail = classes.filter(({ clno }) => clno == cpara)[0]; 
    console.log(classDetail)

    const { msg: errMsg, id: errID } = useSelector((state) => state.error);
    const [className, setClassName] = useState("");


    useEffect(() => {
      var input1 = document.querySelector("input[name=tags]");
      if (classDetail) {
        const studentList = students.map(({sclno, sname}) => {
          if (sclno.includes(classDetail.clno)) {
            return sname
          }
          return null;
        }).filter((s) => s != undefined);
        if (studentList.length > 0) {
          new Tagify(input1, {
            whitelist: [...studentList],
            dropdown: {
              classname: "color-blue",
              enabled: 0,
              maxItems: 5,
              position: "text",
              closeOnSelect: false,
              highlightFirst: true,
            },
          });
  
        }
      }
    }, [classDetail])

    useEffect(() => {
        if (updated) {
            window.location.href = "/classes";
        }    
    }, [updated]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
          updateClass({
            clno:classDetail.clno,
            newname: className,
          })
        );
    }    
    
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
                <div className='title animated fadeInLeft'>{classDetail.clname}</div>
                <div className='title animated fadeInLeft'>班级信息更改</div>
              </div>
  
              <div className='submitcon animated flipInX'>
                <form  method='POST'>
                  <div className="form-group">
                    <div className='subname'>
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
  
                  {errID === "UPDATE_CLASS_ERROR" ? (
                    <div className="err-msgs">{errMsg}</div>
                  ) : null}

                  <button color="dark"  >更新班级</button>
                </form>
              </div>
            </>) : <>
            <div className='nodate'>没有此班级信息或者数据库未连接</div>
            </>}
  
          </div>
        </div>
        </div>
    )

}
export default UpdateClass;
