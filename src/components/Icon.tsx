import { useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

const svgIcons = require.context('../../assets/svg', true, /\.*/, 'sync');

export type IconName = 'blog' | 'expo' | 'github' | 'mail' | 'project' | 'x';

export type IconProps = {
  name: IconName;
} & SvgProps;

export const Icon = ({ name, ...props }: IconProps) => {
  const Svg = useMemo(() => {
    const tmp = svgIcons(`./${name}.svg`);
    if (!tmp) {
      throw new Error('Icon(svg) not found:' + name);
    }

    return tmp.default;
  }, [name]);

  return <Svg {...props} color={props.fill} />;
};
