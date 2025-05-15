import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Tu gères comme un boss 💪",
  "Continue, t’es au top 🚀",
  "On lâche rien ! 😎",
  "Tu vas tout déchirer 💥",
];

const Mascotte = () => {
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "rgba(255,255,255,0.95)",
        borderRadius: "1rem",
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 0 12px rgba(0,0,0,0.2)",
        zIndex: 1000,
        maxWidth: "250px",
      }}
    >
      <img
        src="/ce6dea2a-500c-4acf-ac69-bd078093011f.png"
        alt="Mascotte"
        style={{ width: "50px", marginRight: "10px" }}
      />
      <div style={{ fontWeight: 500 }}>{message}</div>
    </motion.div>
  );
};

export default Mascotte;
