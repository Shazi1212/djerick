import { Reveal } from '@/components/Motion';

export default function PageHead({ kicker, title, lead, image, imageAlt, narrow }) {
  return (
    <section className={`page-head ${image ? 'with-image' : ''}`}>
      {image && (
        <div className="page-head-media" aria-hidden="true">
          <img src={`/img/${image}.jpg`} alt={imageAlt || ''} />
        </div>
      )}
      <div className={`wrap ${narrow ? 'wrap-narrow' : ''}`}>
        <Reveal>
          {kicker && <div className="kicker">{kicker}</div>}
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          {lead && <p className="lead" style={{ marginTop: 'var(--md)', maxWidth: 720 }}>{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
