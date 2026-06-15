import { useCustomTheme } from './context/CustomThemeProvider';
import { NativeText } from './Text';

export const ColorModeToggle = () => {
  const { setColorMode } = useCustomTheme();
  return (
    <>
      <NativeText onPress={() => setColorMode?.((pre) => (pre === 'dark' ? 'light' : 'dark'))}>Toggle</NativeText>
    </>
  );
};
