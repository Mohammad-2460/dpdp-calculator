
import React from 'react';
import { ThoughtItem, Category } from '../types';
import ThoughtItemCard from './ThoughtItemCard';

interface ThoughtListDisplayProps {
  thoughts: ThoughtItem[];
  categories: Category[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (thought: ThoughtItem) => void;
  title: string;
  emptyMessage?: string;
}

const ThoughtListDisplay: React.FC<ThoughtListDisplayProps> = ({
  thoughts,
  categories,
  onToggleComplete,
  onDelete,
  onEdit,
  title,
  emptyMessage = "No thoughts here yet. Add some!"
}) => {
  if (thoughts.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
      {thoughts.map(thought => (
        <ThoughtItemCard
          key={thought.id}
          thought={thought}
          category={categories.find(cat => cat.id === thought.categoryId)}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ThoughtListDisplay;
    