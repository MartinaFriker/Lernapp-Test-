import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { GameState, Lesson, Exercise } from './types';
import { LESSONS, CheckIcon, XIcon } from './constants';

// --- Shared UI Components ---

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const HolographicCard: React.FC<HolographicCardProps> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-blue-900/20 backdrop-blur-md border border-blue-400/30 rounded-2xl p-6 md:p-8 card-glow ${className}`}>
    {children}
  </div>
);

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, className = '', disabled=false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 btn-glow disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${className}`}
  >
    {children}
  </button>
);

interface ProgressBarProps {
    current: number;
    total: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return (
        <div className="w-full bg-blue-900/50 rounded-full h-4 border border-blue-400/30 overflow-hidden">
            <div
                className="bg-green-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'incorrect'; key: number } | null>(null);
  const [answered, setAnswered] = useState(false);

  const currentLesson = useMemo(
    () => LESSONS.find(lesson => lesson.id === currentLessonId),
    [currentLessonId]
  );
  
  const currentExercise = useMemo(
    () => currentLesson?.exercises[currentExerciseIndex],
    [currentLesson, currentExerciseIndex]
  );

  const handleStart = useCallback(() => setGameState('map'), []);

  const handleSelectLesson = useCallback((lessonId: string) => {
    setCurrentLessonId(lessonId);
    setCurrentExerciseIndex(0);
    setScore(0);
    setAnswered(false);
    setFeedback(null);
    setGameState('lesson_intro');
  }, []);
  
  const handleBackToMap = useCallback(() => {
      setGameState('map');
      setCurrentLessonId(null);
  }, []);

  const handleNext = useCallback(() => {
    setAnswered(false);
    setFeedback(null);
    if (currentLesson && currentExerciseIndex < currentLesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setGameState('summary');
    }
  }, [currentLesson, currentExerciseIndex]);

  const handleAnswer = useCallback((answer: string | boolean) => {
    if (answered || !currentExercise) return;

    let isCorrect = false;
    if (currentExercise.task === 'identify') {
      isCorrect = answer === currentExercise.isCorrect;
    } else if (currentExercise.task === 'complete') {
      isCorrect = answer === currentExercise.correctOption;
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ status: 'correct', key: Date.now() });
    } else {
      setFeedback({ status: 'incorrect', key: Date.now() });
    }
    setAnswered(true);
  }, [answered, currentExercise]);

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <WelcomeScreen onStart={handleStart} />;
      case 'map':
        return <MissionMapScreen onSelectLesson={handleSelectLesson} />;
      case 'lesson_intro':
          return currentLesson ? (
              <LessonIntroScreen
                  lesson={currentLesson}
                  onStartExercises={() => setGameState('lesson')}
              />
          ) : null;
      case 'lesson':
        return currentLesson && currentExercise ? (
          <LessonScreen
            lesson={currentLesson}
            exercise={currentExercise}
            currentIndex={currentExerciseIndex}
            onAnswer={handleAnswer}
            onNext={handleNext}
            feedback={feedback}
            answered={answered}
          />
        ) : null;
      case 'summary':
        return currentLesson ? (
            <SummaryScreen 
                score={score} 
                total={currentLesson.exercises.length} 
                onRestart={() => handleSelectLesson(currentLesson.id)}
                onBackToMap={handleBackToMap}
            />
        ) : null;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4 selection:bg-orange-500/50">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(33,150,243,0.3),rgba(255,255,255,0))]"></div>
      <main className="w-full max-w-4xl mx-auto z-10">
        {renderContent()}
      </main>
    </div>
  );
};

// --- Screen Components ---

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow">Digitaler Wegbereiter</h1>
    <p className="text-xl md:text-2xl text-blue-200/80 mb-10 max-w-2xl">Meistere die deutsche Rechtschreibung auf einer futuristischen Lern-Expedition.</p>
    <ActionButton onClick={onStart}>Expedition starten</ActionButton>
  </div>
);

const MissionMapScreen: React.FC<{ onSelectLesson: (id: string) => void }> = ({ onSelectLesson }) => (
  <div className="flex flex-col items-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-2 text-glow">Missionskarte</h2>
    <p className="text-lg text-blue-200/80 mb-12">Wähle deinen nächsten Lernpfad.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {LESSONS.map(lesson => (
        <HolographicCard key={lesson.id} className="flex flex-col text-center items-center hover:border-orange-400/50 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => onSelectLesson(lesson.id)}>
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border-2 border-blue-400/30">
            <lesson.icon className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-orange-300">{lesson.title}</h3>
          <p className="text-blue-200/80 flex-grow">{lesson.description}</p>
        </HolographicCard>
      ))}
    </div>
  </div>
);

