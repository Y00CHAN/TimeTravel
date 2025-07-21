import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export const PixelText: React.FC<TextProps> = ({ style, children, ...props }) => (
  <Text
    {...props}
    style={[styles.pixel, style]}
    allowFontScaling={false}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  pixel: {
    // 아래 fontFamily 중 실제로 적용되는 것을 선택해서 사용하세요!
    fontFamily: 'Neo둥근모 Pro', // 1. 원본 (한글+공백)
    // fontFamily: 'NeoDunggeunmoPro-Regular', // 2. 파일명
    // fontFamily: 'NeoDunggeunmo Pro', // 3. 영문+공백
    // fontFamily: 'Neo둥근모Pro', // 4. 한글+영문
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
}); 