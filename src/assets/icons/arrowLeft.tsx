import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ArrowLeftIcon = ({ width = 6, height = 12, fill = '#3a3a3a' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 6 12" fill="none">
      <Path
        d="M5 1L1 6L5 11"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
