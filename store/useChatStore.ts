import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import mockAnsers from '../helpers/answers.mock.json';

// Interface defining the structure of a single message
export interface Message {
  question: string; // The user's input message
  answer: string; // The response to the message
  timestamp?: number; // Optional timestamp for the message
}

// Utility function to simulate async delay
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Interface defining the entire chat store state and its methods
interface ChatState {
  threads: {
    [threadId: string]: Message[]; // Object storing messages for each thread
  };
  isLoading: boolean; // Indicates if the chat is currently processing

  // Methods to manipulate the chat store
  setLoading: (value: boolean) => void; // Set loading state
  createThread: (initialMessage: string) => string; // Create a new chat thread
  addMessageToThread: (
    threadId: string,
    question: string,
    answer: string,
  ) => Promise<void>; // Add a new message to an existing thread
  getAllThreads: () => { [threadId: string]: Message[] }; // Retrieve all threads
  getThread: (threadId: string) => Message[] | undefined; // Get a specific thread
}

// Create the chat store using Zustand with persistence
const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state: empty threads and not loading
      threads: {},
      isLoading: false,

      // Method to update loading state
      setLoading: (value: boolean) => set({ isLoading: value }),

      // Create a new thread with an initial message
      createThread: (initialMessage) => {
        // Generate a unique thread ID (20 characters long)
        const threadId = uuidv4().replace(/-/g, '').substring(0, 20);

        set((state) => ({
          threads: {
            ...state.threads,
            [threadId]: [
              {
                question: initialMessage,
                // Randomly select a mock answer from predefined answers
                answer:
                  mockAnsers[Math.floor(Math.random() * mockAnsers.length)]
                    .answer,
                timestamp: Date.now(),
              },
            ],
          },
        }));

        return threadId;
      },

      // Add a new message to an existing thread
      addMessageToThread: async (threadId, question, answer) => {
        const { threads } = get();
        // Throw an error if the thread doesn't exist
        if (!threads[threadId]) throw new Error('Thread not found');

        // Add the new message with an empty answer and set loading to true
        set((state) => ({
          threads: {
            ...state.threads,
            [threadId]: [
              ...state.threads[threadId],
              {
                question,
                answer: '',
                timestamp: Date.now(),
              },
            ],
          },
          isLoading: true,
        }));

        // Simulate an async operation with a 5-second delay
        await sleep(5000);

        // Update the last message with the actual answer and set loading to false
        set((state) => {
          const threadMessages = state.threads[threadId];
          const updatedMessages = [...threadMessages];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            answer,
          };

          return {
            threads: {
              ...state.threads,
              [threadId]: updatedMessages,
            },
            isLoading: false,
          };
        });
      },

      // Methods to retrieve threads
      getAllThreads: () => get().threads,
      getThread: (threadId) => get().threads[threadId],
    }),
    {
      // Persist the store in localStorage with the key 'chat-storage'
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useChatStore;

// Custom hook to easily access chat store operations
export const useChatOperations = () => {
  // Extract specific methods and state from the chat store
  const createThread = useChatStore((state) => state.createThread);
  const addMessageToThread = useChatStore((state) => state.addMessageToThread);
  const getAllThreads = useChatStore((state) => state.getAllThreads);
  const getThread = useChatStore((state) => state.getThread);
  const isLoading = useChatStore((state) => state.isLoading);
  const setLoading = useChatStore((state) => state.setLoading);

  // Return an object with all the extracted methods and state
  return {
    createThread,
    addMessageToThread,
    getAllThreads,
    getThread,
    isLoading,
    setLoading,
  };
};
