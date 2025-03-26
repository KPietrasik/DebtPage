import React from 'react';
import './loader.less';

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay" data-testid="loader-overlay">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
};

export default Loader;
