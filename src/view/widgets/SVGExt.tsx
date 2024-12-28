import React from 'react';
import Svg from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

export interface SVGExtProps {
  fill?: string;
  color?: string;
  width?: number;
  scale?: number;
  height?: number;
  viewBox?: string;
  opacity?: number;
  strokeColor?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  strokeWidth?: number;
  testID?: string;
  isSelected?: boolean;
}

function SVGExt(props: SVGExtProps) {
  const { scale = 1, children, width, height, ...rest } = props;
  return (
    <Svg
      {...rest}
      width={width ? width * scale : undefined}
      height={height ? height * scale : undefined}>
      {children}
    </Svg>
  );
}

export default SVGExt;
