import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/** Keeps Tab focus inside `ref` while `active`, and restores focus to the opener on close. */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const opener = document.activeElement;
    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const f = [...root.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('keydown', onKey);
      opener?.focus?.({ preventScroll: true });
    };
  }, [ref, active]);
}
