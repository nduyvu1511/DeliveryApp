import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BoxIcon = ({ width = 25, height = 24, fill = '#cccccc' }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 25 24">
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M18.823 5.162l-5.429-2.715a2 2 0 00-1.788 0L6.177 5.162 12.5 8.323l6.323-3.161zM4.5 11.677v5.087a2 2 0 001.106 1.789l6 3a2 2 0 001.788 0l6-3a2 2 0 001.106-1.789v-5.087l-5.33 2.665a1.5 1.5 0 01-1.918-.51l-.752-1.128-.752 1.128a1.5 1.5 0 01-1.919.51L4.5 11.677zm7.976-1.661l-7.96-3.993L2.529 8.98l8.002 4.023 1.945-2.987zm0 0l2.022 2.987 8.02-3.965L20.49 6.05l-8.015 3.966z"
        clipRule="evenodd"></Path>
    </Svg>
  );
};
