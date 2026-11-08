import { useUI } from '../context/UIContext.jsx';

export default function Toast() {
  const { toastMsg } = useUI();
  return (
    <div className={`toast ${toastMsg.on ? 'is-on' : ''}`} role="status" aria-live="polite">
      {toastMsg.text}
    </div>
  );
}
