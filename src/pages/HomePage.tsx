import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BrandLogo } from '@/components/BrandLogo';
import { useBlessing } from '@/context/BlessingContext';
import { Plus, Sparkles, Play } from 'lucide-react';
import heroThumbnail from '@/assets/hero-video-thumbnail.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // 核心修复点：直接解构 hasBlessing，不再通过 state
  const { hasBlessing } = useBlessing();

  const handleBlessingClick = () => {
    // 直接使用 hasBlessing
    if (hasBlessing) {
      navigate('/view');
    } else {
      navigate('/edit');
    }
  };

  return (
    <MobileLayout className="min-h-screen pb-4">
      {/* Header with Logo */}
      <header className="pt-4 pb-3">
        <BrandLogo size="md" />
      </header>

      {/* Main Content */}
      <main className="px-5 space-y-3">
        {/* Video/Hero Card */}
        <div className="animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-card-custom">
            <img 
              src={heroThumbnail} 
              alt="瑶光阁" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Blessing Card */}
        <div className="animate-fade-in-up stagger-1">
          <button
            onClick={handleBlessingClick}
            className="w-full bg-card rounded-2xl p-4 text-left shadow-card-custom hover:shadow-lg transition-all duration-200 active:scale-[0.99]"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-brand-gold" />
            </div>
            
            <h2 className="text-lg font-semibold text-card-foreground mb-1">
              {/* 直接使用 hasBlessing */}
              {hasBlessing ? '查看你的祝福语' : '创建你的祝福语'}
            </h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              寄一段心意，留一份温度<br />
              你的祝福，将随光泽一起被珍藏
            </p>
          </button>
        </div>

        {/* Lucky Sign Card - Disabled */}
        <div className="animate-fade-in-up stagger-2">
          <div className="w-full bg-card rounded-2xl p-4 text-left shadow-card-custom opacity-90">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-brand-gold" />
            </div>
            
            <h2 className="text-lg font-semibold text-card-foreground mb-1">
              瑶光幸运签 · 敬请期待
            </h2>
            
            <p className="text-sm text-muted-foreground mb-2">
              问天机，探运势
            </p>

            <div className="flex justify-end">
              <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-sm">
                即将上线
              </span>
            </div>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
};

export default HomePage;