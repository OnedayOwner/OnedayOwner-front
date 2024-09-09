import { buildQueries } from "@testing-library/react"; // React Testing Library에서 buildQueries 임포트

const MyButton = ({ text, type, onClick }) => {
    return(
        <button 
            className={["MyButton", `MyButton_${type}`].join(" ")} // 버튼 클래스 이름 설정
            onClick={onClick} // 클릭 이벤트 핸들러 설정
        >
            {text} {/* 버튼에 표시될 텍스트 */}
        </button>
    );
};

// 기본 props 설정 (type이 지정되지 않았을 경우 'default'로 설정)
MyButton.defaultProps = {
    type: "default",
};

// MyButton 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
export default MyButton;
