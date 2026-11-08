import { useState } from 'react';
import { config } from '../config.js';
import { useUI } from '../context/UIContext.jsx';
import { useClock } from '../hooks/useClock.js';
import { mailtoHref, resolveProvider, sendEnquiry } from '../lib/mailer.js';
import { COUNTRIES, DEFAULT_COUNTRY, findCountry } from '../data/countries.js';
import SplitText from '../components/SplitText.jsx';
import StageHead from '../components/StageHead.jsx';

const EMPTY = { name: '', email: '', country: DEFAULT_COUNTRY, phone: '', subject: '', message: '', company: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Tell me who you are (2+ characters).';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email doesn’t look right.';
  const digits = v.phone.replace(/\D/g, '');
  if (v.phone.trim() && (!/^[\d\s()-]+$/.test(v.phone.trim()) || digits.length < 6 || digits.length > 14)) e.phone = 'Digits only, please (6–14).';
  if (v.subject.trim().length < 3) e.subject = 'Give it a short title (3+ characters).';
  if (v.message.trim().length < 20) e.message = 'A little more detail, please (20+ characters).';
  if (v.message.length > 5000) e.message = 'Please keep it under 5,000 characters.';
  return e;
}

/** Turns the form values into what gets emailed — the phone number is appended to the message. */
function toPayload(v) {
  const phone = v.phone.trim();
  const contact = phone ? `\n\nContact me at ${findCountry(v.country).dial} ${phone}` : '';
  return { name: v.name.trim(), email: v.email.trim(), subject: v.subject.trim(), message: v.message.trim() + contact };
}

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field ${error ? 'is-invalid' : ''}`}>
      <label htmlFor={id}>
        <span>{label} {optional ? <span className="opt">(optional)</span> : <span className="req" aria-hidden="true">*</span>}</span>
      </label>
      {children}
      <span className="field__err" id={`${id}-err`} aria-live="polite">{error}</span>
    </div>
  );
}

/** The enquiry form, styled as opening a pull request. */
function EnquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const [errorMsg, setErrorMsg] = useState('');
  const provider = resolveProvider();

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': `f-${k}-err`, required: true });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (values.company) { setStatus('sent'); return; } // honeypot: quietly drop bots
    setStatus('sending');
    try {
      const { mode } = await sendEnquiry(toPayload(values));
      setStatus(mode === 'mailto' ? 'mailto' : 'sent');
      if (mode !== 'mailto') { setValues(EMPTY); setTouched({}); }
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  const sending = status === 'sending';
  const label = provider === 'mailto' ? 'Open in email app' : 'Create pull request';

  return (
    <form className="pr" noValidate onSubmit={onSubmit} aria-labelledby="pr-title" data-reveal style={{ '--d': 2 }}>
      <div className="pr__bar">
        <span id="pr-title" style={{ color: 'var(--paper)' }}>Open a pull request</span>
        <span>your-idea</span><span aria-hidden="true">→</span><span className="branch">vinay/main</span>
      </div>

      <div className="pr__body">
        <div className="pr__row">
          <Field id="f-name" label="name" error={touched.name && errors.name}>
            <input id="f-name" name="name" autoComplete="name" placeholder="Ada Lovelace" value={values.name} onChange={set('name')} onBlur={blur('name')} maxLength={120} {...aria('name')} />
          </Field>
          <Field id="f-email" label="email" error={touched.email && errors.email}>
            <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" value={values.email} onChange={set('email')} onBlur={blur('email')} maxLength={200} {...aria('email')} />
          </Field>
        </div>
        <Field id="f-phone" label="mobile" error={touched.phone && errors.phone} optional>
          <div className="phone">
            <select aria-label="Country calling code" name="country" value={values.country} onChange={set('country')}>
              {COUNTRIES.map((c) => (
                <option key={c.iso} value={c.iso}>{c.flag} {c.dial} {c.name}</option>
              ))}
            </select>
            <input id="f-phone" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="79939 56446" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} maxLength={20} aria-invalid={!!errors.phone} aria-describedby="f-phone-err" />
          </div>
        </Field>
        <Field id="f-subject" label="title / subject" error={touched.subject && errors.subject}>
          <input id="f-subject" name="subject" placeholder="feat: let’s build a healthcare dashboard" value={values.subject} onChange={set('subject')} onBlur={blur('subject')} maxLength={160} {...aria('subject')} />
        </Field>
        <Field id="f-message" label="description" error={touched.message && errors.message}>
          <textarea id="f-message" name="message" placeholder={'## What are you building?\n\n## Where could I help?'} value={values.message} onChange={set('message')} onBlur={blur('message')} maxLength={5000} {...aria('message')} />
        </Field>
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-company">Company</label>
          <input id="f-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
        </div>
      </div>

      <div className="pr__foot">
        <ul className="checks" aria-live="polite">
          {status === 'idle' && <li><span>○</span>{provider === 'mailto' ? 'will open your email app, prefilled' : `checks will run on submit · via ${provider}`}</li>}
          {sending && (
            <>
              <li className="ok">✓ validation passed</li>
              <li><span className="spin" aria-hidden="true" />delivering…</li>
            </>
          )}
          {status === 'sent' && <li className="ok">✓ all checks passed · delivered</li>}
          {status === 'mailto' && <li className="ok">✓ handed off to your email app</li>}
          {status === 'error' && <li className="err">✗ delivery failed</li>}
        </ul>
        <button className="btn btn--solid" type="submit" disabled={sending}>
          {sending ? 'Running checks…' : label} <span className="btn__arrow" aria-hidden="true">→</span>
        </button>
      </div>

      {status === 'sent' && (
        <div className="pr__result is-ok" role="status">
          <h4>✓ Merged into my inbox.</h4>
          <p>Thanks — your message landed. I’ll reply to the email you left.</p>
        </div>
      )}
      {status === 'mailto' && (
        <div className="pr__result is-ok" role="status">
          <h4>✓ Your email app should be open.</h4>
          <p>
            The message is prefilled — just hit send. Nothing opened? Write to{' '}
            <a href={`mailto:${config.person.email}`}>{config.person.email}</a>.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="pr__result is-err" role="alert">
          <h4>✗ That didn’t go through.</h4>
          <p>
            {errorMsg.replace(/\.?$/, '.')} Your message is still here — try again, or{' '}
            <a href={mailtoHref(toPayload(values))}>send it from your email app</a>.
          </p>
        </div>
      )}
    </form>
  );
}

/** 07 · ship — contact channels and the enquiry form. */
export default function Contact() {
  const { copy } = useUI();
  const time = useClock();
  const { person, links } = config;

  const channels = [
    { k: 'email', v: person.email, href: `mailto:${person.email}`, action: <button type="button" onClick={() => copy(person.email)}>copy</button> },
    { k: 'linkedin', v: 'in/vinay-avvaru', href: links.linkedin, external: true },
    { k: 'github', v: 'github.com/De-Vin', href: links.github, external: true },
    { k: 'resume', v: 'Vinay_Avvaru_Software_Engineer.pdf', href: links.resume, download: true },
    ...(person.showPhone ? [{ k: 'phone', v: person.phone, href: `tel:${person.phone.replace(/\s/g, '')}` }] : []),
  ];

  return (
    <section className="ship stage" id="ship" aria-labelledby="ship-title">
      <div className="wrap">
        <StageHead id="ship" />
        <div className="ship__head">
          <h2 className="ship__title" id="ship-title">
            <SplitText text="Let’s ship" />
            <br />
            <SplitText text="something." delay={250} className="serif" />
          </h2>
          <p className="ship__lede" data-reveal style={{ '--d': 4 }}>
            Hiring for a frontend role, have a product that needs building, or want to talk React, Vue.js or Keycloak? Open a pull request — it lands straight in my inbox.
          </p>
        </div>

        <div className="ship__grid">
          <div>
            <ul className="channels" data-reveal>
              {channels.map((c) => (
                <li className="channel" key={c.k}>
                  <span className="channel__k">{c.k}</span>
                  <a
                    className="channel__v"
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(c.download ? { download: true } : {})}
                  >
                    {c.v}
                  </a>
                  <span className="channel__a">{c.action ?? <span aria-hidden="true">{c.download ? '↓' : '↗'}</span>}</span>
                </li>
              ))}
            </ul>
            <p className="ship__local" data-reveal style={{ '--d': 2 }}>
              <i aria-hidden="true" />Hyderabad · {time} IST · UTC+5:30
            </p>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
