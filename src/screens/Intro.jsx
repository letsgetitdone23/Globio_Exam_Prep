export default function Intro({ onStart }) {
  return (
    <div className="screen">
      <h1 className="title">A1 German Exam Readiness Check</h1>
      <p className="lede">
        A quick check for learners who have finished A1 German and are deciding
        whether to book the Goethe or ÖSD exam.
      </p>

      <ul className="covers">
        <li><strong>15 questions</strong></li>
        <li><strong>3 skills:</strong> vocabulary, grammar, reading</li>
        <li><strong>About 8–10 minutes</strong></li>
        <li><strong>No sign-up</strong></li>
      </ul>

      <p className="honesty">
        This check can't tell you everything. It doesn't cover listening,
        writing or speaking.
      </p>

      <button className="btn btn-primary" onClick={onStart}>
        Start
      </button>
    </div>
  );
}
