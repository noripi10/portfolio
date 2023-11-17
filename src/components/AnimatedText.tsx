import { useRef, useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

import { NativeText } from './Text';
import { useWidth } from '@/hooks/useWidth';

export const AnimatedText = ({ children }: { children: string }) => {
  const { isXS } = useWidth();

  const [text, setText] = useState('  ');

  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!children) return;
    const arr1 = children.split('');
    const arr2 = [];
    arr1.forEach((char, i) => (arr2[i] = randomChar()));
    console.info(arr1, arr2);

    let step = 0;

    animated.addListener(({ value }) => {
      const p = Math.floor(value * arr1.length);
      if (step !== p) {
        step = p;
        arr1.forEach((char, i) => (arr2[i] = randomChar()));
        const pt1 = arr1.join('').substring(p, 0);
        const pt2 = arr2.join('').substring(arr2.length - p, 0);
        setText(pt1 + pt2);
      }
    });

    Animated.timing(animated, {
      toValue: 1.1,
      duration: 200 * arr1.length,
      easing: Easing.inOut(Easing.exp),
      useNativeDriver: false,
      delay: 100,
    }).start();
  }, [children, animated]);

  return (
    <Animated.View style={{ opacity: animated }}>
      <NativeText style={[{ fontSize: isXS ? 36 : 44, paddingVertical: 20 }]}>{text}</NativeText>
    </Animated.View>
  );
};

const randomChar = () => {
  let c = 'abcdefghijklmnopqrstuvwxyz0123456789';
  c = c[Math.floor(Math.random() * c.length)];
  return c;
};
