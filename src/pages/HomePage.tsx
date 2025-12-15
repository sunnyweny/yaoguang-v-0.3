import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BlessingCard } from '@/components/BlessingCard';
import { useBlessing } from '@/context/BlessingContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useBlessing();

  const handleBlessingClick = () => {
    if (state.hasBlessing) {
      navigate('/view');
    } else {
      navigate('/edit');
    }
  };

  return (
    <MobileLayout className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 gradient-bg backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-blessing flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">祝福卡片</span>
          </div>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 space-y-5">
        {/* Status indicator */}
        <div className="animate-fade-in">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
            ${state.hasBlessing 
              ? 'bg-green-100 text-green-700' 
              : 'bg-amber-100 text-amber-700'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${state.hasBlessing ? 'bg-green-500' : 'bg-amber-500'}`} />
            {state.hasBlessing ? '已有祝福' : '暂无祝福'}
          </div>
        </div>

        {/* Blessing Card */}
        <div className="animate-fade-in-up stagger-1">
          <BlessingCard
            title={state.hasBlessing ? '查看你的祝福' : '创建你的祝福语'}
            subtitle={state.hasBlessing ? '点击查看并分享你的祝福内容' : '写下你的心意，传递温暖祝福'}
            icon={state.hasBlessing ? 'view' : 'create'}
            onClick={handleBlessingClick}
          />
        </div>

        {/* Lucky Sign Card - Disabled */}
        <div className="animate-fade-in-up stagger-2">
          <BlessingCard
            title="好运签"
            subtitle="敬请期待"
            icon="lucky"
            disabled
          />
        </div>

        {/* Decorative section */}
        <div className="pt-8 animate-fade-in stagger-3">
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/30"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              用心传递祝福，温暖每一刻
            </p>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
};

export default HomePage;
