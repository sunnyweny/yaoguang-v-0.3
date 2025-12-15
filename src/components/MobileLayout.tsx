import React, { ReactNode } from 'react';
import backgroundSecondary from '@/assets/background-secondary.png';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showTopClouds?: boolean;
  showBottomClouds?: boolean;
  useSecondaryBg?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  className = '',
  showTopClouds = false,
  showBottomClouds = false,
  useSecondaryBg = false,
}) => {
  return (
    <div className="min-h-screen bg-background bg-pattern relative">
      {/* Secondary background image overlay */}
      {useSecondaryBg && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${backgroundSecondary})` }}
        />
      )}
      <div className={`mobile-container relative overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
};
