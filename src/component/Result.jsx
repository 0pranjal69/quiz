import React, { useEffect, useState } from 'react';

const questions = [
  {
    id: 0,
    question: 'Which language is used to style web pages?',
    options: ['CSS', 'JavaScript', 'Python', 'PHP'],
    answer: 'CSS',
  },
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: [
      
      'Home Tool Markup Language',
      'HyperText Markup Language',
      'Hyperlink and Text Markup Language',
      'Hyperlink Markup Language',
    ],
    answer: 'HyperText Markup Language',
  },
  {
    id: 2,
    question: 'What color is usually used for a hyperlink?',
    options: ['Blue', 'Green', 'Red', 'Yellow'],
    answer: 'Blue',
  },
  {
    id: 3,
    question: 'Which tag is used to display images in HTML?',
    options: ['<img>', '<div>', '<p>', '<h1>'],
    answer: '<img>',
  },
];

function Result() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];
    setUserAnswers(storedAnswers);

    const calculatedScore = storedAnswers.reduce((acc, ans, idx) => {
      if (ans === questions[idx].answer) return acc + 1;
      return acc;
    }, 0);
    setScore(calculatedScore);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(/answerqui.jpg)` }}
    >
      <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-xl p-8 w-full max-w-2xl text-white">
        <h1 className="text-4xl font-bold text-center mb-6 poppins"> Quiz Completed!</h1>
        <p className="text-xl text-center mb-8 poppins">
          Your Score: <span className="font-bold ">{score}</span> / {questions.length}
        </p>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.answer;
            const notAttempted = userAns === null;

            return (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300"
              >
                <p className="font-semibold poppins text-lg mb-1 text-blue-700">{q.question}</p>
                <p className="text-sm poppins">
                  Your Answer:{' '}
                  <span
                    className={`font-semibold nunito ${
                      isCorrect
                        ? 'text-green-800'
                        : notAttempted
                        ? 'text-pink-200'
                        : 'text-red-600'
                    }`}
                  >
                    {notAttempted ? 'Not Attempted' : userAns}
                  </span>
                </p>
                <p className="text-sm poppins">
                  Correct Answer:{' '}
                  <span className="font-bold text-white nunito">{q.answer}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;
