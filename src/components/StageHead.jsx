import { useEffect, useRef } from 'react';
import { stages } from '../data/content.js';
import { useUI } from '../context/UIContext.jsx';
import { scramble } from '../lib/utils.js';

/** The pipeline-stage header that opens every section: `04 / build   $ npm run build   ● running` */
export default function StageHead({ id }) {
  const index = stages.findIndex((s) => s.id === id);
  const stage = stages[index];
  const { stageState } = useUI();
  const state = stageState(index);
  const cmdRef = useRef(null);

  useEffect(() => {
    if (state === 'running') return scramble(cmdRef.current, stage.cmd);
  }, [state, stage.cmd]);

  return (
    <div className="stage-head" data-state={state} data-reveal="fade">
      <span className="stage-head__n">{stage.n} / {stage.label}</span>
      <span className="stage-head__cmd" ref={cmdRef}>{stage.cmd}</span>
      <span className="stage-head__status">
        <i aria-hidden="true" />
        <span>{state}</span>
      </span>
    </div>
  );
}
