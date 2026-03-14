import {useEffect, useMemo, useState} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {
  getArchivePost,
  getArchiveSectionContent,
  getArchiveSections,
  type ArchivePostSection,
  type ArchiveSectionId,
} from '../content/archiveContent';

interface ArchiveArticlePageProps {
  sectionId: ArchiveSectionId;
}

const archiveLocale = 'zh' as const;
const archiveSectionUnit = '\u4e2a\u7ae0\u8282';
const archiveCuriousLabel = '\u4fdd\u6301\u597d\u5947';
const archiveAboutLabel = '\u5173\u4e8e';

function flattenSections(sections: ArchivePostSection[]): ArchivePostSection[] {
  return sections.flatMap((section) => [section, ...(section.children ? flattenSections(section.children) : [])]);
}

function renderOutline(sections: ArchivePostSection[], activeHeading: string, depth = 0) {
  return sections.map((section) => (
    <div key={section.id} className={`archive-outline-node depth-${depth}`}>
      <a href={`#${section.id}`} className={activeHeading === section.id ? 'active' : ''}>
        {section.title}
      </a>
      {section.children?.length ? renderOutline(section.children, activeHeading, depth + 1) : null}
    </div>
  ));
}

function getHeadingTag(level: number): 'h2' | 'h3' | 'h4' {
  if (level <= 2) {
    return 'h2';
  }

  if (level === 3) {
    return 'h3';
  }

  return 'h4';
}

function renderSections(sections: ArchivePostSection[], depth = 2) {
  return sections.map((section) => {
    const HeadingTag = getHeadingTag(depth);

    return (
      <section key={section.id} id={section.id} className={`archive-article-section depth-${depth}`}>
        <HeadingTag>{section.title}</HeadingTag>
        {section.paragraphs.map((paragraph) => (
          <p key={`${section.id}-${paragraph}`}>{paragraph}</p>
        ))}
        {section.children?.length ? renderSections(section.children, depth + 1) : null}
      </section>
    );
  });
}

export function ArchiveArticlePage({sectionId}: ArchiveArticlePageProps) {
  const {slug} = useParams();
  const content = getArchiveSectionContent(sectionId, archiveLocale);
  const post = slug ? getArchivePost(sectionId, slug) : undefined;
  const sectionLinks = getArchiveSections(archiveLocale);
  const outlineSections = useMemo(() => (post ? flattenSections(post.sections) : []), [post]);
  const [activeHeading, setActiveHeading] = useState(outlineSections[0]?.id ?? '');

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'auto'});
  }, [slug]);

  useEffect(() => {
    if (!outlineSections.length) {
      return;
    }

    const elements = outlineSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    setActiveHeading(outlineSections[0]?.id ?? '');

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

        if (visibleEntries[0]?.target.id) {
          setActiveHeading(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [outlineSections]);

  const totalSections = outlineSections.length;

  if (!post) {
    return <Navigate to={content.path} replace />;
  }

  return (
    <div className="page page-archive archive-stage archive-stage-article">
      <div className="archive-shell archive-shell-article">
        <aside className="archive-toc-rail">
          <div className="archive-toc-card fade-in">
            <div className="archive-toc-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="archive-rail-label">{content.ui.outlineLabel}</span>
            <nav className="archive-outline-links archive-outline-links-left">{renderOutline(post.sections, activeHeading)}</nav>
          </div>
        </aside>

        <main className="archive-article-main">
          <Link to={content.path} className="archive-back-link fade-in">
            {content.ui.backLabel} {content.label}
          </Link>

          <header className="archive-article-header fade-in stagger-1">
            <span className="archive-overline">{post.eyebrow}</span>
            <h1>{post.title}</h1>
            <div className="archive-article-meta">
              <span>{post.date}</span>
              <span>{post.readMinutes} min</span>
              <span>{totalSections} {archiveSectionUnit}</span>
            </div>
            <p>{post.description}</p>
          </header>

          <article className="archive-article-body fade-in stagger-2">{renderSections(post.sections)}</article>
        </main>

        <aside className="archive-outline-rail">
          <div className="archive-brand-block fade-in">
            <Link to="/" className="archive-brand">
              {content.ui.brandTitle}
            </Link>
            <p>{archiveCuriousLabel}</p>
          </div>

          <div className="archive-rail-footer fade-in stagger-1">
            <nav className="archive-side-menu">
              <Link to={content.path} className="active">{content.ui.articleLabel}</Link>
              <span>{content.ui.outlineLabel}</span>
              <Link to="/">{archiveAboutLabel}</Link>
            </nav>

            <nav className="archive-section-links">
              {sectionLinks.map((section) => (
                <Link
                  key={section.id}
                  to={section.path}
                  className={section.id === sectionId ? 'active' : ''}>
                  {section.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
