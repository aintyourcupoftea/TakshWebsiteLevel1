import '../styles/TerminalTextBubble.css';
import NextButton from './NextButton';

const TerminalTextBubble = ({ text, onNextClick, buttonText }) => {
    return (
        <div className="terminal-text-bubble">
            <p>{text}</p>
            <div className="button-container">
                <NextButton onClick={onNextClick} buttonText={buttonText} />
            </div>
        </div>
    );
};

export default TerminalTextBubble;
