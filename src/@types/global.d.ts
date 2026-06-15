declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.css';

declare module '*.module.css' {
  const styles: { [className: string]: string };
  export const unstable_styles: { [className: string]: string };
  export default styles;
}
