"use client";
import { useState } from "react";

interface FileUploaderProps {
  onExtractedText: (text: string) => void;
}

export default function FileUploader({ onExtractedText }: FileUploaderProps) {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // TEMP: plain text (works for .txt files only)
    // Later: replace with pdf-parse or mammoth for PDFs/DOCX
    const text = await file.text();
    onExtractedText(text);
  };

  const removeFile = () => {
    setFileName("");
    onExtractedText("");
  };

  return (
    <div className="flex flex-col gap-2">
      {!fileName ? (
        <input
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={handleFileUpload}
          className="border p-2 rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-between border p-2 rounded-lg">
          <p className="text-sm text-gray-600">{fileName}</p>
          <button
            onClick={removeFile}
            className="text-red-600 text-sm font-medium hover:underline"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
