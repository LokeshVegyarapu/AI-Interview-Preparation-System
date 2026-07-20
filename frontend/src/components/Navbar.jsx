import { BrainCircuit } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <BrainCircuit
            className="text-blue-600"
            size={34}
          />

          <div>

            <h1 className="text-2xl font-bold text-gray-800">

              AI Interview Platform

            </h1>

            <p className="text-sm text-gray-500">

              Practice • Improve • Get Hired

            </p>

          </div>

        </div>

        <div className="flex gap-8 text-gray-700 font-medium">

          <a
            href="#dashboard"
            className="hover:text-blue-600 transition duration-300"
          >
            Dashboard
          </a>

          <a
            href="#practice"
            className="hover:text-blue-600 transition duration-300"
          >
            Practice
          </a>

          <a
            href="#resume"
            className="hover:text-blue-600 transition duration-300"
          >
            Resume AI
          </a>

          <a
            href="#about"
            className="hover:text-blue-600 transition duration-300"
          >
            About
          </a>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;