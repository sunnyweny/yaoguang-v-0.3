import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { useBlessing } from '@/context/BlessingContext';
import { Blessings as initialData } from './mydata';
import { Gift, Sparkles, Loader2 } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';


const EntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { nfcId: urlNfcId } = useParams<{ nfcId: string }>();
  const { loadDeviceData, resetState, setHasBlessing, setPasswordEnabled } = useBlessing();

  useEffect(() => {
    
    if (urlNfcId) {
      console.log("正在加载设备数据:", urlNfcId);
      loadDeviceData(urlNfcId); // 内部会去读 LocalStorage -> 读 mydata -> setHasBlessing
      
      const timer = setTimeout(() => {
        navigate('/home', { replace: true }); // 使用 replace 防止用户点返回键回到加载页
      }, 150); // 给 Context 状态更新留一点渲染时间

      return () => clearTimeout(timer);
    }
  }, [urlNfcId, loadDeviceData, navigate]);

  // 下面原有的渲染逻辑保持不变...
  if (!urlNfcId) {
    // --- 按钮点击事件
    const handleWithBlessing = () => {
      resetState();
      setHasBlessing(true);
      setPasswordEnabled(true); // Default to password enabled for demo
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
  }
  // 默认返回 null，因为所有带 ID 的路径最终都会被 navigate('/home') 处理掉
  return null;
};
export default EntryPage;
