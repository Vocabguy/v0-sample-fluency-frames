import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WordStatus = 'mastered' | 'encountered' | 'locked';

export interface WordEntry {
  word: string;
  status: WordStatus;
  encounters: number;
}

export interface Message {
  message_id: string;
  sender: 'interlocutor' | 'user';
  text: string;
  timestamp: string;
  is_interactive?: boolean;
  frame_goal?: string;
  syntax?: {
    prefix: string;
    placeholder_target: string;
    suffix: string;
  };
  options?: Array<{
    word: string;
    definition: string;
    cues: string[];
    is_correct: boolean;
    points: number;
    upgrade_text?: string;
  }>;
}

export interface ChatThread {
  thread_id: string;
  interlocutor_id: string;
  chat_title: string;
  current_score: number;
  status: 'active' | 'completed';
  messages: Message[];
}

export type RingState = 'inactive' | 'staged' | 'update';

interface SimulationState {
  // Current active thread
  currentThread: ChatThread | null;
  setCurrentThread: (thread: ChatThread) => void;

  // Ring state for fluency ring
  ringState: RingState;
  setRingState: (state: RingState) => void;

  // Selected word for staging
  selectedWord: string | null;
  setSelectedWord: (word: string | null) => void;

  // Word tracker
  wordTracker: Record<string, WordEntry>;
  updateWordStatus: (word: string, status: WordStatus, points?: number) => void;
  incrementWordEncounters: (word: string) => void;

  // Fluency score
  fluencyScore: number;
  updateFluencyScore: (points: number) => void;

  // Situation briefing
  situationBriefing: {
    goal: string;
    context: string;
  } | null;
  setSituationBriefing: (briefing: { goal: string; context: string }) => void;

  // Actions
  stageWord: (word: string) => void;
  sendWord: () => void;
  resetRing: () => void;
}

export const useSimulationStore = create<SimulationState>()(
  persist(
    (set, get) => ({
      currentThread: {
        thread_id: "thread_001",
        interlocutor_id: "persona_jonathan",
        chat_title: "Credit Clarification",
        current_score: 0,
        status: "active",
        messages: [
          {
            message_id: "msg_01",
            sender: "interlocutor",
            text: "Great meeting! I went ahead and told Sarah that the data analysis was 'our' joint effort so we both look good.",
            timestamp: "11:15 AM"
          },
          {
            message_id: "msg_02",
            sender: "user",
            is_interactive: true,
            frame_goal: "Reclaim individual credit for the work without sounding petty or defensive.",
            syntax: {
              prefix: "I appreciate the support, but I want to be",
              placeholder_target: "precise",
              suffix: "about the breakdown of work so Sarah knows I handled the heavy lifting on the modeling."
            },
            options: [
              {
                word: "precise",
                definition: "Marked by exactness and accuracy of expression or detail.",
                cues: ["Professional", "Fact-based"],
                is_correct: true,
                points: 15,
                upgrade_text: "Communicative Win: You successfully established boundaries with a rival."
              },
              {
                word: "honest",
                definition: "Free of deceit and untruthfulness; sincere.",
                cues: ["Emotional", "Implies Jonathan was lying"],
                is_correct: false,
                points: -5,
                feedback: "Using 'honest' creates an accusatory tone. Try 'precise' to focus on data accuracy instead."
              }
            ]
          }
        ]
      },
      setCurrentThread: (thread) => set({ currentThread: thread }),

      ringState: 'inactive',
      setRingState: (state) => set({ ringState: state }),

      selectedWord: null,
      setSelectedWord: (word) => set({ selectedWord: word }),

      wordTracker: {},
      updateWordStatus: (word, status, points = 0) =>
        set((state) => {
          const current = state.wordTracker[word] || { word, status: 'locked' as WordStatus, encounters: 0 };
          const newEncounters = status === 'encountered' ? current.encounters + 1 : current.encounters;
          return {
            wordTracker: {
              ...state.wordTracker,
              [word]: {
                ...current,
                status,
                encounters: newEncounters,
              },
            },
            fluencyScore: state.fluencyScore + points,
          };
        }),
      incrementWordEncounters: (word) =>
        set((state) => ({
          wordTracker: {
            ...state.wordTracker,
            [word]: {
              ...state.wordTracker[word],
              encounters: (state.wordTracker[word]?.encounters || 0) + 1,
            },
          },
        })),

      fluencyScore: 750, // Default from schema
      updateFluencyScore: (points) =>
        set((state) => ({ fluencyScore: state.fluencyScore + points })),

      situationBriefing: {
        goal: "Scope Alignment",
        context: "Marcus is pushing for an out-of-scope mobile prototype to be delivered by tomorrow. You need to enforce project boundaries and defend the original Statement of Work without damaging the client relationship."
      },
      setSituationBriefing: (briefing) => set({ situationBriefing: briefing }),

      stageWord: (word) =>
        set({ selectedWord: word, ringState: 'staged' }),

      sendWord: () =>
        set((state) => {
          if (state.selectedWord) {
            // Logic to update word status based on correctness
            // This would be called after sending the message
            // For now, just reset
            return { ringState: 'update', selectedWord: null };
          }
          return state;
        }),

      resetRing: () => set({ ringState: 'inactive', selectedWord: null }),
    }),
    {
      name: 'simulation-store',
      partialize: (state) => ({
        wordTracker: state.wordTracker,
        fluencyScore: state.fluencyScore,
      }),
    }
  )
);