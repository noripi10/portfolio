import { Link } from 'expo-router';

export const HomeHeader = ({ onGoTo }: { onGoTo: (index: number) => void }) => {
  return (
    <header className='home-ui home-header'>
      <button className='home-logo' type='button' onClick={() => onGoTo(0)}>
        H.S.<small className='home-logo-sub'>PORTFOLIO / 2026</small>
      </button>

      <nav className='home-nav' aria-label='primary'>
        <button type='button' onClick={() => onGoTo(2)}>
          WORK
        </button>
        <span className='home-nav-wave'>~~~~</span>
        <Link href='/blog'>BLOG</Link>
        <span className='home-nav-wave'>~~~~</span>
        <button type='button' onClick={() => onGoTo(4)}>
          CONTACT
        </button>
      </nav>
    </header>
  );
};
