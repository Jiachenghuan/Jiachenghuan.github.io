import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import type {Props} from '@theme/BlogTagsListPage';
import {ArchiveRightRail} from '@site/src/components/archive/ArchiveRightRail';
import styles from '@site/src/components/archive/styles.module.css';
import {getArchiveSectionFromPath} from '@site/src/components/archive/sectionData';

export default function BlogTagsListPage({tags}: Props): ReactNode {
  const section = getArchiveSectionFromPath(tags[0]?.permalink ?? '/learning');

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={`Tags | ${section.label}`} description={`Browse tags in ${section.label}.`} />
      <Layout title={`Tags | ${section.label}`} description={section.summary} noFooter>
        <div className={styles.shell}>
          <main className={styles.mainColumn}>
            <header className={styles.heroBlock}>
              <span className={styles.eyebrow}>{section.label}</span>
              <Heading as="h1" className={styles.pageTitle}>
                Tags
              </Heading>
              <p className={styles.pageDescription}>
                Use tags to regroup related writing and move through a tighter reading context.
              </p>
            </header>

            <div className={styles.tagsGrid}>
              {tags.map((tag) => (
                <Link key={tag.permalink} to={tag.permalink} className={styles.tagCard}>
                  <div className={styles.tagCardInner}>
                    <Heading as="h2" className={styles.tagsHeading}>
                      {tag.label}
                    </Heading>
                    {tag.description ? <p className={styles.tagDescription}>{tag.description}</p> : null}
                  </div>
                  <span className={styles.tagCount}>{tag.count} posts</span>
                </Link>
              ))}
            </div>
          </main>

          <ArchiveRightRail section={section} active="tags" />
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
