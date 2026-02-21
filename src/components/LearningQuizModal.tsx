import { AnimatePresence, motion } from 'framer-motion';
import { X, Sparkles, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { LEARNING_QUIZ_QUESTIONS, generateQuizResult, type QuizResult } from '../lib/quiz';

interface LearningQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (result: QuizResult) => void;
}

export function LearningQuizModal({ isOpen, onClose, onApply }: LearningQuizModalProps) {
    const [answers, setAnswers] = useState<number[]>([]);
    const [step, setStep] = useState(0);
    const isComplete = step >= LEARNING_QUIZ_QUESTIONS.length;

    const result = useMemo(() => {
        if (!isComplete) {
            return null;
        }
        return generateQuizResult(answers);
    }, [answers, isComplete]);

    const resetQuiz = () => {
        setAnswers([]);
        setStep(0);
    };

    const handlePick = (optionIndex: number) => {
        const nextAnswers = [...answers];
        nextAnswers[step] = optionIndex;
        setAnswers(nextAnswers);
        setStep(prev => prev + 1);
    };

    const progress = Math.round((step / LEARNING_QUIZ_QUESTIONS.length) * 100);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-ink/20 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        className="relative w-full sm:w-[94vw] sm:max-w-2xl bg-surface border border-border shadow-elevated overflow-hidden sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary-dim flex items-center justify-center">
                                    <Sparkles size={16} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-ink">Öğrenme Stili Quizi</h3>
                                    <p className="text-[11px] text-ink-3">Kararsızsan hızlıca filtrelerini otomatik çıkarır</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-ink-3 hover:text-ink transition-colors rounded-lg hover:bg-surface-2"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!isComplete ? (
                            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                                <div className="mb-5">
                                    <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                                    </div>
                                    <p className="mt-2 text-[11px] text-ink-3">Soru {step + 1} / {LEARNING_QUIZ_QUESTIONS.length}</p>
                                </div>

                                <h4 className="text-lg font-semibold text-ink mb-4">
                                    {LEARNING_QUIZ_QUESTIONS[step].question}
                                </h4>

                                <div className="space-y-2.5">
                                    {LEARNING_QUIZ_QUESTIONS[step].options.map((option, optionIndex) => (
                                        <button
                                            key={option.label}
                                            onClick={() => handlePick(optionIndex)}
                                            className="w-full text-left p-4 rounded-2xl border border-border bg-surface hover:bg-primary-dim/50 hover:border-primary/30 transition-colors"
                                        >
                                            <p className="text-[13.5px] text-ink-2 font-medium">{option.label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : result ? (
                            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-5">
                                <div className="p-4 rounded-xl bg-primary-dim border border-primary/20">
                                    <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Öğrenme Stili</p>
                                    <p className="text-base font-bold text-ink">{result.learningStyle}</p>
                                    <p className="text-sm text-ink-2 mt-1">{result.summary}</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl border border-border bg-surface-2">
                                        <p className="text-xs uppercase tracking-widest text-ink-3 mb-2">Öne Çıkan Yetenekler</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {result.topSkills.map(skill => (
                                                <span key={skill} className="text-[11px] px-2 py-1 rounded-full bg-surface border border-border text-ink-2">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-border bg-surface-2">
                                        <p className="text-xs uppercase tracking-widest text-ink-3 mb-2">Öne Çıkan Motivasyonlar</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {result.topMotivations.map(motivation => (
                                                <span key={motivation} className="text-[11px] px-2 py-1 rounded-full bg-surface border border-border text-ink-2">
                                                    {motivation}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-border bg-surface">
                                    <p className="text-xs uppercase tracking-widest text-ink-3 mb-1">Önerilen Bölüm Türü</p>
                                    <p className="text-base font-semibold text-primary">{result.suggestedType}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2.5">
                                    <button
                                        onClick={() => onApply(result)}
                                        className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
                                    >
                                        Sonucu Filtrelere Uygula
                                    </button>
                                    <button
                                        onClick={resetQuiz}
                                        className="sm:w-auto px-4 py-3 rounded-xl border border-border text-ink-2 hover:bg-surface-2 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw size={14} /> Tekrar Yap
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
