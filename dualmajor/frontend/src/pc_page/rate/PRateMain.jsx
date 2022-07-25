import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//부트스트랩
import {Button,Container,Row,Col} from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "./PRateStyle.css";

function PRateMain(){
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(true);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    // 페이지 이동 컨트롤
    let navigate = useNavigate();

    /**헤더 탭 제어 기능 */
    //선택한 탭에 대한 동작 제어
    const handleSelectService = (type, state) => {
        
        //어떤 유형의 서비스를 선택했는 지 식별
        if(!type){
            resetSelectedTab();
        }
        else if(type === "r"){
            //현재 선택된 탭의 기존 상태 변경
            selectRecommandService(state);
            showPageMovePopUp("이중전공 추천 서비스","/recommend");
        }
        else if(type === "p"){
            //현재 선택된 탭의 기존 상태 변경
            selectsetPredictedRate(state);
            // showPageMovePopUp("예상경쟁률 서비스");
        }
        else if(type === "m"){
            //현재 선택된 탭의 기존 상태 변경
            selectMajorInfo(state);
            showPageMovePopUp("학과정보 조회 서비스","/seoulMajorInfo");
        }
        else if(type === "i"){
            //현재 선택된 탭의 기존 상태 변경
            selectServiceIntro(state);
            showPageMovePopUp("서비스 소개");
        }
    }

    //각 탭별 바 표시 css변경을 위한 상태관리
    const resetSelectedTab = () =>{
        setRecommandService(false);
        setPredictedRate(false);
        setMajorInfo(false);
        setServiceIntro(false);        
    }

    const selectRecommandService = (state) =>{
        let reverseState = false;

        setRecommandService(state);
        setPredictedRate(reverseState);
        setMajorInfo(reverseState);
        setServiceIntro(reverseState);
    }

    const selectsetPredictedRate = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(state);
        setMajorInfo(reverseState);
        setServiceIntro(reverseState);
    }

    const selectMajorInfo = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfo(state);
        setServiceIntro(reverseState);
    }

    const selectServiceIntro = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfo(reverseState);
        setServiceIntro(state);
    }

    /**페이지 이동 경고 팝업 표시 */
    const showPageMovePopUp = (type, url="/") =>{
      Swal.fire({
        text: `"${type}"(으)로 이동하시겠습니까?`,
        icon: undefined,
        confirmButtonText: '확인',
        confirmButtonColor: '#145f7a',
        showCancelButton: true,
        cancelButtonText: '취소'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(url)
        } else if (result.isDenied) {
          return
        }
      });
    }

    /**각 캠퍼스 별 페이지로 이동 */
    const moveToSeoul = () => {
        //SeoulMain으로 이동
        navigate("/rate/seoul");
        window.location.reload();
    }
 
    const moveToGlobal = () => {
        //GlobalMain으로 이동
        navigate("/rate/global");
        window.location.reload();
    }

    return (
        <div>
            {/* Header */}
            <div className='main-header'>
                <div className='main-icon' onClick={()=>navigate('/')}>
                    <img id='hufs-icon-white'src={require('../../media/main/외대마크(흰색).gif')} alt="외대 마크"/>
                    <span id='main-name'>너의 이중전공은?</span>
                </div>
                <div className='main-select-service-wrap'>
                    {
                        !recommandService?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('r', false)}>이중전공추천</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('r', false)}>이중전공추천</span>
                        </div>
                    }

                    {
                        !predictedRate?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('p', false)}>예상경쟁률</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('p', false)}>예상경쟁률</span>
                        </div>
                    }

                    {
                        !majorInfo?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('m', false)}>전공정보</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('m', false)}>전공정보</span>
                        </div>
                    }

                    {
                        !serviceIntro?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('i', false)}>서비스 소개</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('i', false)}>서비스 소개</span>
                        </div>
                    }
                </div>
                <div className='login-wrap'>
                    {/* 로그인 관련 처리 로직 추가 */}
                </div>
            </div>
            {/* //Header */}

            {/* Main */}
            <div className='rate-main-wrap'>
                <div className="rate-choose-campus">
                    <div className='rate-choose-campus-btn' onClick={moveToSeoul}>
                        <img src={require('../../media/main/W설캠본관.jpg')} alt="추천"/>
                        <div className='campus-btn-tit'>서울캠퍼스</div>
                    </div>
                

                    <div className='rate-choose-campus-btn' onClick={moveToGlobal}>
                        <img src={require('../../media/main/W글캠백년관.jpg')} alt="추천"/>
                        <div className='campus-btn-tit'>글로벌캠퍼스</div>
                    </div>
                </div>
                <div className="sub-tit">
                    여러분의 꿈을 응원합니다.
                </div>
                <div className="notice">
                    학과별 예상 경쟁률은 "지원하기"를<br/> 선택한 이용자의 통계입니다.<br/>
                    한번 지원하면 <b>6시간</b> 후에 수정이<br/> 가능하니 참고부탁드립니다.
                </div>
            </div>
            {/* //Main */}
        </div>
    );
};

export default PRateMain;