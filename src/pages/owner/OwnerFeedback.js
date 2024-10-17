import React, { useState } from 'react';
import '../../styles/owner/OwnerFeedback.css';

const OwnerFeedback = () => {
    // 더미 피드백 데이터
    const [feedbacks, setFeedbacks] = useState([
        { 
            id: 1, 
            rating: 4, 
            comment: '서비스가 훌륭했어요!', 
            menuFeedbacks: [
                { name: '김치찌개', feedback: '정말 맛있어요!' },
                { name: '비빔밥', feedback: '신선한 재료로 만들어졌어요.' }
            ],
            fullFeedback: '정말 맛있었고, 직원들도 친절했습니다. 다음에 또 방문할 예정입니다.'
        },
        { 
            id: 2, 
            rating: 5, 
            comment: '음식이 정말 맛있었습니다.', 
            menuFeedbacks: [
                { name: '불고기', feedback: '최고의 맛!' },
                { name: '비빔국수', feedback: '강력 추천합니다.' }
            ],
            fullFeedback: '음식이 정말 맛있고 신선했습니다. 꼭 다시 오고 싶어요.'
        },
        { 
            id: 3, 
            rating: 3, 
            comment: '가격이 비싸요.', 
            menuFeedbacks: [
                { name: '갈비', feedback: '양이 적어요.' },
            ],
            fullFeedback: '음식의 맛은 좋지만, 가격이 다소 비쌉니다.'
        },
        { 
            id: 4, 
            rating: 5, 
            comment: '아주 만족스러웠습니다.', 
            menuFeedbacks: [
                { name: '된장찌개', feedback: '정통의 맛!' },
            ],
            fullFeedback: '식사가 너무 맛있었고, 대기 시간도 짧았어요.'
        },
        { 
            id: 5, 
            rating: 4, 
            comment: '재방문 의사 100%', 
            menuFeedbacks: [
                { name: '잡채', feedback: '환상적입니다.' },
                { name: '갈비찜', feedback: '소스가 너무 맛있어요.' }
            ],
            fullFeedback: '식사 후 대기 시간이 없어서 좋았어요. 강력 추천합니다.'
        },
    ]);
    
    const [expandedFeedback, setExpandedFeedback] = useState(null); // 클릭한 후기를 저장
    const [menuFeedbackVisible, setMenuFeedbackVisible] = useState({}); // 각 후기에 대한 메뉴 피드백 상태
    const [menuDetailsVisible, setMenuDetailsVisible] = useState({}); // 메뉴 세부사항 상태
    const [showAllFeedbacks, setShowAllFeedbacks] = useState(false); // 더보기 상태

    const handleExpand = (id) => {
        setExpandedFeedback(expandedFeedback === id ? null : id); // 클릭한 후기에 따라 확장
    };

    const toggleMenuFeedback = (id) => {
        setMenuFeedbackVisible((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleMenuDetails = (menu) => {
        setMenuDetailsVisible((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const toggleShowAllFeedbacks = () => {
        setShowAllFeedbacks((prev) => !prev); // 더보기 버튼 클릭 시 상태 변경
    };

    return (
        <div className="feedback-container">
            <h1>피드백 페이지</h1>
            <div className="feedback-list">
                {feedbacks.slice(0, showAllFeedbacks ? feedbacks.length : 3).map((feedback) => (
                    <div key={feedback.id} className="feedback-item">
                        <div className="feedback-header" onClick={() => handleExpand(feedback.id)}>
                            <span className="feedback-rating">별점: {feedback.rating}</span>
                            <span className="feedback-comment">{feedback.comment}</span>
                        </div>
                        {expandedFeedback === feedback.id && (
                            <div className="feedback-details">
                                <button 
                                    className="menu-feedback-button" 
                                    onClick={() => toggleMenuFeedback(feedback.id)}
                                >
                                    {menuFeedbackVisible[feedback.id] ? '메뉴 피드백 숨기기' : '메뉴 피드백 보기'}
                                </button>
                                {menuFeedbackVisible[feedback.id] && feedback.menuFeedbacks.length > 0 && (
                                    <ul className="menu-feedback-list">
                                        {feedback.menuFeedbacks.map((menuFeedback, index) => (
                                            <li key={index}>
                                                <span 
                                                    className="menu-name" 
                                                    onClick={() => toggleMenuDetails(menuFeedback.name)}
                                                >
                                                    {menuFeedback.name}
                                                </span>
                                                {menuDetailsVisible[menuFeedback.name] && (
                                                    <p className="menu-feedback">{menuFeedback.feedback}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <p className="full-feedback">{feedback.fullFeedback}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="more-button" onClick={toggleShowAllFeedbacks}>
                {showAllFeedbacks ? '접기' : '더보기'}
            </button>
        </div>
    );
};

export default OwnerFeedback;
