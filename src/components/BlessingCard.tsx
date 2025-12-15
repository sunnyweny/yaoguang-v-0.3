import React from 'react';
import { ChevronRight, Lock, Sparkles } from 'lucide-react';

interface BlessingCardProps {
  title: string;
  subtitle?: string;
  icon?: 'create' | 'view' | 'lucky';
  disabled?: boolean;
  onClick?: () => void;
}

export const BlessingCard: React.FC<BlessingCardProps> = ({
  title,
  subtitle,
  icon = 'create',
  disabled = false,
  onClick,
}) => {
  const IconComponent = () => {
    switch (icon) {
      case 'create':
        return (
          <div className="w-14 h-14 rounded-2xl gradient-blessing flex items-center justify-center shadow-button">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
        );
      case 'view':
        return (
          <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center shadow-soft">
            <Sparkles className="w-7 h-7 text-foreground" />
          </div>
        );
      case 'lucky':
        return (
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <Lock className="w-7 h-7 text-muted-foreground" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-5 rounded-3xl gradient-card shadow-card border border-border/50 
        flex items-center gap-4 text-left transition-all duration-200
        ${disabled 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]'
        }`}
    >
      <IconComponent />
      <div className="flex-1 min-w-0">
        <h3 className={`text-lg font-semibold ${disabled ? 'text-muted-foreground' : 'text-foreground'}`}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {!disabled && (
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      )}
    </button>
  );
};
