import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//부트스트랩
import {Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
//API
import RateService from '../../services/rate.service';
//그래프
import GPAChart from '../../page/rate/component/GPAChart';
import ApplyChart from "../../page/rate/component/ApplyChart";
//스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "./PRateStyle.css";

function PShowMyRateInfo() {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfoTab, setMajorInfoTab] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**지원한 전공 정보 관련 상태관리 */
    //변수 선언
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: ""}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");
    const [majorInfo, setMajorInfo] = useState("");

    //로그인 여부 확인(기본 값: 로그인 false)
    const [login, setLogin] = useState(false);
    const [thisUser, setThisUser] = useState('');

    //지원 여부 확인(기본 값: API통해서 받아오기)
    const [applyInfo, setApplyInfo] = useState(false); //stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
    const [thisApply, setThisApply] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [valid, setValid] = useState(true);

    //학점 정보 받아오기
    const [showModal, setShowModal] = useState(false);
    const [thisGpa, setThisGpa] = useState("");

    
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

    /**처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기 */
    useEffect(() => {

        // //테스트용
        // console.log("rendering")
        // let data = `
        //     [
        //         {
        //             "id": "1",
        //             "name": "GBT학부"
        //         },
        //         {
        //             "id": "2",
        //             "name": "컴퓨터공학부"
        //         },
        //         {
        //             "id": "3",
        //             "name": "세르비아크로아티아어과"
        //         },
        //         {
        //             "id": "4",
        //             "name": "브라질학과"
        //         }
        //     ]
        // `
        // setThisMajorList(Object.values(JSON.parse(data)));

        RateService.getMajorListSeoul().then(
            (response) => {
                let getData = response.data.majorListSeoul;
                setThisMajorList(getData);
                setSelectedMajorId(getData[0].name);
                // console.log(response.data.majorListSeoul);
            }
        )

        //로그인 되어있는 지 확인
        //로그인 되어 있는 경우
        if(sessionStorage.getItem("user")!==null && sessionStorage.getItem("user")!==undefined){
            let tmp = Object.values(JSON.parse(sessionStorage.getItem("user")));
            // console.log("sessionLog:", tmp);
            let userId = tmp[0];
            setThisUser(userId);
            setLogin(true); 

            // console.log("user id:", userId);

            //06.01 수정
            //사용자의 지원 여부 정보 받아오기
            RateService.getApplyInfo(userId).then(
                (response) =>{
                    //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
                    setApplyInfo(response.data);
                    setThisApply(response.data.apply);
                    setValid(response.data.change);
                    // console.log("applyInfo data:", response.data);

                    if(response.data.apply == true){
                        // 사용자의 지원 정보가 있는 경우
                        setSelectedMajorId(response.data.majorName);
                    }
                    
                }
            )
        }
        //로그인이 안된 경우
        else{
            setLogin(false);
        }

    },[])

    /**선택한 전공 정보 받아오기 */
    useEffect(() => {
        // //테스트
        // let majorData =`
        //     {
        //         "id" : "1",
        //         "name" : "GBT학부",
        //         "applyNum" : "25",
        //         "totalNum" : "100",
        //         "avgGpa" : "4.05"
        //     }
        // `
        // setMajorInfo(JSON.parse(majorData));

        if(selectedMajorId){
            RateService.getRateInfo(selectedMajorId).then(
                (response) => {
                    setMajorInfo(response.data);
    
                    // console.log("getRateInfo:", response.data);
                }
            )
        }

        //로그인 되어있는 지 확인
        //로그인 되어 있는 경우
        if(sessionStorage.getItem("user")!==null && sessionStorage.getItem("user")!==undefined){
            let tmp = Object.values(JSON.parse(sessionStorage.getItem("user")));
            //   console.log("sessionLog:", tmp);
              let userId = tmp[0];
            setThisUser(userId);
            setLogin(true); 

            // console.log("user id:", userId);
            //06.01 수정
            //사용자의 지원 여부 정보 받아오기
            RateService.getApplyInfo(userId).then(
                (response) =>{
                    //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
                    setApplyInfo(response.data);
                    setThisApply(response.data.apply);
                    setValid(response.data.change);
                    // console.log("applyInfo data:", response.data);

                    if(response.data.apply == true){
                        // 사용자의 지원 정보가 있는 경우
                        setSelectedMajorId(response.data.majorName);
                    }
                    
                }
            )
        }
        //로그인이 안된 경우
        else{
            setLogin(false);
        }

    },[selectedMajorId])

    /**지원/지원취소한 전공 정보 처리 */
    useEffect(() => {
        //로그인 & thisApply === true인 경우
        if(login && (thisApply == true) && (clicked === true)){
            RateService.postApply(thisUser, selectedMajorId, thisApply).then(
                (response) =>{
                    // console.log("post selectedMajorId:", selectedMajorId);
                    // console.log("user id:", thisUser);
                    // window.location.reload();
                    Swal.fire({
                        text: `${selectedMajorId}에 지원했어요😉`,
                        icon: undefined,
                        confirmButtonText: '확인',
                        confirmButtonColor: '#002F5A'
                      });
                }
            ).catch(
                (error)=>{
                    // console.log("postApply:",error);
                }
            )
        }

        if(login && (thisApply == false) && (clicked === false)){
            RateService.postApply(thisUser, selectedMajorId, thisApply).then(
                (response) =>{
                    // console.log("post selectedMajorId:", selectedMajorId);
                    // console.log("user id:", thisUser);
                    // window.location.reload();
                    Swal.fire({
                      text: `${selectedMajorId}에 지원취소했어요😀`,
                      icon: undefined,
                      confirmButtonText: '확인',
                      confirmButtonColor: '#002F5A'
                    });
                }
            ).catch(
                (error)=>{
                    // console.log("postApply:",error);
                }
            )
        }

        //지원하기 버튼 비활성화로 변경
        setClicked(false);

            //로그인 되어있는 지 확인
        //로그인 되어 있는 경우
        if(sessionStorage.getItem("user")!==null && sessionStorage.getItem("user")!==undefined){
            let tmp = Object.values(JSON.parse(sessionStorage.getItem("user")));
            // console.log("sessionLog:", tmp);
            let userId = tmp[0];
            setThisUser(userId);
            setLogin(true); 

            // console.log("user id:", userId);
            //06.01 수정
            //사용자의 지원 여부 정보 받아오기
            RateService.getApplyInfo(userId).then(
                (response) =>{
                    //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
                    setApplyInfo(response.data);
                    setThisApply(response.data.apply);
                    setValid(response.data.change);
                    // console.log("applyInfo data:", response.data);

                    if(response.data.apply == true){
                        // 사용자의 지원 정보가 있는 경우
                        setSelectedMajorId(response.data.majorName);
                    }
                    
                }
            )
        }
        //로그인이 안된 경우
        else{
            setLogin(false);
        }
    },[thisApply])

    /**서울, 글로벌 선택 */
    const selectCampus = (element) => {
        //글로벌 선택 시
        if(element.target.id === "global")
            navigate("/global");
    }

    /**선택한 전공으로 상태 변경 */
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
        // console.log("selectedMajorId:", e.target.value) ;
    }

    /**지원 버튼 선택 */
    const applyMajor = () => {
        //로그인 유무 확인
        if(!login){
            //Login()
            alert("로그인을 해주세요!");
            return;
        }

        setThisApply(true);
        setClicked(true);
        //모달창 열어서 GPA입력 받기
        // modalShow();
    }

    /**지원취소 버튼 선택 */
    const cancelApplyMajor = () =>{
        //지원정보 초기화(default => false)
        setThisApply(false);
        setClicked(false);

    }

    const postApplyInfo = () => {
        //지원하기 버튼을 누른 majorName을 thisApply에 업데이트
        setThisApply(true);
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
            <div className='common-rate-main-wrap'>
                <div className="common-select-campus-wrap">
                    <div className="common-select-flex-container">
                        <div className="seoul-select-seoul-campus">내가 모의지원한 학과</div>
                    </div>
                </div>
                <div className="common-major-selection-filter">
                {
                    !applyInfo?
                    <></>:
                    <Form.Select onChange={SelectMajorId}>
                        {
                            !applyInfo?  
                            <option value="0">지원학과 없음</option>:
                            <option key={applyInfo.majorName} value={applyInfo.majorName}>
                            {applyInfo.majorName}
                            </option>
                        }
                    </Form.Select>
                }
                </div>

                <div className="common-major-info-wrap">
                {
                    !thisApply?
                    <>
                    <span>지원한 학과가 없어요😭</span><br/>
                    <span>
                        예상 경쟁률 서비스에서 학과를 선택 후 지원해주세요😉
                    </span>
                    </>:
                    <>
                        {
                            !majorInfo?
                            <></>:
                            <>
                                <ApplyChart majorName={selectedMajorId} applyNum={majorInfo.applyNum} totalNum={majorInfo.totalNum} />
                                
                                {   
                                    //로그인 여부 & 지원여부 검증 
                                    login?
                                    <GPAChart majorName={selectedMajorId} averageGPA={majorInfo.avgGpa}/>:
                                    <>
                                        <GPAChart majorName={"false"} averageGPA={majorInfo.avgGpa}/>
                                        <div className="noticeAvgGpa" >평균학점은 지원 후 확인할 수 있습니다😊</div>
                                    </>
                                }
                            </>
                        }
                    </>
                }
                </div>
                <div className="common-apply-wrap">
                    <br/><br/>
                {
                    !thisApply?
                    <Button type="button" className="common-apply-button" onClick={()=>navigate("/recommend")}>경쟁률 서비스로 이동</Button>:
                    <>
                        {
                            login?
                            <>
                            {
                                thisApply == false && applyInfo.majorName != selectedMajorId?
                                <Button type="button" className="common-apply-button" onClick={applyMajor}>지원하기</Button>:
                                <>
                                {
                                            valid == false?
                                            <>
                                            <OverlayTrigger
                                                key='wait'
                                                placement='top'
                                                overlay={
                                                    <Tooltip id="wait">
                                                    <strong>지원 후 6시간 뒤에 취소가능해요.</strong><br/>
                                                    <span>조금만 더 기다려주세요😉</span>
                                                    </Tooltip>
                                                }
                                                >
                                                    <div>
                                                        <Button type="button"  className="common-apply-button" variant="secondary"  disabled>지원취소</Button>
                                                        <br/>
                                                        <small>{applyInfo.majorName}에 지원한 상태입니다.<br/>복수지원은 불가하니 양해부탁드려요😥</small>    
                                                    </div>
                                                </OverlayTrigger>
                                                
                                            </>:
                                            <>
                                                <Button type="button" className="common-apply-button" variant="secondary" onClick={cancelApplyMajor}>지원취소</Button>
                                                <br/>
                                                <small>{applyInfo.majorName}에 지원한 상태입니다.<br/>지원취소 후 변경 가능해요.</small><br/>
                                            </>
                                        }   
                                            
                                        </>
                                    }
                            </>:
                            <>
                            <span className="warning">지원하기 전, 로그인해주세요😊</span><br/>
                            <Button type="button" className="applyButton" onClick={()=>navigate("/login")}>Login</Button>
                            </>
                        }
                    </>
                }
                </div>
                <br/><br/>
            </div>
            {/* //Main */}
        </div>
    );
}

export default PShowMyRateInfo;