import {Locale} from '../types/content';

export type ArchiveSectionId = 'learning' | 'literature-art';

export interface ArchivePostSection {
  id: string;
  title: string;
  paragraphs: string[];
  children?: ArchivePostSection[];
}

export interface ArchivePost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  tags: string[];
  eyebrow: string;
  accent: string;
  sections: ArchivePostSection[];
}

interface ArchiveSectionCopy {
  eyebrow: string;
  description: string;
  railNote: string;
}

interface ArchiveSectionRecord {
  id: ArchiveSectionId;
  label: string;
  path: `/${ArchiveSectionId}`;
  copy: Record<Locale, ArchiveSectionCopy>;
  posts: ArchivePost[];
}

export interface ArchiveUiText {
  archiveLabel: string;
  brandTitle: string;
  homeLabel: string;
  sectionsLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  allLabel: string;
  resultsLabel: string;
  tagLabel: string;
  searchSummaryLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  openArticleLabel: string;
  outlineLabel: string;
  articleLabel: string;
  backLabel: string;
  titleSearchNote: string;
  tagFilterNote: string;
}

export interface ArchiveSectionContent {
  id: ArchiveSectionId;
  label: string;
  path: `/${ArchiveSectionId}`;
  eyebrow: string;
  description: string;
  railNote: string;
  posts: ArchivePost[];
  ui: ArchiveUiText;
}

const uiByLocale: Record<Locale, ArchiveUiText> = {
  zh: {
    archiveLabel: '\u4e2a\u4eba\u751f\u6d3b',
    brandTitle: 'Personal Archive',
    homeLabel: '\u9996\u9875',
    sectionsLabel: '\u680f\u76ee',
    searchLabel: '\u641c\u7d22\u6807\u9898',
    searchPlaceholder: '\u8f93\u5165\u6807\u9898\u5173\u952e\u8bcd',
    allLabel: '\u5168\u90e8',
    resultsLabel: '\u5f53\u524d\u663e\u793a',
    tagLabel: '\u6807\u7b7e',
    searchSummaryLabel: '\u641c\u7d22',
    emptyTitle: '\u6ca1\u6709\u5339\u914d\u7ed3\u679c',
    emptyDescription: '\u5f53\u524d\u641c\u7d22\u53ea\u5339\u914d\u6807\u9898\u3002\u53ef\u4ee5\u6e05\u7a7a\u5173\u952e\u8bcd\uff0c\u6216\u5207\u6362\u6807\u7b7e\u3002',
    openArticleLabel: '\u8fdb\u5165\u6587\u7ae0',
    outlineLabel: '\u5927\u7eb2',
    articleLabel: '\u6587\u7ae0',
    backLabel: '\u8fd4\u56de',
    titleSearchNote: '\u4ec5\u652f\u6301\u6309\u6807\u9898\u641c\u7d22',
    tagFilterNote: '\u652f\u6301\u6309 tag \u5206\u7c7b\u8fc7\u6ee4',
  },
  en: {
    archiveLabel: 'Personal Life',
    brandTitle: 'Personal Archive',
    homeLabel: 'Home',
    sectionsLabel: 'Sections',
    searchLabel: 'Search Titles',
    searchPlaceholder: 'Type a title keyword',
    allLabel: 'All',
    resultsLabel: 'Showing',
    tagLabel: 'Tag',
    searchSummaryLabel: 'Search',
    emptyTitle: 'No matching articles',
    emptyDescription: 'Search currently matches titles only. Clear the keyword or switch tags.',
    openArticleLabel: 'Open Article',
    outlineLabel: 'Outline',
    articleLabel: 'Articles',
    backLabel: 'Back to',
    titleSearchNote: 'Title-only search',
    tagFilterNote: 'Tag-based grouping and filtering',
  },
};

