import { Link } from 'react-router-dom';
import { SiteContent } from '../types/content';

interface HomePageProps {
  siteContent: SiteContent;
}

export function HomePage({ siteContent }: HomePageProps) {
  const { home, lifeCards, researchProjects, contacts } = siteContent;

  return (
    <div className="page page-home">
      <section className="hero">
        <div className="hero-copy fade-in">
          <span className="eyebrow">{home.badge}</span>
          <h1>{home.title}</h1>
          <p className="hero-lead">{home.lead}</p>
          <p className="hero-intro">{home.intro}</p>
        </div>
        <div className="hero-panel slide-in">
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
      </section>

      <section className="preview-section">
        <div className="section-heading">
          <span className="eyebrow">{home.previewTitle}</span>
          <h2>{home.previewSubtitle}</h2>
        </div>
        <div className="preview-grid">
          <article className="preview-card preview-life fade-in">
            <h3>{home.previews.life.title}</h3>
            <p>{home.previews.life.summary}</p>
            <div className="preview-mini-list">
              {lifeCards.slice(0, 2).map((card) => (
                <span key={card.id}>{card.title}</span>
              ))}
            </div>
            <Link to="/life" className="inline-link">
              {home.previews.life.cta}
            </Link>
          </article>

          <article className="preview-card preview-research fade-in stagger-1">
            <h3>{home.previews.research.title}</h3>
            <p>{home.previews.research.summary}</p>
            <div className="preview-mini-list">
              {researchProjects.slice(0, 2).map((project) => (
                <span key={project.id}>{project.title}</span>
              ))}
            </div>
            <Link to="/research" className="inline-link">
              {home.previews.research.cta}
            </Link>
          </article>

          <article className="preview-card preview-contact fade-in stagger-2">
            <h3>{home.previews.contact.title}</h3>
            <p>{home.previews.contact.summary}</p>
            <div className="preview-mini-list">
              {contacts.map((contact) => (
                <span key={contact.type}>{contact.label}</span>
              ))}
            </div>
            <Link to="/contact" className="inline-link">
              {home.previews.contact.cta}
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
