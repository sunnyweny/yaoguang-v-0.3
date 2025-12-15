import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Toast, useToastState } from '@/components/Toast';
import { Check, Copy, Eye, Lock, Unlock, Sparkles } from 'lucide-react';

const BlessingSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setIsUnlocked } = useBlessing();
  const { toast, showToast, hideToast } = useToastState();

  const copyPassword = () => {
    if (state.password) {
      navigator.clipboard.writeText(state.password);
      showToast('密码已复制');
    }
  };

  const copyMessage = () => {
    let message = state.blessingText;
    if (state.passwordEnabled && state.password) {
      message += `\n\n密码：${state.password}`;
    }
    navigator.clipboard.writeText(message);
    showToast('已复制，可发送给 TA');
  };

  const handleViewBlessing = () => {
    setIsUnlocked(true);
    navigate('/view');
  };

  return (
    <MobileLayout className="min-h-screen flex flex-col">
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />

      {/* Main Content */}
      <main className="flex-1 px-5 py-8 space-y-6 overflow-y-auto">
        {/* Success Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">保存成功</h1>
            <p className="text-muted-foreground mt-1">你的祝福已准备就绪</p>
          </div>
        </div>

        {/* Password Status Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-card rounded-3xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${state.passwordEnabled ? 'gradient-blessing' : 'bg-muted'}`}
              >
                {state.passwordEnabled ? (
                  <Lock className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Unlock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {state.passwordEnabled ? '密码保护' : '未启用密码'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {state.passwordEnabled ? '查看需要输入密码' : '任何人都可直接查看'}
                </p>
              </div>
            </div>

            {state.passwordEnabled && state.password && (
              <div className="bg-muted/50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {state.password.split('').map((digit, index) => (
                      <div
                        key={index}
                        className="w-10 h-12 bg-card rounded-xl flex items-center justify-center
                          text-xl font-bold text-foreground shadow-soft"
                      >
                        {digit}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPassword}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    复制
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Preview Card */}
        <div className="animate-fade-in-up stagger-2">
          <div className="bg-card rounded-3xl p-5 shadow-card border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">祝福内容</h3>
                  <p className="text-sm text-muted-foreground">可复制发送</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyMessage}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                复制
              </Button>
            </div>

            <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {state.blessingText}
              </p>
              {state.passwordEnabled && state.password && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    密码：<span className="font-mono font-semibold text-foreground">{state.password}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-5 gradient-bg border-t border-border/50">
        <Button
          variant="blessing"
          size="full"
          onClick={handleViewBlessing}
          className="gap-2 animate-fade-in"
        >
          <Eye className="w-5 h-5" />
          {state.passwordEnabled ? '查看祝福内容' : '查看祝福'}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingSuccessPage;