const archiveSections: readonly ArchiveSectionRecord[] = [
  {
    id: 'learning',
    label: 'Learning',
    path: '/learning',
    copy: {
      zh: {
        eyebrow: '\u5b66\u4e60\u4e0e\u8bb0\u5f55',
        description: '\u505a\u6210 archive \u611f\u7684\u6587\u7ae0\u5217\u8868\uff0c\u7528\u4e8e\u627f\u63a5\u5b66\u4e60\u7cfb\u7edf\u3001\u8bfe\u7a0b\u7b14\u8bb0\u3001\u9605\u8bfb\u6a21\u677f\u548c\u957f\u671f\u590d\u76d8\u3002',
        railNote: '\u8fd9\u4e00\u680f\u540e\u7eed\u53ef\u4ee5\u76f4\u63a5\u8fc1\u79fb\u5230 Docusaurus \u7684 docs/blog \u5185\u5bb9\u7ed3\u6784\u3002',
      },
      en: {
        eyebrow: 'Learning Archive',
        description: 'An editorial archive shell for study systems, course notes, reading templates, and slow review loops.',
        railNote: 'This structure can be migrated into Docusaurus docs or blog content later without changing the information model.',
      },
    },
    posts: [
      {
        slug: 'learning-system',
        title: 'Building a learning system that still works next year',
        description: 'Start with inputs, structure, and outputs before chasing efficiency.',
        date: '2026.03.12',
        readMinutes: 6,
        tags: ['Learning System', 'Methodology'],
        eyebrow: 'System Note',
        accent: '#d2a56d',
        sections: [
          {
            id: 'loop',
            title: 'Learning needs a loop, not a stash',
            paragraphs: [
              'Most note systems fail because they collect material without designing how it will be reused. The archive grows, but understanding does not.',
              'A better model treats every note as part of a loop: selective input, clear structure, and some form of output that forces the idea back into motion.',
            ],
          },
          {
            id: 'input',
            title: 'Reduce the number of entry points',
            paragraphs: [
              'When every feed, course, and recommendation can enter the system, the system stops being selective. It becomes a second internet tab.',
            ],
            children: [
              {
                id: 'input-sources',
                title: 'Choose fewer sources',
                paragraphs: [
                  'Choose a smaller set of sources you are willing to revisit. Repetition is a feature here, not a weakness.',
                ],
              },
              {
                id: 'input-rules',
                title: 'Set admission rules',
                paragraphs: [
                  'Not every interesting idea deserves entry. Keep what can be reused, tested, or moved into active work.',
                ],
              },
            ],
          },
          {
            id: 'structure',
            title: 'Organize by question instead of source',
            paragraphs: [
              'Sorting by platform is convenient but shallow. Sorting by question, theme, or active work produces a structure that stays useful when the source no longer matters.',
            ],
            children: [
              {
                id: 'structure-context',
                title: 'Keep only the minimum context',
                paragraphs: [
                  'A good note should tell you what problem it belongs to, why it matters, and when you expect to use it again.',
                ],
              },
            ],
          },
          {
            id: 'output',
            title: 'Output is the real test of clarity',
            paragraphs: [
              'A short summary, a small card, or a paragraph written from memory often reveals whether the note actually compressed the idea.',
              'Without output, even a beautiful archive remains mostly decorative.',
            ],
          },
        ],
      },
      {
        slug: 'course-note-modeling',
        title: 'Turning course notes into reusable models',
        description: 'Course notes should become draft structures for the next output, not dead transcripts.',
        date: '2026.03.08',
        readMinutes: 5,
        tags: ['Course Notes', 'Methodology'],
        eyebrow: 'Course Note',
        accent: '#7fb0bd',
        sections: [
          {
            id: 'transcript',
            title: 'Why transcripts die quickly',
            paragraphs: [
              'Many notes preserve the lecture timeline but lose the relationships between concepts. That makes them hard to revisit once the class is over.',
              'If the only thing a note remembers is sequence, it cannot support transfer.',
            ],
          },
          {
            id: 'layers',
            title: 'Capture ideas in layers',
            paragraphs: [
              'First keep the core terms, definitions, and examples. Then identify the relations, boundaries, and tensions between those ideas.',
              'The second layer is where a note stops being a record and starts becoming a model.',
            ],
          },
          {
            id: 'questions',
            title: 'Compress the lesson into a few sharp questions',
            paragraphs: [
              'If one session can be reduced to three or four durable questions, the note becomes portable. You can use those questions to review, explain, or write later.',
              'Questions travel better than chronological bullet points.',
            ],
          },
          {
            id: 'reuse',
            title: 'Design notes for the next artifact',
            paragraphs: [
              'Treat the note as the first draft of something else: a recap, a talk, a visual map, or an article skeleton.',
              'That small shift changes what you preserve and what you let go.',
            ],
          },
        ],
      },
      {
        slug: 'reading-note-template',
        title: 'A reading note template simple enough to keep using',
        description: 'The point is not to fill every field, but to leave a structure you can actually reuse.',
        date: '2026.03.03',
        readMinutes: 4,
        tags: ['Reading Methods', 'Learning System'],
        eyebrow: 'Reading Method',
        accent: '#c66b52',
        sections: [
          {
            id: 'question',
            title: 'Begin with the real question',
            paragraphs: [
              'A reading note becomes sharper when it starts from the problem the text is trying to answer, not from the first paragraph it happens to contain.',
              'Naming the question keeps the note from collapsing into passive summary.',
            ],
          },
          {
            id: 'arguments',
            title: 'Keep only the arguments that matter later',
            paragraphs: [
              'Most writing does not need to be summarized evenly. The useful part is the small set of claims, examples, or distinctions you expect to reuse.',
              'The note should feel selective, not exhaustive.',
            ],
          },
          {
            id: 'judgment',
            title: 'Store your own judgment too',
            paragraphs: [
              'A note that contains only the author leaves no record of how the text changed your view. Agreement, resistance, and uncertainty all deserve a place in the archive.',
              'That layer is often what makes a note worth revisiting.',
            ],
          },
          {
            id: 'next-step',
            title: 'End with one concrete next move',
            paragraphs: [
              'Write down how the note should be used next: a card, a cross-reference, a quote to verify, or a paragraph to draft.',
              'A next move keeps the archive from freezing into storage.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'literature-art',
    label: 'Literature&Art',
    path: '/literature-art',
    copy: {
      zh: {
        eyebrow: '\u9605\u8bfb\u4e0e\u5ba1\u7f8e',
        description: '\u8fd9\u4e2a\u5206\u533a\u7528\u6765\u627f\u63a5\u9605\u8bfb\u624b\u8bb0\u3001\u7535\u5f71\u89c2\u5bdf\u3001\u5c55\u89c8\u8bb0\u5f55\u4e0e\u5ba1\u7f8e\u7247\u6bb5\u3002',
        railNote: '\u4f60\u540e\u7eed\u53ef\u4ee5\u7ee7\u7eed\u628a md \u6b63\u6587\u3001 tags \u548c\u641c\u7d22\u76f4\u63a5\u63a5\u5165\u5230 Docusaurus \u3002',
      },
      en: {
        eyebrow: 'Literature & Art Archive',
        description: 'A slower archive for reading notes, cinema observations, exhibition memory, and aesthetic fragments.',
        railNote: 'The listing and article structure already matches the kind of content model that can be moved into Docusaurus later.',
      },
    },
    posts: [
      {
        slug: 'city-night-in-cinema',
        title: 'Why city nights in cinema stay in memory',
        description: 'Light, distance, and rhythm build an emotional city before the plot is what you remember.',
        date: '2026.03.11',
        readMinutes: 5,
        tags: ['Cinema', 'Aesthetics'],
        eyebrow: 'Cinema Note',
        accent: '#8a86d8',
        sections: [
          {
            id: 'space',
            title: 'Space arrives before character',
            paragraphs: [
              'A strong city night scene often establishes temperature before conflict. The street, color, moisture, and distance tell you how to feel before the character speaks.',
              'That spatial mood is part of the narrative structure, not background decoration.',
            ],
          },
          {
            id: 'light',
            title: 'Light creates rhythm inside darkness',
            paragraphs: [
              'The eye moves toward brightness, so every illuminated patch in a night frame behaves like a stress mark in a sentence.',
            ],
            children: [
              {
                id: 'light-bright-zones',
                title: 'Bright zones guide attention',
                paragraphs: [
                  'Every highlight in a night frame functions like a visual stress point. It tells the eye where to land first.',
                ],
              },
              {
                id: 'light-darkness',
                title: 'Darkness keeps the city breathable',
                paragraphs: [
                  'Darkness matters because it leaves room around the image. Without that room, the city loses depth and memory.',
                ],
              },
            ],
          },
          {
            id: 'distance',
            title: 'Camera distance changes the scale of feeling',
            paragraphs: [
              'A long shot makes the city feel structural, while a close shot makes it tactile. The same street can feel like architecture or weather depending on distance.',
              'That shift is part of why night scenes often remain in the body after the story details fade.',
            ],
          },
          {
            id: 'afterimage',
            title: 'What remains is an afterimage, not a summary',
            paragraphs: [
              'People rarely remember the entire scene accurately. They remember a corner, a color, an empty lane, or the speed of one walk.',
              'The best night scenes are remembered as atmosphere condensed into one image fragment.',
            ],
          },
        ],
      },
      {
        slug: 'literary-note-practice',
        title: 'Literary notes should keep your own response, not only quotes',
        description: 'A strong note on literature records what happened between you and the text.',
        date: '2026.03.07',
        readMinutes: 4,
        tags: ['Reading', 'Aesthetics'],
        eyebrow: 'Reading Journal',
        accent: '#d78d72',
        sections: [
          {
            id: 'feeling',
            title: 'Record feeling before structure',
            paragraphs: [
              'The first reaction often disappears once analysis begins. If you do not preserve it early, the note may become clean but emotionally empty.',
              'Feeling is not a preliminary stage to discard. It is part of the reading event.',
            ],
          },
          {
            id: 'language',
            title: 'Notice language as texture',
            paragraphs: [
              'Some sentences matter because they stop time for a moment. Others change the temperature of the paragraph without announcing themselves.',
              'A literary note should catch that texture, not only the paraphrasable meaning.',
            ],
          },
          {
            id: 'structure-note',
            title: 'Return to structure after the first impression',
            paragraphs: [
              'Once the emotional mark is saved, you can ask how the text produced it: pacing, repetition, distance, or changes in point of view.',
              'That second pass gives the note analytical shape without flattening it.',
            ],
          },
          {
            id: 'reply',
            title: 'The best notes still answer back later',
            paragraphs: [
              'If a note remains alive after a few weeks, it means it kept your question, your disagreement, and the strange pull of the original passage together.',
              'That is what makes it more than an extraction workflow.',
            ],
          },
        ],
      },
      {
        slug: 'how-an-exhibition-is-remembered',
        title: 'How an exhibition is remembered after you leave',
        description: 'Exhibitions are often remembered less as isolated works and more as a carefully shaped path of attention.',
        date: '2026.03.01',
        readMinutes: 5,
        tags: ['Exhibition', 'Aesthetics'],
        eyebrow: 'Exhibition Note',
        accent: '#6e9a8e',
        sections: [
          {
            id: 'entry',
            title: 'The entry already sets the posture',
            paragraphs: [
              'The first room often decides how quickly you walk, how close you stand, and how much silence you are willing to hold.',
              'That opening is not neutral. It calibrates attention for everything that follows.',
            ],
          },
          {
            id: 'sequence',
            title: 'Curation behaves like narrative order',
            paragraphs: [
              'When works are sequenced with a visible rhythm, the visitor reads the path almost like syntax. One room modifies the meaning of the next.',
              'That is why exhibitions can feel authored even when they contain many independent works.',
            ],
          },
          {
            id: 'break',
            title: 'Breaks are as important as continuity',
            paragraphs: [
              'A corner, a dim transition, or a spare interval between works can create the pressure that makes the next object land harder.',
              'Negative space is part of exhibition writing.',
            ],
          },
          {
            id: 'memory',
            title: 'What memory keeps is often a route',
            paragraphs: [
              'Long after a visit, people often remember where they slowed down, where they turned, and where one work echoed another.',
              'The exhibition survives in memory as movement through designed space.',
            ],
          },
        ],
      },
    ],
  },
] as const;

export function getArchiveSectionContent(sectionId: ArchiveSectionId, locale: Locale): ArchiveSectionContent {
  const section = archiveSections.find((item) => item.id === sectionId);

  if (!section) {
    throw new Error(`Unknown archive section: ${sectionId}`);
  }

  return {
    id: section.id,
    label: section.label,
    path: section.path,
    eyebrow: section.copy[locale].eyebrow,
    description: section.copy[locale].description,
    railNote: section.copy[locale].railNote,
    posts: [...section.posts],
    ui: uiByLocale[locale],
  };
}

export function getArchiveSections(locale: Locale) {
  return archiveSections.map((section) => ({
    id: section.id,
    label: section.label,
    path: section.path,
    eyebrow: section.copy[locale].eyebrow,
  }));
}

export function getArchivePost(sectionId: ArchiveSectionId, slug: string) {
  const section = archiveSections.find((item) => item.id === sectionId);
  return section?.posts.find((post) => post.slug === slug);
}
