import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCourse } from '../../store/actions/courseActions'
import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

const UpdateCourse =()=>{
   let { cno: cpara } = useParams(); //第一个参数是url参数
   const dispatch = useDispatch();
   const {courses,updated}=useSelector((state)=>state.cou)
   const courseDetail = courses.filter(({ cno }) => cno == cpara)[0]; //cno是state里面的属性
   const { msg: errMsg, id: errID } = useSelector((state) => state.error); //errMsg=state.error.msg








}


export default UpdateCourse;
 