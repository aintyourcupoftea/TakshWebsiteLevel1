import "../styles/NextButton.css";
import clickSound from "../assets/click.wav"; // Path to your sound file

function NextButton({ onClick, buttonText }) {
    const handleClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
        onClick();
    };

    return (
        <button className="next-button" onClick={handleClick}>
            {buttonText}
        </button>
    );
}

export default NextButton;
