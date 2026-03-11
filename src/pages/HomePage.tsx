import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { PrismBackground } from '../components/PrismBackground';
import { ContactMethod, LifeCard, ResearchProject, SiteContent } from '../types/content';

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
  summary: string;
  title: string;
  to: string;
  type: 'life' | 'research';
}

function GlassPanel({ content, cta, summary, title, to, type }: GlassPanelProps) {
  const previewItems = content.slice(0, 2).map((item) => item.title);

  return (
    <Link to={to} className={`glass-panel glass-panel-${type} fade-in${type === 'research' ? ' stagger-1' : ''}`}>
      <div className="glass-panel-center">
        <h2>{title}</h2>
      </div>
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

export function HomePage({ siteContent }: HomePageProps) {
  const { home, lifeCards, researchProjects, contacts } = siteContent;
  const email = contacts.find((contact) => contact.type === 'email');
  const github = contacts.find((contact) => contact.type === 'github');
  const githubHandle = normalizeGithubHandle(github);
  const profileName = deriveProfileName(email, githubHandle);

  const openPrimaryContact = () => {
    if (email?.href) {
      window.location.href = email.href;
      return;
    }

    if (github?.href) {
      window.open(github.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="page page-home">
      <div className="home-background-layer" aria-hidden="true">
        <PrismBackground className="home-prism" />
      </div>

      <section className="home-layout" aria-label="Homepage overview">
        <section id="contact" className="home-profile-column fade-in" aria-labelledby="profile-title">
          <ProfileCard
            avatarUrl="/assets/profile-avatar.svg"
            miniAvatarUrl="/assets/profile-avatar.svg"
            behindGlowColor="rgba(126, 184, 255, 0.58)"
            behindGlowSize="58%"
            className="home-profile-card"
            contactText={email ? home.actions.sendEmail : home.actions.openLink}
            enableMobileTilt
            enableTilt
            handle={githubHandle}
            name={profileName}
            onContactClick={openPrimaryContact}
            status={home.stats.contact}
            title={home.badge}
          />
          <h1 id="profile-title" className="sr-only">
            Profile
          </h1>
        </section>

        <GlassPanel
          content={lifeCards}
          cta={home.previews.life.cta}
          summary={home.previews.life.summary}
          title={home.previews.life.title}
          to="/life"
          type="life"
        />
        <GlassPanel
          content={researchProjects}
          cta={home.previews.research.cta}
          summary={home.previews.research.summary}
          title={home.previews.research.title}
          to="/research"
          type="research"
        />
      </section>
    </div>
  );
}