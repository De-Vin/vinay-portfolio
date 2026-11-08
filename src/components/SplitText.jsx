import { Fragment } from 'react';

/**
 * Splits text into masked characters or words that rise in when the
 * parent `.split` gets `.is-in` (see useRevealAll). Screen readers get the plain text.
 */
export default function SplitText({ text, by = 'chars', delay = 0, className = '' }) {
  let i = 0;
  return (
    <span className={`split split--${by} ${className}`} style={{ '--sd': `${delay}ms` }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && ' '}
            <span className="split__mask">
              {by === 'words' ? (
                <span className="split__unit" style={{ '--i': i++ }}>{word}</span>
              ) : (
                [...word].map((c, ci) => (
                  <span key={ci} className="split__unit" style={{ '--i': i++ }}>{c}</span>
                ))
              )}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
