import { StyleSheet } from 'react-native';

// 폰트 패밀리 정의
export const FONTS = {
  // 8비트 게임 스타일 폰트 (커스텀 폰트)
  pixel: 'Neo둥근모 Pro', // 실제 패밀리명으로 변경
  // 시스템 폰트 (폴백)
  monospace: 'monospace',
  system: 'System',
};

// 폰트 크기 정의
export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
};

// 폰트 스타일 정의 (fontWeight 제거)
export const FONT_STYLES = StyleSheet.create({
  // 기본 픽셀 폰트 (한글 최적화)
  pixel: {
    fontFamily: FONTS.pixel,
  },
  
  // 모노스페이스 폰트
  mono: {
    fontFamily: FONTS.monospace,
  },
  
  // 시스템 폰트
  system: {
    fontFamily: FONTS.system,
  },
});

// 텍스트 스타일 조합 (모두 Neo둥근모 Pro 폰트 사용)
export const TEXT_STYLES = StyleSheet.create({
  // 제목 스타일 (한글 픽셀 폰트)
  title: {
    ...FONT_STYLES.pixel,
    fontSize: FONT_SIZES.xl,
    color: '#000',
  },
  
  // 부제목 스타일
  subtitle: {
    ...FONT_STYLES.pixel,
    fontSize: FONT_SIZES.lg,
    color: '#333',
  },
  
  // 본문 스타일
  body: {
    ...FONT_STYLES.pixel,
    fontSize: FONT_SIZES.base,
    color: '#000',
  },
  
  // 작은 텍스트
  small: {
    ...FONT_STYLES.pixel,
    fontSize: FONT_SIZES.sm,
    color: '#666',
  },
  
  // 버튼 텍스트 (한글 픽셀 폰트)
  button: {
    ...FONT_STYLES.pixel,
    fontSize: FONT_SIZES.base,
    color: '#fff',
  },
  
  // 탭 텍스트 (Neo둥근모 Pro 폰트로 변경)
  tab: {
    ...FONT_STYLES.pixel,
    fontSize: FONT_SIZES.xs,
    color: '#000',
  },
}); 