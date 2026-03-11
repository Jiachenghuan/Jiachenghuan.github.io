import { Link } from 'react-router-dom';
import { PrismBackground } from '../components/PrismBackground';
import { ContactMethod, HomeContent, LifeCard, ResearchProject, SiteContent } from '../types/content';

interface HomePageProps {
  siteContent: SiteContent;
}

interface ProfileCardPanelProps {
  contacts: ContactMethod[];
  home: HomeContent;
}

function ProfileCardPanel({ contacts, home }: ProfileCardPanelProps) {
  const email = contacts.find((contact) => contact.type === 'email');
  const github = contacts.find((contact) => contact.type === 'github');
  const wechat = contacts.find((contact) => contact.type === 'wechat');
  const githubHandle = github?.value.replace(/^https?:\/\/github\.com\//, '').replace(/^github\.com\//, '') || 'profile';

  return (
    <section id="contact" className="home-profile-column fade-in" aria-labelledby="profile-title">
      <div className="profile-card-wrapper">
        <div className="profile-card-glow" aria-hidden="true" />
        <div className="profile-card-shell">
          <article className="profile-card-surface">
            <div className="profile-card-shine" aria-hidden="true" />
            <div className="profile-card-glare" aria-hidden="true" />

            <div className="profile-card-main">
              <div className="profile-card-topline">{home.badge}</div>

              <div className="profile-card-art" aria-hidden="true">
                <div className="profile-card-orb">
                  <span>{home.navigation.home.slice(0, 1)}</span>
                </div>
              </div>

              <div className="profile-card-heading">
                <h1 id="profile-title">Profile</h1>
                <p>{home.lead}</p>
              </div>

              <div className="profile-contact-list">
                {email ? (
                  <a href={email.href} className="profile-contact-item">
                    <span className="profile-contact-label">{email.label}</span>
                    <strong>{email.value}</strong>
                  </a>
                ) : null}
                {github ? (
                  <a href={github.href} className="profile-contact-item" target="_blank" rel="noreferrer">
                    <span className="profile-contact-label">{github.label}</span>
                    <strong>{githubHandle}</strong>
                  </a>
                ) : null}
                {wechat ? (
                  <div className="profile-contact-item">
                    <span className="profile-contact-label">{wechat.label}</span>
                    <strong>{home.actions.wechatQr}</strong>
                  </div>
                ) : null}
              </div>

              <div className="profile-user-bar">
                <div className="profile-user-meta">
                  <div className="profile-mini-avatar">{home.navigation.home.slice(0, 1)}</div>
                  <div className="profile-user-text">
                    <span className="profile-user-handle">@{githubHandle}</span>
                    <span className="profile-user-status">{home.navigation.contact}</span>
                  </div>
                </div>
                {email ? (
                  <a href={email.href} className="profile-contact-button">
                    {home.actions.sendEmail}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

interface GlassPanelProps {
  content: LifeCard[] | ResearchProject[];
  cta: string;
  summary: string;
  title: string;
  to: string;
  type: 'life' | 'research';
}

function GlassPanel({ content, cta, summary, title, to, type }: GlassPanelProps) {
  const previewItems = content.slice(0, 2).map((item) => ('date' in item ? item.title : item.title));

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

  return (
    <div className="page page-home">
      <div className="home-background-layer" aria-hidden="true">
        <PrismBackground className="home-prism" />
      </div>

      <section className="home-layout" aria-label="Homepage overview">
        <ProfileCardPanel contacts={contacts} home={home} />
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
