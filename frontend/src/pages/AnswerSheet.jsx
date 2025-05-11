import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

export default function AnswersPage() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("answerLog"));
    if (stored) setAnswers(stored);
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF();

    const logo = new Image();
    logo.src = "../../public/6b842b39-6aba-440b-87ae-a5f5384cd030.png";
    logo.onload = () => {
      pdf.addImage(logo, 'PNG', 10, 10, 40, 20);
      let y = 40;
      pdf.setFontSize(14);
      pdf.text("Mon Cahier de Réponses", 10, y);
      y += 10;

      answers.forEach((a, i) => {
        pdf.setFontSize(12);
        pdf.text(`Q${i + 1}. ${a.question}`, 10, y); y += 7;
        pdf.text(`Ta réponse : ${a.selected}`, 10, y); y += 7;
        pdf.text(`Bonne réponse : ${a.correctAnswer}`, 10, y); y += 7;
        pdf.text(a.isCorrect ? '✅ Bonne réponse' : '❌ Mauvaise réponse', 10, y);
        y += 10;
      });

      pdf.save("cahier_concours_facile.pdf");
    };
  };

  if (!answers || answers.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Mon Cahier</h2>
        <p>Aucune réponse enregistrée pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📘 Mon Cahier de Réponses</h2>

      <button className="btn btn-success mb-4" onClick={generatePDF}>
        📥 Télécharger en PDF
      </button>

      {answers.map((item, index) => (
        <div key={index} className="mb-3 p-3 border rounded shadow-sm">
          <h5 className="mb-2">Question : {item.question}</h5>
          <p className="mb-1">✅ Réponse donnée : <strong>{item.selected}</strong></p>
          <p className="mb-1">🧠 Bonne réponse : <strong>{item.correctAnswer}</strong></p>
          <p>
            {item.isCorrect ? (
              <span className="text-success">✅ Bonne réponse</span>
            ) : (
              <span className="text-danger">❌ Mauvaise réponse</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
