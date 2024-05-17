import React from "react";
import Lottie from "lottie-react";
import chief from "../assets/guide.json";

const Guide = () => {
    const style = {
        width: "35%",
        height: "35%",
        margin: "auto",
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Lottie animationData={chief} loop={true} autoplay={true} style={style} />
        </div>
    );
};

export default Guide;
