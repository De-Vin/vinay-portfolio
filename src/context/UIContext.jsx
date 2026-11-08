import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);

/**
 * App-wide UI state: which pipeline stage is running, the open case file,
 * the command palette, inspect mode and the toast.
 */
export function UIProvider({ children }) {
  const [activeStage, setActiveStage] = useState(0);
  const [maxStage, setMaxStage] = useState(0);
  const [openBuildId, setOpenBuildId] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', on: false });
  const toastTimer = useRef();

  // stages stay "passed" once reached, even when scrolling back up
  useEffect(() => setMaxStage((m) => Math.max(m, activeStage)), [activeStage]);
  const stageState = useCallback(
    (i) => (i === activeStage ? 'running' : i <= maxStage ? 'passed' : 'queued'),
    [activeStage, maxStage]
  );

  const toast = useCallback((text) => {
    setToastMsg({ text, on: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg((t) => ({ ...t, on: false })), 2200);
  }, []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        toast(`Copied ${text}`);
      } catch {
        toast('Copy failed — select and copy manually');
      }
    },
    [toast]
  );

  const value = useMemo(
    () => ({
      activeStage, setActiveStage, stageState,
      openBuildId, openBuild: setOpenBuildId, closeBuild: () => setOpenBuildId(null),
      paletteOpen, setPaletteOpen,
      inspect, setInspect,
      toastMsg, toast, copy,
    }),
    [activeStage, stageState, openBuildId, paletteOpen, inspect, toastMsg, toast, copy]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
