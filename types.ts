// FIX: Add import for React to resolve 'Cannot find namespace React' error.
import React from 'react';

export type GameState = 'start' | 'map' | 'lesson_intro' | 'lesson' | 'summary';

export type ExerciseType = 'identify' | 'complete';

export interface IdentifyExercise {
  task: 'identify';
  word: string;
  isCorrect: boolean;
  sentence: string;
}

export interface CompleteExercise {
  task: 'complete';
  wordParts: [string, string];
  correctOption: string;
  options: [string, string];
  sentence: string;
}

export type Exercise = IdentifyExercise | CompleteExercise;

export interface Example {
  word: string;
  explanation: string;
}

export interface ExampleCategory {
  title: string;
  examples: Example[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  exercises: Exercise[];
  exampleCategories: ExampleCategory[];
}
