// src/pages/QuizExamen.jsx

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizExamen() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [answerLog, setAnswerLog] = useState([]);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!user) return;
    axios
      .get(
        `https://ultimate-quiz-furv.onrender.com/api/questions/random/?niveau=${user.niveau}&limit=40`
      )
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Erreur chargement questions examen", err));
  }, [user]);

  useEffect(() => {
    localStorage.removeItem("answerLog");
  }, []);

  useEffect(() => {
    if (answerLog.length > 0) {
      localStorage.setItem("answerLog", JSON.stringify(answerLog));
    }
  }, [answerLog]);

  const currentQuestion = questions[currentIndex];

  const handleChoice = (choice) => {
    setSelected(choice.id);
    const correctChoice = currentQuestion.choix.find((c) => c.is_true);
    const isCorrect = choice.is_true;

    setFeedback(
      isCorrect
        ? "✅ Bonne réponse !"
        : `❌ Mauvaise réponse. La bonne était : \"${correctChoice.text}\"`
    );

    setAnswerLog((prev) => [
      ...prev,
      {
        question: currentQuestion.text,
        selected: choice.text,
        isCorrect,
        correctAnswer: correctChoice.text,
      },
    ]);
  };

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setFeedback(null);
        setTransitioning(false);
      } else {
        navigate("/cahier");
      }
    }, 300);
  };

  if (!user)
    return <p className="text-center mt-5">Veuillez vous connecter.</p>;
  if (!currentQuestion)
    return <p className="text-center mt-5">Chargement...</p>;

  if (questions.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>🚫 Pas assez de questions disponibles pour lancer un examen.</h4>
        <p>
          Ajoute plus de questions dans la base ou essaie le mode classique.
        </p>
      </div>
    );
  }


  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        📝 Mode Examen — Question {currentIndex + 1} / {questions.length}
      </h2>

      <AnimatePresence mode="wait">
        {!transitioning && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="card p-4 shadow-sm"
          >
            <p className="mb-3">{currentQuestion.text}</p>

            <div className="d-grid gap-2">
              {currentQuestion.choix.map((choix) => (
                <motion.button
                  key={choix.id}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: selected ? 1 : 1.02 }}
                  className={`btn ${
                    selected === choix.id
                      ? choix.is_true
                        ? "btn-success"
                        : "btn-danger"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleChoice(choix)}
                  disabled={!!selected}
                >
                  {choix.text}
                </motion.button>
              ))}
            </div>

            {feedback && (
              <div className="alert alert-info mt-4">{feedback}</div>
            )}

            {selected && (
              <motion.button
                className="btn btn-primary mt-4"
                onClick={handleNext}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                Suivant →
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
