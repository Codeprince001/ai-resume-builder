"use client";
import { useState } from "react";
import FileUploader from "./FileUploader";

export default function EnhanceProfile() {
  const [input, setInput] = useState("");
  const [critique, setCritique] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!input) return;
    setLoading(true);

    const res = await fetch("/api/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setCritique(data.critique || "");
    setEnhanced(data.enhanced || "");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex gap-6">
      {/* LEFT SIDE - INPUT */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Upload Resume</h1>

        {/* FileUploader will call setInput when text is extracted */}
        <FileUploader onExtractedText={setInput} />

        <button
          onClick={handleEnhance}
          disabled={!input || loading}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium
            hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Enhancing..." : "Enhance Resume"}
        </button>
      </div>

      {/* RIGHT SIDE - OUTPUT */}
      <div className="flex-[1.5] bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">AI Feedback</h1>

        {loading && <p className="text-gray-500">Analyzing your resume...</p>}

        {!loading && (critique || enhanced) ? (
          <div className="flex flex-col gap-6">
            {critique && (
              <div>
                <h2 className="text-lg font-semibold text-red-600 mb-2">
                  Critiques
                </h2>
                <p className="whitespace-pre-wrap text-sm">{critique}</p>
              </div>
            )}
            {enhanced && (
              <div>
                <h2 className="text-lg font-semibold text-green-600 mb-2">
                  Enhancements
                </h2>
                <p className="whitespace-pre-wrap text-sm">{enhanced}</p>
              </div>
            )}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-500">
              Upload a resume to see AI suggestions.
            </p>
          )
        )}
      </div>
    </div>
  );
}
