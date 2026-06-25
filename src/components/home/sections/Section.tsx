import { type ReactNode, forwardRef } from 'react';

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export const Section = forwardRef<HTMLElement, SectionProps>(({ id, className = '', children }, ref) => {
  return (
    <section ref={ref} id={id} className={`home-panel ${className}`.trim()}>
      {children}
    </section>
  );
});
Section.displayName = 'Section';
