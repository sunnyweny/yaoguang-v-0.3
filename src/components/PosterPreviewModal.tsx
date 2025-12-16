import React from 'react';
import { X } from 'lucide-react';

interface PosterPreviewModalProps {
  imageUrl: string;
  visible: boolean;
  onClose: () => void;
  hint?: string;
}

export const PosterPreviewModal: React.FC<PosterPreviewModalProps> = ({
  imageUrl,
  visible,
  onClose,
  hint = '长按图片保存到相册',
}) => {
  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* 提示文字 */}
      <p className="text-white/80 text-sm mb-4 animate-pulse">
        {hint}
      </p>

      {/* 海报图片 */}
      <div className="max-w-[90vw] max-h-[80vh] overflow-auto">
        <img
          src={imageUrl}
          alt="祝福海报"
          className="max-w-full h-auto rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* 底部提示 */}
      <p className="text-white/60 text-xs mt-4 text-center px-6">
        点击空白区域关闭
      </p>
    </div>
  );
};
