import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Sparkles, Gift } from 'lucide-react';

const EntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { setHasBlessing, resetState } = useBlessing();

  const handleWithBlessing = () => {
    resetState();
    setHasBlessing(true);
    navigate('/home');
  };

  const handleWithoutBlessing = () => {
    resetState();
    setHasBlessing(false);
    navigate('/home');
  };

  return (
    <MobileLayout className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute top-40 right-8 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-secondary/10 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Logo/Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl gradient-blessing flex items-center justify-center shadow-button animate-float">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            祝福卡片
          </h1>
          <p className="text-muted-foreground text-lg">
            选择测试流程
          </p>
        </div>

        {/* Flow Selection Buttons */}
        <div className="space-y-4 animate-fade-in-up stagger-2">
          <Button
            variant="entry"
            size="xl"
            className="w-full h-auto py-6 flex-col gap-2"
            onClick={handleWithBlessing}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-primary" />
              <span className="text-xl">有祝福</span>
            </div>
            <span className="text-sm text-muted-foreground font-normal">
              模拟已创建祝福的状态
            </span>
          </Button>

          <Button
            variant="entry"
            size="xl"
            className="w-full h-auto py-6 flex-col gap-2"
            onClick={handleWithoutBlessing}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span className="text-xl">无祝福</span>
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
