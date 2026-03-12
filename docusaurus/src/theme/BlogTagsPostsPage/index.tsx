import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import type {Props} from '@theme/BlogTagsPostsPage';
import {ArchiveListing} from '@site/src/components/archive/ArchiveListing';
import {getArchiveSectionFromPath} from '@site/src/components/archive/sectionData';

export default function BlogTagsPostsPage({items, tag}: Props): ReactNode {
  const section = getArchiveSectionFromPath(tag.permalink);

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <PageMetadata title={`${tag.label} | ${section.label}`} description={tag.description} />
      <Layout title={`${tag.label} | ${section.label}`} description={tag.description ?? section.summary} noFooter>
        <ArchiveListing
          description={tag.description ?? `All articles filed under ${tag.label}.`}
          items={items}
          pinnedTag={tag.label}
          railActive="tags"
          section={section}
          title={`# ${tag.label}`}
        />
      </Layout>
    </HtmlClassNameProvider>
  );
}
