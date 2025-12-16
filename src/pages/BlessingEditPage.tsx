import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { ArrowLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useSaveBlessing } from '@/hooks/use-save-blessing';
const MAX_CHARS = 200;

const BlessingEditPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    state,
    setBlessingText,
    setPasswordEnabled,
    setHasBlessing,
    nfcId //从 Context 获取 NFC ID
  } = useBlessing();

  const { toast } = useToast();
  const { mutate, isPending } = useSaveBlessing();
  const [text, setText] = useState(state.blessingText || '');
  const [passwordOn, setPasswordOn] = useState(state.passwordEnabled);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setText(value);
    }
  };

  const handlePasswordToggle = (checked: boolean) => {
    setPasswordOn(checked);
    setPasswordEnabled(checked);
  };

  const handleSave = () => {
    const trimmedText = text.trim();

    if (text.trim()) {
      setBlessingText(text);
      setHasBlessing(true);
      setPasswordEnabled(passwordOn);
      navigate('/success');
    }
   // ⚠️ 检查 NFC ID 是否存在
  // //if (!nfcId) {
  //     toast({
  //       variant: "destructive",
  //       title: "提示",
  //       description: "缺少NFC ID，无法绑定祝福。",
  //     });
  //     return;
  //   }
    // 构造发送给后端的数据
    const payload = {
      nfcId: nfcId,
      blessingText: trimmedText,
      passwordEnabled: passwordOn,
      // 只有启用密码时才发送密码，否则发送空字符串或不发送（取决于后端要求）
      password: passwordOn ? state.password : '',
    };

    // 触发 Mutation
    mutate(payload, {
      onSuccess: () => {
        // 3. 成功回调：更新前端 Context 状态
        setBlessingText(trimmedText);
        setHasBlessing(true);
        setPasswordEnabled(passwordOn);

        // 4. 跳转到成功页面
        navigate('/success');
      },
      onError: (error) => {
        // 5. 失败回调：显示错误提示
        console.error("保存祝福失败:", error);
        toast({
          variant: "destructive",
          title: "保存失败",
          description: "网络错误或服务器异常，请稍后再试。",
        });
      }
    });
  };

  // 💡 3. 禁用按钮状态：当内容为空或正在保存中时
  const canSave = text.trim().length > 0 && !isPending;

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
          <h1 className="flex-1 text-center font-serif font-semibold text-brand-gold text-lg pr-10">创建祝福语</h1>
        </div>
        {/* Divider line */}
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 space-y-4">
        {/* Text Input Card with cloud decoration */}
        <div className="animate-fade-in relative">
          {/* Cloud decoration in top-left corner */}
          <div className="absolute -top-2 -left-2 z-0">
            <svg width="80" height="50" viewBox="0 0 80 50" className="text-brand-gold opacity-80">
              <path d="M15 35 Q5 35 5 28 Q5 22 12 20 Q10 15 15 12 Q22 8 30 12 Q35 8 42 10 Q50 5 58 10 Q65 8 70 15 Q78 18 75 28 Q78 35 70 38 Q65 42 55 40 Q48 45 38 42 Q28 45 20 40 Q12 42 15 35 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M20 32 Q15 32 15 27 Q15 23 20 22 Q18 18 22 16 Q27 13 33 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="bg-brand-cream rounded-2xl p-5 min-h-[280px] flex flex-col relative overflow-hidden">
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
        </div>

        {/* Password Toggle Card */}
        <div className="animate-fade-in">
          <div className="bg-background/30 backdrop-blur-sm border border-border/30 rounded-2xl p-5">
            {/* Header with toggle */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground text-base">密码保护</h3>
              <Switch
                checked={passwordOn}
                onCheckedChange={handlePasswordToggle}
                className="data-[state=checked]:bg-brand-gold"
              />
            </div>

            {/* Password Display - only show when password is enabled */}
            {passwordOn && (
              <div className="bg-background/40 border border-border/20 rounded-xl p-4 mb-3">
                <p className="text-sm text-muted-foreground mb-2">您的密码</p>
                <p className="text-3xl font-bold text-brand-gold tracking-[0.2em]">
                  {state.password || '9795'}
                </p>
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              {passwordOn
                ? '启用密码，收礼人查看祝福需输入此密码。'
                : '不启用密码，任何触碰此珠宝的人均可查看祝福。'
              }
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="p-5">
        <Button
          variant="gold"
          size="full"
          onClick={handleSave}
          disabled={!canSave}
          className="font-semibold"
        >
          保存祝福
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingEditPage;
