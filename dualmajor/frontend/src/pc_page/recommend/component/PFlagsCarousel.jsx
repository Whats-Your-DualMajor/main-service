import React from 'react';
import {Carousel} from 'react-bootstrap';

//스타일
import "../PRecommend.css";

function PFlagsCarousel() {
    return (
        <Carousel slide={false} controls={false}>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/south-korea.png")}
                alt="south-korea"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/united-kingdom.png")}
                alt="united-kingdom"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/germany.png")}
                alt="germany"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/china.png")}
                alt="china"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/france.png")}
                alt="france"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/japan.png")}
                alt="japan"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/spain.png")}
                alt="spain"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/india.png")}
                alt="india"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/portugal.png")}
                alt="portugal"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/turkey.png")}
                alt="turkey"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/ukraine.png")}
                alt="ukraine"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/netherlands.png")}
                alt="netherlands"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/brazil.png")}
                alt="brazil"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/poland.png")}
                alt="poland"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/russia.png")}
                alt="russia"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/sweden.png")}
                alt="sweden"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/russia.png")}
                alt="russia"
            />
            </Carousel.Item>
            <Carousel.Item interval={800}>
            <img
                className="d-block w-70 show-flags-gif"
                src={require("../../../media/flags/vietnam.png")}
                alt="vietnam"
            />
            </Carousel.Item>
        </Carousel>
    );
}

export default PFlagsCarousel;