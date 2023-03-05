import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowUpIcon = ({ height = 6, width = 12, fill = '#28303F' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 6" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5856 5.46849C11.3269 5.79194 10.8549 5.84438 10.5315 5.58562L5.99997 1.96044L1.46849 5.58562C1.14505 5.84438 0.673077 5.79194 0.41432 5.46849C0.155562 5.14505 0.208004 4.67308 0.53145 4.41432L5.53145 0.414321C5.80536 0.19519 6.19458 0.19519 6.46849 0.414321L11.4685 4.41432C11.7919 4.67308 11.8444 5.14505 11.5856 5.46849Z"
        fill={fill}
      />
    </Svg>
  );
};
