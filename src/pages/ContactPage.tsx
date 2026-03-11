import { ContactMethod, HomeContent } from '../types/content';

interface ContactPageProps {
  content: ContactMethod[];
  home: HomeContent;
}

export function ContactPage({ content, home }: ContactPageProps) {
  const wechat = content.find((item) => item.type === 'wechat');

  return (
    <div className="page page-contact">
      <section className="page-hero">
        <span className="eyebrow">{home.navigation.contact}</span>
        <h1>{home.previews.contact.title}</h1>
        <p>{home.previews.contact.summary}</p>
      </section>
      <section className="contact-layout">
        <div className="contact-list">
          {content.map((item, index) => (
            <article className={`contact-card fade-in stagger-${index % 3}`} key={item.type}>
              <span className="contact-type">{item.label}</span>
              <p>{item.value}</p>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
                  {item.href.startsWith('mailto:') ? home.actions.sendEmail : home.actions.openLink}
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <aside className="qr-panel fade-in stagger-2">
          <img src="/assets/wechat-placeholder.svg" alt="WeChat placeholder QR code" />
          <div>
            <h2>{home.actions.wechatQr}</h2>
            <p>{wechat?.value}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
