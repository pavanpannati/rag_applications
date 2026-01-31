import { useState, useRef } from "react";
import { uploadDocuments, askQuestion } from "./api";

export default function App() {
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [uploading, setUploading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [status, setStatus] = useState("");
  const [fileError, setFileError] = useState("");

  const fileRef = useRef(null);

  const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

  // ---------- File Validation ----------
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFileError("");
    setStatus("");

    const largeFile = selectedFiles.find(
      (file) => file.size > MAX_SIZE
    );

    if (largeFile) {
      setFileError("File should be less than 4 MB");
      setFiles([]);
      e.target.value = "";
      return;
    }

    setFiles(selectedFiles);
  };

  // ---------- Upload ----------
  const handleUpload = async () => {
    if (files.length === 0) return;

    const tooLarge = files.some(file => file.size > MAX_SIZE);
    if (tooLarge) {
      setFileError("File should be less than 4 MB");
      return;
    }

    setUploading(true);
    setStatus("");
    setAnswer("");

    try {
      const res = await uploadDocuments(files);
      setStatus(res.message || "Uploaded successfully");
      setFiles([]);
      fileRef.current.value = "";
    } catch {
      setStatus("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ---------- Ask ----------
  const handleAsk = async () => {
    if (!question.trim()) return;

    if (!status) {
      setAnswer("Please upload documents first.");
      return;
    }

    setThinking(true);
    setAnswer("");

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
    <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 min-h-screen flex justify-center">
      <div className="max-w-3xl w-full p-6">

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          DocChat AI
        </h1>

        {/* Upload Section */}
        <div className="bg-gray-300 rounded-xl shadow p-5 mb-6">
          <h2 className="font-semibold mb-3">Upload Documents</h2>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="mb-2 bg-gray-400 rounded w-full"
          />

          {fileError && (
            <p className="text-red-600 text-sm mb-2">
              {fileError}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className={`w-full py-2 rounded text-white ${
              uploading || files.length === 0
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
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
            <p className="mt-3 text-green-700 font-medium">
              {status}
            </p>
          )}
        </div>

        {/* Ask Section */}
        <div className="bg-gray-300 rounded-xl shadow p-5">
          <h2 className="font-semibold mb-3">Ask Question</h2>

          <textarea
            rows="4"
            className="w-full border rounded p-2 mb-3"
            placeholder="Ask after uploading documents"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={handleAsk}
            disabled={thinking || !status}
            className={`w-full py-2 rounded text-white ${
              thinking || !status
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
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
              <h3 className="font-semibold mb-2">Answer</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
