import {useMemo, useState, type CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {getArchiveSectionContent, getArchiveSections, type ArchiveSectionId} from '../content/archiveContent';
import {useLocale} from '../i18n/LocaleContext';

interface ArchiveSectionPageProps {
  sectionId: ArchiveSectionId;
}

export function ArchiveSectionPage({sectionId}: ArchiveSectionPageProps) {
  const {locale} = useLocale();
  const content = getArchiveSectionContent(sectionId, locale);
  const sectionLinks = getArchiveSections(locale);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const tags = useMemo(
    () => Array.from(new Set(content.posts.flatMap((post) => post.tags))),
    [content.posts],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = useMemo(
    () =>
      content.posts.filter((post) => {
        const matchesTitle = normalizedQuery ? post.title.toLowerCase().includes(normalizedQuery) : true;
        const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
        return matchesTitle && matchesTag;
      }),
    [activeTag, content.posts, normalizedQuery],
  );

  return (
    <div className="page page-archive archive-stage">
      <div className="archive-shell archive-shell-list">
        <main className="archive-main" id="archive-list-top">
          <header className="archive-list-header fade-in">
            <span className="archive-overline">{content.eyebrow}</span>

            <div className="archive-list-controls">
              <label className="archive-search">
                <span>{content.ui.searchLabel}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={content.ui.searchPlaceholder}
                />
              </label>

              <div className="archive-tags" id="archive-tag-filters" role="tablist" aria-label="Archive tag filters">
                <button
                  type="button"
                  className={`archive-chip${activeTag ? '' : ' active'}`}
                  onClick={() => setActiveTag('')}>
                  {content.ui.allLabel}
                </button>
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={`archive-chip${activeTag === tag ? ' active' : ''}`}
                    onClick={() => setActiveTag(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <p className="archive-results" aria-live="polite">
              {content.ui.resultsLabel} {filteredPosts.length} {locale === 'zh' ? '\u7bc7\u6587\u7ae0' : 'articles'}
              {activeTag ? ` | ${content.ui.tagLabel}: ${activeTag}` : ''}
              {normalizedQuery ? ` | ${content.ui.searchSummaryLabel}: ${query}` : ''}
            </p>
          </header>

          <section className="archive-list fade-in stagger-1" aria-label={content.ui.articleLabel}>
            {filteredPosts.length ? (
              filteredPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  to={`${content.path}/${post.slug}`}
                  className="archive-list-item"
                  style={{'--item-index': index} as CSSProperties}>
                  <span className="archive-list-line" aria-hidden="true" />
                  <h2>{post.title}</h2>
                  <p className="archive-list-meta">
                    <span>{post.date}</span>
                    <span>{post.readMinutes} min</span>
                  </p>
                </Link>
              ))
            ) : (
              <div className="archive-empty">
                <h2>{content.ui.emptyTitle}</h2>
                <p>{content.ui.emptyDescription}</p>
              </div>
            )}
          </section>
        </main>

        <aside className="archive-rail">
          <div className="archive-brand-block fade-in">
            <Link to="/" className="archive-brand">
              {content.ui.brandTitle}
            </Link>
            <p>{locale === 'zh' ? '\u4fdd\u6301\u597d\u5947' : 'stay curious'}</p>
          </div>

          <div className="archive-rail-footer fade-in stagger-1">
            <nav className="archive-side-menu">
              <a href="#archive-list-top" className="active">{content.ui.articleLabel}</a>
              <a href="#archive-tag-filters">{content.ui.tagLabel}</a>
              <Link to="/">{locale === 'zh' ? '\u5173\u4e8e' : 'About'}</Link>
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

            <div className="archive-mini-footer">
              <p>{content.railNote}</p>
              <p>
                <Link to="/research">{locale === 'zh' ? '\u7814\u7a76' : 'Research'}</Link>
                <span> / </span>
                <Link to="/contact">{locale === 'zh' ? '\u8054\u7cfb' : 'Contact'}</Link>
                <span> / </span>
                <Link to="/">{content.ui.homeLabel}</Link>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
