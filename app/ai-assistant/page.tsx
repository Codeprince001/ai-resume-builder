"use client";
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Copy, Check, Square } from "lucide-react";

type ChatMessage = {
  role: "USER" | "AI";
  text: string;
  id?: string;
};

// Simple markdown parser for basic formatting
const parseMarkdown = (text: string): string => {
  return text
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2 text-gray-800">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2 text-gray-800">$1</h1>')
    
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 rounded-lg p-3 my-2 overflow-x-auto"><code class="text-sm font-mono text-gray-800">$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
    
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 mb-1">$1. $2</li>')
    
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br />');
};

const MessageBubble = ({ message, isUser, isStreaming }: { message: ChatMessage; isUser: boolean; isStreaming?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-gray-900">
            {isUser ? 'You' : 'Assistant'}
          </span>
          {!isUser && !isStreaming && (
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
              title="Copy message"
            >
              {copied ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <Copy size={14} className="text-gray-500" />
              )}
            </button>
          )}
        </div>
        
        {isUser ? (
          <div className="text-gray-800 leading-relaxed">
            {message.text}
          </div>
        ) : (
          <div className="text-gray-800 leading-relaxed prose prose-sm max-w-none">
            <div 
              dangerouslySetInnerHTML={{
                __html: `<p class="mb-3">${parseMarkdown(message.text)}</p>`
              }}
            />
            {isStreaming && (
              <span className="inline-block w-2 h-5 bg-gray-600 animate-pulse ml-1 align-text-bottom"></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-3 p-4 bg-gray-50 border-b border-gray-100">
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
      <Bot size={16} className="text-white" />
    </div>
    <div className="flex-1">
      <div className="font-medium text-sm text-gray-900 mb-1">Assistant</div>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  </div>
);

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [stopStreaming, setStopStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const stopStreamingAnimation = () => {
    setStopStreaming(true);
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
    setStreamingMessageId(null);
    setIsLoading(false);
  };

  const typewriterEffect = (text: string, messageId: string) => {
    const words = text.split(' ');
    let currentIndex = 0;
    setStopStreaming(false);
    
    const typeNextWord = () => {
      if (stopStreaming || currentIndex >= words.length) {
        // If stopped or finished, show full text
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, text: text }
            : msg
        ));
        setStreamingMessageId(null);
        setStopStreaming(false);
        return;
      }
      
      const currentText = words.slice(0, currentIndex + 1).join(' ');
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: currentText }
          : msg
      ));
      
      currentIndex++;
      // Faster typing speed (20-40ms per word)
      const delay = Math.random() * 20 + 20;
      streamingTimeoutRef.current = setTimeout(typeNextWord, delay);
    };
    
    typeNextWord();
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "USER" as const, text: input.trim(), id: Date.now().toString() };    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create placeholder message for streaming
    const botMessageId = (Date.now() + 1).toString();
    const botMessage  = { role: "AI" as const,   text: "", id: (Date.now() + 1).toString() };
    setMessages((prev) => [...prev, botMessage]);
    setStreamingMessageId(botMessageId);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await res.json();
      
      if (res.ok) {
        // Start typewriter effect
        typewriterEffect(data.data, botMessageId);
      } else {
        const errorText = `"Sorry, I encountered an error: ${data.error || 'Unknown error'}`;
        typewriterEffect(errorText, botMessageId);
      }
    } catch {
      const errorText = "Sorry, I'm having trouble connecting. Please try again.";
      typewriterEffect(errorText, botMessageId);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white border-x border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-500">Powered by Oracle Cloud AI</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Bot size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">How can I help you today?</p>
              <p className="text-sm">Ask me anything - I&apos;m here to assist!</p>
            </div>
          </div>
        )}
        
        <div className="group">
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id || i}
              message={msg}
              isUser={msg.role === "USER"}
              isStreaming={streamingMessageId === msg.id}
            />
          ))}
        </div>
        
        {isLoading && !streamingMessageId && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              placeholder="Type your message here..."
              disabled={isLoading && !streamingMessageId}
              autoFocus
            />
          </div>
          
          {streamingMessageId ? (
            <button
              onClick={stopStreamingAnimation}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              title="Stop generating"
            >
              <Square size={20} />
            </button>
          ) : (
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              title="Send message"
            >
              <Send size={20} />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {streamingMessageId 
            ? "Click stop button to finish response immediately" 
            : "Press Enter to send • Shift+Enter for new line"
          }
        </p>
      </div>
    </div>
  );
}