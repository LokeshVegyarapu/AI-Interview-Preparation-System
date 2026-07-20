import {
    AlertCircle,
    CheckCircle,
    Lightbulb
} from "lucide-react";
import ScoreCard from "./ScoreCard";

function FeedbackCard({ feedback }) {
  if (!feedback) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          🤖 AI Feedback
        </h2>

        <p className="text-gray-500 mt-4">
          Complete an interview to receive your personalized AI report.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Score Card */}

      <ScoreCard score={feedback.score} />

      {/* Strengths */}

      <div className="bg-green-50 rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-4">

          <CheckCircle
            className="text-green-600"
            size={30}
          />

          <h2 className="text-2xl font-bold">
            Strengths
          </h2>

        </div>

        <ul className="space-y-3">

          {feedback.strengths.map((item, index) => (

            <li
              key={index}
              className="bg-white rounded-xl p-3 shadow"
            >
              ✅ {item}
            </li>

          ))}

        </ul>

      </div>

      {/* Weaknesses */}

      <div className="bg-red-50 rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-4">

          <AlertCircle
            className="text-red-600"
            size={30}
          />

          <h2 className="text-2xl font-bold">
            Areas to Improve
          </h2>

        </div>

        <ul className="space-y-3">

          {feedback.weaknesses.map((item, index) => (

            <li
              key={index}
              className="bg-white rounded-xl p-3 shadow"
            >
              ⚠️ {item}
            </li>

          ))}

        </ul>

      </div>

      {/* Better Answer */}

      <div className="bg-blue-50 rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-4">

          <Lightbulb
            className="text-yellow-500"
            size={30}
          />

          <h2 className="text-2xl font-bold">
            AI Suggested Answer
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-5 shadow leading-8 text-gray-700">
          {feedback.better_answer}
        </div>

      </div>

    </div>
  );
}

export default FeedbackCard;