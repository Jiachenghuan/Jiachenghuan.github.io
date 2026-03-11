import { HomeContent, LifeCard } from '../types/content';

interface LifePageProps {
  content: LifeCard[];
  home: HomeContent;
}

export function LifePage({ content, home }: LifePageProps) {
  return (
    <div className="page page-life">
      <section className="page-hero">
        <span className="eyebrow">{home.navigation.life}</span>
        <h1>{home.previews.life.title}</h1>
        <p>{home.previews.life.summary}</p>
      </section>
      <section className="life-grid">
        {content.map((card, index) => (
          <article className={`life-card fade-in stagger-${index % 3}`} key={card.id}>
            <img src={card.image} alt={card.title} className="life-card-image" />
            <div className="life-card-body">
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
