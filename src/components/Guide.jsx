import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import chief from "../assets/guide.json";
import mysteryAnimation1 from "../assets/mysterybox_part1.json"; // First animation
import mysteryAnimation2 from "../assets/mysterybox.json"; // Second animation
import TerminalTextBubble from "./TerminalTextBubble";
import '../styles/guide.css';

const steps = [
    "Welcome to the technical guide!",
    "Step 1: Open your terminal.",
    "Step 2: Navigate to the project directory.",
    "Step 3: Run 'npm install' to install dependencies.",
    "Step 4: Run 'npm start' to start the development server.",
    "Enjoy coding!"
];

const Guide = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [instructions, setInstructions] = useState([steps[0]]);
    const [showMysteryBox, setShowMysteryBox] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState(mysteryAnimation1); // State to hold the current animation
    const animationRef = useRef(null);

    useEffect(() => {
        if (currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                handleNextClick();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    const handleNextClick = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setInstructions((prevInstructions) => [...prevInstructions, steps[nextStep]]);
        } else {
            setShowMysteryBox(true);
        }
    };

    const handleMysteryBoxClick = () => {
        setCurrentAnimation(mysteryAnimation2); // Switch to the second animation
    };

    const style = {
        width: "100%",
        height: "auto",
        maxWidth: "400px",
        margin: "auto",
    };

    const mobileStyle = {
        width: "100%",
        height: "auto",
        maxWidth: "100%",
    };

    return (
        <div className="guide-container">
            {showMysteryBox ? (
                <div className="lottie-container slide-fade-in-animation">
                    <Lottie
                        animationData={currentAnimation} // Use the current animation data
                        loop={currentAnimation === mysteryAnimation1} // Loop only for the first animation
                        autoplay={true}
                        style={window.innerWidth <= 768 ? mobileStyle : style}
                        ref={animationRef}
                        onClick={handleMysteryBoxClick}
                    />
                </div>
            ) : (
                <div className="lottie-container slide-fade-in-animation">
                    <Lottie
                        animationData={chief}
                        loop={false}
                        autoplay={true}
                        style={window.innerWidth <= 768 ? mobileStyle : style}
                    />
                </div>
            )}
            {instructions && (
                <div className="another-component">
                    <TerminalTextBubble
                        instructions={instructions}
                        onNextClick={handleNextClick}
                        buttonText={currentStep === steps.length - 1 ? "Done!" : "Next"}
                    />
                </div>
            )}
        </div>
    );
};

export default Guide;