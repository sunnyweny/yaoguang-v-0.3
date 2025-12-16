/**
 * 使用 Canvas API 生成祝福海报并下载
 */

interface PosterOptions {
  blessingText: string;
  date: string;
}

export async function generateAndDownloadPoster(options: PosterOptions): Promise<boolean> {
  const { blessingText, date } = options;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    console.error('无法获取 canvas context');
    return false;
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
  const logoY = 120;
  
  // Logo 圆圈
  ctx.beginPath();
  ctx.arc(width / 2, logoY, 45, 0, Math.PI * 2);
  ctx.strokeStyle = '#c9a962';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Logo 内山形图案
  ctx.beginPath();
  ctx.moveTo(width / 2 - 25, logoY + 15);
  ctx.lineTo(width / 2 - 5, logoY - 15);
  ctx.lineTo(width / 2 + 5, logoY - 5);
  ctx.lineTo(width / 2 + 25, logoY - 20);
  ctx.lineTo(width / 2 + 25, logoY + 15);
  ctx.closePath();
  ctx.fillStyle = '#c9a962';
  ctx.fill();

  // 品牌名称
  ctx.font = 'bold 42px "Noto Serif SC", serif';
  ctx.fillStyle = '#c9a962';
  ctx.textAlign = 'center';
  ctx.fillText('瑶 | 光 | 阁', width / 2, logoY + 90);

  // 英文副标题
  ctx.font = '16px "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(201, 169, 98, 0.7)';
  ctx.fillText('YAO GUANG GE', width / 2, logoY + 120);

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

  // 下载图片
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `瑶光阁祝福_${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('保存海报失败:', error);
    return false;
  }
}
