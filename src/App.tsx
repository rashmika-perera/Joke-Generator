import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Joke {
  setup: string;
  punchline: string;
  type: string;
}

function App() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setShowPunchline(false);
    setJoke(null);
    
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
      const data = await response.json();
      setJoke(data);
      
      setTimeout(() => {
        setShowPunchline(true);
      }, 2000);
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 sm:p-10 font-sans">
      <motion.div 
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-wider">
            Joke Generator
          </h2>
          <p className="text-white/90 mt-3 text-xl">Your daily dose of laughter!</p>
        </motion.div>

        {/* Joke Card */}
        <motion.div 
          className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-6 border border-white/30"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.03, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!joke && !loading && (
              <motion.div
                key="initial"
                className="text-center py-12"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div 
                  className="text-7xl mb-6"
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                >
                  🎭
                </motion.div>
                <p className="text-white text-2xl">Ready for a chuckle? Hit the button!</p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                className="text-center py-12"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div 
                  className="inline-block text-7xl mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  🎪
                </motion.div>
                <p className="text-white text-2xl font-semibold">Brewing up a good one...</p>
              </motion.div>
            )}

            {joke && !loading && (
              <motion.div 
                key="joke"
                className="space-y-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Setup */}
                <motion.div variants={itemVariants}>
                  <div className="flex items-start gap-4">
                    <span className="text-4xl mt-1">🤔</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wider mb-2">
                        Setup
                      </h3>
                      <p className="text-3xl font-bold text-white leading-snug">
                        {joke.setup}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Punchline */}
                <AnimatePresence>
                  {showPunchline && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-2xl p-6 border border-white/30 mt-4">
                        <div className="flex items-start gap-4">
                          <span className="text-4xl mt-1">😆</span>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-orange-200 uppercase tracking-wider mb-2">
                              Punchline
                            </h3>
                            <p className="text-3xl font-bold text-white leading-snug">
                              {joke.punchline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Joke Type Badge */}
                <motion.div className="flex justify-center pt-4" variants={itemVariants}>
                  <span className="bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full">
                    Type: {joke.type}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            className="bg-white text-purple-600 font-bold text-xl py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
            onClick={fetchJoke}
            whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Get a New Joke'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
