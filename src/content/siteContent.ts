import { useLocale } from '../i18n/LocaleContext';
import { Locale, SiteContent } from '../types/content';

const siteContentByLocale: Record<Locale, SiteContent> = {
  zh: {
    home: {
      badge: 'Personal Website',
      title: '把生活、研究与联系渠道放在同一张首页里。',
      lead: 'Home 是一个用于长期展示个人轨迹的 GitHub Pages 站点。',
      intro:
        '这里既可以放松地记录生活观察，也能清晰地介绍研究项目，并保留简洁直接的联系方式。当前内容为示例数据，结构已经按后续真实资料替换做好。',
      navigation: {
        home: '首页',
        life: '个人生活',
        research: '学术研究',
        contact: '联系方式',
      },
      stats: {
        life: '生活片段',
        research: '研究项目',
        contact: '联系渠道',
      },
      actions: {
        sendEmail: '发送邮件',
        openLink: '打开链接',
        wechatQr: '微信二维码',
      },
      previewTitle: '主页预览',
      previewSubtitle: '三条清晰主线：个人生活、学术研究、联系方式。',
      previews: {
        life: {
          title: 'Personal Life',
          summary: '用图文卡片记录周末散步、咖啡馆写作、旅途观察和日常片段。',
          cta: '查看生活分区',
        },
        research: {
          title: 'Academic Research',
          summary: '用项目卡片组织研究方向、关键问题、年份、关键词与论文/代码入口。',
          cta: '查看研究分区',
        },
        contact: {
          title: 'Contact',
          summary: '用一页集中展示邮箱、GitHub 与微信二维码，便于学术或合作联系。',
          cta: '查看联系方式',
        },
      },
      footerNote: 'Built for GitHub Pages with bilingual content switching.',
    },
    lifeCards: [
      {
        id: 'life-garden',
        title: '周末花园与慢速观察',
        date: '2026.03',
        summary: '把一天的注意力留给植物、光线和手写记录。这个分区适合放生活照片、短文和稳定更新的小节奏。',
        image: '/assets/life-garden.svg',
        tags: ['Weekend', 'Notes', 'Garden'],
      },
      {
        id: 'life-travel',
        title: '城市边缘的步行路线',
        date: '2026.02',
        summary: '用散步和短途出行整理日常感受，也可以把旅行中的场景、地图和见闻组合成一组图文卡片。',
        image: '/assets/life-travel.svg',
        tags: ['Walk', 'Travel', 'City'],
      },
      {
        id: 'life-cafe',
        title: '安静咖啡馆里的长草稿',
        date: '2026.01',
        summary: '适合记录阅读片段、写作状态和个人节奏，让个人网站不只展示成果，也能展示真实的生活方式。',
        image: '/assets/life-cafe.svg',
        tags: ['Cafe', 'Writing', 'Reading'],
      },
    ],
    researchProjects: [
      {
        id: 'research-multimodal',
        title: '多模态学习中的结构化推理',
        summary: '聚焦跨模态表征和结构约束，展示项目背景、研究问题、方法概览与当前阶段成果。',
        year: '2026',
        keywords: ['Multimodal', 'Reasoning', 'Representation'],
        links: [
          { label: 'Paper', href: 'https://example.com/paper' },
          { label: 'Code', href: 'https://github.com/example/project' },
        ],
      },
      {
        id: 'research-systems',
        title: '面向科研工作流的可复现系统',
        summary: '展示数据处理、实验追踪和结果复用的系统设计，强调方法之外的工程能力和协作方式。',
        year: '2025',
        keywords: ['Systems', 'Reproducibility', 'Workflow'],
        links: [
          { label: 'Project', href: 'https://example.com/project' },
          { label: 'Repository', href: 'https://github.com/example/workflow' },
        ],
      },
      {
        id: 'research-human-ai',
        title: 'Human-AI 协作中的解释与反馈回路',
        summary: '用卡片形式说明研究动机、实验设置、观察结果，以及下一阶段准备推进的问题。',
        year: '2024',
        keywords: ['Human-AI', 'Interaction', 'Evaluation'],
        links: [
          { label: 'Summary', href: 'https://example.com/summary' },
          { label: 'Slides', href: 'https://example.com/slides' },
        ],
      },
    ],
    contacts: [
      {
        type: 'email',
        label: 'Email',
        value: 'your.name@example.com',
        href: 'mailto:your.name@example.com',
      },
      {
        type: 'github',
        label: 'GitHub',
        value: 'github.com/your-handle',
        href: 'https://github.com/your-handle',
      },
      {
        type: 'wechat',
        label: 'WeChat',
        value: '扫码占位图，后续替换为你的真实二维码。',
      },
    ],
  },
  en: {
    home: {
      badge: 'Personal Website',
      title: 'One place for life notes, research work, and contact details.',
      lead: 'Home is a GitHub Pages site for presenting a long-term personal profile.',
      intro:
        'It is designed to hold everyday observations, academic projects, and direct contact channels in one coherent space. The current copy is seeded with placeholder content, but the structure is ready for real material.',
      navigation: {
        home: 'Home',
        life: 'Personal Life',
        research: 'Academic Research',
        contact: 'Contact',
      },
      stats: {
        life: 'Life stories',
        research: 'Research projects',
        contact: 'Contact channels',
      },
      actions: {
        sendEmail: 'Send email',
        openLink: 'Open link',
        wechatQr: 'WeChat QR',
      },
      previewTitle: 'Home Preview',
      previewSubtitle: 'Three clear tracks: personal life, academic research, and contact.',
      previews: {
        life: {
          title: 'Personal Life',
          summary: 'Use editorial image cards to share walks, cafes, travel fragments, and ordinary routines.',
          cta: 'Open the life page',
        },
        research: {
          title: 'Academic Research',
          summary: 'Use project cards to present themes, research questions, years, keywords, and paper/code links.',
          cta: 'Open the research page',
        },
        contact: {
          title: 'Contact',
          summary: 'Keep email, GitHub, and WeChat access in one place for collaboration and outreach.',
          cta: 'Open the contact page',
        },
      },
      footerNote: 'Built for GitHub Pages with bilingual content switching.',
    },
    lifeCards: [
      {
        id: 'life-garden',
        title: 'Weekend Garden Notes',
        date: '03.2026',
        summary: 'A slower section for plants, light, and handwritten observations. It works well for photos, short texts, and steady personal updates.',
        image: '/assets/life-garden.svg',
        tags: ['Weekend', 'Notes', 'Garden'],
      },
      {
        id: 'life-travel',
        title: 'Field Walks at the Edge of the City',
        date: '02.2026',
        summary: 'This card pattern also fits travel notes, route sketches, and small visual essays built from daily movement.',
        image: '/assets/life-travel.svg',
        tags: ['Walk', 'Travel', 'City'],
      },
      {
        id: 'life-cafe',
        title: 'Long Drafts in Quiet Cafes',
        date: '01.2026',
        summary: 'A place to document reading, drafting, and the rhythms behind the public-facing work on the site.',
        image: '/assets/life-cafe.svg',
        tags: ['Cafe', 'Writing', 'Reading'],
      },
    ],
    researchProjects: [
      {
        id: 'research-multimodal',
        title: 'Structured Reasoning in Multimodal Learning',
        summary: 'Present the problem setting, method sketch, and current outcomes for a cross-modal representation project.',
        year: '2026',
        keywords: ['Multimodal', 'Reasoning', 'Representation'],
        links: [
          { label: 'Paper', href: 'https://example.com/paper' },
          { label: 'Code', href: 'https://github.com/example/project' },
        ],
      },
      {
        id: 'research-systems',
        title: 'Reproducible Systems for Research Workflows',
        summary: 'Show how data handling, experiment tracking, and reusable outputs support strong research operations.',
        year: '2025',
        keywords: ['Systems', 'Reproducibility', 'Workflow'],
        links: [
          { label: 'Project', href: 'https://example.com/project' },
          { label: 'Repository', href: 'https://github.com/example/workflow' },
        ],
      },
      {
        id: 'research-human-ai',
        title: 'Explanation and Feedback Loops in Human-AI Collaboration',
        summary: 'Frame the motivation, setup, observations, and next-stage questions in a compact project-card format.',
        year: '2024',
        keywords: ['Human-AI', 'Interaction', 'Evaluation'],
        links: [
          { label: 'Summary', href: 'https://example.com/summary' },
          { label: 'Slides', href: 'https://example.com/slides' },
        ],
      },
    ],
    contacts: [
      {
        type: 'email',
        label: 'Email',
        value: 'your.name@example.com',
        href: 'mailto:your.name@example.com',
      },
      {
        type: 'github',
        label: 'GitHub',
        value: 'github.com/your-handle',
        href: 'https://github.com/your-handle',
      },
      {
        type: 'wechat',
        label: 'WeChat',
        value: 'Scan the placeholder QR and replace it with your own code.',
      },
    ],
  },
};

export function useLocalizedSiteContent(): SiteContent {
  const { locale } = useLocale();
  return siteContentByLocale[locale];
}
