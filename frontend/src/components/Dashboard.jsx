import {
  FaChartLine,
  FaClipboardList,
  FaFire,
  FaHistory,
  FaStar,
  FaTrophy,
} from "react-icons/fa";

function Dashboard({
  totalInterviews,
  averageScore,
  highestScore,
}) {

  const history =
    JSON.parse(localStorage.getItem("history")) || [];

  return (

    <div className="space-y-8">

      <div className="grid md:grid-cols-5 gap-6">

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

          <FaClipboardList
            className="mx-auto text-blue-600"
            size={40}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Interviews

          </h3>

          <h1 className="text-4xl font-bold mt-2">

            {totalInterviews}

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

          <FaStar
            className="mx-auto text-yellow-500"
            size={40}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Average Score

          </h3>

          <h1 className="text-4xl font-bold mt-2">

            {averageScore}

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

          <FaTrophy
            className="mx-auto text-green-600"
            size={40}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Highest Score

          </h3>

          <h1 className="text-4xl font-bold mt-2">

            {highestScore}

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

          <FaFire
            className="mx-auto text-red-500"
            size={40}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Today's Interviews

          </h3>

          <h1 className="text-4xl font-bold mt-2">

            {history.length}

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition">

          <FaChartLine
            className="mx-auto text-purple-600"
            size={40}
          />

          <h3 className="mt-4 text-lg font-semibold">

            Progress

          </h3>

          <h1 className="text-4xl font-bold mt-2">

            🚀

          </h1>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-3 mb-6">

          <FaHistory
            className="text-blue-600"
            size={28}
          />

          <h2 className="text-3xl font-bold">

            Interview History

          </h2>

        </div>

        {history.length === 0 ? (

          <p className="text-gray-500">

            No Interviews Yet.

          </p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">

                  Category

                </th>

                <th className="py-3 text-left">

                  Score

                </th>

                <th className="py-3 text-left">

                  Date

                </th>

              </tr>

            </thead>

            <tbody>

              {history.slice(0,10).map((item,index)=>(

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3">

                    {item.category}

                  </td>

                  <td className="py-3">

                    ⭐ {item.score}/10

                  </td>

                  <td className="py-3">

                    {item.date}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default Dashboard;