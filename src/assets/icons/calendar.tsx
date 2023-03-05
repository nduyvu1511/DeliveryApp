import React from 'react'
import Svg, { Circle, Ellipse, Path } from 'react-native-svg'

export const CalendarIcon = ({ fill = '#838080', size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.5 6.91651C2.5 4.70737 4.29086 2.9165 6.5 2.9165H13.5C15.7091 2.9165 17.5 4.70737 17.5 6.9165V14.3332C17.5 16.5423 15.7091 18.3332 13.5 18.3332H6.5C4.29086 18.3332 2.5 16.5423 2.5 14.3332V6.91651Z"
        stroke={fill}
        stroke-width="1.5"
      />
      <Path d="M2.5 7.5H17.5" stroke={fill} stroke-width="1.5" stroke-linecap="round" />
      <Path
        d="M6.66602 1.6665L6.66602 4.1665"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.334 1.6665V4.1665"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Circle cx="9.99935" cy="12.4998" r="0.833333" fill={fill} />
      <Ellipse cx="13.3333" cy="12.4998" rx="0.833333" ry="0.833333" fill={fill} />
      <Ellipse cx="6.66732" cy="12.4998" rx="0.833333" ry="0.833333" fill={fill} />
    </Svg>
  )
}
