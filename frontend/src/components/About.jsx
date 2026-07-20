import { Heart } from "lucide-react";

function About() {
  return (
    <div
      id="about"
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-center mb-8">
          👨‍💻 About The Developer
        </h1>

        <div className="text-center">

          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center text-white text-5xl font-bold">

            L

          </div>

          <h2 className="text-3xl font-bold mt-6">

            Lokesh Vegyarapu

          </h2>

          <p className="text-gray-600 mt-3 text-lg">

            Full Stack Developer • AI Enthusiast • Software Engineer

          </p>

          <p className="mt-8 text-gray-700 leading-8">

            This AI Powered Interview Preparation System was
            designed and developed by <b>Lokesh Vegyarapu</b>.
            The project combines Artificial Intelligence,
            Speech Recognition, Resume Analysis and
            Performance Analytics to help students prepare
            for technical interviews.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-blue-50 rounded-2xl p-6 text-center">

            <div className="text-4xl">💻</div>

            <h3 className="font-bold text-xl">

              Technologies

            </h3>

            <p className="mt-3">

              React • FastAPI • Gemini AI • Whisper AI • Tailwind CSS

            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <div className="text-4xl">🐙</div>
            <h3 className="font-bold text-xl">

              GitHub

            </h3>

            <a
              href="https://github.com/LokeshVegyarapu"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >

              https://github.com/LokeshVegyarapu

            </a>

          </div>

          <div className="bg-purple-50 rounded-2xl p-6 text-center">

            <div className="text-4xl">💼</div>
            <h3 className="font-bold text-xl">

              LinkedIn

            </h3>

            <a
              href="https://www.linkedin.com/in/lokesh-vegyarapu-03305424b"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >

              href="https://www.linkedin.com/in/lokesh-vegyarapu-03305424b"

            </a>

          </div>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-8 mt-10 text-center">

          <div className="text-4xl">📧</div>

          <h3 className="text-2xl font-bold">

            Contact : 7981537573

          </h3>

            <a    href="mailto:lokeshvegyarapu@gmail.com"
                className="mt-3 block text-blue-600 hover:underline"            >
                lokeshvegyarapu@gmail.com
            </a>
        </div>

        <div className="text-center mt-10">

          <Heart className="inline text-red-500"/>

          <span className="ml-2 font-semibold">

            Thank you for visiting my project ❤️

          </span>

        </div>

      </div>
    </div>
  );
}

export default About;