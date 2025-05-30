
import React, { useState } from 'react';
import { Category } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (name: string, color: string) => void;
  onDeleteCategory: (id: string) => void;
  // onEditCategory: (category: Category) => void; // Future enhancement
}

const TailwindColors = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
  'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
  'bg-pink-500', 'bg-rose-500', 'bg-slate-500', 'bg-gray-500'
];

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(TailwindColors[0]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim() && selectedColor) {
      if (categories.find(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
        alert('Category name already exists.');
        return;
      }
      onAddCategory(newCategoryName.trim(), selectedColor);
      setNewCategoryName('');
      setSelectedColor(TailwindColors[0]);
    } else {
      alert('Please enter category name and select a color.');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Categories</h2>
      <form onSubmit={handleAddCategory} className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-2">
          <div className="flex-grow">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="categoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              className="w-full p-2 border border-gray-400 bg-gray-300 text-black placeholder-gray-600 rounded-md shadow-sm focus:bg-gray-200 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="categoryColor" className="block text-sm font-medium text-gray-700">Color</label>
            <select
              id="categoryColor"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border border-gray-400 bg-gray-300 text-black rounded-md shadow-sm focus:bg-gray-200 focus:ring-primary focus:border-primary"
            >
              {TailwindColors.map(color => (
                <option key={color} value={color} className={color}>{color.replace('bg-', '').replace('-500', '')}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 flex items-center justify-center sm:w-auto w-full">
            <PlusIcon className="w-5 h-5 mr-2" /> Add
          </button>
        </div>
      </form>

      <h3 className="text-lg font-medium mb-2 text-gray-600">Existing Categories:</h3>
      {categories.length === 0 && <p className="text-gray-500">No categories yet. Add one above!</p>}
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-3 ${cat.color}`}></span>
              <span className="text-gray-800">{cat.name}</span>
            </div>
            <button
              onClick={() => onDeleteCategory(cat.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete Category"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-4">Note: Deleting a category will not delete thoughts associated with it. You may need to re-categorize them manually or they will appear under an 'Uncategorized' state if the category is missing.</p>
    </div>
  );
};

export default CategoryManager;
