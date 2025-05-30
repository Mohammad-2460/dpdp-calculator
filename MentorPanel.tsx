
import React from 'react';
import { MentorMessage, ThoughtItem, Category } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface MentorPanelProps {
  messages: MentorMessage[];
  onGetSuggestions: () => void;
  onGetMotivation: () => void;
  onGetReflection: () => void;
  isLoading: boolean;
  canReflect: boolean;
}

const MentorPanel: React.FC<MentorPanelProps> = ({ messages, onGetSuggestions, onGetMotivation, onGetReflection, isLoading, canReflect }) => {
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  const getIconForType = (type: MentorMessage['type']) => {
    switch(type) {
      case 'suggestion': return <SparklesIcon className="w-5 h-5 text-blue-500 mr-2 shrink-0" />;
      case 'motivation': return <SparklesIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" />;
      case 'reflection': return <SparklesIcon className="w-5 h-5 text-purple-500 mr-2 shrink-0" />;
      case 'error': return <SparklesIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />; // Placeholder, could be an error icon
      default: return <SparklesIcon className="w-5 h-5 text-gray-500 mr-2 shrink-0" />;
    }
  };
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <SparklesIcon className="w-6 h-6 mr-2 text-accent" />
        AI Mentor Corner
      </h2>

      <div className="space-y-3 mb-4">
        <button
          onClick={onGetSuggestions}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
        >
          <SparklesIcon className="w-5 h-5 mr-2" /> Get Suggestions
        </button>
        <button
          onClick={onGetMotivation}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
        >
          <SparklesIcon className="w-5 h-5 mr-2" /> Get Motivation
        </button>
         <button
          onClick={onGetReflection}
          disabled={isLoading || !canReflect}
          className="w-full px-4 py-2 bg-purple-500 text-white font-semibold rounded-md shadow-sm hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center"
          title={!canReflect ? "Complete or have some tasks for today to reflect" : "Get Daily Reflection"}
        >
          <SparklesIcon className="w-5 h-5 mr-2" /> Daily Reflection
        </button>
      </div>
      
      {isLoading && <p className="text-center text-gray-500">AI Mentor is thinking...</p>}

      <div className="flex-grow overflow-y-auto border-t pt-4">
        <h3 className="text-md font-semibold text-gray-600 mb-2">Latest Messages:</h3>
        {messages.length === 0 && !isLoading && (
          <p className="text-gray-500 text-sm">No messages from your mentor yet. Try asking for suggestions or motivation!</p>
        )}
        <ul className="space-y-3">
          {messages.slice().reverse().map(msg => ( // Show newest first
            <li key={msg.id} className={`p-3 rounded-md shadow-sm text-sm ${
              msg.type === 'error' ? 'bg-red-100 border-l-4 border-red-500' : 
              msg.type === 'suggestion' ? 'bg-blue-50 border-l-4 border-blue-500' :
              msg.type === 'motivation' ? 'bg-green-50 border-l-4 border-green-500' :
              'bg-purple-50 border-l-4 border-purple-500' // reflection
            }`}>
              <div className="flex items-start">
                {getIconForType(msg.type)}
                <div className="flex-1">
                    <p className={`whitespace-pre-wrap ${msg.type === 'error' ? 'text-red-700' : 'text-gray-700'}`}>{msg.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
       {!process.env.API_KEY && (
        <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm rounded">
          <strong>Warning:</strong> Gemini API key not configured. AI Mentor features are currently disabled. Please set the `API_KEY` environment variable.
        </div>
      )}
    </div>
  );
};

export default MentorPanel;
    