import {useState, useEffect} from 'react';

// 스타일
import "./Test.css";

function Test(){
    return(
        <div className='main-header'>
            <div className='main-icon'>
                <img id='hufs-icon-white'src={require('../media/main/외대마크(흰색).gif')}/>
                <span id='main-name'>너의 이중전공은?</span>
            </div>
            <div className='main-select-service-wrap'>
                <div className='main-select-service-tab'>
                    <span>이중전공추천</span>
                </div>
                <div className='main-select-service-tab'>
                    <span>예상경쟁률</span>
                </div>
                <div className='main-select-service-tab'>
                    <span>전공정보</span>
                </div>
                <div className='main-select-service-tab'>
                    <span>서비스 소개</span>
                </div>
            </div>
            <div className='login-wrap'>
                
            </div>
        </div>
    )
    
} export default Test;