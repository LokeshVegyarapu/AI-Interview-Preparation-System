import FeedbackCard from "../components/FeedbackCard";
import QuestionCard from "../components/QuestionCard";
import Recorder from "../components/Recorder";

function InterviewSection({
  company,
  setCompany,
  interviewType,
  setInterviewType,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  experience,
  setExperience,
  getQuestion,
  question,
  recording,
  startRecording,
  stopRecording,
  loading,
  transcription,
  feedback,
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-10">

      <div className="bg-white shadow-xl rounded-3xl p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          🎯 Configure Your AI Interview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <select
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            className="border rounded-xl p-3 shadow"
          >
            <option>General</option>
            <option>Google</option>
            <option>Amazon</option>
            <option>Microsoft</option>
            <option>TCS</option>
            <option>Infosys</option>
            <option>Accenture</option>
          </select>

          <select
            value={interviewType}
            onChange={(e)=>setInterviewType(e.target.value)}
            className="border rounded-xl p-3 shadow"
          >
            <option>Technical</option>
            <option>HR</option>
            <option>Behavioral</option>
            <option>Resume</option>
            <option>Mixed</option>
          </select>

          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="border rounded-xl p-3 shadow"
          >
            <option value="HR">HR</option>
            <option value="OOPS">OOPS</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">OS</option>
            <option value="CN">CN</option>
            <option value="DSA">DSA</option>
            <option value="AI">AI</option>
          </select>

          <select
            value={difficulty}
            onChange={(e)=>setDifficulty(e.target.value)}
            className="border rounded-xl p-3 shadow"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

        </div>

        <div className="flex justify-center gap-4 mt-6">

          <select
            value={experience}
            onChange={(e)=>setExperience(e.target.value)}
            className="border rounded-xl p-3 shadow"
          >
            <option>Fresher</option>
            <option>1-2 Years</option>
            <option>3-5 Years</option>
          </select>

          <button
            onClick={getQuestion}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl"
          >
            🚀 Generate AI Question
          </button>

        </div>

      </div>

      <QuestionCard question={question}/>

      <div className="my-8">
        <Recorder
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>

      {loading && (
        <h2 className="text-center text-xl animate-pulse">
          🤖 AI is analyzing...
        </h2>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Your Answer
        </h2>

        <p>
          {transcription || "Your answer will appear here..."}
        </p>

      </div>

      <div className="mt-8">

        <FeedbackCard feedback={feedback}/>

      </div>

    </div>
  );
}

export default InterviewSection;