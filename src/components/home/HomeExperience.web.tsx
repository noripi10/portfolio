import { useRef, useState } from 'react';

import { HomeHeader } from './HomeHeader';
import './home.css';
import { SectionCounter } from './SectionCounter';
import { SectionRail } from './SectionRail';
import { AboutSection } from './sections/AboutSection';
import { CapabilitiesSection } from './sections/CapabilitiesSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { WorksSection } from './sections/WorksSection';
import { useHomeScene } from './useHomeScene';

export const HomeExperience = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { goTo } = useHomeScene(canvasRef, scrollRef, panelsRef, setActiveIndex);

  return (
    <div className='home-page'>
      <div ref={scrollRef} className='home-scroll'>
        <div className='home-scroll-space' aria-hidden='true' />

        <canvas ref={canvasRef} className='home-canvas' />

        <HomeHeader onGoTo={goTo} />
        <SectionRail activeIndex={activeIndex} onGoTo={goTo} />
        <SectionCounter activeIndex={activeIndex} />

        <HeroSection
          ref={(el) => {
            panelsRef.current[0] = el;
          }}
        />
        <AboutSection
          ref={(el) => {
            panelsRef.current[1] = el;
          }}
        />
        <WorksSection
          ref={(el) => {
            panelsRef.current[2] = el;
          }}
        />
        <CapabilitiesSection
          ref={(el) => {
            panelsRef.current[3] = el;
          }}
        />
        <ContactSection
          ref={(el) => {
            panelsRef.current[4] = el;
          }}
        />
      </div>
    </div>
  );
};
