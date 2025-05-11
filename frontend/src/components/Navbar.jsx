import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/6b842b39-6aba-440b-87ae-a5f5384cd030.png"
          alt="Logo Concours_Facile"
          style={{ height: "40px", marginRight: "10px" }}
        />
        Concours_Facile
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/quiz">
              Quiz
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/actualites">
              Actualités
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              À propos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>

        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              👤 {user.username}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <span className="dropdown-item-text">
                  🎓 Niveau : <strong>{user.niveau}</strong>
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/cahier">
                  📘 Mon Cahier
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  🔓 Déconnexion
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-outline-primary" to="/login">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
