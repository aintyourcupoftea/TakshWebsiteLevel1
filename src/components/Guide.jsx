import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import chief from "../assets/guide.json";
import mysteryAnimation1 from "../assets/mysterybox_part1.json"; // First animation
import mysteryAnimation2 from "../assets/mysterybox.json"; // Second animation
import TerminalTextBubble from "./TerminalTextBubble";
import '../styles/guide.css';

const steps = [
    "Hey 👋",
    "Welcome to Taksh!",
    "You are about to embark on a journey of coding and fun.",
    "You'll be assigned 5 simple projects to complete.",
    "You have 48 hours to complete them.",
    "Once you're done, you'll get a special reward.",
    "Are you ready? Let's get started! 🚀",
];

const Guide = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [instructions, setInstructions] = useState([steps[0]]);
    const [showMysteryBox, setShowMysteryBox] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState(mysteryAnimation1);
    const [boxOpened, setBoxOpened] = useState(false);
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
            setShowMysteryBox(true); // Show the box only when the last step is reached
        }
    };

    const handleMysteryBoxClick = () => {
        setCurrentAnimation(mysteryAnimation2);
        setBoxOpened(true);
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
            <div className="content-container">
                {showMysteryBox && ( // Only display encouragement-message if showMysteryBox is true
                    <div className="encouragement-message">
                        {boxOpened ? (
                            "Complete the projects before timer runs out! ⏳"
                        ) : (
                            <>
                                Curiosity is your superpower! <br />
                                Tap the box and uncover the wonders within. 🎁
                            </>
                        )}
                    </div>
                )}

                {showMysteryBox ? (
                    <div className="lottie-container slide-fade-in-animation">
                        <Lottie
                            animationData={currentAnimation}
                            loop={currentAnimation === mysteryAnimation1}
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
            </div>
            {instructions && (
                <div className="another-component">
                    <TerminalTextBubble
                        instructions={instructions}
                        onNextClick={handleNextClick}
                        buttonText={currentStep === steps.length - 1 ? "I am Ready!" : "Next"}
                    />
                </div>
            )}
        </div>
    );
};

export default Guide;
