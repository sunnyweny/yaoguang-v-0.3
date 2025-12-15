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
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900">
      {/* Mobile phone frame */}
      <div className="relative w-full max-w-[375px] h-screen max-h-[812px] overflow-hidden rounded-none sm:rounded-[2.5rem] shadow-2xl">
        {/* Inner content with background */}
        <div className="w-full h-full bg-background bg-pattern relative overflow-y-auto">
          {/* Secondary background image overlay */}
          {useSecondaryBg && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
              style={{ backgroundImage: `url(${backgroundSecondary})` }}
            />
          )}
          <div className={`relative min-h-full ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
