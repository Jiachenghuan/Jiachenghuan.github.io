import {Link} from 'react-router-dom';
import {LifeFlowPanel} from '../components/LifeFlowPanel';
import ProfileCard from '../components/ProfileCard.tsx';
import {PrismBackground} from '../components/PrismBackground';
import {useLocale} from '../i18n/LocaleContext';
import {ContactMethod, LifeCard, Locale, ResearchProject, SiteContent} from '../types/content';

interface HomePageProps {
  siteContent: SiteContent;
}

const titleCase = (value: string) =>
  value
    .split(/[._\-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const normalizeGithubHandle = (contact?: ContactMethod) => {
  if (!contact?.value) {
    return 'profile';
  }

  return contact.value.replace(/^https?:\/\/github\.com\//, '').replace(/^github\.com\//, '').replace(/^@/, '') || 'profile';
};

const deriveProfileName = (email?: ContactMethod, githubHandle?: string) => {
  if (email?.value && !email.value.startsWith('your.name@')) {
    return titleCase(email.value.split('@')[0]);
  }

  if (githubHandle && githubHandle !== 'your-handle' && githubHandle !== 'profile') {
    return titleCase(githubHandle);
  }

  return 'Your Name';
};

interface GlassPanelProps {
  content: LifeCard[] | ResearchProject[];
  cta: string;
  locale: Locale;
  summary: string;
  title: string;
  to: string;
  type: 'life' | 'research';
}

function GlassPanel({content, cta, locale, summary, title, to, type}: GlassPanelProps) {
  const previewItems = content.slice(0, 2).map((item) => item.title);
  const researchMetrics =
    type === 'research'
      ? (() => {
          const researchContent = content as ResearchProject[];
          const years = researchContent.map((item) => Number(item.year)).filter((value) => Number.isFinite(value));
          const yearRange = years.length ? `${Math.min(...years)}-${Math.max(...years)}` : '--';
          const keywordCount = new Set(researchContent.flatMap((item) => item.keywords)).size;

          return {
            indexLabel: locale === 'zh' ? '\u7814\u7a76\u7d22\u5f15' : 'Research Index',
            keywordCount: String(keywordCount).padStart(2, '0'),
            keywordLabel: locale === 'zh' ? '\u5173\u952e\u8bcd' : 'Keywords',
            projectCount: String(researchContent.length).padStart(2, '0'),
            projectLabel: locale === 'zh' ? '\u9879\u76ee' : 'Projects',
            yearRange,
          };
        })()
      : null;

  return (
    <Link to={to} className={`glass-panel glass-panel-${type} fade-in${type === 'research' ? ' stagger-1' : ''}`}>
      <div className="glass-panel-center">
        <h2>{title}</h2>
      </div>
      {type === 'research' && researchMetrics ? (
        <div className="glass-panel-research-accent" aria-hidden="true">
          <span className="glass-panel-research-kicker">{researchMetrics.indexLabel}</span>
          <div className="glass-panel-research-stats">
            <div>
              <span>{researchMetrics.projectLabel}</span>
              <strong>{researchMetrics.projectCount}</strong>
            </div>
            <div>
              <span>{researchMetrics.keywordLabel}</span>
              <strong>{researchMetrics.keywordCount}</strong>
            </div>
          </div>
          <div className="glass-panel-research-chart">
            <span />
            <span />
            <span />
            <i className="glass-panel-research-scan" />
          </div>
          <span className="glass-panel-research-years">{researchMetrics.yearRange}</span>
        </div>
      ) : null}
      <div className="glass-panel-footer">
        <p>{summary}</p>
        <div className="glass-panel-meta">
          <div className="glass-panel-tags">
            {previewItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <span className="glass-panel-cta">{cta}</span>
        </div>
      </div>
    </Link>
  );
}

export function HomePage({siteContent}: HomePageProps) {
  const {locale} = useLocale();
  const {home, lifeCards, researchProjects, contacts} = siteContent;
  const email = contacts.find((contact) => contact.type === 'email');
  const github = contacts.find((contact) => contact.type === 'github');
  const githubHandle = normalizeGithubHandle(github);
  const profileName = deriveProfileName(email, githubHandle);
  const contactLine =
    email?.value || github?.value || (locale === 'zh' ? '\u8054\u7cfb\u65b9\u5f0f\uff1a\u5f85\u8865\u5145' : 'Contact: To be added');
  const profileLines =
    locale === 'zh'
      ? [
          '\u804c\u4f4d\uff1a\u5f85\u8865\u5145',
          '\u5355\u4f4d\uff1a\u5f85\u8865\u5145',
          `\u8054\u7cfb\u65b9\u5f0f\uff1a${contactLine}`,
        ]
      : ['Position: To be added', 'Affiliation: To be added', `Contact: ${contactLine}`];

  return (
    <div className="page page-home">
      <div className="home-background-layer" aria-hidden="true">
        <PrismBackground className="home-prism" />
      </div>

      <section className="home-layout" aria-label="Homepage overview">
        <section id="contact" className="home-profile-panel fade-in" aria-labelledby="profile-title">
          <ProfileCard
            avatarUrl="/assets/profile-avatar.svg"
            className="home-profile-card"
            enableMobileTilt
            enableTilt
            innerGradient="linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02))"
            name={profileName}
            profileLines={profileLines}
          />
          <h1 id="profile-title" className="sr-only">
            Profile
          </h1>
        </section>

        <LifeFlowPanel content={lifeCards} home={home} />
        <GlassPanel
          content={researchProjects}
          cta={home.previews.research.cta}
          locale={locale}
          summary={home.previews.research.summary}
          title={home.previews.research.title}
          to="/research"
          type="research"
        />
      </section>
    </div>
  );
}
