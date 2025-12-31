import { useState } from "react";
import { uploadDocuments, askQuestion } from "./api";

export default function App() {
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [uploading, setUploading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setStatus("");
    setAnswer("");

    try {
      const res = await uploadDocuments(files);
      setStatus(res.message); // Uploaded successfully
      setFiles([]);
    } catch {
      setStatus("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setThinking(true);
    setStatus("");

    try {
      const res = await askQuestion(question);
      setAnswer(res.answer);
    } catch {
      setAnswer("Error getting answer");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-3xl w-full p-6">

        <h1 className="text-2xl font-bold mb-6 text-center">
          DocChat AI
        </h1>

        {/* Upload Section */}
        <div className="bg-gray-300 rounded-xl shadow p-5 mb-6">
          <h2 className="font-semibold mb-3"> Upload Documents</h2>

          <input
            type="file"
            multiple
            accept=".pdf,.txt"
            onChange={(e) => setFiles([...e.target.files])}
            className="mb-3 bg-gray-400 rounded"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-2 rounded text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {uploading && (
            <div className="mt-4 animate-pulse space-y-2">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          )}

          {status && (
            <p className="mt-3 text-green-600 font-medium">
              {status}
            </p>
          )}
        </div>

        {/* Ask Section */}
        <div className="bg-gray-300 rounded-xl shadow p-5">
          <h2 className="font-semibold mb-3"> Ask Question</h2>

          <textarea
            rows="4"
            className="w-full border rounded p-2 mb-3"
            placeholder="Ask after uploading documents"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={handleAsk}
            disabled={thinking}
            className={`w-full py-2 rounded text-white ${
              thinking ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {thinking ? "Thinking..." : "Ask"}
          </button>

          {thinking && (
            <div className="mt-4 animate-pulse space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          )}


          {!thinking && answer && ( 
            <div className="mt-4 bg-gray-50 p-4 rounded border">
              <h3 className="font-semibold mb-2"> Answer</h3>
              <p>{thinking ? "" : answer }</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
