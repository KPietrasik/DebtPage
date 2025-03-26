import React, { useEffect, useState } from 'react';
import './toast.less';

interface ToastProps {
  message: string;
  type: 'error'|'warning';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
