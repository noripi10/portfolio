import { useRef, useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

import { NativeText } from './Text';
import { useWidth } from '@/hooks/useWidth';

export const AnimatedText = ({ children }: { children: string }) => {
  const { isXS } = useWidth();

  const [text, setText] = useState('  ');

  const animated = useRef(new Animated.Value(0)).current;
  const animated2 = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!children) return;
    const arr1 = children.split('');
    const arr2: string[] = [];
    arr1.map((_, i) => {
      const char = randomChar();
      arr2[i] = char;
    });
    console.info(arr1, arr2);

    let step = 0;

    animated.addListener(({ value }) => {
      const p = Math.floor(value * arr1.length);
      if (step !== p) {
        step = p;
        arr1.map((_, i) => {
          const char = randomChar();
          arr2[i] = char;
        });
        const pt1 = arr1.join('').substring(p, 0);
        const pt2 = arr2.join('').substring(arr2.length - p, 0);
        setText(pt1 + pt2);
      }
    });

    Animated.parallel([
      Animated.timing(animated, {
        toValue: 1.1,
        duration: 200 * arr1.length,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: false,
        delay: 100,
      }),
      Animated.timing(animated2, {
        toValue: 1,
        duration: 200 * arr1.length,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: false,
        delay: 100,
      }),
    ]).start();
  }, [children, animated, animated2]);

  return (
    <Animated.View style={{ height: 80, overflow: 'hidden', opacity: animated, transform: [{ scale: animated2 }] }}>
      <NativeText style={[{ fontSize: isXS ? 32 : 40, paddingVertical: 20 }]}>{text}</NativeText>
    </Animated.View>
  );
};

const randomChar = () => {
  let c = 'abcdefghijklmnopqrstuvwxyz0123456789';
  c = c[Math.floor(Math.random() * c.length)];
  return c;
};
