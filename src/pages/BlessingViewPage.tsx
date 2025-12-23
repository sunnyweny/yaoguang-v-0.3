import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/PasswordInput';
import { BrandLogo } from '@/components/BrandLogo';
import { useBlessing } from '@/context/BlessingContext';
import { Lock, Download, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePoster, downloadPoster } from '@/utils/posterGenerator';
import { detectPlatform } from '@/utils/platformDetect';
import { PosterPreviewModal } from '@/components/PosterPreviewModal';

const BlessingViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 1. 修正解构逻辑
  const { 
    blessingText, 
    password, 
    isPasswordEnabled,
    // 如果 Context 里没有 isUnlocked，我们可以用本地 State 代替，或者从 Context 取
    // 假设我们现在用本地 state 处理本次访问的解锁
  } = useBlessing();

  const [localIsUnlocked, setLocalIsUnlocked] = useState(!isPasswordEnabled);
  const [passwordError, setPasswordError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [previewHint, setPreviewHint] = useState('');

  // 2. 文本显示逻辑：如果 Context 为空，显示默认 Mock 文本
  const displayBlessingText = blessingText || '愿你前程似锦，繁花似梦\n心中有光，步履生辉\n所遇皆良人，所行皆坦途';

  // 3. 密码验证
  const handlePasswordComplete = (inputPwd: string) => {
    if (inputPwd === password) {
      setLocalIsUnlocked(true);
      setPasswordError(false);
      toast({ description: "解锁成功" });
    } else {
      setPasswordError(true);
      toast({ variant: "destructive", description: "密码错误" });
    }
  };

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 4. 海报生成逻辑
  const handleSavePoster = async () => {
    setIsSaving(true);
    try {
      const result = await generatePoster({
        blessingText: displayBlessingText,
        date: currentDate,
      });

      if (!result.success || !result.dataUrl) {
        toast({ variant: "destructive", description: "海报生成失败" });
        return;
      }

      const platform = detectPlatform();
      if (platform === 'wechat' || platform === 'ios') {
        setPosterPreview(result.dataUrl);
        setPreviewHint(platform === 'wechat' ? '长按图片保存' : '长按保存到相册');
      } else {
        downloadPoster(result.dataUrl);
        toast({ description: "正在下载海报" });
      }
    } catch (error) {
      console.error('海报保存失败:', error);
      toast({ variant: "destructive", description: "保存失败，请重试" });
    } finally {
      setIsSaving(false);
    }
  };

  // --- 渲染逻辑 A: 需要密码 ---
  if (!localIsUnlocked && isPasswordEnabled) {
    return (
      <MobileLayout className="min-h-screen flex flex-col items-center justify-center px-6" useSecondaryBg>
        <div className="w-full max-w-sm animate-fade-in">
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border/50">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <Lock className="w-7 h-7 text-brand-gold" />
              </div>
            </div>

            <h2 className="text-zinc-800 font-semibold text-center mb-6">请输入查看密码</h2>

            <PasswordInput
              onComplete={handlePasswordComplete}
              error={passwordError}
              onErrorClear={() => setPasswordError(false)}
            />

            <p className="mt-6 text-muted-foreground text-sm text-center leading-relaxed">
              这份祝福已启用密码保护<br/>请向送礼人索取访问密码
            </p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // --- 渲染逻辑 B: 解锁后展示 ---
  return (
    <MobileLayout className="min-h-screen flex flex-col" useSecondaryBg>
      <div className="flex-1 flex flex-col bg-background relative overflow-hidden">
        {/* 背景装饰感 */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/pattern.png')] bg-repeat" />

        <header className="pt-8 pb-4 flex items-center px-4">
            <button onClick={() => navigate('/home')} className="p-2"><ArrowLeft className="w-5 h-5 text-brand-gold"/></button>
            <div className="flex-1 text-center pr-9"><BrandLogo size="md" /></div>
        </header>

        <main className="flex-1 px-5 py-4">
          <div className="animate-fade-in-up h-full">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden relative border border-brand-gold/20 h-full flex flex-col">
              {/* 四角装饰 */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-brand-gold/30" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-brand-gold/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-brand-gold/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-brand-gold/30" />

              <div className="px-8 py-16 flex-1 flex flex-col justify-center items-center text-center">
                <p className="text-xl text-card-foreground leading-[2] whitespace-pre-line font-serif italic">
                  “ {displayBlessingText} ”
                </p>
                <div className="mt-12 w-12 h-px bg-brand-gold/30" />
                <p className="mt-4 text-muted-foreground text-sm tracking-widest">{currentDate}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 海报预览弹窗 */}
      <PosterPreviewModal
        imageUrl={posterPreview || ''}
        visible={!!posterPreview}
        onClose={() => setPosterPreview(null)}
        hint={previewHint}
      />

      <div className="p-5 space-y-4">
        <Button
          variant="gold"
          size="full"
          onClick={handleSavePoster}
          disabled={isSaving}
          className="gap-2 font-semibold"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {isSaving ? '正在生成海报...' : '保存祝福海报'}
        </Button>
        <p className="text-center text-brand-gold/60 text-xs">
          祝你新年快乐·诸善如意·阖家幸福
        </p>
      </div>
    </MobileLayout>
  );
};

export default BlessingViewPage;