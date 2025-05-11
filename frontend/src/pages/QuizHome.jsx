import { Link } from "react-router-dom";

export default function QuizHome() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Choisis ton mode de quiz 🧠</h2>

      <div className="d-grid gap-3 col-6 mx-auto">
        <Link to="/quiz" className="btn btn-outline-primary btn-lg">
          🎯 Mode Classique (révision libre)
        </Link>
        <Link to="/quiz/examen" className="btn btn-outline-danger btn-lg">
          📝 Mode Examen (40 questions)
        </Link>
      </div>
    </div>
  );
}
