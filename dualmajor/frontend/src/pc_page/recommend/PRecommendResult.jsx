import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//부트스트랩
import {Button,Accordion, ListGroup} from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
//API
import RecommendService from '../../services/recommend.service';
//스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "../login/Plogin.css";

function PRecommendResult(props) {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfoTab, setMajorInfoTab] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**이중전공 추천 결과 관련 상태관리 */
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장
    const [answer, setAnswer] = useState(false); //사용자가 선택한 학문 설정
    const [testKey, setTestKey] = useState(false);

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
            showPageMovePopUp("예상경쟁률 서비스","/rate");
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
        setMajorInfoTab(false);
        setServiceIntro(false);        
    }

    const selectRecommandService = (state) =>{
        let reverseState = false;

        setRecommandService(state);
        setPredictedRate(reverseState);
        setMajorInfoTab(reverseState);
        setServiceIntro(reverseState);
    }

    const selectsetPredictedRate = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(state);
        setMajorInfoTab(reverseState);
        setServiceIntro(reverseState);
    }

    const selectMajorInfo = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfoTab(state);
        setServiceIntro(reverseState);
    }

    const selectServiceIntro = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfoTab(reverseState);
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

    /**결과를 받아오기 위한 임시키 발급요청 */
    useEffect(() => {
        //테스트 키(식별자) 받기
        RecommendService.getTestKey().then(
            (response) => {
                setTestKey(response.data);
            }
        )
    },[])

    /**이중전공 추천 결과 받아오기 */
    useEffect(() => {

        //임시 아이디 설정
        let departmentName = localStorage.getItem('recommendResult');

        //세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getDepartmentInfo(departmentName).then(
            (response) => {

                // console.log("getData:", response.data)

                //전달받은 값을 데이터로 저장
                setThisResult(response.data);
                //실행
                // ShowResult();
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                // setIsError(true);
            }
        )
        //테스트용
        //setThisResult(testData.info);
        //thisResult는 테스트 종료되면 삭제 처리

        ShowResult();
    },[testKey])

    useEffect(() => {
        ShowResult();
    },[thisResult])

    /**결과 창 화면에 출력 */
    const ShowResult = () => {
        // console.log('thisResult:',thisResult);
        // console.log('testData.list.academicName:',thisResult[0]);

        if(!thisResult){
            return(
                <></>
            );
        }
        return(
            <>
                <Accordion defaultActiveKey="0" flush style={{width:"100%"}}>
                    {
                        //testData.info.map(thisData => (
                            <>
                                <Accordion.Item eventKey={thisResult.departmentName}>
                                    <Accordion.Header>{thisResult.departmentName}</Accordion.Header>
                                    <Accordion.Body>
                                    <ListGroup>
                                        {
                                            (thisResult.campus !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">캠퍼스</div><br/>
                                                {thisResult.campus}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.intro !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">학과소개</div><br/>
                                                {thisResult.intro}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.degree !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">졸업학위</div><br/>
                                                {thisResult.degree}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.career !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">진로</div><br/>
                                                {thisResult.career}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.curriculum !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">학과 커리큘럼</div><br/>
                                                {thisResult.curriculum}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.certification!== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">관련 자격증</div><br/>
                                                {thisResult.certification}</ListGroup.Item>:
                                            <></>                                                   
                                        }
                                        {
                                            (thisResult.webPage !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">홈페이지</div><br/>
                                                <a href={`${thisResult.webPage}`} target="_blank" rel="noreferrer">
                                                {thisResult.webPage}</a></ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.phoneNum !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">학과 사무실</div><br/>
                                                <a href={`tel:${thisResult.phoneNum}`}>
                                                    {thisResult.phoneNum}</a></ListGroup.Item>:
                                            <></>
                                        }
                                    </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </>
                
                    }
                </Accordion>
            </>
        )
    }

    /**다시 테스트 하기 */
    const testAgain = () => {
        navigate("/recommend");
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
                        !majorInfoTab?
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
            {/* //Header */}

            {/* Main */}
            <div className="start-question-layer"/><br/>
            <div className="question-wrap">
                <span className='notice'><b>!!이중전공 추천 서비스 결과!!</b></span><br/>
                <div className='result-wrap'>
                    {
                        !thisResult?
                        <></>:
                        <ShowResult/>  
                    }
                </div>
                <div className='next-btn-wrap'>
                <Button className='recommend' onClick={testAgain}>다시 테스트하기</Button>
                </div>
            </div>
            {/* //Main */}
        </div>
    );
}

export default PRecommendResult;