import { useEffect, useState } from "react";
import axios from "axios";

export default function Actualites() {
  const [actus, setActus] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/actualites/")
      .then((res) => setActus(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>📰 Actualités</h2>
      {actus.map((a) => (
        <div key={a.id} className="mb-4 p-3 border rounded">
          <h4>{a.titre}</h4>
          <small className="text-muted">
            {new Date(a.date_pub).toLocaleDateString()}
          </small>
          <p className="mt-2">{a.contenu}</p>
        </div>
      ))}
    </div>
  );
}
