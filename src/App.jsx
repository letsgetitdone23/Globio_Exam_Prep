import { useState } from "react";
import Intro from "./screens/Intro.jsx";
import Quiz from "./screens/Quiz.jsx";
import Results from "./screens/Results.jsx";
import "./styles.css";

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [answers, setAnswers] = useState({});

  const reset = () => {
    setAnswers({});
    setScreen("intro");
  };

  return (
    <div className="app">
      {screen === "intro" && <Intro onStart={() => setScreen("quiz")} />}
      {screen === "quiz" && (
        <Quiz
          answers={answers}
          setAnswers={setAnswers}
          onFinish={() => setScreen("results")}
        />
      )}
      {screen === "results" && <Results answers={answers} onRetake={reset} />}
    </div>
  );
}
