import React from 'react'
import Svg, { Circle, Ellipse } from 'react-native-svg'

export const UserIcon = ({ fill = '#3A3A3A', size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Ellipse
        cx="9.99984"
        cy="14.5834"
        rx="5.83333"
        ry="2.91667"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Circle
        cx="9.99984"
        cy="5.83333"
        r="3.33333"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
