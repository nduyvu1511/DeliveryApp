import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const StoreIcon = ({ fill = '#0062FF', width = 18, height = 18 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.3333 4.66663V5.87496C17.3333 7.60085 16.0896 8.99996 14.5555 8.99996C13.0214 8.99996 11.7777 7.60085 11.7777 5.87496C11.7777 7.60085 10.5341 8.99996 8.99996 8.99996C7.46584 8.99996 6.22218 7.60085 6.22218 5.87496C6.22218 7.60085 4.97853 8.99996 3.4444 8.99996C1.91028 8.99996 0.666626 7.60085 0.666626 5.87496V4.66663C0.666626 2.45749 2.45749 0.666626 4.66663 0.666626H13.3333C15.5424 0.666626 17.3333 2.45749 17.3333 4.66663ZM11.7777 9.04655C12.4809 9.78101 13.4412 10.2499 14.5555 10.2499C15.2777 10.2499 15.9352 10.0529 16.5 9.71437V13.3332C16.5 15.5424 14.7091 17.3332 12.5 17.3332H8.16663V14.8333C8.16663 13.9128 7.42043 13.1666 6.49996 13.1666C5.57948 13.1666 4.83329 13.9128 4.83329 14.8333V17.2779C2.94148 16.9605 1.49996 15.3152 1.49996 13.3332V9.71437C2.06471 10.0529 2.72223 10.2499 3.4444 10.2499C4.55867 10.2499 5.519 9.78101 6.22218 9.04655C6.92536 9.78101 7.88569 10.2499 8.99996 10.2499C10.1142 10.2499 11.0746 9.78101 11.7777 9.04655ZM11.6666 11.5C11.1143 11.5 10.6666 11.9477 10.6666 12.5V13C10.6666 13.5522 11.1143 14 11.6666 14H13C13.5522 14 14 13.5522 14 13V12.5C14 11.9477 13.5522 11.5 13 11.5H11.6666Z"
        fill={fill}
      />
    </Svg>
  );
};
