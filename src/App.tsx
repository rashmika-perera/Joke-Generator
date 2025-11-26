import { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-10">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Joke Generator
          </h2>
          <p className="text-white/90 mt-2 text-lg">Get ready to laugh!</p>
        </div>

        {/* Joke Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform transition-all duration-500 hover:scale-105">
          {!joke && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <p className="text-gray-400 text-xl">Click the button below to get a joke!</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin text-6xl mb-4">🎪</div>
              <p className="text-gray-600 text-xl font-semibold">Loading a hilarious joke...</p>
            </div>
          )}

          {joke && !loading && (
            <div className="space-y-6">
              {/* Setup */}
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🤔</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
                      Setup
                    </h3>
                    <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                      {joke.setup}
                    </p>
                  </div>
                </div>
              </div>

              {/* Punchline */}
              <div className={`transform transition-all duration-700 ${
                showPunchline 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-300">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">😆</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">
                        Punchline
                      </h3>
                      <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                        {joke.punchline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Joke Type Badge */}
              <div className="flex justify-center">
                <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                  #{joke.type}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="bg-white text-purple-600 font-bold text-xl px-12 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
          >
            {loading ? '🎲 Loading...' : '🎲 Get a Joke'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
