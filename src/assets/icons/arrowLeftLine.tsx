import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowLeftLineIcon = ({ width = 18, height = 14, fill = '#28303F' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 14" fill="none">
      <Path
        d="M6.33333 1L1 7M1 7L6.33333 13M1 7L17 7"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
