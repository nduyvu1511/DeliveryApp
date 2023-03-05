import React from 'react'
import { ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface ArrowIconProps {
  height?: number
  width?: number
  fill?: string
  style?: ViewStyle | ViewStyle[]
}

export const ArrowDownIcon = ({
  height = 6,
  width = 12,
  fill = '#3A3A3A',
  style,
}: ArrowIconProps) => {
  return (
    <Svg style={style} width={width} height={height} viewBox="0 0 12 6" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.414376 0.531506C0.673133 0.20806 1.1451 0.155619 1.46855 0.414376L6.00003 4.03956L10.5315 0.414376C10.855 0.155619 11.3269 0.20806 11.5857 0.531506C11.8444 0.854953 11.792 1.32692 11.4685 1.58568L6.46855 5.58568C6.19464 5.80481 5.80542 5.80481 5.53151 5.58568L0.531506 1.58568C0.20806 1.32692 0.155619 0.854953 0.414376 0.531506Z"
        fill={fill}
      />
    </Svg>
  )
}
