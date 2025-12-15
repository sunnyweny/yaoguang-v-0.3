import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Gift, Sparkles } from 'lucide-react';

const EntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { setHasBlessing, resetState, setPasswordEnabled } = useBlessing();

  const handleWithBlessing = () => {
    resetState();
    setHasBlessing(true);
    setPasswordEnabled(true); // Default to password enabled for demo
    navigate('/home');
  };

  const handleWithoutBlessing = () => {
    resetState();
    setHasBlessing(false);
    navigate('/home');
  };

  return (
    <MobileLayout className="flex flex-col items-center justify-center min-h-screen px-6" useSecondaryBg>
      <div className="relative z-10 w-full max-w-sm space-y-10">
        {/* Logo/Header */}
        <div className="animate-fade-in">
          <BrandLogo size="lg" />
        </div>

        {/* Subtitle */}
        <div className="text-center animate-fade-in stagger-1">
          <p className="text-foreground/70 text-lg">
            选择测试流程
          </p>
        </div>

        {/* Flow Selection Buttons */}
        <div className="space-y-4 animate-fade-in-up stagger-2">
          <Button
            variant="entry"
            size="xl"
            className="w-full h-auto py-5 flex-col gap-2 rounded-2xl"
            onClick={handleWithBlessing}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-brand-gold" />
              <span className="text-lg text-card-foreground">有祝福</span>
            </div>
            <span className="text-sm text-muted-foreground font-normal">
              模拟已创建祝福的状态
            </span>
          </Button>

          <Button
            variant="entry"
            size="xl"
            className="w-full h-auto py-5 flex-col gap-2 rounded-2xl"
            onClick={handleWithoutBlessing}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span className="text-lg text-card-foreground">无祝福</span>
            </div>
            <span className="text-sm text-muted-foreground font-normal">
              模拟未创建祝福的状态
            </span>
          </Button>
        </div>

        {/* Footer hint */}
        <p className="text-center text-sm text-muted-foreground animate-fade-in stagger-3">
          NFC H5 验证测试入口
        </p>
      </div>
    </MobileLayout>
  );
};

export default EntryPage;
