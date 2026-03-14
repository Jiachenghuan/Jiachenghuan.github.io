import {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useLocale} from '../i18n/LocaleContext';
import {HomeContent, Locale, ResearchProject} from '../types/content';

interface ResearchPageProps {
  content: ResearchProject[];
  home: HomeContent;
}

interface ResearchProjectOverride {
  summary: string;
  title: string;
}

interface ResearchPageCopy {
  eyebrow: string;
  focusNote: string;
  focusTitle: string;
  indexNote: string;
  indexTitle: string;
  keywordsLabel: string;
  linksLabel: string;
  metricLinks: string;
  metricProjects: string;
  metricYears: string;
  overviewLabel: string;
  projectLabel: string;
  summary: string;
  title: string;
  projectOverrides: Partial<Record<ResearchProject['id'], ResearchProjectOverride>>;
}

const researchCopyByLocale: Record<Locale, ResearchPageCopy> = {
  zh: {
    eyebrow: '\u5b66\u672f\u7814\u7a76',
    focusNote:
      '\u591a\u6a21\u6001\u63a8\u7406\u3001\u53ef\u590d\u73b0\u5de5\u4f5c\u6d41\u4e0e Human-AI \u534f\u4f5c\u662f\u5f53\u524d\u7684\u4e3b\u8981\u7ebf\u7d22\u3002\u9875\u9762\u4ee5\u6700\u5c0f\u5fc5\u8981\u4fe1\u606f\u7ec4\u7ec7\u95ee\u9898\u3001\u65b9\u6cd5\u4e0e\u8fdb\u5ea6\u3002',
    focusTitle: '\u5f53\u524d\u5173\u6ce8',
    indexNote:
      '\u4ee5\u9879\u76ee\u4e3a\u5355\u4f4d\u8fdb\u884c\u7f16\u6392\uff0c\u4fdd\u7559\u95ee\u9898\u8bbe\u5b9a\u3001\u6838\u5fc3\u65b9\u6cd5\u4e0e\u5f53\u524d\u72b6\u6001\u7684\u7ed3\u6784\u5316\u8bb0\u5f55\u3002',
    indexTitle: '\u7814\u7a76\u7d22\u5f15',
    keywordsLabel: '\u5173\u952e\u8bcd',
    linksLabel: '\u76f8\u5173\u94fe\u63a5',
    metricLinks: '\u5bf9\u5916\u94fe\u63a5',
    metricProjects: '\u9879\u76ee',
    metricYears: '\u5e74\u5ea6\u8de8\u5ea6',
    overviewLabel: '\u6982\u89c8',
    projectLabel: '\u9879\u76ee',
    summary:
      '\u4ee5\u6697\u8272\u3001\u6781\u7b80\u4e14\u7ed3\u6784\u5316\u7684\u65b9\u5f0f\u5c55\u793a\u7814\u7a76\u95ee\u9898\u3001\u65b9\u6cd5\u8def\u7ebf\u4e0e\u9636\u6bb5\u6027\u8fdb\u5ea6\u3002',
    title: 'Academic Research',
    projectOverrides: {
      'research-multimodal': {
        title: '\u591a\u6a21\u6001\u5b66\u4e60\u4e2d\u7684\u7ed3\u6784\u5316\u63a8\u7406',
        summary:
          '\u805a\u7126\u8de8\u6a21\u6001\u8868\u5f81\u4e0e\u7ed3\u6784\u7ea6\u675f\uff0c\u4ee5\u6e05\u6670\u7684\u95ee\u9898\u8bbe\u5b9a\u3001\u65b9\u6cd5\u8f6e\u5ed3\u4e0e\u9636\u6bb5\u6027\u7ed3\u679c\u7ec4\u7ec7\u9879\u76ee\u53d9\u4e8b\u3002',
      },
      'research-systems': {
        title: '\u9762\u5411\u79d1\u7814\u5de5\u4f5c\u6d41\u7684\u53ef\u590d\u73b0\u7cfb\u7edf',
        summary:
          '\u4ece\u6570\u636e\u5904\u7406\u3001\u5b9e\u9a8c\u8ffd\u8e2a\u5230\u7ed3\u679c\u590d\u7528\uff0c\u5c06\u5de5\u7a0b\u7ed3\u6784\u4f5c\u4e3a\u7814\u7a76\u80fd\u529b\u7684\u4e00\u90e8\u5206\u6765\u5448\u73b0\u3002',
      },
      'research-human-ai': {
        title: 'Human-AI \u534f\u4f5c\u4e2d\u7684\u89e3\u91ca\u4e0e\u53cd\u9988\u56de\u8def',
        summary:
          '\u4ece\u5b9e\u9a8c\u8bbe\u7f6e\u3001\u89c2\u5bdf\u7ed3\u679c\u4e0e\u4e0b\u4e00\u9636\u6bb5\u95ee\u9898\u5165\u624b\uff0c\u5c06\u534f\u4f5c\u60c5\u5883\u4e2d\u7684\u89e3\u91ca\u673a\u5236\u4e0e\u53cd\u9988\u56de\u8def\u62c6\u89e3\u4e3a\u53ef\u9605\u8bfb\u7684\u7814\u7a76\u5355\u5143\u3002',
      },
    },
  },
  en: {
    eyebrow: 'Academic Research',
    focusNote:
      'Current work clusters around multimodal reasoning, reproducible research workflows, and explanation loops in human-AI collaboration.',
    focusTitle: 'Current Focus',
    indexNote:
      'Each project is reduced to the minimum useful record: problem framing, method direction, and current status.',
    indexTitle: 'Research Index',
    keywordsLabel: 'Keywords',
    linksLabel: 'Links',
    metricLinks: 'External Links',
    metricProjects: 'Projects',
    metricYears: 'Year Span',
    overviewLabel: 'Overview',
    projectLabel: 'Project',
    summary:
      'A dark, stripped-back dossier for presenting research questions, methodological direction, and current progress with as little noise as possible.',
    title: 'Academic Research',
    projectOverrides: {},
  },
};

