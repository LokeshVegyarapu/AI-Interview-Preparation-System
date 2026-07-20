import {
  Award,
  Brain,
  Flame,
  Trophy,
} from "lucide-react";

function Achievements({
  scores,
  category,
}) {

  const badges = [];

  if (scores.length >= 1)
    badges.push({
      icon: <Award size={30} />,
      title: "First Interview",
      color: "bg-blue-100",
    });

  if (scores.length >= 5)
    badges.push({
      icon: <Flame size={30} />,
      title: "5 Interviews",
      color: "bg-orange-100",
    });

  if (
    scores.some((s) => s === 10)
  )
    badges.push({
      icon: <Trophy size={30} />,
      title: "Perfect Score",
      color: "bg-yellow-100",
    });

  if (category === "AI")
    badges.push({
      icon: <Brain size={30} />,
      title: "AI Explorer",
      color: "bg-purple-100",
    });

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">

        🏅 Achievements

      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        {badges.map((badge, index) => (

          <div
            key={index}
            className={`${badge.color} rounded-2xl p-5 text-center shadow hover:scale-105 transition`}
          >

            <div className="flex justify-center mb-3">
              {badge.icon}
            </div>

            <h3 className="font-bold">
              {badge.title}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Achievements;  