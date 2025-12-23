import React from 'react';
import brandLogo from '@/assets/brand-logo.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 88,
    md: 132,
    lg: 176,
  };

  const logoSize = sizes[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src={brandLogo} 
        alt="瑶光阁 YAO GUANG GE" 
        width={logoSize}
        height={logoSize}
        className="object-contain"
      />
    </div>
  );
};
