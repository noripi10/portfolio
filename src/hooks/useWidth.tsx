import { useWindowDimensions } from 'react-native';

export const useWidth = () => {
  const { width } = useWindowDimensions();

  const isXS = width < 640;
  const isMD = width >= 640;
  const isLG = width >= 1024;

  return { width, isXS, isMD, isLG };
};
