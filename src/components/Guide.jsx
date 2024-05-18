import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import chief from "../assets/guide.json";
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
        }
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
            <div className="lottie-container slide-fade-in-animation">
                <Lottie
                    animationData={chief}
                    loop={false}
                    autoplay={true}
                    style={window.innerWidth <= 768 ? mobileStyle : style}
                />
            </div>
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
