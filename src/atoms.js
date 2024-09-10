// src/atoms.js
import { atom } from 'recoil';

export const popupState = atom({
  key: 'popupState',
  default: null,
});

export const completedPopupsState = atom({
  key: 'completedPopupsState',
  default: [],
});
