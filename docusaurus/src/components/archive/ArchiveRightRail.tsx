import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import {archiveSections, ArchiveSection} from './sectionData';

interface ArchiveRightRailProps {
  active: 'articles' | 'tags' | 'home';
  section?: ArchiveSection;
}

export function ArchiveRightRail({active, section}: ArchiveRightRailProps) {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();

  return (
    <aside className={styles.rail}>
      <div className={styles.railBrand}>
        <Link to="/" className={styles.railTitle}>
          {title}
        </Link>
        <p className={styles.railSubtitle}>
          {section?.tagline ?? 'A Docusaurus prototype for long-form personal archives.'}
        </p>
      </div>

      <nav className={styles.railNav} aria-label="Section navigation">
        {section ? (
          <>
            <Link
              to={section.path}
              className={clsx(styles.railLink, active === 'articles' && styles.railLinkActive)}>
              Articles
            </Link>
            <Link
              to={`${section.path}/tags`}
              className={clsx(styles.railLink, active === 'tags' && styles.railLinkActive)}>
              Tags
            </Link>
          </>
        ) : null}
        <Link to="/" className={clsx(styles.railLink, active === 'home' && styles.railLinkActive)}>
          Home
        </Link>
      </nav>

      <div className={styles.railSections}>
        <span className={styles.railLabel}>Sections</span>
        <div className={styles.railSectionList}>
          {archiveSections.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={clsx(styles.railSectionLink, section?.id === item.id && styles.railSectionLinkActive)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.railFootnote}>
        <p>MDX / TOC / Tags / Title Search</p>
        <p>Dark archive prototype built with Docusaurus.</p>
      </div>
    </aside>
  );
}
