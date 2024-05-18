import Lottie from "lottie-react";
import chatBubble from "../assets/chat-bubble.json";

const Cloud = () => {
    const style = {
        width: "200px", // Adjust width as needed
        height: "200px", // Adjust height as needed
    };

    return (
        <div>
            <Lottie
                animationData={chatBubble}
                loop={true}
                autoplay={true}
                style={style}
            />
        </div>
    );
};

export default Cloud;
