import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ultimate-quiz-furv.onrender.com/api/auth/jwt/create/",
        {
          username,
          password,
        }
      );

      const { access, refresh } = res.data;

      const userRes = await axios.get(
        "https://ultimate-quiz-furv.onrender.com/api/auth/users/me/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const userData = userRes.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      toast.success("✅ Connexion réussie !");
      navigate("/");
    } catch (error) {
      console.error("Erreur de login :", error);
      if (error.response && error.response.status === 401) {
        toast.error("❌ Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        toast.error("❌ Erreur serveur ou réseau.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Se connecter
        </button>
      </form>

      <p className="mt-3 text-center">
        Pas encore de compte ? <Link to="/signup">S’inscrire ici</Link>
      </p>
    </div>
  );
}
