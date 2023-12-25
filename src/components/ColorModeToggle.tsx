import { NativeText } from './Text';
import { useCustomTheme } from './context/CustomThemeProvider';

export const ColorModeToggle = () => {
  const { setColorMode } = useCustomTheme();
  return (
    <>
      <NativeText onPress={() => setColorMode((pre) => (pre === 'dark' ? 'light' : 'dark'))}>Toggle</NativeText>
    </>
  );
};
