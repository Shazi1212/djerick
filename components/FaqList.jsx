'use client';
import Accordion from 'react-bootstrap/Accordion';

export default function FaqList({ items, defaultActiveKey = '0' }) {
  return (
    <div className="faq">
      <Accordion defaultActiveKey={defaultActiveKey} flush>
        {items.map((f, i) => (
          <Accordion.Item eventKey={String(i)} key={f.q}>
            <Accordion.Header>{f.q}</Accordion.Header>
            <Accordion.Body>{f.a}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