interface LessonIntroScreenProps {
    lesson: Lesson;
    onStartExercises: () => void;
}
const LessonIntroScreen: React.FC<LessonIntroScreenProps> = ({ lesson, onStartExercises }) => (
    <div className="flex flex-col items-center w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-2 text-glow">{lesson.title}</h2>
        <p className="text-lg text-blue-200/80 mb-8 text-center max-w-2xl">{lesson.description}</p>

        <HolographicCard className="w-full max-w-3xl mb-8">
            {lesson.exampleCategories.length > 0 ? (
                 <div className="space-y-6">
                    {lesson.exampleCategories.map((category, index) => (
                        <div key={index}>
                            <h3 className="text-2xl font-bold text-orange-300 mb-3">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.examples.map((ex, exIndex) => (
                                    <li key={exIndex} className="flex items-start bg-blue-900/30 p-3 rounded-lg">
                                        <span className="text-2xl font-bold text-orange-400 w-24 flex-shrink-0">{ex.word}</span>
                                        <span className="text-blue-200/90">{ex.explanation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-blue-200/80 py-8">Für diese Lektion gibt es keine speziellen Beispiele. Auf geht's!</p>
            )}
        </HolographicCard>
        
        <ActionButton onClick={onStartExercises}>Übungen starten</ActionButton>
    </div>
);


interface LessonScreenProps {
  lesson: Lesson;
  exercise: Exercise;
  currentIndex: number;
  onAnswer: (answer: string | boolean) => void;
  onNext: () => void;
  feedback: { status: 'correct' | 'incorrect'; key: number } | null;
  answered: boolean;
}
const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, exercise, currentIndex, onAnswer, onNext, feedback, answered }) => {
  const renderSentence = (ex: Exercise) => {
    const blank = <span className="inline-block w-12 h-8 bg-blue-900/50 border-b-2 border-orange-400 align-middle"></span>;
    if (ex.task === 'complete') {
      return <p className="text-2xl md:text-3xl text-center text-blue-100">{ex.sentence.split('_')[0]}{blank}{ex.sentence.split('_')[1]}</p>;
    }
    return <p className="text-2xl md:text-3xl text-center text-blue-100">{ex.sentence.replace(ex.word, `_`.repeat(ex.word.length))}</p>;
  };
  
  const getFeedbackColor = (status: 'correct' | 'incorrect' | null) => {
      if (!status) return 'border-blue-400/30';
      return status === 'correct' ? 'border-green-400' : 'border-red-400';
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <div className="w-full max-w-2xl text-center">
        <p className="text-orange-400 text-lg font-semibold">{lesson.title}</p>
        <h2 className="text-3xl md:text-4xl font-bold my-4 text-glow">Frage {currentIndex + 1} / {lesson.exercises.length}</h2>
        <ProgressBar current={currentIndex} total={lesson.exercises.length} />
      </div>

      <HolographicCard className={`w-full max-w-3xl transition-all duration-300 border-2 ${getFeedbackColor(feedback?.status ?? null)}`}>
        <div className="min-h-[150px] flex flex-col justify-center items-center relative">
            {feedback && (
                <div key={feedback.key} className="absolute inset-0 flex justify-center items-center animate-ping">
                    {feedback.status === 'correct' ? <CheckIcon className="w-24 h-24 text-green-400" /> : <XIcon className="w-24 h-24 text-red-400" />}
                </div>
            )}
           {renderSentence(exercise)}
           {exercise.task === 'identify' && <p className="mt-4 text-4xl font-bold text-orange-300 tracking-widest">{exercise.word}</p>}
        </div>
      </HolographicCard>

      <div className="w-full max-w-2xl flex justify-center gap-4 md:gap-8">
        {exercise.task === 'complete' && exercise.options.map(opt => (
          <ActionButton key={opt} onClick={() => onAnswer(opt)} disabled={answered} className="w-32 text-2xl">
            {opt}
          </ActionButton>
        ))}
        {exercise.task === 'identify' && (
          <>
            <ActionButton onClick={() => onAnswer(true)} disabled={answered} className="bg-green-500 hover:bg-green-400 w-40">Richtig</ActionButton>
            <ActionButton onClick={() => onAnswer(false)} disabled={answered} className="bg-red-500 hover:bg-red-400 w-40">Falsch</ActionButton>
          </>
        )}
      </div>

      {answered && (
         <div className="text-center mt-4 h-24 flex flex-col justify-center items-center">
             {feedback?.status === 'correct' ? (
                <p className="text-green-400 text-xl">Sehr gut!</p>
             ) : (
                <p className="text-red-400 text-xl">
                    Fast! Richtig wäre: {exercise.task === 'identify' ? (exercise.isCorrect ? exercise.word : 'das Wort ist falsch') : exercise.correctOption}
                </p>
             )}
            <ActionButton onClick={onNext} className="mt-4">Weiter</ActionButton>
         </div>
      )}
    </div>
  );
};

interface SummaryScreenProps {
    score: number;
    total: number;
    onRestart: () => void;
    onBackToMap: () => void;
}
const SummaryScreen: React.FC<SummaryScreenProps> = ({ score, total, onRestart, onBackToMap }) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const message = percentage > 80 ? "Exzellent! Du bist ein wahrer Wegbereiter!" : percentage > 50 ? "Gut gemacht! Übung macht den Meister." : "Weiter so! Jeder Schritt zählt.";

    return (
        <div className="text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-4">Mission abgeschlossen!</h2>
            <HolographicCard className="my-8 w-full max-w-md">
                <p className="text-xl text-blue-200/80 mb-2">Dein Ergebnis</p>
                <p className="text-7xl font-bold text-orange-300 my-4">{percentage}%</p>
                <p className="text-xl text-blue-100">{score} von {total} richtig</p>
                 <div className="w-full my-6">
                    <ProgressBar current={score} total={total} />
                 </div>
            </HolographicCard>
            <p className="text-xl text-blue-100 mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <ActionButton onClick={onRestart}>Nochmal versuchen</ActionButton>
                <ActionButton onClick={onBackToMap} className="bg-blue-500 hover:bg-blue-400">Zurück zur Karte</ActionButton>
            </div>
        </div>
    );
};


export default App;
