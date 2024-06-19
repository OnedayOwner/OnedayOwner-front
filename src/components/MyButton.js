import { buildQueries } from "@testing-library/react"

const MyButton = ({text,type,onClick}) => {
    return(
        <button 
        className={["MyButton", `MyButton_${type}`].join(" ")} 
        onClick={onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: "default",
};

export default MyButton;