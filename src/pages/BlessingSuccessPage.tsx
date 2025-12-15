import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Toast, useToastState } from '@/components/Toast';
import { Check, Copy } from 'lucide-react';

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
    let message = '有一段话想让你看到。手机轻触珠宝，即可读到我写给你的祝福。';
    if (state.passwordEnabled && state.password) {
      message += `\n查看密码：${state.password}`;
    }
    navigator.clipboard.writeText(message);
    showToast('已复制，可发送给 TA');
  };

  const handleViewBlessing = () => {
    setIsUnlocked(true);
    navigate('/view');
  };

  return (
    <MobileLayout className="min-h-screen flex flex-col" useSecondaryBg>
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />

      {/* Main Content */}
      <main className="flex-1 px-5 py-10 space-y-5 overflow-y-auto">
        {/* Success Header */}
        <div className="text-center space-y-4 animate-fade-in pt-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-brand-gold flex items-center justify-center shadow-card-custom">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-xl font-medium text-foreground">
            你的祝福已成功保存
          </h1>
        </div>

        {/* Password Status Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-card rounded-2xl p-5 shadow-card-custom">
            <h3 className="font-semibold text-card-foreground text-lg mb-3">密码保护</h3>
            
            {state.passwordEnabled && state.password ? (
              <>
                {/* Password display box */}
                <div className="bg-secondary/30 border border-brand-gold/20 rounded-xl p-4 mb-3">
                  <p className="text-sm text-muted-foreground mb-1">系统生成密码</p>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-brand-gold tracking-[0.15em]">
                      {state.password}
                    </p>
                    <button
                      onClick={copyPassword}
                      className="w-10 h-10 rounded-lg bg-brand-gold/20 flex items-center justify-center hover:bg-brand-gold/30 transition-colors"
                    >
                      <Copy className="w-5 h-5 text-brand-gold" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-card-foreground/70 leading-relaxed">
                  已启用密码，收礼人查看祝福需输入此密码。
                </p>
              </>
            ) : (
              <p className="text-sm text-card-foreground/70 leading-relaxed">
                您未启用密码，任何人都可以查看您的祝福。
              </p>
            )}
          </div>
        </div>

        {/* Message Preview Card */}
        <div className="animate-fade-in-up stagger-2">
          <div className="bg-card rounded-2xl p-5 shadow-card-custom">
            <h3 className="font-semibold text-card-foreground text-lg mb-3">
              发送给 <span className="italic">TA</span> 的消息
            </h3>

            <div className="bg-brand-cream rounded-xl p-4 relative">
              <p className="text-card-foreground text-sm leading-relaxed pr-8">
                有一段话想让你看到。手机轻触珠宝，即可读到我写给你的祝福。
                {state.passwordEnabled && state.password && (
                  <>
                    <br />
                    查看密码：{state.password}
                  </>
                )}
              </p>
              <button
                onClick={copyMessage}
                className="absolute bottom-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-brand-gold/10 transition-colors"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-5 bg-background/80 backdrop-blur-sm">
        <Button
          variant="gold"
          size="full"
          onClick={handleViewBlessing}
          className="font-semibold animate-fade-in"
        >
          查看祝福
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingSuccessPage;
