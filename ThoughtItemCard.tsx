
import React from 'react';
import { ThoughtItem, Category } from '../types';
import CheckIcon from './icons/CheckIcon';
import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';

interface ThoughtItemCardProps {
  thought: ThoughtItem;
  category?: Category;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (thought: ThoughtItem) => void;
}

const ThoughtItemCard: React.FC<ThoughtItemCardProps> = ({ thought, category, onToggleComplete, onDelete, onEdit }) => {
  const categoryColor = category ? category.color : 'bg-gray-500';
  const priorityClasses = {
    low: 'border-l-green-500',
    medium: 'border-l-yellow-500',
    high: 'border-l-red-500',
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 mb-4 border-l-4 ${priorityClasses[thought.priority]} ${thought.isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-lg font-medium ${thought.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {thought.text}
          </p>
          <div className="text-xs text-gray-500 mt-1 space-x-2">
            {category && (
              <span className={`px-2 py-0.5 ${categoryColor} text-white rounded-full text-xs`}>
                {category.name}
              </span>
            )}
            {thought.dueDate && (
              <span>Due: {new Date(thought.dueDate + 'T00:00:00').toLocaleDateString()}</span> // Ensure correct date parsing for display
            )}
            <span>Priority: <span className="font-semibold">{thought.priority.charAt(0).toUpperCase() + thought.priority.slice(1)}</span></span>
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => onToggleComplete(thought.id)}
            className={`p-1.5 rounded-full ${thought.isCompleted ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            title={thought.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          >
            <CheckIcon className="w-4 h-4" />
          </button>
          {!thought.isCompleted && (
             <button onClick={() => onEdit(thought)} className="p-1.5 text-blue-500 hover:text-blue-700" title="Edit">
                <EditIcon className="w-4 h-4" />
            </button>
          )}
          <button onClick={() => onDelete(thought.id)} className="p-1.5 text-red-500 hover:text-red-700" title="Delete">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">Created: {new Date(thought.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ThoughtItemCard;
    