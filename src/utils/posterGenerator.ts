/**
 * 使用 Canvas API 生成祝福海报
 */
import brandLogoImg from '@/assets/brand-logo.png';
interface PosterOptions {
  blessingText: string;
  date: string;
}

interface GenerateResult {
  success: boolean;
  dataUrl?: string;
  error?: string;
}

/**
 * 生成海报并返回 dataUrl
 */
export async function generatePoster(options: PosterOptions): Promise<GenerateResult> {
  const { blessingText, date } = options;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return { success: false, error: '无法获取 canvas context' };
  }

  // 海报尺寸 (适合手机壁纸比例)
  const width = 750;
  const height = 1334;
  canvas.width = width;
  canvas.height = height;

  // 绘制渐变背景 (深青色)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1a3a3a');
  gradient.addColorStop(0.5, '#2d4f4f');
  gradient.addColorStop(1, '#1a3a3a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 添加纹理效果
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3, 0, Math.PI * 2);
    ctx.fillStyle = '#c9a962';
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // 绘制品牌 logo 区域
  const logoSize = 240; // 根据需要调整图片显示大小
  const logoX = (width - logoSize) / 2; // 水平居中
  const logoY = 60; // 调整垂直位置

  // 2. 创建并加载图片对象
  const logoImage = new Image();
  logoImage.src = brandLogoImg;

  // 3. 必须确保图片加载完成后再绘制（这是一个 Canvas 的坑）
  await new Promise((resolve) => {
    logoImage.onload = resolve;
    logoImage.onerror = resolve; // 防止图片加载失败导致程序卡死
  });

  // 4. 绘制图片到海报
  ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);

  // 绘制祝福卡片
  const cardX = 50;
  const cardY = 300;
  const cardWidth = width - 100;
  const cardHeight = 700;
  const cornerRadius = 30;

  // 卡片背景 (米色)
  ctx.fillStyle = '#f8f5f0';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, cornerRadius);
  ctx.fill();

  // 绘制四角装饰
  const cornerSize = 30;
  const cornerOffset = 25;
  ctx.strokeStyle = 'rgba(201, 169, 98, 0.4)';
  ctx.lineWidth = 2;

  // 左上角
  ctx.beginPath();
  ctx.moveTo(cardX + cornerOffset, cardY + cornerOffset + cornerSize);
  ctx.lineTo(cardX + cornerOffset, cardY + cornerOffset);
  ctx.lineTo(cardX + cornerOffset + cornerSize, cardY + cornerOffset);
  ctx.stroke();

  // 右上角
  ctx.beginPath();
  ctx.moveTo(cardX + cardWidth - cornerOffset - cornerSize, cardY + cornerOffset);
  ctx.lineTo(cardX + cardWidth - cornerOffset, cardY + cornerOffset);
  ctx.lineTo(cardX + cardWidth - cornerOffset, cardY + cornerOffset + cornerSize);
  ctx.stroke();

  // 左下角
  ctx.beginPath();
  ctx.moveTo(cardX + cornerOffset, cardY + cardHeight - cornerOffset - cornerSize);
  ctx.lineTo(cardX + cornerOffset, cardY + cardHeight - cornerOffset);
  ctx.lineTo(cardX + cornerOffset + cornerSize, cardY + cardHeight - cornerOffset);
  ctx.stroke();

  // 右下角
  ctx.beginPath();
  ctx.moveTo(cardX + cardWidth - cornerOffset - cornerSize, cardY + cardHeight - cornerOffset);
  ctx.lineTo(cardX + cardWidth - cornerOffset, cardY + cardHeight - cornerOffset);
  ctx.lineTo(cardX + cardWidth - cornerOffset, cardY + cardHeight - cornerOffset - cornerSize);
  ctx.stroke();

  // 绘制祝福文本
  ctx.font = '32px "Noto Serif SC", serif';
  ctx.fillStyle = '#2d3c3c';
  ctx.textAlign = 'center';

  const lines = blessingText.split('\n');
  const lineHeight = 56;
  const textStartY = cardY + (cardHeight - lines.length * lineHeight) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, textStartY + index * lineHeight);
  });

  // 绘制日期
  ctx.font = '22px "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(45, 60, 60, 0.6)';
  ctx.fillText(date, width / 2, cardY + cardHeight - 60);

  // 底部祝福语
  ctx.font = '20px "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(201, 169, 98, 0.7)';
  ctx.fillText('祝你新年快乐 · 诸善如意 · 阖家幸福', width / 2, height - 60);

  try {
    const dataUrl = canvas.toDataURL('image/png');
    return { success: true, dataUrl };
  } catch (error) {
    console.error('生成海报失败:', error);
    return { success: false, error: '生成海报失败' };
  }
}

/**
 * 触发下载 (Android / Desktop)
 */
export function downloadPoster(dataUrl: string, filename?: string): void {
  const link = document.createElement('a');
  link.download = filename || `瑶光阁祝福_${new Date().getTime()}.png`;
  link.href = dataUrl;
  link.click();
}

/**
 * 兼容旧接口 - 生成并下载海报
 */
export async function generateAndDownloadPoster(options: PosterOptions): Promise<boolean> {
  const result = await generatePoster(options);
  if (result.success && result.dataUrl) {
    downloadPoster(result.dataUrl);
    return true;
  }
  return false;
}
