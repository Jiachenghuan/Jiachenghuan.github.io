export type LifeSectionId = 'learning' | 'photography' | 'literature-art';

export interface LifeSectionDefinition {
  id: LifeSectionId;
  image: string;
  label: string;
  path: string;
  subtitle: string;
}

export const lifeSections: readonly LifeSectionDefinition[] = [
  {
    id: 'learning',
    image: '/assets/life-garden.svg',
    label: 'Learning',
    path: '/learning',
    subtitle: 'Notes, systems, and long-form curiosity.',
  },
  {
    id: 'photography',
    image: '/assets/life-travel.svg',
    label: 'Photography',
    path: '/photography',
    subtitle: 'Framing, walks, and visual observation.',
  },
  {
    id: 'literature-art',
    image: '/assets/life-cafe.svg',
    label: 'Literature&Art',
    path: '/literature-art',
    subtitle: 'Reading, cinema, and aesthetic fragments.',
  },
] as const;

export function getLifeSection(sectionId: LifeSectionId): LifeSectionDefinition {
  const section = lifeSections.find((item) => item.id === sectionId);

  if (!section) {
    throw new Error(`Unknown life section: ${sectionId}`);
  }

  return section;
}

export function getLegacyLifeTarget(hash: string): string {
  const normalizedHash = hash.replace(/^#/, '');
  return lifeSections.find((item) => item.id === normalizedHash)?.path ?? lifeSections[0].path;
}
