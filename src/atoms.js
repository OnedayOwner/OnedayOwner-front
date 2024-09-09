import { atom } from 'recoil'; // Recoil의 atom 모듈 임포트

// 팝업 상태를 관리하는 atom
export const popupState = atom({
  key: 'popupState', // atom의 고유 키
  default: null, // 기본값은 null (팝업이 열리지 않은 상태)
});

// 완료된 팝업 상태를 관리하는 atom
export const completedPopupsState = atom({
  key: 'completedPopupsState', // atom의 고유 키
  default: [], // 기본값은 빈 배열 (완료된 팝업 목록)
});
