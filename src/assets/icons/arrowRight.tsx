import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ArrowRightIcon = ({ width = 6, height = 12, fill = '#3a3a3a' }) => {
  return (
    // <Svg width={width} height={height} viewBox="0 0 6 10" fill="none">
    //   <Path
    //     d="M1.33331 0.833374L4.66665 5.00004L1.33331 9.16671"
    //     stroke={fill}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    // </Svg>

    <Svg width={width} height={height} viewBox="0 0 6 12" fill="none">
      <Path
        d="M1 11L5 6L1 0.999999"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
