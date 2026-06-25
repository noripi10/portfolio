import { forwardRef } from 'react';

import { CAPS } from '../capabilities';
import { Section } from './Section';

export const CapabilitiesSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section ref={ref} id='home-p3'>
      <div className='home-eyebrow'>03 / CAPABILITIES</div>
      <h2 className='home-h2'>What I do</h2>
      <div className='home-caps'>
        {CAPS.map((cap) => (
          <div className='home-cap' key={cap.key}>
            <div className='k'>{cap.key}</div>
            <div className='v'>{cap.value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
});
CapabilitiesSection.displayName = 'CapabilitiesSection';
