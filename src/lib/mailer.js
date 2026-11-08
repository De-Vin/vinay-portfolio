import { config } from '../config.js';

/**
 * Frontend-only enquiry delivery. A browser cannot send email by itself —
 * these providers receive the request and email it to you.
 *
 * Returns { mode: 'formspree' | 'emailjs' | 'mailto', ... }.
 * Throws an Error with a human-readable message on failure.
 */
export function resolveProvider() {
  const { provider, formspree, emailjs } = config.contact;
  if (provider === 'formspree' && formspree.formId) return 'formspree';
  if (provider === 'emailjs' && emailjs.serviceId && emailjs.templateId && emailjs.publicKey) return 'emailjs';
  return 'mailto';
}

export function mailtoHref({ name, email, subject, message }) {
  const body = `${message}\n\n— ${name} (${email})`;
  return `mailto:${config.person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function sendFormspree(payload, signal) {
  const res = await fetch(`https://formspree.io/f/${config.contact.formspree.formId}`, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, _replyto: payload.email, _subject: `[Portfolio] ${payload.subject}` }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.errors?.map((e) => e.message).join(', ') || `Formspree responded with ${res.status}`);
  }
}

// EmailJS REST API — no SDK needed. Template variables: from_name, reply_to, subject, message.
async function sendEmailJS(payload, signal) {
  const { serviceId, templateId, publicKey } = config.contact.emailjs;
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: { from_name: payload.name, reply_to: payload.email, subject: payload.subject, message: payload.message },
    }),
  });
  if (!res.ok) throw new Error((await res.text().catch(() => '')) || `EmailJS responded with ${res.status}`);
}

export async function sendEnquiry(payload) {
  const mode = resolveProvider();
  if (mode === 'mailto') {
    window.location.href = mailtoHref(payload);
    return { mode };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    if (mode === 'formspree') await sendFormspree(payload, controller.signal);
    else await sendEmailJS(payload, controller.signal);
    return { mode };
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out.');
    if (err instanceof TypeError) throw new Error('Network error — check your connection.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
