import { score } from "../logic/scoring.js";

const SKILL_LABEL = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
};

const VERDICT_CLASS = {
  no_red_flags: "verdict-green",
  almost: "verdict-amber",
  not_yet: "verdict-red",
};

export default function Results({ answers, onRetake }) {
  const result = score(answers);
  const { total, outOf, skills, verdict, recommendations, coverageNote } = result;

  return (
    <div className="screen">
      <div className={`verdict ${VERDICT_CLASS[verdict.key]}`}>
        <div className="verdict-label">{verdict.label}</div>
        <p className="verdict-message">{verdict.message}</p>
      </div>

      <div className="overall">
        <span className="overall-number">{total} / {outOf}</span>
        <span className="overall-text">correct</span>
      </div>

      <section className="skills">
        <h2 className="section-title">Skill breakdown</h2>
        {Object.keys(skills).map((s) => {
          const sk = skills[s];
          const pct = (sk.correct / sk.total) * 100;
          const flagged = verdict.flaggedSkills.includes(s);
          return (
            <div key={s} className="skill-row">
              <div className="skill-head">
                <span className="skill-name">{SKILL_LABEL[s]}</span>
                <span className="skill-score">{sk.correct} / {sk.total}</span>
              </div>
              <div className="skill-bar">
                <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="skill-band">
                <span className={`band-tag band-${sk.band === "Needs work" ? "needwork" : sk.band.toLowerCase()}`}>{sk.band}</span>
                {flagged && (
                  <span className="flag-note">
                    Below the minimum we recommend before booking.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <div className="coverage-note">{coverageNote}</div>

      <section className="recommendations">
        <h2 className="section-title">What to practise before booking</h2>
        {recommendations.length === 0 ? (
          <p className="no-recs">
            No clear weak spots in this check. Keep practising, and test your
            listening and speaking too.
          </p>
        ) : (
          recommendations.map((r) => (
            <div key={r.tag} className="rec-card">
              <h3 className="rec-title">{r.title}</h3>
              {r.why && <p className="rec-why"><strong>Why:</strong> {r.why}</p>}
              {r.practice && <p className="rec-practice"><strong>Practise:</strong> {r.practice}</p>}
            </div>
          ))
        )}
      </section>

      <button type="button" className="btn btn-primary" onClick={onRetake}>
        Retake
      </button>
    </div>
  );
}