function getStaggerClass(index: number) {
  if (index % 3 === 1) {
    return ' stagger-1';
  }

  if (index % 3 === 2) {
    return ' stagger-2';
  }

  return '';
}

export function ResearchPage({content}: ResearchPageProps) {
  const {locale} = useLocale();
  const copy = researchCopyByLocale[locale];

  const localizedProjects = useMemo(
    () =>
      content.map((project) => {
        const override = copy.projectOverrides[project.id];

        return {
          ...project,
          summary: override?.summary ?? project.summary,
          title: override?.title ?? project.title,
        };
      }),
    [content, copy.projectOverrides],
  );

  const keywordCount = useMemo(
    () => new Set(localizedProjects.flatMap((project) => project.keywords)).size,
    [localizedProjects],
  );

  const linkCount = useMemo(
    () => localizedProjects.reduce((sum, project) => sum + project.links.length, 0),
    [localizedProjects],
  );

  const yearSpan = useMemo(() => {
    const years = localizedProjects.map((project) => Number(project.year)).filter((value) => Number.isFinite(value));

    if (!years.length) {
      return '--';
    }

    return `${Math.min(...years)}-${Math.max(...years)}`;
  }, [localizedProjects]);

  const focusFootnote =
    locale === 'zh'
      ? `\u5171 ${keywordCount} \u7ec4\u5173\u952e\u8bcd\uff0c\u5bf9\u5e94 ${localizedProjects.length} \u4e2a\u7814\u7a76\u9879\u76ee\u3002`
      : `${keywordCount} keywords across ${localizedProjects.length} projects.`;

  return (
    <div className="page page-research research-stage">
      <section className="research-shell">
        <header className="research-hero fade-in">
          <span className="research-overline">{copy.eyebrow}</span>

          <div className="research-hero-grid">
            <div className="research-hero-copy">
              <h1>{copy.title}</h1>
              <p>{copy.summary}</p>
            </div>

            <div className="research-metrics">
              <div className="research-metric">
                <span>{copy.metricProjects}</span>
                <strong>{localizedProjects.length}</strong>
              </div>
              <div className="research-metric">
                <span>{copy.metricYears}</span>
                <strong>{yearSpan}</strong>
              </div>
              <div className="research-metric">
                <span>{copy.metricLinks}</span>
                <strong>{linkCount}</strong>
              </div>
            </div>
          </div>
        </header>

        <div className="research-layout">
          <main className="research-main" aria-label={copy.projectLabel}>
            {localizedProjects.map((project, index) => (
              <article
                key={project.id}
                id={project.id}
                className={`research-paper fade-in${getStaggerClass(index)}`}>
                <div className="research-paper-rail">
                  <span className="research-paper-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="research-paper-year">{project.year}</span>
                </div>

                <div className="research-paper-content">
                  <span className="research-paper-label">{copy.overviewLabel}</span>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>

                  <div className="research-paper-meta">
                    <div className="research-paper-group">
                      <span className="research-paper-label">{copy.keywordsLabel}</span>
                      <div className="research-paper-tags">
                        {project.keywords.map((keyword) => (
                          <span key={keyword}>{keyword}</span>
                        ))}
                      </div>
                    </div>

                    <div className="research-paper-group">
                      <span className="research-paper-label">{copy.linksLabel}</span>
                      <div className="research-paper-links">
                        {project.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </main>

          <aside className="research-sidebar fade-in stagger-2">
            <div className="research-sidebar-block">
              <span className="research-sidebar-label">{copy.indexTitle}</span>
            </div>

            <nav className="research-sidebar-block research-sidebar-nav" aria-label={copy.projectLabel}>
              {localizedProjects.map((project, index) => (
                <a key={project.id} href={`#${project.id}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{project.title}</strong>
                </a>
              ))}
            </nav>

            <div className="research-sidebar-block">
              <span className="research-sidebar-label">{copy.focusTitle}</span>
              <p>{copy.focusNote}</p>
              <p className="research-sidebar-footnote">{focusFootnote}</p>
            </div>

            <div className="research-sidebar-block">
              <Link to="/" className="research-home-link">
                <span className="research-home-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.5 9.2L10 4L16.5 9.2V16H12.4V11.8H7.6V16H3.5V9.2Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{locale === 'zh' ? '\u8fd4\u56de\u9996\u9875' : 'Back Home'}</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}


