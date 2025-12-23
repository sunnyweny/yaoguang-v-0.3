import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { useBlessing } from '@/context/BlessingContext';
import { Blessings as initialData } from './mydata';
import { Gift, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';


const EntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { nfcId: urlNfcId } = useParams<{ nfcId: string }>();
  const { loadDeviceData, resetState, setHasBlessing, setPasswordEnabled, checkIdExists } = useBlessing();
  const [processingId, setProcessingId] = useState<string | null>(null);
  // 定义状态
  const [error, setError] = useState<string | null>(null);
 // 1. 在组件内部声明一个处理标志（放在 useState 附近）
const [isInitialLoading, setIsInitialLoading] = useState(false);

useEffect(() => {
  // 打印调试信息
  console.log("当前接收到的 ID:", urlNfcId);

  // 如果没有 ID，或者正在处理中，则跳过，防止死循环
  if (!urlNfcId || isInitialLoading) return;

  // 1. 正则校验
  const idRegex = /^[0-9A-Z]{8}$/;
  if (!idRegex.test(urlNfcId)) {
    setError("格式不规范");
    return;
  }

  // 2. 存在性校验
  // 注意：此处 checkIdExists 仅检查静态 initialData，以保证最快放行
  if (!checkIdExists(urlNfcId)) {
    setError("不存在该珠宝ID");
    return;
  }

  // 3. 开始执行加载流程
  const performEntry = async () => {
    setIsInitialLoading(true); // 锁定状态，防止重复触发
    setError(null);

    try {
      // 核心：执行异步加载（去 PHP 服务器拿数据）
      await loadDeviceData(urlNfcId);
      
      // 加载完成后跳转
      navigate('/home', { replace: true });
    } catch (err) {
      console.error("加载失败:", err);
      setError("感应数据读取失败，请刷新重试");
      setIsInitialLoading(false); // 失败了才解锁
    }
  };

  performEntry();

}, [urlNfcId, navigate]);
  // 下面原有的渲染逻辑保持不变...
  if (urlNfcId) {
    return (
      <MobileLayout className="flex flex-col items-center justify-center min-h-screen px-6">
        {error ? (
          // 错误反馈 UI
          <div className="text-center space-y-4 animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold">对不起！识别失败</h2>
            <p className="text-muted-foreground">ID <span className="font-mono text-foreground">{urlNfcId}</span>格式不规范 </p>
          </div>
        ) : (
          // 正常的加载状态
          <>
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold mb-4" />
            <p className="text-foreground/60">正在识别珠宝感应信息...</p>
          </>
        )}
      </MobileLayout>
    );
  }

  // 情况 B: 直接访问 / (测试选择器)
  const handleWithBlessing = () => {
    resetState();
    setHasBlessing(true);
    setPasswordEnabled(true);
    navigate('/home');
  };
  const handleWithoutBlessing = () => {
    resetState();
    setHasBlessing(false);
    navigate('/home');
  };
  // --- 渲染选择器 UI
  return (
    <MobileLayout className="flex flex-col items-center justify-center min-h-screen px-6" useSecondaryBg>
      <div className="relative z-10 w-full max-w-sm space-y-10">
        {/* Logo/Header */}
        <div className="animate-fade-in">
          <BrandLogo size="lg" />
        </div>

        {/* Subtitle */}
        <div className="text-center animate-fade-in stagger-1">
          <p className="text-foreground/70 text-lg">
            选择测试流程
          </p>
        </div>

        {/* Flow Selection Buttons */}
        <div className="space-y-4 animate-fade-in-up stagger-2">
          <Button
            variant="entry"
            size="xl"
            className="w-full h-auto py-5 flex-col gap-2 rounded-2xl"
            onClick={handleWithBlessing}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-brand-gold" />
              <span className="text-lg text-card-foreground">有祝福</span>
            </div>
            <span className="text-sm text-muted-foreground font-normal">
              模拟已创建祝福的状态
            </span>
          </Button>

          <Button
            variant="entry"
            size="xl"
            className="w-full h-auto py-5 flex-col gap-2 rounded-2xl"
            onClick={handleWithoutBlessing}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span className="text-lg text-card-foreground">无祝福</span>
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
