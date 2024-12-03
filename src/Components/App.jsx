import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [fiszki, setFiszki] = useState([]);
  const [newQuestion, setNewQuestion] = useState(""); 
  const [newAnswer, setNewAnswer] = useState(""); 
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [fiszkiVisable, setfiszkiVisable] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEditEntry = () => {
    if (newQuestion.trim() === "" || newAnswer.trim() === "") return;

    if (editIndex !== null) {
      const updatedFiszki = [...fiszki];
      updatedFiszki[editIndex] = { question: newQuestion, answer: newAnswer };
      setFiszki(updatedFiszki);
      setEditIndex(null);
    } else {
      setFiszki([...fiszki, { question: newQuestion, answer: newAnswer }]);
    }

    setNewQuestion("");
    setNewAnswer("");
    setIsFormVisible(true);
  };

  const handleDeleteEntry = (index) => {
    const updatedFiszki = fiszki.filter((_, i) => i !== index);
    setFiszki(updatedFiszki);
  };

  const handleEditEntry = (index) => {
    setNewQuestion(fiszki[index].question);
    setNewAnswer(fiszki[index].answer);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  useEffect(() => {
    const storedFiszki = JSON.parse(localStorage.getItem("fiszki"));
    if (storedFiszki) {
      setFiszki(storedFiszki);
    }
  }, []);

  useEffect(() => {
    if (fiszki.length > 0) {
      localStorage.setItem("fiszki", JSON.stringify(fiszki));
    }
  }, [fiszki]);

  return (
    <div className="flex justify-center mt-8 xl:mt-52 motion-preset-expand motion-duration-1000">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-500">
          {fiszki.length === 0 ? "Lack flashcard..." : "Your flashcard!"}
        </h1>
        <div className={`grid ${fiszki.length === 0 ? "grid-cols-1" : " grid-cols-2"} m-2`}>

          <button
            className="mt-6 px-6 py-3 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition font-medium
            col-span-1"
            onClick={() => setIsFormVisible((prev) => !prev)}
          >
            {editIndex !== null ? "Edit flashcard" : "Add new flashcard"}
          </button>
          {fiszki.length > 0 && (
            <button
              onClick={() => setfiszkiVisable((prev) => !prev)}
              className="mt-6 px-6 py-3 ml-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition font-medium
              col-span-1"
            >
              {!fiszkiVisable ? "Show flashcard" : "Hide flashcard"}
            </button>
          )}
          <Link to={`/${fiszki.length === 0 ? "home" : "play"}`}
            onClick={() => setfiszkiVisable((prev) => !prev)}
            disabled={fiszki.length === 0}
            className={`mt-4 px-6 py-3 col-span-2 ${fiszki.length === 0
              ? "text-gray-100 bg-gray-500 cursor-not-allowed"
              : "text-gray-300 bg-gray-700 hover:bg-gray-600"
              } rounded-lg shadow-md transition font-medium`}
          >
            Start learning
          </Link>
        </div>


        {isFormVisible && (
          <div className="mt-6 flex justify-center motion-preset-expand motion-duration-1000">
            <div className="flex flex-col">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Question for the flashcard"
                className="px-6 py-3 bg-gray-700 rounded-lg mr-2 w-72 text-gray-300 font-medium"
              />
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Answer for the flashcard"
                className="mt-2 px-6 py-3 bg-gray-700 rounded-lg mr-2 w-72 text-green-300 font-medium"
              />
            </div>
            <button
              onClick={handleAddOrEditEntry}
              className="px-6 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition font-medium"
            >
              {editIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        )}

        {fiszkiVisable && (
          <ul className="mt-6 mx-2 list-disc text-left motion-preset-expand motion-duration-1000">
            {fiszki.map((entry, index) => (
              <li key={index} className="text-lg text-white list-none text-center motion-preset-expand">
                <div className="p-4 bg-gray-700 mt-2 mb-2 rounded-md shadow hover:shadow-xl transition-shadow duration-300 relative">
                  <strong className="block mb-2">{entry.question}</strong>
                  <p className="text-base text-green-300 font-medium mb-2">
                    {entry.answer}
                  </p>
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button
                      className="text-red-500 hover:text-red-400 transition-colors"
                      onClick={() => handleDeleteEntry(index)}
                      title="Delete"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                      onClick={() => handleEditEntry(index)}
                      title="Edit"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div >
  );
}
