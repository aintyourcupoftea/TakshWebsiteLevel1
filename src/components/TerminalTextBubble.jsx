import '../styles/TerminalTextBubble.css'; // Import CSS for styling

const TerminalTextBubble = ({ text }) => {
    return (
        <div className="terminal-text-bubble">
            <p>{text}</p>
        </div>
    );
};

export default TerminalTextBubble;
