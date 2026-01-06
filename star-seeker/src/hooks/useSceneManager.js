import { useState, useCallback } from 'react';

// 화면 전환 및 토스트 메시지를 관리하는 훅
export const useSceneManager = () => {
  const [screen, setScreen] = useState('HOME');
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return {
    screen,
    setScreen,
    toast,
    showToast,
  };
};
