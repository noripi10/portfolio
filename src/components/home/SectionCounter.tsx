export const SectionCounter = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className='home-ui home-counter'>
      <b>{String(activeIndex + 1).padStart(2, '0')}</b> / 05
    </div>
  );
};
