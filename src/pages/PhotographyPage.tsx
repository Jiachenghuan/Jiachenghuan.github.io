import { getLifeSection } from '../content/lifeSections';
import { HomeContent } from '../types/content';
import { LifeSectionPage } from './LifeSectionPage';

interface PhotographyPageProps {
  home: HomeContent;
}

export function PhotographyPage({ home }: PhotographyPageProps) {
  return <LifeSectionPage home={home} section={getLifeSection('photography')} />;
}
