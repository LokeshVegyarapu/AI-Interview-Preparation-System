import Achievements from "../components/Achievements";
import Dashboard from "../components/Dashboard";
import PerformanceChart from "../components/PerformanceChart";

function DashboardSection({
  totalInterviews,
  averageScore,
  highestScore,
  scores,
  category,
}) {
  return (
    <>
      <Dashboard
        totalInterviews={totalInterviews}
        averageScore={averageScore}
        highestScore={highestScore}
      />

      <PerformanceChart scores={scores} />

      <Achievements
        scores={scores}
        category={category}
      />
    </>
  );
}

export default DashboardSection;