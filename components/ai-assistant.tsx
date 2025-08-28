"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Maximize2, MessageCircle } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="w-80 h-120 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
            <span className="font-semibold">AI Assistant</span>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/ai-assistant")}
                className="hover:bg-blue-500 p-1 rounded"
              >
                <Maximize2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-500 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Content (iframe or direct import) */}
          <div className="flex-1 overflow-y-auto">
            {/* If your assistant UI is in /app/ai-assistant/page.tsx,
                you can iframe it here for reusability */}
            <iframe
              src="/ai-assistant"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
