import axios from "axios";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import Recorder from "./Recorder";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [resumeQuestion, setResumeQuestion] = useState("");

  const [questionLoading, setQuestionLoading] = useState(false);

  const [recording, setRecording] = useState(false);

  const [transcription, setTranscription] = useState("");

  const [feedback, setFeedback] = useState(null);

  const mediaRecorderRef = useRef(null);

  const audioChunksRef = useRef([]);

  //------------------------------------------------------

  const uploadResume = async () => {

    if (!file) {

      alert("Please Select Resume");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(

        "http://127.0.0.1:8000/resume-analysis",

        formData

      );

      setResult(response.data);
      console.log("Resume Response:", response.data);

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };


  const startResumeInterview = async () => {

    try {

      setQuestionLoading(true);

      const response = await axios.get(

        "http://127.0.0.1:8000/resume-question"

      );

      setResumeQuestion(response.data.question);

      setTranscription("");

      setFeedback(null);

      setRecording(false);

    } catch (error) {

      console.log(error);

    }

    setQuestionLoading(false);

  };

  //------------------------------------------------------

  const nextResumeQuestion = async () => {

    try {

      setQuestionLoading(true);

      const response = await axios.get(

        "http://127.0.0.1:8000/resume-question"

      );

      setResumeQuestion(response.data.question);

      setTranscription("");

      setFeedback(null);

      setRecording(false);

    } catch (error) {

      console.log(error);

    }

    setQuestionLoading(false);

  };

  //------------------------------------------------------

  const startRecording = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({

      audio: true,

    });

    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;

    audioChunksRef.current = [];

    recorder.ondataavailable = (event) => {

      audioChunksRef.current.push(event.data);

    };

    recorder.start();

    setRecording(true);

  };

  //------------------------------------------------------

  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {

      const audioBlob = new Blob(

        audioChunksRef.current,

        {

          type: "audio/webm",

        }

      );

      const formData = new FormData();

      formData.append(

        "file",

        audioBlob,

        "resume.webm"

      );

      try {

        setLoading(true);

        const speech = await axios.post(

          "http://127.0.0.1:8000/transcribe",

          formData

        );

        setTranscription(

          speech.data.transcription

        );

        const evaluation = await axios.post(

          "http://127.0.0.1:8000/evaluate",

          {

            question: resumeQuestion,

            answer: speech.data.transcription,

          }

        );

        setFeedback(

          evaluation.data

        );

      } catch (err) {

        console.log(err);

      }

      setLoading(false);

    };

    setRecording(false);

  };
  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        📄 AI Resume Analyzer
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadResume}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          <Upload className="inline mr-2" />
          Analyze Resume
        </button>

      </div>

      {loading && (

        <h2 className="text-center text-xl mt-8 animate-pulse">

          🤖 AI is Working...

        </h2>

      )}

      {result && (

        <div className="space-y-8 mt-10">

          <div className="bg-blue-50 rounded-2xl p-6 text-center">

            <h2 className="text-2xl font-bold">

              ATS SCORE

            </h2>

            <h1 className="text-6xl font-bold text-blue-600">

              {result.ats_score}%

            </h1>

          </div>

          <div className="bg-green-50 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              <CheckCircle className="inline mr-2" />

              Strengths

            </h2>

            {result.strengths.map((item,index)=>(

              <p key={index}>✅ {item}</p>

            ))}

          </div>

          <div className="bg-red-50 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              <AlertCircle className="inline mr-2"/>

              Missing Skills

            </h2>

            {result.missing_skills.map((item,index)=>(

              <p key={index}>❌ {item}</p>

            ))}

          </div>

          <div className="bg-yellow-50 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              Suggestions

            </h2>

            {result.suggestions.map((item,index)=>(

              <p key={index}>💡 {item}</p>

            ))}

          </div>

          <div className="bg-purple-50 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              <FileText className="inline mr-2"/>

              Professional Summary

            </h2>

            <p>

              {result.professional_summary}

            </p>

          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">

            <h2 className="text-3xl font-bold mb-5">

              🚀 Resume Mock Interview

            </h2>

            <button

              onClick={startResumeInterview}

              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition"

            >

              🎤 Start Resume Interview

            </button>

          </div>

          {questionLoading && (

            <h2 className="text-center text-xl animate-pulse">

              Generating Resume Question...

            </h2>

          )}

          {resumeQuestion && (

            <div className="bg-indigo-50 rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold mb-4">

                🎯 Interview Question

              </h2>

              <p className="text-lg leading-8 mb-8">

                {resumeQuestion}

              </p>

              <Recorder
                recording={recording}
                startRecording={startRecording}
                stopRecording={stopRecording}
              />

              {transcription && (

                <div className="bg-white rounded-xl shadow p-6 mt-8">

                  <h2 className="text-2xl font-bold mb-4">

                    📝 Your Answer

                  </h2>

                  <p>

                    {transcription}

                  </p>

                </div>

              )}

              {feedback && (

                <div className="bg-green-50 rounded-xl shadow p-6 mt-8">

                  <h2 className="text-2xl font-bold mb-5">

                    🤖 AI Feedback

                  </h2>

                  <h3 className="font-bold">

                    ⭐ Score

                  </h3>

                  <p className="mb-5">

                    {feedback.score}/10

                  </p>

                  <h3 className="font-bold">

                    ✅ Strengths

                  </h3>

                  {feedback.strengths?.map((item,index)=>(

                    <p key={index}>

                      • {item}

                    </p>

                  ))}

                  <h3 className="font-bold mt-5">

                    ❌ Weaknesses

                  </h3>

                  {feedback.weaknesses?.map((item,index)=>(

                    <p key={index}>

                      • {item}

                    </p>

                  ))}

                  <h3 className="font-bold mt-5">

                    💡 Better Answer

                  </h3>

                  <p>

                    {feedback.better_answer}

                  </p>

                  <div className="text-center mt-8">

                    <button

                      onClick={nextResumeQuestion}

                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold"

                    >

                      ➡️ Next Resume Question

                    </button>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      )}

    </div>

  );

}

export default ResumeAnalyzer;