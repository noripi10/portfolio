import { Link } from 'expo-router';
import { forwardRef } from 'react';

import Develop from '@/constants/development/development.json';

import { Section } from './Section';

export const WorksSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section ref={ref} id='home-p2'>
      <div className='home-eyebrow'>02 / SELECTED WORKS</div>
      <h2 className='home-h2'>Works</h2>
      <div className='home-works'>
        {Develop.map((item, i) => {
          const href = Object.values(item.stores)[0];
          const no = `W-${String(i + 1).padStart(2, '0')}`;
          const tag = item.technology.slice(0, 3).join(' / ').toUpperCase();

          return (
            <a
              key={item.name}
              className='home-work'
              href={href ?? '#'}
              target='_blank'
              rel='noopener noreferrer'
              tabIndex={-1}
            >
              <span>
                <span className='no'>{no}</span>
                <span className='t'>{item.name}</span>
              </span>
              <span className='tag'>{tag}</span>
            </a>
          );
        })}
      </div>

      <p className='home-sub'>
        <Link href='/development'>すべてのプロジェクトを見る →</Link>
      </p>
    </Section>
  );
});
WorksSection.displayName = 'WorksSection';
