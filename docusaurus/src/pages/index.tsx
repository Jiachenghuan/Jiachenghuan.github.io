import type {CSSProperties, ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {ArchiveRightRail} from '@site/src/components/archive/ArchiveRightRail';
import {archiveSections} from '@site/src/components/archive/sectionData';
import styles from './index.module.css';
export default function Home(): ReactNode {
  return (
    <Layout
      title="Personal Archive"
      description="A Docusaurus archive prototype for Learning and Literature&Art."
      noFooter>
      <div className={styles.homeShell}>
        <main className={styles.homeMain}>
          <div className={styles.homeHero}>
            <span className={styles.eyebrow}>Docusaurus Prototype</span>
            <Heading as="h1" className={styles.title}>
              A content-first shell for Learning and Literature&Art
            </Heading>
            <p className={styles.description}>
              The prototype already includes animated listing pages, article pages with MD outlines,
              tag classification, and title-only search.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {archiveSections.map((section, index) => (
              <Link
                key={section.id}
                to={section.path}
                className={styles.card}
                style={{'--card-index': index} as CSSProperties}>
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
                <Heading as="h2" className={styles.cardTitle}>
                  {section.label}
                </Heading>
                <p className={styles.cardDescription}>{section.summary}</p>
                <span className={styles.cardAction}>Open section</span>
              </Link>
            ))}
          </div>
        </main>
        <ArchiveRightRail active="home" />
      </div>
    </Layout>
  );
}
