import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import type {Props} from '@theme/BlogListPage';
import {ArchiveListing} from '@site/src/components/archive/ArchiveListing';
import {getArchiveSectionFromPath} from '@site/src/components/archive/sectionData';

export default function BlogListPage(props: Props): ReactNode {
  const section = getArchiveSectionFromPath(props.metadata.permalink);

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <PageMetadata title={`${section.label} | Personal Archive`} description={section.summary} />
      <Layout title={section.label} description={section.summary} noFooter>
        <ArchiveListing
          description={section.summary}
          items={props.items}
          section={section}
          title={section.label}
        />
      </Layout>
    </HtmlClassNameProvider>
  );
}
