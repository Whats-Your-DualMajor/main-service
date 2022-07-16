import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
// import $ from "jquery";

// 스타일
import "./MainHeader.css";
import "./MainFrame.css";

const DIVIDER_HEIGHT = 5;

function MainFrame(){
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    // 페이지 스크롤 이동 컨트롤
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1); // 1, 2, 3, 4, 5

    // 각 탭 별 페이지 스크롤 이동 컨트롤
    const [moveToScrollIndex, setMoveToScrollIndex] = useState(false); //'r','p','m','i'

    // 페이지 이동 컨트롤
    let navigate = useNavigate();

    //랜더링 옵션
    useEffect(() => {
        handleSrcollIndex();
    }, []);

    useEffect(() => {
        handleMoveToScrollIndex();
        console.log("moveToScrollIndex:",moveToScrollIndex)
        // $(document).ready( function(){
        //   $(".background-img .content-title .content-subtitle").fadeIn(2000);
        // })

        // handleSelectService();
    }, [moveToScrollIndex])

    //선택한 탭에 대한 동작 제어
    const handleSelectService = (type, state) => {
        let reverseState = null;

        //선택한 탭의 정보를 상태값으로 저장 -> 무한루프 방지를 위해, 기존의 스크롤인덱스 상태 값과 다를 때만 변경
        if(type !== moveToScrollIndex){
            setMoveToScrollIndex(type);
        }
        else{
            return;
        }
        
        //어떤 유형의 서비스를 선택했는 지 식별
        if(!type){
            resetSelectedTab();
        }
        else if(type === "r"){
            //현재 선택된 탭의 기존 상태 변경
            selectRecommandService(state);
        }
        else if(type === "p"){
            //현재 선택된 탭의 기존 상태 변경
            selectsetPredictedRate(state);
        }
        else if(type === "m"){
            //현재 선택된 탭의 기존 상태 변경
            selectMajorInfo(state);
        }
        else if(type === "i"){
            //현재 선택된 탭의 기존 상태 변경
            selectServiceIntro(state);
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
        let reverseState = null;
        if(!state){
            reverseState = true;
        }
        else{
            reverseState = false;
        }

        setRecommandService(state);
        setPredictedRate(reverseState);
        setMajorInfo(reverseState);
        setServiceIntro(reverseState);
    }

    const selectsetPredictedRate = (state) =>{
        let reverseState = null;
        if(!state){
            reverseState = true;
        }
        else{
            reverseState = false;
        }

        setRecommandService(reverseState);
        setPredictedRate(state);
        setMajorInfo(reverseState);
        setServiceIntro(reverseState);
    }

    const selectMajorInfo = (state) =>{
        let reverseState = null;
        if(!state){
            reverseState = true;
        }
        else{
            reverseState = false;
        }

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfo(state);
        setServiceIntro(reverseState);
    }

    const selectServiceIntro = (state) =>{
        let reverseState = null;
        if(!state){
            reverseState = true;
        }
        else{
            reverseState = false;
        }

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfo(reverseState);
        setServiceIntro(state);
    }

    // 각 탭 별 페이지 스크롤 이동 컨트롤
    const handleMoveToScrollIndex = () => {
        const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

        // 초기값인 경우 아무 동작x
        if(!moveToScrollIndex){
            return
        }
        
        /**어떤 탭이 눌렸는 지 식별 */
        //이중전공추천
        if(moveToScrollIndex === "r"){
            // 헤더의 해당 서비스 탭이 선택된 것으로 처리
            handleSelectService("r", true);

            outerDivRef.current.scrollTo({
                top: pageHeight + DIVIDER_HEIGHT,
                left: 0,
                behavior: "smooth",
              });
              setScrollIndex(2);
        }
        //예상경쟁률
        else if(moveToScrollIndex === "p"){
            // 헤더의 해당 서비스 탭이 선택된 것으로 처리
            handleSelectService("p", true);
            
            outerDivRef.current.scrollTo({
                top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                left: 0,
                behavior: "smooth",
              });
              setScrollIndex(3);
        }
        //전공정보
        else if(moveToScrollIndex === "m"){
            // 헤더의 해당 서비스 탭이 선택된 것으로 처리
            handleSelectService("m", true);
            
            outerDivRef.current.scrollTo({
                top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
                left: 0,
                behavior: "smooth",
              });
              setScrollIndex(4);
        }
        //서비스 소개
        else if(moveToScrollIndex === "i"){
            // 헤더의 해당 서비스 탭이 선택된 것으로 처리
            handleSelectService("i", true);
            
            outerDivRef.current.scrollTo({
                top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
                left: 0,
                behavior: "smooth",
              });
              setScrollIndex(5);
        }

        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
          outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
    }


    // 페이지 스크롤 이동 컨트롤
    const handleSrcollIndex = () => {
    
          const outerDivRefCurrent = outerDivRef.current;
          outerDivRefCurrent.addEventListener("wheel", wheelHandler);
          return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
          };
    }

    const wheelHandler = (e) => {
        e.preventDefault();
        const { deltaY } = e;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
  
        if (deltaY > 0) {
          // 스크롤 내릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            console.log("현재 1페이지, down");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("r", true);
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(2);
            console.log("현재 scrollTop",scrollTop);
          } 
        
          else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            console.log("현재 2페이지, down");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("p", true);
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(3);
            console.log("현재 scrollTop",scrollTop);
          } else if (scrollTop >= pageHeight && scrollTop >= (pageHeight * 2) && scrollTop < (pageHeight * 3)) {
            //현재 3페이지
            console.log("현재 3페이지, down");
            
            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("m", true);
            outerDivRef.current.scrollTo({
              top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(4);
            console.log("현재 scrollTop",scrollTop);
          } else if (scrollTop >= pageHeight && scrollTop >= (pageHeight * 3) && scrollTop < (pageHeight * 4)) {
            //현재 3페이지
            console.log("현재 3페이지, down");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("i", true);
            outerDivRef.current.scrollTo({
              top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(5);
            console.log("현재 scrollTop",scrollTop);
          } else {
            // 현재 5페이지
            console.log("현재 4페이지, down");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("i", true);
            outerDivRef.current.scrollTo({
              top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(5);
            console.log("현재 scrollTop",scrollTop);
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            console.log("현재 1페이지, up");

            handleSelectService(false, false);
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(1);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            console.log("현재 2페이지, up");

            handleSelectService(false, false);
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(1);
          } else if (scrollTop >= pageHeight && pageHeight * 2 < scrollTop && scrollTop < pageHeight * 3) {
            //현재 2페이지
            console.log("현재 3페이지, up");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("r", true);
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(2);
          } else if (scrollTop >= pageHeight && pageHeight * 3 < scrollTop && scrollTop < pageHeight * 4) {
            //현재 2페이지
            console.log("현재 3페이지, up");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("p", true);
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(3);
          } else {
            // 현재 3페이지
            console.log("현재 4페이지, up");

            //현재 선택된 탭의 기존 상태 변경
            handleSelectService("m", true);
            outerDivRef.current.scrollTo({
              top: pageHeight * 3 + DIVIDER_HEIGHT * 3,//pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(4);
          }
        }
      };
      
      // 글씨 fade-in
      const useFadeIn = (duration = 0, delay = 0) => {
        const element = useRef();

        console.log("useFadeIn 실행")

        useEffect(() => {
          if(element.current){
            const {current} = element;
            current.style.transition = `opacity ${duration}s ${delay}s`;
            current.style.opacity = 1;
          }
        }, [moveToScrollIndex]);
        return {ref: element, style : {opacity : 0}}
      }

      const fadeInEffect = useFadeIn(2,0.5);

    return (
        <div>
            <div className='main-header'>

                <div className='main-icon' onClick={()=>navigate('/')}>
                    <img id='hufs-icon-white'src={require('../media/main/외대마크(흰색).gif')} alt="외대 마크"/>
                    <span id='main-name'>너의 이중전공은?</span>
                </div>
                <div className='main-select-service-wrap'>
                    {
                        !recommandService?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('r', true)}>이중전공추천</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('r', false)}>이중전공추천</span>
                        </div>
                    }

                    {
                        !predictedRate?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('p', true)}>예상경쟁률</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('p', false)}>예상경쟁률</span>
                        </div>
                    }

                    {
                        !majorInfo?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('m', true)}>전공정보</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('m', false)}>전공정보</span>
                        </div>
                    }

                    {
                        !serviceIntro?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('i', true)}>서비스 소개</span>
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
            <div className='main-wrap'>
                <div ref={outerDivRef} className="outer">
                <div className="inner main-intro">
                  <img className='background-img' src={require("../media/main/설캠본관.jpg")} alt="메인 인트로" />
                  {
                    !moveToScrollIndex?
                    <div {...fadeInEffect}>
                      <span className='content-title'>너무 많은 전공,<br/>어떤 전공을 이중전공으로 할까<br/>언제까지 고민하실건가요?</span>
                      <span className='content-subtitle'>학생들에 의해, 학생에게 필요한 서비스를<br/>고민하고 개발했습니다.</span>
                    </div>:
                    <></>
                  }
                  
                </div>
                <div className="divider"></div>
                <div className="inner recommand-service">2</div>
                <div className="divider"></div>
                <div className="inner predicted-rate">3</div>
                <div className="divider"></div>
                <div className="inner major-info">4</div>
                <div className="divider"></div>
                <div className="inner service-intro">5</div>
            </div>
        </div>
      </div>
    );
};

export default MainFrame;