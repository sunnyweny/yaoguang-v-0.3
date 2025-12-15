import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/PasswordInput';
import { useBlessing } from '@/context/BlessingContext';
import { ArrowLeft, Lock, Share2, Sparkles } from 'lucide-react';
import { Toast, useToastState } from '@/components/Toast';

const BlessingViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setIsUnlocked } = useBlessing();
  const [passwordError, setPasswordError] = useState(false);
  const { toast, showToast, hideToast } = useToastState();

  // If no blessing exists, redirect to home
  const hasMockBlessing = state.hasBlessing || state.blessingText;
  const mockBlessingText = state.blessingText || '愿你的每一天都充满阳光和笑容，愿你的梦想都能实现，愿幸福永远陪伴着你。';

  const needsPassword = state.passwordEnabled && !state.isUnlocked;

  const handlePasswordComplete = (password: string) => {
    if (password === state.password) {
      setIsUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleShare = () => {
    showToast('分享功能即将上线');
  };

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Locked View
  if (needsPassword) {
    return (
      <MobileLayout className="min-h-screen flex flex-col">
        <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />

        {/* Header */}
        <header className="sticky top-0 z-20 gradient-bg backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-4">
            <button 
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">查看祝福</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Locked Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm space-y-8 text-center animate-fade-in">
            {/* Lock Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full gradient-blessing flex items-center justify-center shadow-button">
                <Lock className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">输入密码</h2>
              <p className="text-muted-foreground">请输入 4 位密码查看祝福</p>
            </div>

            {/* Password Input */}
            <div className="py-4">
              <PasswordInput
                onComplete={handlePasswordComplete}
                error={passwordError}
                onErrorClear={() => setPasswordError(false)}
              />
            </div>

            {/* Error Message */}
            {passwordError && (
              <p className="text-destructive text-sm animate-fade-in">
                密码不正确，请再试一次
              </p>
            )}
          </div>
        </main>
      </MobileLayout>
    );
  }

  // Unlocked View - Blessing Poster
  return (
    <MobileLayout className="min-h-screen flex flex-col">
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />

      {/* Header */}
      <header className="sticky top-0 z-20 gradient-bg backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">祝福卡片</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Poster Content */}
      <main className="flex-1 px-5 py-6 overflow-y-auto">
        <div className="animate-fade-in-up">
          {/* Poster Card */}
          <div className="bg-card rounded-3xl shadow-card border border-border/50 overflow-hidden">
            {/* Brand Header */}
            <div className="gradient-blessing px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-foreground">祝福卡片</h2>
                  <p className="text-primary-foreground/80 text-sm">用心传递温暖</p>
                </div>
              </div>
            </div>

            {/* Blessing Content */}
            <div className="p-6 space-y-6">
              {/* Decorative top */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/30" />
                  <Sparkles className="w-4 h-4 text-primary/50" />
                  <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary/30" />
                </div>
              </div>

              {/* Blessing Text */}
              <div className="bg-blessing-cream rounded-2xl p-5">
                <p className="text-lg text-foreground leading-relaxed text-center whitespace-pre-wrap">
                  {mockBlessingText}
                </p>
              </div>

              {/* Decorative bottom */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent/30" />
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent/30" />
                </div>
              </div>

              {/* Date */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-5 gradient-bg border-t border-border/50">
        <Button
          variant="gold"
          size="full"
          onClick={handleShare}
          className="gap-2 animate-fade-in"
        >
          <Share2 className="w-5 h-5" />
          生成分享海报
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingViewPage;
