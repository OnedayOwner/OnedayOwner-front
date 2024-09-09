const MyHeader = ({ headText, notice, Myinformation }) => {
    return( 
        <header> {/* 헤더 요소 시작 */}
            <div className="head_text"> {/* 헤더 텍스트를 표시하는 div */}
                {headText} {/* headText props를 출력 */}
            </div>
            <div className="header-icons"> {/* 아이콘을 포함하는 div */}
                <div className="notice"> {/* 알림 아이콘을 표시하는 div */}
                    {notice} {/* notice props를 출력 */}
                </div>
                <div className="Myinformation"> {/* 사용자 정보 아이콘을 표시하는 div */}
                    {Myinformation} {/* Myinformation props를 출력 */}
                </div>
            </div>
        </header>
    );
}

// MyHeader 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
export default MyHeader;
