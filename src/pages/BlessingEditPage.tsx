import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { ArrowLeft, RefreshCw } from 'lucide-react'; // 引入刷新图标
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const MAX_CHARS = 200;

const BlessingEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // 从 Context 获取属性和方法
  const {
    nfcId,
    blessingText,
    setBlessingText,
    isPasswordEnabled,
    setPasswordEnabled,
    password,
    setPassword,
    setHasBlessing,
    saveToMockDB // 使用本地模拟保存函数
  } = useBlessing();

  // 本地临时状态，用于输入控制
  const [text, setText] = useState(blessingText || '');
  const [passwordOn, setPasswordOn] = useState(isPasswordEnabled);

  // 1. 随机密码生成函数
  const generateRandomPassword = () => {
    const randomPwd = Math.floor(1000 + Math.random() * 9000).toString();
    setPassword(randomPwd);
  };

  // 2. 初始化密码：如果开启了密码但没有密码，生成一个
  useEffect(() => {
    if (passwordOn && !password) {
      generateRandomPassword();
    }
  }, [passwordOn]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setText(value);
    }
  };

  const handlePasswordToggle = (checked: boolean) => {
    setPasswordOn(checked);
    setPasswordEnabled(checked);
    if (checked && !password) {
      generateRandomPassword();
    }
  };


  const handleSave = () => {
  if (text.trim()) {
    // 传参数给保存函数，确保拿到的数据是最新的
    saveToMockDB({
      text: text,
      pwdEnabled: passwordOn,
      pwd: password
    });

    toast({
      title: "保存成功",
      description: "祝福已成功写入标签",
    });

    navigate('/success');
  }
};
  const canSave = text.trim().length > 0;

  return (
    <MobileLayout className="min-h-screen flex flex-col" useSecondaryBg>
      {/* Header */}
      <header className="relative z-20">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-brand-gold" />
          </button>
          <h1 className="flex-1 text-center font-serif font-semibold text-brand-gold text-lg pr-10">
            创建祝福语
          </h1>
        </div>
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 space-y-4">
        {/* Text Input Card */}
        <div className="bg-brand-cream rounded-2xl p-5 min-h-[200px] flex flex-col relative border border-brand-gold/20 shadow-sm">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="写下你想送出的祝福..."
            className="flex-1 w-full bg-transparent border-0 resize-none 
              text-black placeholder:text-muted-foreground/50
              focus:outline-none text-base leading-relaxed font-sans"
          />
          <div className="flex justify-end pt-2">
            <span className={`text-sm ${text.length >= MAX_CHARS ? 'text-destructive' : 'text-muted-foreground/60'}`}>
              {text.length}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Password Toggle Card */}
        <div className="bg-background/30 backdrop-blur-sm border border-border/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-base">密码保护</h3>
            <Switch
              checked={passwordOn}
              onCheckedChange={handlePasswordToggle}
              className="data-[state=checked]:bg-brand-gold"
            />
          </div>

          {passwordOn && (
            <div className="bg-white/50 border border-brand-gold/30 rounded-xl p-4 mb-3 flex items-center justify-between animate-fade-in-up">
              <div>
                <p className="text-xs text-muted-foreground mb-1">访问密码</p>
                <p className="text-3xl font-bold text-brand-gold tracking-[0.2em]">
                  {password || '----'}
                </p>
              </div>

              {/* 刷新密码按钮 */}
              <button
                onClick={generateRandomPassword}
                className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center hover:bg-brand-gold/20 active:scale-90 transition-all"
              >
                <RefreshCw className="w-5 h-5 text-brand-gold" />
              </button>
            </div>
          )}

          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {passwordOn
              ? '启用密码，收礼人查看祝福需输入此密码。'
              : '不启用密码，任何触碰此珠宝的人均可查看祝福。'
            }
          </p>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="p-5">
        <Button
          variant="gold"
          size="full"
          onClick={handleSave}
          disabled={!canSave}
          className="font-semibold shadow-lg"
        >
          保存祝福内容
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingEditPage;