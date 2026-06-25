const SECTIONS = ['Hero', 'About', 'Works', 'Capabilities', 'Contact'];

export const SectionRail = ({ activeIndex, onGoTo }: { activeIndex: number; onGoTo: (index: number) => void }) => {
  return (
    <div className='home-ui home-rail' role='tablist' aria-label='sections'>
      {SECTIONS.map((label, i) => (
        <button
          key={label}
          type='button'
          className={i === activeIndex ? 'on' : ''}
          aria-label={label}
          aria-selected={i === activeIndex}
          onClick={() => onGoTo(i)}
        />
      ))}
    </div>
  );
};
