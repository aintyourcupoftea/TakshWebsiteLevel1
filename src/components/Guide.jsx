import React from "react";
import Lottie from "lottie-react";
import chief from "../assets/guide.json";
import '../styles/guide.css'; // Import the CSS file

const Guide = () => {
    const style = {
        width: "100%",
        height: "auto",
        maxWidth: "400px", // Adjust max-width as needed
        margin: "auto",
    };

    return (
        <div className="guide-container">
            <div className="lottie-container slide-fade-in-animation">
                <Lottie animationData={chief} loop={true} autoplay={true} style={style} />
            </div>
            <div className="another-component">
                {/* Placeholder for another React component */}
            </div>
        </div>
    );
};

export default Guide;
