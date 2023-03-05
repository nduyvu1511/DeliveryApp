import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const DeleteIcon = ({ width = 22, height = 18, fill = '#cccccc' }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 22 18">
      <Path
        fill={fill}
        d="M2.524 12.44l-.5.559.5-.559zm0-6.88L2.024 5l.5.559zM6.35 15.869l.501-.559-.5.559zm0-13.738l.501.559-.5-.559zm10.181 4.4a.75.75 0 00-1.06-1.061l1.06 1.06zM9.47 11.47a.75.75 0 101.06 1.06l-1.06-1.06zm1.06-6a.75.75 0 10-1.06 1.06l1.06-1.06zm4.94 7.06a.75.75 0 101.06-1.06l-1.06 1.06zM9.288 1.75h7.25V.25h-7.25v1.5zM20.25 5.571v6.858h1.5V5.57h-1.5zM16.537 16.25H9.288v1.5h7.25v-1.5zm-9.687-.94l-3.825-3.428-1.002 1.117 3.826 3.428L6.85 15.31zM3.025 6.118L6.85 2.69 5.849 1.573 2.023 5l1.002 1.117zm0 5.764c-1.7-1.523-1.7-4.24 0-5.764L2.023 5.001C-.34 7.121-.34 10.88 2.023 13l1.002-1.117zm6.263 4.368c-.894 0-1.76-.332-2.438-.94l-1.001 1.117a5.152 5.152 0 003.44 1.323v-1.5zm10.962-3.821c0 2.127-1.68 3.821-3.713 3.821v1.5c2.896 0 5.213-2.4 5.213-5.321h-1.5zM16.537 1.75c2.034 0 3.713 1.694 3.713 3.821h1.5C21.75 2.65 19.433.25 16.537.25v1.5zM9.288.25c-1.268 0-2.49.472-3.44 1.323L6.85 2.69a3.652 3.652 0 012.438-.94V.25zm6.182 5.22l-3 3 1.06 1.06 3-3-1.06-1.06zm-3 3l-3 3 1.06 1.06 3-3-1.06-1.06zm1.06 0l-3-3-1.06 1.06 3 3 1.06-1.06zm-1.06 1.06l3 3 1.06-1.06-3-3-1.06 1.06z"></Path>
    </Svg>
  );
};