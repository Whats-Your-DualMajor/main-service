import React from 'react';
import { useState, useEffect, useRef } from "react";
import "./MainFrame.css";

const DIVIDER_HEIGHT = 5;

function MainFrame(){
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);
    useEffect(() => {
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
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(2);
            console.log("현재 scrollTop",scrollTop);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            console.log("현재 2페이지, down");
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
            outerDivRef.current.scrollTo({
              top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(4);
            console.log("현재 scrollTop",scrollTop);
          } else {
            // 현재 5페이지
            console.log("현재 4페이지, down");
            outerDivRef.current.scrollTo({
              top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(4);
            console.log("현재 scrollTop",scrollTop);
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            console.log("현재 1페이지, up");
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(1);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            console.log("현재 2페이지, up");
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(1);
          } else if (scrollTop >= pageHeight && pageHeight * 2 < scrollTop && scrollTop < pageHeight * 3) {
            //현재 2페이지
            console.log("현재 3페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(2);
          } else if (scrollTop >= pageHeight && pageHeight * 3 < scrollTop && scrollTop < pageHeight * 4) {
            //현재 2페이지
            console.log("현재 3페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(3);
          } else {
            // 현재 3페이지
            console.log("현재 4페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight * 3 + DIVIDER_HEIGHT * 3,//pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setScrollIndex(4);
          }
        }
      };


      const outerDivRefCurrent = outerDivRef.current;
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
      return () => {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      };

    }, []);
    return (
      <div ref={outerDivRef} className="outer">
        <div className="inner bg-yellow">1</div>
        <div className="divider"></div>
        <div className="inner bg-blue">2</div>
        <div className="divider"></div>
        <div className="inner bg-pink">3</div>
        <div className="divider"></div>
        <div className="inner bg-green">4</div>
        <div className="divider"></div>
        <div className="inner bg-white">5</div>
      </div>
    );
};

export default MainFrame;