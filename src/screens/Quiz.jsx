import { useMemo, useState, useEffect } from "react";
import { questions } from "../logic/questions.js";

const SKILL_LABEL = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
};

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz({ answers, setAnswers, onFinish }) {
  const shuffled = useMemo(() => questions.map((q) => ({ ...q, options: shuffle(q.options) })), []);
  const [index, setIndex] = useState(0);

  // Safety net: never exceed the question count.
  useEffect(() => {
    if (index >= shuffled.length) onFinish();
  }, [index, shuffled.length, onFinish]);

  if (index >= shuffled.length) return null;

  const q = shuffled[index];
  const selected = answers[q.id] || null;
  const isLast = index === shuffled.length - 1;

  const choose = (text) =>
    setAnswers((prev) => ({ ...prev, [q.id]: text }));

  const back = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => {
    if (selected == null) return;
    if (isLast) {
      onFinish();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="screen">
      <div className="progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(index / shuffled.length) * 100}%` }}
          />
        </div>
        <div className="progress-label">
          Question {index + 1} of {shuffled.length}
        </div>
      </div>

      <div className="skill-label">{SKILL_LABEL[q.skill]}</div>

      {q.text && (
        <div className="text-card">
          {q.text.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
      )}

      <h2 className="prompt">{q.prompt}</h2>

      <ul className="options" role="radiogroup" aria-label={q.prompt}>
        {q.options.map((o) => {
          const isSel = selected === o.text;
          return (
            <li key={o.text}>
              <button
                type="button"
                role="radio"
                aria-checked={isSel}
                className={`option${isSel ? " selected" : ""}`}
                onClick={() => choose(o.text)}
              >
                {o.text}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="quiz-nav">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={back}
          disabled={index === 0}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={next}
          disabled={selected == null}
        >
          {isLast ? "See my results" : "Next"}
        </button>
      </div>
    </div>
  );
}
