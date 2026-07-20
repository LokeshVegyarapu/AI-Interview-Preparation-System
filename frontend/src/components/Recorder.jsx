import { Mic, Square } from "lucide-react";

function Recorder({ recording, startRecording, stopRecording }) {

  return (

    <div className="text-center">

      {!recording ? (

        <button

          onClick={startRecording}

          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 mx-auto"

        >

          <Mic />

          Start Recording

        </button>

      ) : (

        <button

          onClick={stopRecording}

          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 mx-auto"

        >

          <Square />

          Stop Recording

        </button>

      )}

    </div>

  );

}

export default Recorder;