import Github from '@assets/svg/github.svg';
import Email from '@assets/svg/mail.svg';
import X from '@assets/svg/x.svg';
import Zenn from '@assets/svg/zenn.svg';
import { Link, useTheme } from 'expo-router';
import { forwardRef } from 'react';

import { Cube } from '@/components/cube/Cube';
import { ExternalLink } from '@/components/ExternalLink';

import { Section } from './Section';

export const ContactSection = forwardRef<HTMLElement>((_, ref) => {
  const color = useTheme().colors.text;

  return (
    <Section ref={ref} id='home-p4' className='home-panel-contact'>
      <div className='home-eyebrow'>04 / CONTACT</div>

      <h2 className='home-h2'>Contact &amp; Links</h2>

      <div>
        <Cube />
      </div>

      <div className='home-links'>
        <ExternalLink href='mailto:sgym.snk@gmai.com'>
          <Email width={32} height={32} fill={color} />
        </ExternalLink>
        &nbsp;·&nbsp;
        <ExternalLink href='https://github.com/noripi10'>
          <Github width={32} height={32} fill={color} />
        </ExternalLink>
        &nbsp;·&nbsp;
        <ExternalLink href='https://twitter.com/noripi_10'>
          <X width={32} height={32} fill={color} />
        </ExternalLink>
        &nbsp;·&nbsp;
        <Link href='/blog'>
          <Zenn width={32} height={32} fill={color} />
        </Link>
      </div>
    </Section>
  );
});
ContactSection.displayName = 'ContactSection';
