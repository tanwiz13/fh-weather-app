import React from 'react';
import { Path } from 'react-native-svg';
import SVGExt, { SVGExtProps } from '../widgets/SVGExt';
import { TYPOGRAPHY } from '../styles/typography';


const IcSearch = (props: SVGExtProps) => {
  return (
    <SVGExt
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      testID="IcSearch"
      {...props}>
      <Path
        d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
        stroke={props.color || TYPOGRAPHY.COLOR.DescriptionText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGExt>
  );
};
export default IcSearch;
