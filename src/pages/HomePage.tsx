import { Link } from 'react-router-dom';
import { PrismBackground } from '../components/PrismBackground';
import { SiteContent } from '../types/content';

interface HomePageProps {
  siteContent: SiteContent;
}

export function HomePage({ siteContent }: HomePageProps) {
  const { home, lifeCards, researchProjects, contacts } = siteContent;
  const directContacts = contacts.filter((contact) => contact.type !== 'wechat');
  const wechat = contacts.find((contact) => contact.type === 'wechat');

  return (
    <div className="page page-home">
      <div className="home-background-layer" aria-hidden="true">
        <PrismBackground
          animationType="rotate"
          baseWidth={5.8}
          bloom={1.15}
          colorFrequency={1.4}
          glow={1.2}
          noise={0.1}
          scale={3.9}
          suspendWhenOffscreen
          timeScale={0.45}
        />
      </div>
      <div className="home-background-scrim" aria-hidden="true" />

      <section className="hero home-hero">
        <div className="hero-copy fade-in">
          <span className="eyebrow">{home.badge}</span>
          <h1>{home.title}</h1>
          <p className="hero-lead">{home.lead}</p>
          <p className="hero-intro">{home.intro}</p>
        </div>

        <div className="hero-panel slide-in">
          <div className="hero-panel-copy">
            <span className="hero-panel-kicker">{home.previewTitle}</span>
            <p>{home.previewSubtitle}</p>
          </div>
          <div className="hero-stat-grid">
            <div className="hero-stat">
              <span>{lifeCards.length}</span>
              <p>{home.stats.life}</p>
            </div>
            <div className="hero-stat">
              <span>{researchProjects.length}</span>
              <p>{home.stats.research}</p>
            </div>
            <div className="hero-stat">
              <span>{contacts.length}</span>
              <p>{home.stats.contact}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-panels">
        <Link to="/life" className="feature-panel preview-life fade-in" aria-label={home.previews.life.cta}>
          <div className="feature-panel-head">
            <span className="eyebrow">{home.navigation.life}</span>
            <h2>{home.previews.life.title}</h2>
          </div>
          <p>{home.previews.life.summary}</p>
          <div className="feature-list">
            {lifeCards.slice(0, 2).map((card) => (
              <div className="feature-list-item" key={card.id}>
                <span className="feature-meta">{card.date}</span>
                <strong>{card.title}</strong>
              </div>
            ))}
          </div>
          <span className="feature-cta">{home.previews.life.cta}</span>
        </Link>

        <Link to="/research" className="feature-panel preview-research fade-in stagger-1" aria-label={home.previews.research.cta}>
          <div className="feature-panel-head">
            <span className="eyebrow">{home.navigation.research}</span>
            <h2>{home.previews.research.title}</h2>
          </div>
          <p>{home.previews.research.summary}</p>
          <div className="feature-list">
            {researchProjects.slice(0, 2).map((project) => (
              <div className="feature-list-item" key={project.id}>
                <span className="feature-meta">{project.year}</span>
                <strong>{project.title}</strong>
              </div>
            ))}
          </div>
          <span className="feature-cta">{home.previews.research.cta}</span>
        </Link>

        <section id="contact" className="home-contact-panel fade-in stagger-2" aria-labelledby="contact-heading">
          <div className="home-contact-head">
            <span className="eyebrow">{home.navigation.contact}</span>
            <h2 id="contact-heading">{home.previews.contact.title}</h2>
            <p>{home.previews.contact.summary}</p>
          </div>

          <div className="home-contact-grid">
            <div className="home-contact-list">
              {directContacts.map((contact) => {
                const isEmail = contact.href?.startsWith('mailto:');

                return (
                  <article className="home-contact-item" key={contact.type}>
                    <span className="contact-type">{contact.label}</span>
                    <p>{contact.value}</p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={isEmail ? undefined : '_blank'}
                        rel={isEmail ? undefined : 'noreferrer'}
                        className="contact-action"
                      >
                        {isEmail ? home.actions.sendEmail : home.actions.openLink}
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>

            <aside className="home-contact-qr">
              <img src="/assets/wechat-placeholder.svg" alt={home.actions.wechatQr} />
              <div>
                <h3>{home.actions.wechatQr}</h3>
                <p>{wechat?.value}</p>
              </div>
            </aside>
          </div>
        </section>
      </section>
    </div>
  );
}
