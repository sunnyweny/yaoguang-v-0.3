import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { ArrowLeft, Shield, ShieldOff, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const MAX_CHARS = 200;

const BlessingEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setBlessingText, setPasswordEnabled, setHasBlessing } = useBlessing();
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
    if (text.trim()) {
      setBlessingText(text);
      setHasBlessing(true);
      setPasswordEnabled(passwordOn);
      navigate('/success');
    }
  };

  const canSave = text.trim().length > 0;

  return (
    <MobileLayout className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 gradient-bg backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">创建祝福</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 space-y-6">
        {/* Text Input Card */}
        <div className="animate-fade-in">
          <div className="bg-card rounded-3xl p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-blessing flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">写下你的祝福</h2>
                <p className="text-sm text-muted-foreground">用心的文字最动人</p>
              </div>
            </div>
            
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="在这里写下你想对 TA 说的话..."
              className="w-full h-40 p-4 bg-muted/50 rounded-2xl border-0 resize-none 
                text-foreground placeholder:text-muted-foreground/60
                focus:outline-none focus:ring-2 focus:ring-primary/30
                transition-all duration-200"
            />
            
            <div className="flex justify-end mt-2">
              <span className={`text-sm font-medium ${text.length >= MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
                {text.length}/{MAX_CHARS}
              </span>
            </div>
          </div>
        </div>

        {/* Password Toggle Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-card rounded-3xl p-5 shadow-card border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                  ${passwordOn ? 'gradient-blessing' : 'bg-muted'}`}
                >
                  {passwordOn ? (
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <ShieldOff className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">密码保护</h3>
                  <p className="text-sm text-muted-foreground">
                    {passwordOn ? '已开启' : '关闭中'}
                  </p>
                </div>
              </div>
              <Switch
                checked={passwordOn}
                onCheckedChange={handlePasswordToggle}
              />
            </div>

            {/* Password Display */}
            {passwordOn && state.password && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">自动生成的密码</p>
                <div className="flex justify-center gap-2">
                  {state.password.split('').map((digit, index) => (
                    <div
                      key={index}
                      className="w-12 h-14 bg-muted rounded-xl flex items-center justify-center
                        text-2xl font-bold text-foreground"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  密码自动生成，保存后请妥善记录
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-5 gradient-bg border-t border-border/50">
        <Button
          variant="blessing"
          size="full"
          onClick={handleSave}
          disabled={!canSave}
          className="animate-fade-in"
        >
          保存祝福
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingEditPage;
