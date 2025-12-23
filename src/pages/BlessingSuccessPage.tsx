import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // 使用 toast

const BlessingSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    password, 
    isPasswordEnabled, 
    nfcId 
  } = useBlessing();

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({ description: "密码已复制" });
    }
  };

  const copyMessage = () => {
    let message = '有一段话想让你看到～\n用手机轻轻触碰珠宝，就能读到我写给你的祝福。';
    if (isPasswordEnabled && password) {
      message += `\n\n祝福钥匙：${password}`;
    }
    navigator.clipboard.writeText(message);
    toast({ description: "已复制，可发送给 TA" });
  };

  const handleViewBlessing = () => {
    // 这里的逻辑直接跳转到查看页，查看页会根据 Context 里的密码状态判断是否需要输入
    navigate('/view');
  };

  return (
    <MobileLayout className="min-h-screen flex flex-col" useSecondaryBg>
      {/* Main Content */}
      <main className="flex-1 px-5 py-10 space-y-5 overflow-y-auto">
        {/* Success Header */}
        <div className="text-center space-y-4 animate-fade-in pt-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            你的祝福已成功保存
          </h1>
          
        </div>

        {/* Password Status Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/40">
            <h3 className="font-semibold text-card-foreground text-base mb-3">密码保护</h3>
            
            {isPasswordEnabled && password ? (
              <>
                <div className="bg-background border border-brand-gold/30 rounded-xl p-4 mb-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">访问密码</p>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-brand-gold tracking-[0.15em]">
                      {password}
                    </p>
                    <button
                      onClick={copyPassword}
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-gold/10 hover:bg-brand-gold/20 transition-colors"
                    >
                      <Copy className="w-5 h-5 text-brand-gold" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  已启用密码，收礼人查看祝福需输入此密码。
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                未启用密码，任何人触碰珠宝都可以直接查看您的祝福。
              </p>
            )}
          </div>
        </div>

        {/* Message Preview Card */}
        <div className="animate-fade-in-up stagger-2">
          <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/40">
            <h3 className="font-semibold text-card-foreground text-base mb-3">
              发送给 <em>TA </em> 的消息
            </h3>

           <div className="bg-brand-cream rounded-2xl p-4 relative">
              <p className="text-card-foreground text-sm leading-relaxed">
                有一段话想让你看到～
                <br />
                用手机轻轻触碰珠宝，就能读到我写给你的祝福。
              </p>
                {isPasswordEnabled && password && (
                    <div className="mt-3 pt-3 border-t border-card-foreground/10">
                    <p className="text-card-foreground/70 text-sm">
                    祝福钥匙：{password}
                  </p></div>
                )}
              <button
                onClick={copyMessage}
                className="absolute bottom-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-brand-gold/10 transition-colors"
              >
                <Copy className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="p-5">
        <Button
          variant="gold"
          size="full"
          onClick={handleViewBlessing}
          className="font-semibold shadow-md"
        >
          查看祝福
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingSuccessPage;