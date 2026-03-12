import {themes as prismThemes} from 'prism-react-renderer';
import type {Options as BlogPluginOptions} from '@docusaurus/plugin-content-blog';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const createBlogSection = (
  id: 'learning' | 'literature-art',
  title: string,
  description: string,
): [string, BlogPluginOptions] => [
  '@docusaurus/plugin-content-blog',
  {
    id,
    path: id,
    routeBasePath: id,
    tagsBasePath: 'tags',
    pageBasePath: 'page',
    archiveBasePath: null,
    postsPerPage: 'ALL',
    blogTitle: title,
    blogDescription: description,
    blogSidebarCount: 0,
    blogSidebarTitle: title,
    showReadingTime: true,
    feedOptions: {
      type: null,
    },
    authorsBasePath: 'authors',
    authorsMapPath: 'authors.yml',
    onInlineTags: 'ignore',
    onInlineAuthors: 'ignore',
    onUntruncatedBlogPosts: 'ignore',
  },
];

const config: Config = {
  title: 'Personal Archive',
  tagline: 'Learning and literature notes, built with Docusaurus.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://jiachenghuan.github.io',
  baseUrl: '/',
  organizationName: 'Jiachenghuan',
  projectName: 'Jiachenghuan.github.io',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    createBlogSection(
      'learning',
      'Learning',
      'Structured learning notes, study systems, and reflective essays.',
    ),
    createBlogSection(
      'literature-art',
      'Literature&Art',
      'Reading notes, cinema fragments, and aesthetic field observations.',
    ),
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
