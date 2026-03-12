export type ArchiveSectionId = 'learning' | 'literature-art';

export interface ArchiveSection {
  id: ArchiveSectionId;
  label: string;
  path: `/${ArchiveSectionId}`;
  summary: string;
  tagline: string;
}

export const archiveSections: readonly ArchiveSection[] = [
  {
    id: 'learning',
    label: 'Learning',
    path: '/learning',
    summary: 'Study systems, course notes, reading methods, and reflective essays.',
    tagline: 'Build systems for learning, not fragments of memory.',
  },
  {
    id: 'literature-art',
    label: 'Literature&Art',
    path: '/literature-art',
    summary: 'Reading notes, cinema fragments, exhibition logs, and aesthetic traces.',
    tagline: 'Read slowly, notice form, and keep aesthetic traces.',
  },
] as const;

export function getArchiveSectionFromPath(pathname: string): ArchiveSection {
  const section = archiveSections.find(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  );

  return section ?? archiveSections[0];
}
