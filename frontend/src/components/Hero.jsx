import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <div
      id="home"
      className="text-center py-14"
    >
      <Sparkles
        size={60}
        className="mx-auto text-blue-600"
      />

      <h1 className="text-5xl font-bold mt-5">
        Ace Your Next Interview
      </h1>

      <p className="text-gray-600 mt-4 text-lg">
        AI Powered Interview Practice using
        <br />
        Whisper AI + Gemini AI
      </p>
    </div>
  );
}

export default Hero;