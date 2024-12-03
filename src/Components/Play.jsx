import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Game() {
  const [fiszki, setFiszki] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [blur , setBlur] = useState(true); 

  const handleBlurEnter = () => {
    setBlur(prevBlur => !prevBlur);
  }
  const newBlur = () => {
    setBlur(true);
  }

  useEffect(() => {
    const storedFiszki = JSON.parse(localStorage.getItem("fiszki"));
    if (storedFiszki) {
      setFiszki(storedFiszki);
      if (storedFiszki.length > 0) {
        setCurrentQuestion(storedFiszki[0]); 
      }
    }
  }, []);

  const handleNextQuestion = () => {
    if (fiszki.length > 0) {
      const randomIndex = Math.floor(Math.random() * fiszki.length);
      setCurrentQuestion(fiszki[randomIndex]);
    }
    newBlur();
  };

  return (
    <div className="flex flex-col justify-center items-center mt-72 xl:mt-96 motion-preset-expand motion-duration-2000">
      <div onClick={handleBlurEnter} className="text-center max-w-96 p-4 bg-gray-700 mt-2 mb-2 rounded-md shadow hover:shadow-xl transition-shadow duration-300 relative cursor-pointer">
        {currentQuestion ? (
          <>
            <p className="text-xl font-bold text-white">{currentQuestion.question}</p>
            <p className={`font-medium text-green-300 mt-2 duration-300 ${blur ? 'blur-sm' : 'blur-none'}`}>{currentQuestion.answer}</p>
          </>
        ) : (
          <p className="text-gray-400">No questions. Add new ones in the Flashcards section.</p>
        )}
      </div>
      <div className="flex flex-col mt-2 font-medium text-gray-300 text-center">
        <button onClick={handleNextQuestion}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg shadow-md transition w-80">Next</button>
        <Link to="/home"
          className="px-6 py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition w-80">Back to home</Link>
      </div>
    </div>
  );
}
