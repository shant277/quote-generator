import "./App.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json);
        setQuote(json[0]);
      });
  }, []);

  function getNewQuote() {
    setQuote(getRandomQuote(quotes));
  }
  const appVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 0.5,
      },
    },
    tap: { scale: 0.9 },
  };
  const quoteVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, duration: 2 },
    exit: { opacity: 0 },
  };

  return (
    <motion.main>
      <h1>Quote Generator</h1>
      <section>
        <motion.button
          onClick={getNewQuote}
          variants={appVariants}
          whileHover="hover"
          whileTap="tap"
        >
          New Quote
        </motion.button>
        <motion.h3
          key={quote?.text}
          variants={quoteVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <span>“</span>
          {quote?.text}
          <span>“</span>
        </motion.h3>
        {<i>- {quote?.author}</i>}
      </section>
    </motion.main>
  );
}
