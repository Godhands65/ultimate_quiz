import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Mascotte from "../components/Mascotte";

function QuizPage() {
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [answerLog, setAnswerLog] = useState([]);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ultimate-quiz-furv.onrender.com/api/questions/")
      .then((res) => setQuestions(res.data));
  }, []);

  // Nettoyage du localStorage au lancement
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const niveau = user?.niveau || "BAC";
        const rand = Math.random();
        const res = await axios.get(
          `https://ultimate-quiz-furv.onrender.com/api/questions/random/?niveau=${niveau}&limit=40&rand=${rand}`
        );
        setQuestions(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des questions aléatoires :", error);
      }
    };
  
    fetchQuestions();
  }, [user]);
  

  // Mettre à jour le localStorage à chaque modification de answerLog
  useEffect(() => {
    if (answerLog.length > 0) {
      localStorage.setItem("answerLog", JSON.stringify(answerLog));
    }
  }, [answerLog]);

  const currentQuestion = questions[currentIndex];

  const handleChoice = async (choice) => {
    setSelected(choice.id);
    const correctChoice = currentQuestion.choix.find((c) => c.is_true);
    const isCorrect = choice.is_true;


    setFeedback(
      isCorrect
        ? "✅ Bonne réponse !"
        : `❌ Mauvaise réponse. La bonne était : "${correctChoice?.text}"`
    );

    // 🧠 Ajouter à answerLog
    setAnswerLog((prev) => [
      ...prev,
      {
        question: currentQuestion.text,
        selected: choice.text,
        isCorrect: isCorrect,
        correctAnswer: correctChoice?.text,
      },
    ]);

    // Envoi backend
    try {
      await axios.post(
        "https://ultimate-quiz-furv.onrender.com/api/reponses/",
        {
          question: currentQuestion.id,
          reponse_donnee: choice.text,
          bonne_reponse: correctChoice.text,
        }
      );
    } catch (error) {
      console.error("Erreur d'envoi de réponse", error);
    }
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
    }, 400);
  };

  if (!user)
    return (
      <>
        <p className="text-center mt-5">
          Veuillez vous connecter. <Link to="/login">Se connecter ici</Link>
        </p>
        <p className="mt-3 text-center">
          Pas encore de compte ? <Link to="/signup">S’inscrire ici</Link>
        </p>
      </>
    );
  if (!currentQuestion)
    return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container mt-5">
      {/* <Mascotte /> */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Question 🧠👇 </h2>
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            const html = document.documentElement;
            const current = html.getAttribute("data-bs-theme");
            html.setAttribute(
              "data-bs-theme",
              current === "light" ? "dark" : "light"
            );
          }}
        >
          🌙 / ☀️
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Déconnexion
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!transitioning && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="card p-4 shadow-sm"
          >
            <h4 className="mb-3">{currentQuestion.text}</h4>
            <div className="d-grid gap-3">
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="alert alert-info mt-4"
              >
                {feedback}
              </motion.div>
            )}

            {selected && (
              <motion.button
                onClick={handleNext}
                className="btn btn-primary mt-4"
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

export default QuizPage;
