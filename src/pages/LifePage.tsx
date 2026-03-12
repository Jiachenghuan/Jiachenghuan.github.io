import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeContent, LifeCard } from '../types/content';

interface LifePageProps {
  content: LifeCard[];
  home: HomeContent;
}

const lifeAnchors = [
  { id: 'learning', label: 'Learning' },
  { id: 'photography', label: 'Photography' },
  { id: 'literature-art', label: 'Literature&Art' },
] as const;

export function LifePage({ content, home }: LifePageProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="page page-life">
      <section className="page-hero">
        <span className="eyebrow">{home.navigation.life}</span>
        <h1>{home.previews.life.title}</h1>
        <p>{home.previews.life.summary}</p>
      </section>
      <section className="life-grid">
        {content.map((card, index) => (
          <article id={lifeAnchors[index]?.id} className={`life-card fade-in stagger-${index % 3}`} key={card.id}>
            <img src={card.image} alt={card.title} className="life-card-image" />
            <div className="life-card-body">
              {lifeAnchors[index] ? <span className="life-card-category">{lifeAnchors[index].label}</span> : null}
              <div className="meta-row">
                <h2>{card.title}</h2>
                <span>{card.date}</span>
              </div>
              <p>{card.summary}</p>
              {card.tags?.length ? (
                <div className="tag-list">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
