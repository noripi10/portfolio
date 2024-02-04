import { useWidth } from '@/hooks/useWidth';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

export const MainVisual = () => {
  const { width } = useWidth();

  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    if (!ref.current) return;

    const handler = () => {
      const _rect = ref.current.getBoundingClientRect();
      setRect(_rect);
    };

    window.addEventListener('resize', handler);

    handler();
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const handler = (e: globalThis.MouseEvent) => {
      if (!rect || !ref.current) return;

      const startX = rect.x;
      const endX = rect.x + rect.width;
      const startY = rect.y;
      const endY = rect.y + rect.height;

      const clientX = e.clientX;
      const clientY = e.clientY;

      const centerX = startX + (endX - startX) / 2;
      const centerY = startY + (endY - startY) / 2;

      const rotateX = -((centerY - clientY) / (endY - centerY)) * 10;
      const rotateY = ((centerX - clientX) / (endX - centerX)) * 10;

      ref.current.style.cssText = `will-change: transform; transform: perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05); margin: auto;`;
    };

    ref.current?.addEventListener('mousemove', handler);
    ref.current?.addEventListener('mouseleave', () => {
      if (!ref.current) return;
      ref.current.style.cssText =
        'will-change: transform; transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1); margin: auto;';
    });
  }, [rect]);

  return (
    <div ref={ref} style={styles.imageContainer}>
      <Image
        style={[styles.image, { width: width * 0.8, maxWidth: 540 }]}
        source={require('@assets/me.webp')}
        contentFit='cover'
        transition={1000}
      />
      <Image style={[styles.avatar]} source={require('@assets/avatar.png')} contentFit='contain' transition={1000} />
    </div>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    position: 'relative',
    margin: 'auto',
  },
  image: {
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
  avatar: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 64,
    height: 64,
    borderRadius: 100,
  },
});
