import { forwardRef } from 'react';

import { Section } from './Section';

export const AboutSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section ref={ref} id='home-p1'>
      <div className='home-eyebrow'>01 / ABOUT</div>
      <h2 className='home-h2'>
        Engineer
        <br />
        with two hands
      </h2>
      <p className='home-sub'>
        岐阜で社内SEとして働きながら、趣味でアプリ開発をしています。 .NET での業務アプリ開発、React / React Native(Expo)
        でのプロダクト開発WebGL・フロントエンドでの表現探求。堅さと遊びの両方を行き来できることが強みです。
      </p>
    </Section>
  );
});
AboutSection.displayName = 'AboutSection';
