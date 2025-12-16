
import React, { useEffect } from 'react';
//在 EntryPage 组件内部，使用 useParams() 来获取路由中的参数，并使用 useBlessing() 提供的上下文函数来存储它。
// 导入新的 Hook
import { useFetchBlessingStatus } from '@/hooks/use-blessing-status';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Gift, Sparkles } from 'lucide-react';

const EntryPage: React.FC = () => {
  const navigate = useNavigate();

  // 使用 useParams 获取 URL 中的参数
  const { nfcId: urlNfcId } = useParams<{ nfcId: string }>();
  // 从 Context 中解构所需的函数
  const {
    setNfcId,
    setHasBlessing,
    resetState,
    setPasswordEnabled
    // 如果 Context 提供了 setBlessingText，用于保存后端返回的文本
    // setBlessingText
  } = useBlessing();

  //调用查询 Hook：只有当 urlNfcId 存在时才触发查询
  const { data, isLoading, isFetching, isError } = useFetchBlessingStatus(urlNfcId || null);

  useEffect(() => {
    // ID 不存在 (用户直接访问 /)
    if (!urlNfcId) {
      setNfcId(null);
      // ID 不存在时，什么也不做，让组件渲染选择器 UI
      return;
    }

    // 路径 B: ID 存在 (NFC 触发)
    // 1. 存储 ID
    setNfcId(urlNfcId);

    // 2. 正在查询中，等待结果
    if (isLoading || isFetching) {
      return; // 停止执行，等待查询 Hook 返回数据
    }

    // 3. 自动跳转逻辑 (查询完成)
    if (data) {
      // 收到数据，初始化状态并跳转
      resetState();

      // 根据后端返回的 has_blessing 设置应用状态
      setHasBlessing(data.has_blessing);

      console.log(`NFC ID [${urlNfcId}] 状态查询完成，自动跳转到 Home。`);
      navigate('/home');

    } else if (isError) {
      // 发生错误，视为“无祝福”状态，并跳转
      console.error(`查询 NFC ID [${urlNfcId}] 状态失败。`);
      resetState();
      setHasBlessing(false);
      navigate('/home');
    }

    // 确保这里的依赖项是完整的
  }, [urlNfcId, data, isLoading, isFetching,isError, navigate, setNfcId, setHasBlessing, resetState]);

  // 如果有 ID 并且正在加载（查询后端中），显示加载状态
  if (urlNfcId && (isLoading || isFetching)) {
    return (
      <MobileLayout className="flex items-center justify-center min-h-screen">
        <p className="text-foreground">
          加载中，正在查询 NFC 祝福状态...
        </p>
      </MobileLayout>
    );
  }
  // 如果没有 ID，或者 ID 查询完毕但发生错误（我们选择跳转），则渲染测试选择器 UI
  // 仅当 urlNfcId 不存在时，才允许用户看到选择器
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
