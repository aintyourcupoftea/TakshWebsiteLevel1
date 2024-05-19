import Lottie from "lottie-react";
import arrowAnimation from "../assets/Arrow.json"; // First animation
import "../styles/Arrow.css";


function Arrow()    {
    return(
        <Lottie className="arrow-lottie" animationData={arrowAnimation} loop={false} style={{width: "200px", height: "200px"}}/>
    )
}
export default Arrow;