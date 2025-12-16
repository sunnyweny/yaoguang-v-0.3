/**
 * 平台检测工具
 */

export type Platform = 'wechat' | 'ios' | 'android' | 'desktop';

export function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  
  // 检测微信内置浏览器
  if (ua.includes('micromessenger')) {
    return 'wechat';
  }
  
  // 检测 iOS
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios';
  }
  
  // 检测 Android
  if (ua.includes('android')) {
    return 'android';
  }
  
  return 'desktop';
}

export function isWeChatBrowser(): boolean {
  return detectPlatform() === 'wechat';
}

export function isIOS(): boolean {
  const platform = detectPlatform();
  return platform === 'ios' || platform === 'wechat' && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
