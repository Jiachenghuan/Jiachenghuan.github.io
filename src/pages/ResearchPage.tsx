import { HomeContent, ResearchProject } from '../types/content';

interface ResearchPageProps {
  content: ResearchProject[];
  home: HomeContent;
}

export function ResearchPage({ content, home }: ResearchPageProps) {
  return (
    <div className="page page-research">
      <section className="page-hero">
        <span className="eyebrow">{home.navigation.research}</span>
        <h1>{home.previews.research.title}</h1>
        <p>{home.previews.research.summary}</p>
      </section>
      <section className="research-list">
        {content.map((project, index) => (
          <article className={`research-card fade-in stagger-${index % 3}`} key={project.id}>
            <div className="research-header">
              <span className="research-year">{project.year}</span>
              <h2>{project.title}</h2>
            </div>
            <p>{project.summary}</p>
            <div className="tag-list">
              {project.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
            <div className="link-list">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
