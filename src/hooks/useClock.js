import { useEffect, useState } from 'react';
import { config } from '../config.js';

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: config.person.timezone });

/** Current HH:MM in the configured timezone, refreshed every 20s. */
export function useClock() {
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}
