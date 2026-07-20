import axios from "axios";
import { useRef, useState } from "react";

import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import DashboardSection from "./sections/DashboardSection";
import InterviewSection from "./sections/InterviewSection";

function App() {
  const [category, setCategory] = useState("HR");
  const [difficulty, setDifficulty] = useState("Easy");
  const [experience, setExperience] = useState("Fresher");
  const [company, setCompany] = useState("General");
  const [interviewType, setInterviewType] = useState("Technical");
  const [question, setQuestion] = useState("");
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState(() => {
  const savedScores = localStorage.getItem("scores");

  return savedScores ? JSON.parse(savedScores) : [];
});

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // -----------------------------
  // Generate Question
  // -----------------------------
  const getQuestion = async () => {

  try {

    const response = await axios.get(
      "http://127.0.0.1:8000/question",
      {
        params: {
          category,
          difficulty,
          experience,
          company,
          interview_type: interviewType,
        },
      }
    );

    console.log(response.data);
console.log(response.data.question);

if (response.data?.question) {

    setQuestion(response.data.question);

} else {

    console.log(response.data);

    alert("No question received from AI.");

}

    setTranscription("");

    setFeedback("");

  } catch (error) {

    console.error("Question Error:", error);

  }

};

  // -----------------------------
  // Start Recording
  // -----------------------------
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error(error);
      alert("Microphone access denied.");
    }
  };

  // -----------------------------
  // Stop Recording
  // -----------------------------
  const stopRecording = () => {
    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();

      formData.append("file", audioBlob, "recording.webm");

      try {
        setLoading(true);

        // Transcribe
        const transcribeResponse = await axios.post(
          "http://127.0.0.1:8000/transcribe",
          formData
        );

        const answer = transcribeResponse.data.transcription;

        setTranscription(answer);

        // Evaluate
       const feedbackResponse = await axios.post(
  "http://127.0.0.1:8000/evaluate",
  {
    question,
    answer,
  }
);

setFeedback(feedbackResponse.data);

// Save Interview History
const history =
  JSON.parse(localStorage.getItem("history")) || [];

history.unshift({
  category,
  score: feedbackResponse.data.score,
  date: new Date().toLocaleDateString(),
});

localStorage.setItem(
  "history",
  JSON.stringify(history)
);

// Existing Score Logic
const updatedScores = [
  ...scores,
  feedbackResponse.data.score,
];

setScores(updatedScores);

localStorage.setItem(
  "scores",
  JSON.stringify(updatedScores)
);

setScores(updatedScores);

localStorage.setItem(
  "scores",
  JSON.stringify(updatedScores)
);
      } catch (error) {
        console.error(error);
        alert("Processing Failed");
      }

      setLoading(false);
    };

    setRecording(false);
  };

const totalInterviews = scores.length;

const highestScore =
  scores.length > 0
    ? Math.max(...scores)
    : 0;

const averageScore =
  scores.length > 0
    ? (
        scores.reduce((a, b) => a + b, 0) /
        scores.length
      ).toFixed(1)
    : 0;
    
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

    <Navbar />

    <Hero />

    <section id="dashboard">
      <DashboardSection
        totalInterviews={totalInterviews}
        averageScore={averageScore}
        highestScore={highestScore}
        scores={scores}
        category={category}
      />
    </section>

    <section id="practice">
  <InterviewSection
    company={company}
    setCompany={setCompany}
    interviewType={interviewType}
    setInterviewType={setInterviewType}
    category={category}
    setCategory={setCategory}
    difficulty={difficulty}
    setDifficulty={setDifficulty}
    experience={experience}
    setExperience={setExperience}
    getQuestion={getQuestion}
    question={question}
    recording={recording}
    startRecording={startRecording}
    stopRecording={stopRecording}
    loading={loading}
    transcription={transcription}
    feedback={feedback}
  />
</section>

    <section id="resume">
      <ResumeAnalyzer />
    </section>

    <section id="about">
      <About />
    </section>

    <Footer />

  </div>
);
}

export default App;