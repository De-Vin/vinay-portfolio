import { useEffect, useMemo, useRef, useState } from 'react';
import { builds, stages } from '../data/content.js';
import { config } from '../config.js';
import { useUI } from '../context/UIContext.jsx';
import { useFocusTrap } from '../hooks/useFocusTrap.js';

const isTyping = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** ⌘K / Ctrl+K command palette: jump to stages, open case files, run actions. */
export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, openBuild, setInspect, copy } = useUI();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  useFocusTrap(panelRef, paletteOpen);

  const commands = useMemo(
    () => [
      ...stages.map((s) => ({ group: 'Jump to', icon: s.n, label: s.label === 'init' ? 'Top — init' : `${s.label}`, hint: s.cmd, run: () => go(s.id) })),
      ...builds.map((b) => ({ group: 'Open case file', icon: '↗', label: b.name, hint: b.kind, run: () => openBuild(b.id) })),
      { group: 'Actions', icon: '@', label: 'Copy email address', hint: config.person.email, run: () => copy(config.person.email) },
      { group: 'Actions', icon: '↓', label: 'Download resume', hint: 'PDF', run: () => window.open(config.links.resume, '_blank', 'noopener') },
      { group: 'Actions', icon: '✎', label: 'Write an enquiry', hint: 'gh pr create', run: () => { go('ship'); setTimeout(() => document.getElementById('f-name')?.focus({ preventScroll: true }), 700); } },
      { group: 'Actions', icon: '⌖', label: 'Toggle inspect mode', hint: 'I', run: () => setInspect((v) => !v) },
      { group: 'Elsewhere', icon: 'gh', label: 'GitHub', hint: 'github.com/De-Vin', run: () => window.open(config.links.github, '_blank', 'noopener') },
      { group: 'Elsewhere', icon: 'in', label: 'LinkedIn', hint: 'in/vinay-avvaru', run: () => window.open(config.links.linkedin, '_blank', 'noopener') },
    ],
    [openBuild, setInspect, copy]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint}`.toLowerCase().includes(q));
  }, [commands, query]);

  // global shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === '/' && !isTyping(document.activeElement)) {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (e.key.toLowerCase() === 'i' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(document.activeElement)) {
        setInspect((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setPaletteOpen, setInspect]);

  useEffect(() => {
    if (!paletteOpen) return;
    setQuery('');
    setSel(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [paletteOpen]);

  useEffect(() => setSel(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  if (!paletteOpen) return null;

  const close = () => setPaletteOpen(false);
  const run = (cmd) => {
    close();
    setTimeout(cmd.run, 30);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(results.length - 1, s + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    else if (e.key === 'Enter' && results[sel]) { e.preventDefault(); run(results[sel]); }
  };

  let lastGroup = null;
  return (
    <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" ref={panelRef} onKeyDown={onKeyDown}>
      <div className="palette__scrim" onClick={close} />
      <div className="palette__panel">
        <div className="palette__input">
          <span aria-hidden="true">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Type a command or jump to a stage…"
            autoComplete="off"
            spellCheck="false"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[sel] ? `cmd-${sel}` : undefined}
          />
          <kbd className="kbd">esc</kbd>
        </div>
        <ul className="palette__list" id="palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && <li className="palette__empty">No command matches “{query}”.</li>}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? <li key={`g-${c.group}`} className="palette__group" role="presentation">{c.group}</li> : null;
            lastGroup = c.group;
            return [
              header,
              <li
                key={`${c.group}-${c.label}`}
                id={`cmd-${i}`}
                role="option"
                aria-selected={i === sel}
                className="palette__item"
                onMouseMove={() => setSel(i)}
                onClick={() => run(c)}
              >
                <i aria-hidden="true">{c.icon}</i>
                <span>{c.label}</span>
                <span className="mono">{c.hint}</span>
              </li>,
            ];
          })}
        </ul>
      </div>
    </div>
  );
}
