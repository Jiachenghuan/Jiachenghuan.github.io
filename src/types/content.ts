export type Locale = 'zh' | 'en';

export interface PreviewBlock {
  title: string;
  summary: string;
  cta: string;
}

export interface HomeContent {
  badge: string;
  title: string;
  lead: string;
  intro: string;
  navigation: {
    home: string;
    life: string;
    research: string;
    contact: string;
  };
  stats: {
    life: string;
    research: string;
    contact: string;
  };
  actions: {
    sendEmail: string;
    openLink: string;
    wechatQr: string;
  };
  previewTitle: string;
  previewSubtitle: string;
  previews: {
    life: PreviewBlock;
    research: PreviewBlock;
    contact: PreviewBlock;
  };
  footerNote: string;
}

export interface LifeCard {
  id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  tags?: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  summary: string;
  year: string;
  keywords: string[];
  links: ProjectLink[];
}

export interface ContactMethod {
  type: 'email' | 'github' | 'wechat';
  label: string;
  value: string;
  href?: string;
}

export interface SiteContent {
  home: HomeContent;
  lifeCards: LifeCard[];
  researchProjects: ResearchProject[];
  contacts: ContactMethod[];
}
