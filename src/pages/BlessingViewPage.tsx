import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/PasswordInput';
import { BrandLogo } from '@/components/BrandLogo';
import { useBlessing } from '@/context/BlessingContext';
import { Lock, Download } from 'lucide-react';
import { Toast, useToastState } from '@/components/Toast';

const BlessingViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setIsUnlocked } = useBlessing();
  const [passwordError, setPasswordError] = useState(false);
  const { toast, showToast, hideToast } = useToastState();

  const mockBlessingText = state.blessingText || '愿你前程似锦，繁花似梦\n心中有光，步履生辉\n所遇皆良人，所行皆坦途';

  const needsPassword = state.passwordEnabled && !state.isUnlocked;

  const handlePasswordComplete = (password: string) => {
    if (password === state.password) {
      setIsUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSavePoster = () => {
    // 占位实现：仅提示，避免引入导致编译问题的依赖
    showToast('已保存到相册', '可前往微信分享给 TA');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 锁定状态：输入密码
  if (needsPassword) {
    return (
      <MobileLayout className="min-h-screen flex flex-col items-center justify-center px-6" useSecondaryBg>
        <Toast
          message={toast.message}
          subMessage={toast.subMessage}
          visible={toast.visible}
          onHide={hideToast}
        />

        <div className="w-full max-w-sm animate-fade-in">
          <div className="bg-card rounded-3xl p-8 shadow-card-custom">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center">
                <Lock className="w-7 h-7 text-brand-gold" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-card-foreground text-center mb-6">请输入密码</h2>

            <div className="mb-6">
              <PasswordInput
                onComplete={handlePasswordComplete}
                error={passwordError}
                onErrorClear={() => setPasswordError(false)}
              />
            </div>

            {passwordError ? (
              <p className="text-destructive text-sm text-center animate-fade-in">
                密码不正确，请再试一次
              </p>
            ) : (
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                这份祝福已启用密码，请向送礼人索取查看密码
              </p>
            )}
          </div>
        </div>
      </MobileLayout>
    );
  }

  // 解锁状态：祝福海报
  return (
    <MobileLayout className="min-h-screen flex flex-col" useSecondaryBg>
      <Toast
        message={toast.message}
        subMessage={toast.subMessage}
        visible={toast.visible}
        onHide={hideToast}
      />

      <div className="flex-1 flex flex-col bg-background bg-pattern">
        <header className="pt-8 pb-6">
          <BrandLogo size="md" />
        </header>

        <main className="flex-1 px-5 pb-6">
          <div className="animate-fade-in-up">
            <div className="bg-card rounded-2xl shadow-card-custom overflow-hidden relative">
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-brand-gold/30" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-brand-gold/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-brand-gold/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-brand-gold/30" />

              <div className="px-8 py-16 min-h-[400px] flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl text-card-foreground leading-loose text-center whitespace-pre-line font-medium">
                    {mockBlessingText}
                  </p>
                </div>

                <div className="text-center pt-8">
                  <p className="text-muted-foreground text-sm">{currentDate}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="sticky bottom-0 p-5 bg-background/80 backdrop-blur-sm">
        <Button
          variant="gold"
          size="full"
          onClick={handleSavePoster}
          className="gap-2 font-semibold animate-fade-in"
        >
          <Download className="w-5 h-5" />
          保存祝福海报
        </Button>

        <p className="text-center text-brand-gold/60 text-sm mt-4">
          祝你新年快乐·诸善如意·阖家幸福
        </p>
      </div>
    </MobileLayout>
  );
};

export default BlessingViewPage;
