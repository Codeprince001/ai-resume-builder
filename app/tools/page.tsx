'use client';
import { useState } from 'react';

export default function DashboardHome() {
  const [input, setInput] = useState('');
  const [enhanced, setEnhanced] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    const res = await fetch('/api/enhance', {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setEnhanced(data.output);
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Enhance Your Resume</h1>
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded mb-4"
        placeholder="Paste your resume here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleEnhance}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Enhancing...' : 'Enhance'}
      </button>
      {enhanced && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Enhanced Output</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{enhanced}</pre>
        </div>
      )}
    </div>
  );
}