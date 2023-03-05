import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const SuccessIcon = ({ fill = '#008F5D', size = 68 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 68 68" fill="none">
      <Path
        opacity="0.1"
        d="M67.2858 33.9994C67.2858 52.4088 52.362 67.3327 33.9525 67.3327C15.543 67.3327 0.619141 52.4088 0.619141 33.9994C0.619141 15.5899 15.543 0.666016 33.9525 0.666016C52.362 0.666016 67.2858 15.5899 67.2858 33.9994Z"
        fill={fill}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.8207 22.0267C49.9106 22.8744 50.1069 24.4451 49.2592 25.535L35.9025 42.7078C33.8235 45.3809 29.9128 45.7278 27.3957 43.4624L18.9468 35.8584C17.9205 34.9347 17.8373 33.354 18.7609 32.3277C19.6846 31.3014 21.2653 31.2182 22.2916 32.1419L30.7405 39.7459C31.1001 40.0695 31.6588 40.02 31.9558 39.6381L45.3124 22.4653C46.1601 21.3754 47.7308 21.1791 48.8207 22.0267Z"
        fill={fill}
      />
    </Svg>
  );
};