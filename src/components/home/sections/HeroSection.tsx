import { forwardRef } from 'react';

import { Section } from './Section';

export const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section ref={ref} id='home-p0' className='home-panel-hero'>
      <div className='home-eyebrow'>
        <i>●</i>&nbsp; CREATIVE DEVELOPER — SYSTEMS ENGINEER
      </div>
      <h1 className='home-h1'>
        Order
        <br />
        from noise
      </h1>

      <div className='home-portrait'>
        <img src='/images/me.webp' alt='' />
        <img className='home-portrait-avatar' src='/images/avatar.webp' alt='' />
      </div>

      <p className='home-sub'>
        さまざまなアイデアを、動くソフトウェアに落とし込むのが好きです。業務システムから WEB/アプリ
        まで、設計から実装まで一通り実装することができます。
      </p>
      <div className='home-scroll-cue'>SCROLL</div>
    </Section>
  );
});
HeroSection.displayName = 'HeroSection';
