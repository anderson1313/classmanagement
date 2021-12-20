import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createClass} from '../../store/actions/classActions'
import { Link } from "react-router-dom";
import Avatar, { genConfig } from 'react-nice-avatar'


const config = genConfig({
    'hairStyle': 'normal',
    'sex': 'man',
    'eyeStyle': 'oval'
})

const Classes = () => {
    const dispatch=useDispatch()
    const { classes } = useSelector((state) => state.cla);
    console.log(classes)
    const [pageList, setpageList] = useState([]);
    const [all_pageList, setall_pageList] = useState([]);
    const [page_index, setpage_index] = useState(0);

    const forwardPage=()=>{
        console.log(page_index)
        if (page_index==0){
            
            return
        }
        setpage_index(page_index-1)
       
    }
    const backwardPage=()=>{
        if (page_index + 1 >= pageList.length){
            return
        }
        setpage_index(page_index+1)
    }


    useEffect(() => {
        if (classes) {
            var page = [];
            var j = 1;
            for (var i = 0; i < classes.length; i += 6) {
                page[j - 1] = j;
                j += 1
            }
            if ((j - 1) * 6 < classes.length) {
                console.log("多加一页")
                page[j - 1] = j
            }
            setpageList(page)
            setall_pageList(page)
        }
    }, [classes]);

    return (
        <div className="container">

            <div className='wrapper_left'>
                <div className='content'>
                <div className='webname' ><Link to='/'>课程管理系统</Link></div>
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
                {classes.length > 0 ? (
                   <div className='allcoursescon'>
                   <div className='title animated fadeInLeft '>你的班级</div>
                   <div className='allcourses animated headShake'>
                       <div className='seqlist'>
                           <div className='stitle'></div>
                           {classes.map((item, index) => {
                               return (
                                   <div>
                                   {index >= page_index * 6 && index < (6 * (page_index + 1)) == 1 ? ( <div className='seqnum'>{index + 1}</div>) : null}
                               </div>
                                  
                               )
                           })}

                       </div>
                       <div className='courseslist'>
                           <div className='ctitle'></div>
                           {classes.map((item, index) => {
                               return (
                                   <div>
                                       {index >= page_index * 6 && index < (6 * (page_index + 1)) == 1 ? (<div key={index} className='eachcourse animated' >
                                           <div className='coursename animated flipInX'><Link to={`/about-class/${item.clno}`}>{item.clname}</Link></div>
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
                            <div className='tip animated bounce '>你还未建立任何班级</div>
                            <Link to="/create-class">
                                <div className='tocreate animated pulse infinite'>建立班级</div>
                            </Link>
                        </div>
                     </div>
             

                    )}
            </div>

        </div>
    )
};

export default Classes;
