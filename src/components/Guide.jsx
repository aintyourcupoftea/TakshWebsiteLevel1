import React, { useState } from "react";
import Lottie from "lottie-react";
import chief from "../assets/guide.json";
import TerminalTextBubble from "./TerminalTextBubble"; // Import TerminalTextBubble
import '../styles/guide.css'; // Import CSS for styling
import ChatBubble from "../components/ChatBubble"

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
    const [showTerminal, setShowTerminal] = useState(true); // Set showTerminal to true by default

    const handleClick = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const style = {
        width: "100%",
        height: "auto",
        maxWidth: "400px", // Adjust max-width as needed
        margin: "auto",
    };

    return (
        <div className="guide-container" onClick={handleClick}>
            <div className="lottie-container slide-fade-in-animation">
                <Lottie
                    animationData={chief}
                    loop={false}
                    autoplay={true}
                    style={style}
                />
                {/* <ChatBubble /> */}

            </div>
            {showTerminal && (
                <div className="another-component">
                    <TerminalTextBubble text={steps[currentStep]} />
                </div>
            )}


        </div>
    );
};

export default Guide;
