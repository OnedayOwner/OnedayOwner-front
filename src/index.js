import React from 'react'; // React 라이브러리 임포트
import ReactDOM from 'react-dom/client'; // ReactDOM에서 클라이언트 렌더링 관련 모듈 임포트
import './index.css'; // 전역 스타일 시트 임포트
import { RecoilRoot } from 'recoil'; // Recoil 상태 관리 라이브러리의 루트 컴포넌트 임포트
import App from './App'; // 메인 App 컴포넌트 임포트

// 'root'라는 ID를 가진 DOM 엘리먼트를 가져와서 root 변수에 저장
const root = ReactDOM.createRoot(document.getElementById('root'));

// React 애플리케이션을 렌더링
root.render(
  <React.StrictMode> {/* React의 엄격 모드 활성화 (개발 모드에서 경고를 표시) */}
    <RecoilRoot> {/* Recoil 상태 관리의 루트 설정 */}
      <App /> {/* 메인 App 컴포넌트 렌더링 */}
    </RecoilRoot>
  </React.StrictMode>
);
