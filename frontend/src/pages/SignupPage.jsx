import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    niveau: "BEPC",
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ultimate-quiz-furv.onrender.com/api/auth/users/",
        formData
      );

      const loginRes = await axios.post(
        "https://ultimate-quiz-furv.onrender.com/api/auth/jwt/create/",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      const userRes = await axios.get(
        "https://ultimate-quiz-furv.onrender.com/api/auth/users/me/",
        {
          headers: { Authorization: `Bearer ${loginRes.data.access}` },
        }
      );

      localStorage.setItem("token", loginRes.data.access);
      localStorage.setItem("user", JSON.stringify(userRes.data));
      setUser(userRes.data);

      toast.success("✅ Compte créé avec succès !");
      navigate("/quiz");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      if (error.response?.data) {
        const messages = Object.entries(error.response.data)
          .map(([field, msg]) => `${field}: ${msg.join(" ")}`)
          .join("\n");
        toast.error("❌ Erreur :\n" + messages);
      } else {
        toast.error("❌ Erreur de connexion au serveur.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <label className="form-label">Niveau scolaire :</label>
        <select
          name="niveau"
          className="form-select mb-3"
          onChange={handleChange}
          value={formData.niveau}
        >
          <option value="BEPC">BEPC</option>
          <option value="BAC">BAC</option>
          <option value="LICENCE">LICENCE</option>
        </select>

        <button className="btn btn-success w-100" type="submit">
          Créer un compte
        </button>
      </form>

      <p className="mt-3 text-center">
        Déjà inscrit ? <Link to="/login">Se connecter ici</Link>
      </p>
    </div>
  );
}
