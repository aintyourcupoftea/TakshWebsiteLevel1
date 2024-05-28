import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { Button } from "react-bootstrap";
import chief from "../assets/guide.json";
import mysteryAnimation1 from "../assets/mysterybox_part1.json";
import mysteryAnimation2 from "../assets/mysterybox.json";
import mysteryBoxStatic from "../assets/mysteryboxstatic.json";
import TerminalTextBubble from "./TerminalTextBubble";
import Timer from './Timer';
import RandomProjects from '../components/AssignedProjects';
import '../styles/guide.css';
import Arrow from "../components/Arrow";
import '../styles/afterProjectsAssignned.css';
import '../styles/styles.css';
import projectsData from '../assets/projects.json';
import FeedbackForm from "./FeedbackForm";

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
    const [timerStarted, setTimerStarted] = useState(false);
    const [projectsAssigned, setProjectsAssigned] = useState(false);
    const animationRef = useRef(null);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        const assignedProjects = localStorage.getItem("assignedProjects");
        if (assignedProjects) {
            setProjectsAssigned(true);
            setTimerStarted(true);
        } else {
            const savedState = localStorage.getItem("guideState");
            if (savedState) {
                const {
                    savedStep,
                    savedInstructions,
                    savedBoxOpened,
                    savedShowMysteryBox,
                    savedTimerStarted
                } = JSON.parse(savedState);

                setCurrentStep(savedStep);
                setInstructions(savedInstructions);
                setBoxOpened(savedBoxOpened);
                setShowMysteryBox(savedShowMysteryBox);
                setTimerStarted(savedTimerStarted);

                if (savedBoxOpened) {
                    setCurrentAnimation(mysteryAnimation2);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (currentStep < steps.length - 1 && !boxOpened) {
            const timer = setTimeout(() => {
                handleNextClick();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [currentStep, boxOpened]);

    useEffect(() => {
        localStorage.setItem("guideState", JSON.stringify({
            savedStep: currentStep,
            savedInstructions: instructions,
            savedBoxOpened: boxOpened,
            savedShowMysteryBox: showMysteryBox,
            savedTimerStarted: timerStarted
        }));
    }, [currentStep, instructions, boxOpened, showMysteryBox, timerStarted]);

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
        if (!boxOpened) {
            setCurrentAnimation(mysteryAnimation2);
            setBoxOpened(true);
            setTimerStarted(true);
            const assignedProjects = getRandomProjects(projectsData);
            localStorage.setItem("assignedProjects", JSON.stringify(assignedProjects));
        }
    };

    const getRandomProjects = (projects) => {
        const keys = Object.keys(projects);
        const shuffled = keys.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10).map(key => ({ name: key, link: projects[key] }));
    };

    const handleTimerEnd = () => {
        setIsButtonActive(true);
    };

    const handleButtonClick = () => {
        if (isButtonActive) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
            {projectsAssigned ? (
                <div className="assigned-projects-view">
                    <div className="top-section">
                        <div className="mystery-box-container">
                            <Lottie
                                animationData={mysteryBoxStatic}
                                loop={true}
                                autoplay={true}
                                style={window.innerWidth <= 768 ? mobileStyle : style}
                            />
                        </div>
                        <div className="terminal-container">
                            <TerminalTextBubble
                                instructions={steps}
                                onNextClick={() => { }}
                                buttonText={"Projects Completed!"}
                            />
                        </div>
                    </div>
                    <div className="timer-section">
                        <p className="encouragement-message-2" style={{ fontWeight: 'bold' }}>Complete the projects before the timer runs out! ⏳</p>
                        <div className="projects-container"> {/* Projects above the timer */}
                            <RandomProjects />
                        </div>
                        <Timer startFrom={1 * 1 * 10} />
                        <Button
                            variant="primary"
                            onClick={handleButtonClick}
                            disabled={!isButtonActive}
                        >
                            Submit Feedback
                        </Button>

                        <FeedbackForm isOpen={isModalOpen} closeModal={handleCloseModal} />
                    </div>
                </div>
            ) : (
                <div className="content-container">
                    {showMysteryBox && (
                        <div className="encouragement-message">
                            {boxOpened ? (
                                <>
                                    <div className="timer-text">
                                        {timerStarted && <Timer startFrom={1 * 1 * 10} onTimerEnd={handleTimerEnd} />}
                                        <p>Complete the projects before timer runs out! ⏳</p>
                                    </div>
                                    <Arrow />
                                    <RandomProjects />
                                    <Button
                                        variant="primary"
                                        onClick={handleButtonClick}
                                        disabled={!isButtonActive}
                                        
                                    >
                                        Submit Feedback
                                    </Button>
                                    <FeedbackForm isOpen={isModalOpen} closeModal={handleCloseModal} />
                                </>
                            ) : (
                                <div className="encouragement-message-1">
                                    Curiosity is your superpower! <br />
                                    Tap the box and uncover the wonders within. 🎁
                                </div>
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
            )}

            {!projectsAssigned && instructions && (
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
