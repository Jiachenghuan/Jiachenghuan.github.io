import { useLocale } from '../i18n/LocaleContext';
import { LifeSectionDefinition } from '../content/lifeSections';
import { HomeContent } from '../types/content';

interface LifeSectionPageProps {
  home: HomeContent;
  section: LifeSectionDefinition;
}

export function LifeSectionPage({ home, section }: LifeSectionPageProps) {
  const { locale } = useLocale();
  const intro =
    locale === 'zh'
      ? '\u8fd9\u4e2a\u72ec\u7acb\u9875\u9762\u5df2\u7ecf\u521b\u5efa\uff0c\u540e\u7eed\u53ef\u4ee5\u5355\u72ec\u89c4\u5212\u5185\u5bb9\u3001\u7248\u5f0f\u548c\u7d20\u6750\u3002'
      : 'This standalone page is ready for its own content, layout, and assets.';
  const status = locale === 'zh' ? '\u5360\u4f4d\u9875' : 'Placeholder';
  const note =
    locale === 'zh'
      ? '\u5f53\u524d\u5148\u4fdd\u7559\u4e3a\u7a7a\u767d\u5360\u4f4d\uff0c\u7b49\u4f60\u540e\u7eed\u786e\u8ba4\u7ed3\u6784\u540e\u518d\u5c55\u5f00\u5b9e\u73b0\u3002'
      : 'It is intentionally empty for now so the structure can be planned in a separate pass.';

  return (
    <div className="page page-life-section">
      <section className="page-hero">
        <span className="eyebrow">{home.navigation.life}</span>
        <h1>{section.label}</h1>
        <p>{intro}</p>
      </section>

      <section className="section-placeholder fade-in">
        <div className="section-placeholder-visual" aria-hidden="true">
          <img src={section.image} alt="" />
        </div>
        <div className="section-placeholder-copy">
          <span className="section-placeholder-status">{status}</span>
          <h2>{section.label}</h2>
          <p>{note}</p>
        </div>
      </section>
    </div>
  );
}
