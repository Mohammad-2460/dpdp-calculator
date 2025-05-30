
import React, { useState, useEffect } from 'react';
import { ThoughtItem, Category } from '../types';
import { PRIORITY_OPTIONS } from '../constants';
import PlusIcon from './icons/PlusIcon';
import SparklesIcon from './icons/SparklesIcon';
import { suggestCategoryForThought } from '../services/geminiService';

interface ThoughtInputFormProps {
  onAddThought: (thought: Omit<ThoughtItem, 'id' | 'createdAt' | 'isCompleted'>) => void;
  categories: Category[];
  isThinkingCategory: boolean;
  onSuggestCategory: (text: string) => void;
  suggestedCategoryId?: string | null;
}

const ThoughtInputForm: React.FC<ThoughtInputFormProps> = ({
  onAddThought,
  categories,
  isThinkingCategory,
  onSuggestCategory,
  suggestedCategoryId
}) => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState<string>(categories.length > 0 ? categories[0].id : '');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<ThoughtItem['priority']>('medium');

  useEffect(() => {
    if (suggestedCategoryId) {
      setCategoryId(suggestedCategoryId);
    }
  }, [suggestedCategoryId]);
  
  useEffect(() => { // Ensure categoryId is valid if categories change
    if (!categories.find(c => c.id === categoryId) && categories.length > 0) {
      setCategoryId(categories[0].id);
    } else if (categories.length === 0 && categoryId !== '') {
       setCategoryId(''); // No categories available
    }
  }, [categories, categoryId]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !categoryId) {
      alert('Please enter thought text and select a category.');
      return;
    }
    onAddThought({
      text: text.trim(),
      categoryId,
      dueDate: dueDate || undefined,
      priority,
    });
    setText('');
    setDueDate('');
    setPriority('medium');
    if (categories.length > 0) setCategoryId(categories[0].id);
  };

  const handleSuggestCategory = () => {
    if (text.trim()) {
      onSuggestCategory(text.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Thought / Task</h2>
      <div className="mb-4">
        <label htmlFor="thoughtText" className="block text-sm font-medium text-gray-700 mb-1">Thought / Task</label>
        <textarea
          id="thoughtText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-400 bg-gray-300 text-black placeholder-gray-600 rounded-md shadow-sm focus:bg-gray-200 focus:ring-primary focus:border-primary"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="flex items-center">
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border border-gray-400 bg-gray-300 text-black rounded-md shadow-sm focus:bg-gray-200 focus:ring-primary focus:border-primary"
              disabled={categories.length === 0}
            >
              {categories.length === 0 && <option value="">Create a category first</option>}
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {process.env.API_KEY && categories.length > 0 && (
              <button
                type="button"
                onClick={handleSuggestCategory}
                className="ml-2 p-2 bg-accent text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                title="Suggest Category (AI)"
                disabled={isThinkingCategory || !text.trim()}
              >
                <SparklesIcon className="w-5 h-5" />
              </button>
            )}
          </div>
           {isThinkingCategory && <p className="text-xs text-gray-500 mt-1">AI thinking...</p>}
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date (Optional)</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-400 bg-gray-300 text-black rounded-md shadow-sm focus:bg-gray-200 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as ThoughtItem['priority'])}
            className="w-full p-2 border border-gray-400 bg-gray-300 text-black rounded-md shadow-sm focus:bg-gray-200 focus:ring-primary focus:border-primary"
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        disabled={!text.trim() || !categoryId}
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Thought
      </button>
    </form>
  );
};

export default ThoughtInputForm;
