import clsx from 'clsx';
import {useMemo, useState, type CSSProperties} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {Content} from '@theme/BlogPostPage';
import styles from './styles.module.css';
import {ArchiveRightRail} from './ArchiveRightRail';
import type {ArchiveSection} from './sectionData';
import {collectUniqueTags, formatPostDate, formatReadingTime} from './utils';

interface ArchiveListingProps {
  description: string;
  items: readonly {readonly content: Content}[];
  pinnedTag?: string;
  railActive?: 'articles' | 'tags';
  section: ArchiveSection;
  title: string;
}

export function ArchiveListing({
  description,
  items,
  pinnedTag,
  railActive = 'articles',
  section,
  title,
}: ArchiveListingProps) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(pinnedTag ?? '');
  const tags = useMemo(() => collectUniqueTags(items), [items]);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(
    () =>
      items.filter(({content}) => {
        const matchesTitle = normalizedQuery
          ? content.metadata.title.toLowerCase().includes(normalizedQuery)
          : true;
        const matchesTag = selectedTag
          ? content.metadata.tags.some((tag) => tag.label === selectedTag)
          : true;

        return matchesTitle && matchesTag;
      }),
    [items, normalizedQuery, selectedTag],
  );

  return (
    <div className={styles.shell}>
      <main className={styles.mainColumn}>
        <header className={styles.heroBlock}>
          <span className={styles.eyebrow}>{section.label}</span>
          <Heading as="h1" className={styles.pageTitle}>
            {title}
          </Heading>
          <p className={styles.pageDescription}>{description}</p>
        </header>

        <section className={styles.toolbar} aria-label="Article search and filters">
          <label className={styles.searchBox}>
            <span>Search titles</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a title keyword"
            />
          </label>

          <div className={styles.tagFilters}>
            <button
              type="button"
              className={clsx(styles.filterChip, !selectedTag && styles.filterChipActive)}
              onClick={() => setSelectedTag('')}>
              All
            </button>
            {tags.map((tag) => (
              <button
                type="button"
                key={tag.permalink}
                className={clsx(styles.filterChip, selectedTag === tag.label && styles.filterChipActive)}
                onClick={() => setSelectedTag(tag.label)}>
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        <p className={styles.resultSummary} aria-live="polite">
          Showing {filteredItems.length} articles
          {selectedTag ? ` | Tag: ${selectedTag}` : ''}
          {normalizedQuery ? ` | Search: ${query}` : ''}
        </p>

        <ul className={styles.articleList}>
          {filteredItems.map(({content}, index) => (
            <li
              key={content.metadata.permalink}
              className={styles.articleItem}
              style={{'--item-index': index} as CSSProperties}>
              <Link to={content.metadata.permalink} className={styles.articleLink}>
                <span className={styles.articleRule} aria-hidden="true" />
                <Heading as="h2" className={styles.articleTitle}>
                  {content.metadata.title}
                </Heading>
                <div className={styles.articleMeta}>
                  <span>{formatPostDate(content.metadata.date)}</span>
                  <span>{formatReadingTime(content.metadata.readingTime)}</span>
                </div>
                <div className={styles.articleTags}>
                  {content.metadata.tags.map((tag) => (
                    <span key={tag.permalink} className={styles.inlineTag}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filteredItems.length === 0 ? (
          <div className={styles.emptyState}>
            <Heading as="h3">No matching articles</Heading>
            <p>Search currently matches titles only. Clear the keyword or switch tags.</p>
          </div>
        ) : null}
      </main>

      <ArchiveRightRail section={section} active={railActive} />
    </div>
  );
}
