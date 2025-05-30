
import React from 'react';
import { ThoughtItem } from '../types';

interface ProgressDisplayProps {
  thoughts: ThoughtItem[];
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ thoughts }) => {
  const completedThoughts = thoughts.filter(t => t.isCompleted).length;
  const totalThoughts = thoughts.length;
  const progressPercentage = totalThoughts > 0 ? Math.round((completedThoughts / totalThoughts) * 100) : 0;

  const highPriorityPending = thoughts.filter(t => !t.isCompleted && t.priority === 'high').length;
  const mediumPriorityPending = thoughts.filter(t => !t.isCompleted && t.priority === 'medium').length;
  const lowPriorityPending = thoughts.filter(t => !t.isCompleted && t.priority === 'low').length;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Progress</h2>
      {totalThoughts === 0 ? (
        <p className="text-gray-500">No thoughts yet to track progress. Add some tasks!</p>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Overall Progress</span>
              <span>{completedThoughts} / {totalThoughts} Tasks Completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-right text-primary font-semibold mt-1">{progressPercentage}%</p>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-600 mb-2">Pending Tasks by Priority:</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="text-red-600">High Priority:</span>
                <span className="font-semibold">{highPriorityPending}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-yellow-600">Medium Priority:</span>
                <span className="font-semibold">{mediumPriorityPending}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-green-600">Low Priority:</span>
                <span className="font-semibold">{lowPriorityPending}</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressDisplay;
    