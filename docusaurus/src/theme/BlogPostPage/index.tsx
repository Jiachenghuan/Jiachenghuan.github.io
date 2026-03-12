import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import TOC from '@theme/TOC';
import type {Props} from '@theme/BlogPostPage';
import {ArchiveRightRail} from '@site/src/components/archive/ArchiveRightRail';
import styles from '@site/src/components/archive/styles.module.css';
import {getArchiveSectionFromPath} from '@site/src/components/archive/sectionData';
import {formatPostDate, formatReadingTime} from '@site/src/components/archive/utils';
function BlogPostPageContent({children}: {children: ReactNode}) {
  const {metadata, toc} = useBlogPost();
  const section = getArchiveSectionFromPath(metadata.permalink);
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = metadata.frontMatter;
  return (
    <Layout title={metadata.title} description={metadata.description} noFooter>
      <div className={styles.postShell}>
        <aside className={styles.tocAside}>
          {!hideTableOfContents && toc.length > 0 ? (
            <div className={styles.tocInner}>
              <span className={styles.tocLabel}>Outline</span>
              <TOC
                toc={toc}
                minHeadingLevel={tocMinHeadingLevel}
                maxHeadingLevel={tocMaxHeadingLevel}
              />
            </div>
          ) : null}
        </aside>
        <main className={styles.postMain}>
          <Link to={section.path} className={styles.backLink}>
            Back to {section.label}
          </Link>
          <header className={styles.postHeader}>
            <Heading as="h1" className={styles.postTitle}>
              {metadata.title}
            </Heading>
            <p className={styles.postMeta}>
              <span>{formatPostDate(metadata.date)}</span>
              <span>{formatReadingTime(metadata.readingTime)}</span>
            </p>
            {metadata.description ? <p className={styles.postDescription}>{metadata.description}</p> : null}
            {metadata.tags.length ? (
              <div className={styles.postTags}>
                {metadata.tags.map((tag) => (
                  <Link key={tag.permalink} to={tag.permalink} className={styles.postTag}>
                    {tag.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </header>
          <article className={clsx(styles.postArticle, 'markdown')}>
            <MDXContent>{children}</MDXContent>
          </article>
        </main>
        <ArchiveRightRail section={section} active="articles" />
      </div>
    </Layout>
  );
}
export default function BlogPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
