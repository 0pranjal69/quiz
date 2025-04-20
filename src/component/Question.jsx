import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const questions = [
  {
    id: 0,
    question: "Which language is used to style web pages?",
    options: ["CSS", "JavaScript", "Python", "PHP"],
  },
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [ "Home Tool Markup Language","HyperText Markup Language", "Hyperlink and Text Markup Language", "Hyperlink Markup Language"],
  },
  {
    id: 2,
    question: "What color is usually used for a hyperlink?",
    options: ["Blue", "Green", "Red", "Yellow"],
  },
  {
    id: 3,
    question: "Which tag is used to display images in HTML?",
    options: ["<img>", "<div>", "<p>", "<h1>"],
  },
  
];

function Question() {
  const { id } = useParams();
  const index = parseInt(id || 0);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [timeLeft, setTimeLeft] = useState(10);
  const [canSubmit, setCanSubmit] = useState(true);

  const selectedAnswer = watch("answer");

  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = sessionStorage.getItem("userAnswers");
    return saved ? JSON.parse(saved) : Array(questions.length).fill(null);
  });

  const handleAutoSubmit = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = null;
    sessionStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
    setUserAnswers(updatedAnswers);
    setCanSubmit(false);
    onSubmit(updatedAnswers);
  };

  const handleManualSubmit = (data) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = data.answer || null;
    sessionStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
    setUserAnswers(updatedAnswers);
    onSubmit(updatedAnswers);
  };

  const onSubmit = (updatedAnswers) => {
    if (index + 1 < questions.length) {
      navigate(`/question/${index + 1}`);
    } else {
      navigate("/result");
    }
  };

  useEffect(() => {
    setTimeLeft(10);
    setCanSubmit(true);
    reset();
    setValue("answer", null);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleAutoSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, reset, setValue]);

  const handleClearSelection = () => {
    setValue("answer", null);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
<div
  className="min-h-screen flex flex-col items-center justify-start p-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/bgqui.jpg')" }}
>
      
      {/* Train-style Progress Bar */}
      <motion.div
        className="flex gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {questions.map((q, i) => {
          const isAnswered = userAnswers[i] !== null;
          const isCurrent = i === index;
          return (
            <motion.div
              key={i}
              className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-[4px_4px_0px_black]
                ${
                  isCurrent
                    ? "bg-blue-600 text-white scale-110 shadow-[4px_4px_10px_#000075]"
                    : isAnswered
                    ? "bg-blue-300 text-white"
                    : "bg-gray-300 text-gray-700"
                }
              `}
              layout
            >
              {i + 1}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Question Box */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="  inset-0 bg-black/10 rounded-2xl backdrop-blur-md p-6 w-full max-w-md"
      >
        <h2 className="text-3xl  font-bold mb-6 text-gray-200 poppins">
          {questions[index].question}
        </h2>

        <form onSubmit={handleSubmit(handleManualSubmit)} className="space-y-4">
          {questions[index].options.map((option, i) => {
            const isSelected = selectedAnswer === option;
            return (
              <label
                key={i}
                className={`flex items-center  justify-between border-2 rounded-xl p-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-blue-500 "
                    : "border-gray-300 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`relative h-10 flex justify-center items-center rounded-sm  w-10  
                   bg-gray-300`}>
                    <span className={`absolute font-bold   ${
                  isSelected
                    ? "text-[#073496] "
                    : "text-black "
                } `}>
                      {optionLabels[i]}
                    </span>
                  </div>
                  <input
                    type="radio"
                    value={option}
                    {...register("answer")}
                    checked={isSelected}
                    onChange={() => setValue("answer", option)}
                    className="hidden"
                  />
                  <span className="flex-grow nunito text-gray-200">{option}</span>
                </div>
                {isSelected && <FaCheck className="text-green-500 text-lg" />}
              </label>
            );
          })}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-sm poppins text-red-500 underline hover:text-red-700"
            >
              Clear selection
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`rounded-xl border-[2px]  border-dashed border-black bg-white px-4 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] poppins hover:rounded-md hover:text-white hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-md active:shadow-none ${
                canSubmit
                  ? "bg-blue-500 text-black hover:bg-blue-600"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-4 text-gray-100 text-sm text-right poppins">
          Time left: {timeLeft}s
        </div>
      </motion.div>
    </div>
  );
}

export default Question;
