import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ultimate-quiz-furv.onrender.com/api/contact/",
        formData
      );
      setSuccess(true);
      setFormData({ nom: '', email: '', message: '' });
    } catch (error) {
      alert('Erreur lors de l\'envoi.',error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Contactez-nous</h2>
      {success && <div className="alert alert-success">Message envoyé !</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input name="nom" className="form-control" value={formData.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea name="message" className="form-control" value={formData.message} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Envoyer</button>
      </form>
    </div>
  );
}
