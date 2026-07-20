import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ score }) {
  const percentage = score * 10;

  const getColor = () => {
    if (score >= 8) return "#22c55e";
    if (score >= 6) return "#f59e0b";
    return "#ef4444";
  };

  const getMessage = () => {
    if (score >= 9) return "🏆 Outstanding";
    if (score >= 8) return "🌟 Excellent";
    if (score >= 7) return "👍 Very Good";
    if (score >= 6) return "🙂 Good";
    return "📚 Needs Improvement";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-center mb-8">
        AI Interview Score
      </h2>

      <div className="w-56 h-56 mx-auto">

        <CircularProgressbar
          value={percentage}
          text={`${score}/10`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: "#111827",
            trailColor: "#e5e7eb",
            strokeLinecap: "round",
            textSize: "16px",
          })}
        />

      </div>

      <div className="mt-8 text-center">

        <span
          className="px-5 py-2 rounded-full text-white font-bold text-lg"
          style={{ backgroundColor: getColor() }}
        >
          {getMessage()}
        </span>

      </div>

      <div className="mt-6 text-center text-gray-600">
        Overall Performance: <b>{percentage}%</b>
      </div>

    </div>
  );
}

export default ScoreCard;