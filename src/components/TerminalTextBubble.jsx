import React from 'react';
import '../styles/TerminalTextBubble.css';
import NextButton from './NextButton';

const TerminalTextBubble = ({ instructions, onNextClick, buttonText }) => {
    return (
        <div className="terminal-text-bubble">
            {instructions.map((instruction, index) => (
                <p key={index}>{instruction}</p>
            ))}
            <div className="button-container">
                <NextButton onClick={onNextClick} buttonText={buttonText} />
            </div>
        </div>
    );
};

export default TerminalTextBubble;
