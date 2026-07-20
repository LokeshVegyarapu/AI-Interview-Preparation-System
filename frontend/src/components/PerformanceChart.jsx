import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function PerformanceChart({ scores }) {
  const data = scores.map((score, index) => ({
    interview: index + 1,
    score: score,
  }));

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📈 Performance Progress
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="interview" />

          <YAxis domain={[0, 10]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;