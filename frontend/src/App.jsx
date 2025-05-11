import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import QuizExamen from "./pages/QuizExamen"; // 👉 à créer
import AnswerSheet from "./pages/AnswerSheet";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Actualites from "./pages/Actualites";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import QuizHome from "./pages/QuizHome"; // 👉 à créer
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<QuizHome />} /> {/* 🚀 page de choix */}
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/examen" element={<QuizExamen />} />
        <Route path="/cahier" element={<AnswerSheet />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/actualites" element={<Actualites />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} /> {/*C'est ici le taost */}
    </>
  );
}

export default App;
