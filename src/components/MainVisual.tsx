import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Image } from 'expo-image';

import { useWidth } from '@/hooks/useWidth';

export const MainVisual = () => {
  const { width } = useWidth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let rect: DOMRect | undefined = undefined;

    const mouseEnterHandler = () => {
      element.style.transform = '';
      rect = element.getBoundingClientRect();
      element.style.willChange = 'transform';
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!rect) {
        rect = element.getBoundingClientRect();
      }

      const clientX = e.clientX;
      const clientY = e.clientY;
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;
      const endX = rect.x + rect.width;
      const endY = rect.y + rect.height;
      const rotateX = -((centerY - clientY) / (endY - centerY)) * 10;
      const rotateY = ((centerX - clientX) / (endX - centerX)) * 10;

      element.style.transition = 'transform 0.1s ease-in';
      element.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const mouseLeaveHandler = () => {
      rect = undefined;
      element.style.transition = 'transform 0.2s cubic-bezier(1, 0.07, 1, 1.025)';
      element.style.transform = `perspective(500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      setTimeout(() => {
        if (element) {
          element.style.transition = '';
        }
      }, 600);
    };

    element.addEventListener('mouseenter', mouseEnterHandler);
    element.addEventListener('mousemove', mouseMoveHandler);
    element.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      element.removeEventListener('mouseenter', mouseEnterHandler);
      element.removeEventListener('mousemove', mouseMoveHandler);
      element.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);

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
