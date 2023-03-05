import { COLORS } from '@/theme'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const ThreeDotsIcon = ({ height = 13, width = 3, fill = COLORS.gray50 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 3 13" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1.25C0 0.559644 0.559644 0 1.25 0C1.94036 0 2.5 0.559644 2.5 1.25C2.5 1.94036 1.94036 2.5 1.25 2.5C0.559644 2.5 0 1.94036 0 1.25ZM0 6.25C0 5.55964 0.559644 5 1.25 5C1.94036 5 2.5 5.55964 2.5 6.25C2.5 6.94036 1.94036 7.5 1.25 7.5C0.559644 7.5 0 6.94036 0 6.25ZM1.25 10C0.559644 10 0 10.5596 0 11.25C0 11.9404 0.559644 12.5 1.25 12.5C1.94036 12.5 2.5 11.9404 2.5 11.25C2.5 10.5596 1.94036 10 1.25 10Z"
        fill={fill}
      />
    </Svg>
  )
}
