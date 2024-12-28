import React from 'react';
import { Path } from 'react-native-svg';
import SVGExt, { SVGExtProps } from '../widgets/SVGExt';
import { TYPOGRAPHY } from '../styles/typography';


const IcClose = (props: SVGExtProps) => {
  return (
    <SVGExt
      width={props.width || 22}
      height={props.height || 22}
      fill="none"
      viewBox="0 0 22 22"
      testID="IcClose"
      {...props}>
      <Path
        d="M20.487 1c.284 0 .513.23.513.513a.519.519 0 0 1-.136.352c-.026.028-4.579 4.581-9.135 9.135 4.556 4.553 9.109 9.107 9.135 9.135a.519.519 0 0 1 .136.352.513.513 0 0 1-.833.4c-.033-.026-4.612-4.603-9.167-9.158a6901.788 6901.788 0 0 1-9.167 9.159.513.513 0 0 1-.833-.4c0-.136.051-.262.136-.353.026-.028 4.579-4.581 9.135-9.135-4.556-4.553-9.109-9.107-9.135-9.135A.519.519 0 0 1 1 1.513a.513.513 0 0 1 .833-.4c.033.026 4.612 4.603 9.167 9.158a6822.58 6822.58 0 0 1 9.167-9.159.497.497 0 0 1 .32-.112Z"
        fill={TYPOGRAPHY.COLOR.Black}
        stroke={props.color || TYPOGRAPHY.COLOR.Black}
        strokeWidth={props.strokeWidth || 0.5}
      />
    </SVGExt>
  );
};
export default IcClose;
