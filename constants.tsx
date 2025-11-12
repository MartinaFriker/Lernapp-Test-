import React from 'react';
import type { Lesson } from './types';

// --- SVG Icon Components ---

export const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const PuzzleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Lesson Data ---

export const LESSONS: Lesson[] = [
  {
    id: 'lesson1',
    title: 'Kurzer Vokal, doppelter Konsonant',
    description: 'Lerne die Grundregel: Nach einem kurzen, betonten Vokal folgt oft ein doppelter Konsonant.',
    icon: BookIcon,
    exampleCategories: [
        {
            title: "Regel: Nach kurzem Vokal",
            examples: [
                { word: "Kamm", explanation: "Das 'a' ist kurz, also 'mm'." },
                { word: "Nuss", explanation: "Das 'u' ist kurz, also 'ss'." },
                { word: "hoffen", explanation: "Das 'o' ist kurz, also 'ff'." },
            ]
        },
        {
            title: "Gegenbeispiel: Nach langem Vokal",
            examples: [
                { word: "kam", explanation: "Das 'a' ist lang, also nur ein 'm'." },
                { word: "Hut", explanation: "Das 'u' ist lang, also nur ein 't'." },
                { word: "Ofen", explanation: "Das 'o' ist lang, also nur ein 'f'." },
            ]
        },
         {
            title: "Ausnahmen & Besonderheiten",
            examples: [
                { word: "Bus", explanation: "Fremdwörter folgen oft nicht der Regel." },
                { word: "Atlas", explanation: "Auch hier eine Ausnahme." },
            ]
        }
    ],
    exercises: [
      { task: 'complete', wordParts: ['ka', 'e'], correctOption: 'ss', options: ['s', 'ss'], sentence: 'Die Ka_e ist leer.' },
      { task: 'complete', wordParts: ['so', 'er'], correctOption: 'mm', options: ['m', 'mm'], sentence: 'Im So_er ist es heiß.' },
      { task: 'identify', word: 'Bett', isCorrect: true, sentence: 'Ich gehe ins Bett.' },
      { task: 'identify', word: 'Ofen', isCorrect: true, sentence: 'Der Ofen ist heiß.' },
      { task: 'complete', wordParts: ['re', 'en'], correctOption: 'nn', options: ['n', 'nn'], sentence: 'Pferde re_en schnell.' },
      { task: 'identify', word: 'Schiff', isCorrect: true, sentence: 'Das Schiff fährt auf dem Meer.' },
    ]
  },
  {
    id: 'lesson2',
    title: 'Sonderfälle: ck und tz',
    description: 'Entdecke, wann man statt "kk" oder "zz" die Kombinationen "ck" und "tz" verwendet.',
    icon: LightbulbIcon,
    exampleCategories: [],
    exercises: [
      { task: 'complete', wordParts: ['ba', 'en'], correctOption: 'ck', options: ['k', 'ck'], sentence: 'Wir ba_en einen Kuchen.' },
      { task: 'complete', wordParts: ['Ka', 'e'], correctOption: 'tz', options: ['z', 'tz'], sentence: 'Die Ka_e schläft.' },
      { task: 'identify', word: 'glücklich', isCorrect: true, sentence: 'Ich bin sehr glücklich.' },
      { task: 'identify', word: 'sitzen', isCorrect: true, sentence: 'Wir sitzen auf dem Stuhl.' },
      { task: 'complete', wordParts: ['Rü', 'en'], correctOption: 'ck', options: ['k', 'ck'], sentence: 'Mein Rü_en tut weh.' },
      { task: 'complete', wordParts: ['Pla', ''], correctOption: 'tz', options: ['z', 'tz'], sentence: 'Hier ist kein Pla_ frei.' },
    ]
  },
  {
    id: 'lesson3',
    title: 'Ausnahmen und schwierige Wörter',
    description: 'Meistere Wörter, die von den Regeln abweichen, und werde zum Rechtschreib-Profi.',
    icon: PuzzleIcon,
    exampleCategories: [],
    exercises: [
      { task: 'identify', word: 'Apfel', isCorrect: true, sentence: 'Der Apfel ist rot.' },
      { task: 'identify', word: 'Katter', isCorrect: false, sentence: 'Der Katter schläft.' },
      { task: 'complete', wordParts: ['Mi', 'e'], correctOption: 'tt', options: ['t', 'tt'], sentence: 'Wir treffen uns in der Mi_e.' },
      { task: 'complete', wordParts: ['Hö', 'e'], correctOption: 'll', options: ['l', 'll'], sentence: 'Die Hö_e ist dunkel.' },
      { task: 'identify', word: 'immer', isCorrect: true, sentence: 'Er kommt immer zu spät.' },
      { task: 'identify', word: 'wider', isCorrect: true, sentence: 'Wider Erwarten hat es geklappt.' },
    ]
  }
];
