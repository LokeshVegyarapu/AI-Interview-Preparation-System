import { FileText } from "lucide-react";

function QuestionCard({ question }) {

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex items-center gap-3">

        <FileText className="text-blue-600"/>

        <h2 className="text-2xl font-bold">

          Interview Question

        </h2>

      </div>

      <p className="mt-4 text-lg">

        {question || "Click Generate Question"}

      </p>

    </div>

  );

}

export default QuestionCard;