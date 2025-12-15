import React, { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen gradient-bg">
      <div className={`mobile-container relative ${className}`}>
        {children}
      </div>
    </div>
  );
};
