
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ThoughtItem, Category, MentorMessage } from '../types';
import { GEMINI_MODEL_TEXT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "API_KEY environment variable not found. Gemini API features will not work. Please ensure it's set in your environment."
  );
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const generateId = (): string => Math.random().toString(36).substring(2, 9);

const createMentorMessage = (text: string, type: MentorMessage['type']): MentorMessage => ({
  id: generateId(),
  text,
  type,
  timestamp: new Date().toISOString(),
});

export const getMentorSuggestions = async (thoughts: ThoughtItem[], categories: Category[]): Promise<MentorMessage> => {
  if (!ai) {
    return createMentorMessage("Gemini API key not configured. Mentor suggestions are unavailable.", 'error');
  }

  const activeThoughts = thoughts.filter(t => !t.isCompleted);
  if (activeThoughts.length === 0) {
    return createMentorMessage("No active thoughts to analyze. Add some tasks or ideas!", 'suggestion');
  }

  const formattedThoughts = activeThoughts.map(t => {
    const category = categories.find(c => c.id === t.categoryId);
    return `- "${t.text}" (Category: ${category?.name || 'N/A'}, Due: ${t.dueDate || 'N/A'}, Priority: ${t.priority})`;
  }).join('\n');

  const prompt = `
You are a helpful and encouraging mentor AI. I am using your Thought Mentor app.
Based on my current list of active thoughts/tasks below, please provide 2-3 concise, actionable suggestions to help me prioritize, stay focused, or tackle them effectively.
Consider due dates and priorities if available. Keep the tone positive and supportive.

My active thoughts:
${formattedThoughts}

Today is: ${new Date().toLocaleDateString()}

What are your top suggestions for me right now?
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
    });
    return createMentorMessage(response.text, 'suggestion');
  } catch (error) {
    console.error("Error fetching mentor suggestions:", error);
    return createMentorMessage( `Sorry, I couldn't fetch suggestions right now. Error: ${(error as Error).message}`, 'error');
  }
};

export const getMotivationalMessage = async (): Promise<MentorMessage> => {
  if (!ai) {
    return createMentorMessage("Gemini API key not configured. Motivational messages are unavailable.", 'error');
  }
  const prompt = "You are an encouraging mentor AI. Provide a short, uplifting motivational message (2-3 sentences) to inspire productivity and positivity.";
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
    });
    return createMentorMessage(response.text, 'motivation');
  } catch (error) {
    console.error("Error fetching motivational message:", error);
    return createMentorMessage(`Sorry, I couldn't fetch a motivational quote. Error: ${(error as Error).message}`, 'error');
  }
};

export const getDailyReflection = async (completedTasks: ThoughtItem[], pendingTasks: ThoughtItem[], categories: Category[]): Promise<MentorMessage> => {
  if (!ai) {
    return createMentorMessage("Gemini API key not configured. Daily reflections are unavailable.", 'error');
  }

  const formatTasks = (tasks: ThoughtItem[]) => tasks.map(t => {
    const category = categories.find(c => c.id === t.categoryId);
    return `- "${t.text}" (Category: ${category?.name || 'N/A'})`;
  }).join('\n') || 'None';

  const prompt = `
You are a reflective and encouraging mentor AI.
Today, I completed the following tasks:
${formatTasks(completedTasks)}

These tasks are still pending:
${formatTasks(pendingTasks)}

Provide a brief (2-3 sentences) positive reflection on my day's progress. Offer a gentle nudge or suggestion for tomorrow or what to focus on next.
Keep it constructive and supportive.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
    });
    return createMentorMessage(response.text, 'reflection');
  } catch (error) {
    console.error("Error fetching daily reflection:", error);
    return createMentorMessage(`Sorry, I couldn't generate a reflection. Error: ${(error as Error).message}`, 'error');
  }
};

export const suggestCategoryForThought = async (thoughtText: string, availableCategories: Category[]): Promise<string | null> => {
  if (!ai || availableCategories.length === 0) {
    return null;
  }

  const categoryNames = availableCategories.map(c => c.name).join(', ');
  const prompt = `
You are an organizing AI. Given the following thought/task:
"${thoughtText}"

And the available categories: ${categoryNames}.

Suggest the most appropriate category NAME from the list.
If none seem to fit perfectly, suggest "General" or the closest existing category.
Respond with ONLY the category name. Do not add any other text.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
    });
    const suggestedCategoryName = response.text.trim();
    // Ensure the suggested category exists
    const foundCategory = availableCategories.find(c => c.name.toLowerCase() === suggestedCategoryName.toLowerCase());
    return foundCategory ? foundCategory.id : null;
  } catch (error) {
    console.error("Error suggesting category:", error);
    return null;
  }
};
    