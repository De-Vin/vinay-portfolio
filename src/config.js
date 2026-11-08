/**
 * Site configuration — the only file you need to edit to go live.
 * Everything here ships to the browser, so it must never contain secrets
 * (Formspree form IDs and EmailJS public keys are designed to be public).
 *
 * Form keys can be set either here or in a `.env` file (see `.env.example`).
 */
const env = import.meta.env;

export const config = {
  siteUrl: 'https://vinay-avvaru.dev', // also update index.html, public/robots.txt & public/sitemap.xml

  person: {
    name: 'Vinay Avvaru',
    role: 'Software Engineer',
    location: 'Hyderabad, India',
    timezone: 'Asia/Kolkata',
    email: 'saivinai9050@gmail.com',
    phone: '+91 7993956446',
    showPhone: false, // flip to true to list your phone number in the contact section
  },

  links: {
    github: 'https://github.com/De-Vin',
    linkedin: 'https://www.linkedin.com/in/vinay-avvaru',
    resume: `${env.BASE_URL}resume/Vinay_Avvaru_Software_Engineer.pdf`,
  },

  /**
   * Enquiry form delivery.
   * provider: 'formspree' | 'emailjs' | 'mailto'
   *  - 'formspree' → needs formspree.formId (the `xyzabcd` in https://formspree.io/f/xyzabcd)
   *  - 'emailjs'   → needs serviceId, templateId and publicKey
   *  - 'mailto'    → no service; opens the visitor's email app with the message prefilled
   * If the chosen provider is missing its keys, the form falls back to mailto automatically.
   */
  contact: {
    provider: env.VITE_CONTACT_PROVIDER || 'formspree',
    formspree: { formId: env.VITE_FORMSPREE_ID || '' },
    emailjs: {
      serviceId: env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: env.VITE_EMAILJS_PUBLIC_KEY || '',
    },
  },
};
