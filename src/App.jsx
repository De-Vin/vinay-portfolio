import { useCallback, useState } from 'react';
import { UIProvider } from './context/UIContext.jsx';
import { useRevealAll } from './hooks/useReveal.js';
import { useMagnetic } from './hooks/useMagnetic.js';
import Boot from './components/Boot.jsx';
import TopBar from './components/TopBar.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import CaseDrawer from './components/CaseDrawer.jsx';
import Inspector from './components/Inspector.jsx';
import Toast from './components/Toast.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Story from './sections/Story.jsx';
import Arsenal from './sections/Arsenal.jsx';
import Builds from './sections/Builds.jsx';
import Deploys from './sections/Deploys.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Contact from './sections/Contact.jsx';

function Site() {
  const [booted, setBooted] = useState(false);
  const onBooted = useCallback(() => setBooted(true), []);
  useRevealAll(booted); // reveals start once the boot curtain lifts
  useMagnetic();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Boot onDone={onBooted} />
      <TopBar />
      <main id="main">
        <Hero />
        <Story />
        <Arsenal />
        <Builds />
        <Deploys />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <CaseDrawer />
      <CommandPalette />
      <Inspector />
      <Toast />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <UIProvider>
      <Site />
    </UIProvider>
  );
}
