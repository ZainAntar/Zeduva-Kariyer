import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { JobGrid } from './JobGrid';
import { AIModal } from './AIModal';
import { CompareModal } from './CompareModal';
import { LearningQuizModal } from './LearningQuizModal';
import { IntroGuideModal } from './IntroGuideModal';
import { JOBS } from '../lib/data';
import type { FilterState, Job } from '../lib/data';
import { filterAndSortJobs, getJobFitAnalysis } from '../lib/utils';
import { generateCareerPlan } from '../lib/gemini';
import { buildJobInsight } from '../lib/jobInsights';
import { applyQuizResultToFilters, type QuizResult } from '../lib/quiz';
import { Menu, Sparkles, X, GitCompare, Search, CircleX, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_RESULT_STORAGE_KEY = 'zeduva_latest_quiz_result_v1';
const FILTERS_STORAGE_KEY = 'zeduva_filters_v1';
const COMPARE_STORAGE_KEY = 'zeduva_compare_jobs_v1';
const THEME_STORAGE_KEY = 'zeduva_theme_v1';

function buildPlanCacheKey(filters: FilterState, candidateJobs: Job[], focusJob?: Job): string {
    return JSON.stringify({
        type: filters.type,
        selectedSkills: [...filters.selectedSkills].sort(),
        selectedMotivations: [...filters.selectedMotivations].sort(),
        dreamText: filters.dreamText.trim().toLowerCase(),
        candidateIds: candidateJobs.map(job => job.id),
        focusJobId: focusJob?.id ?? null
    });
}

export function Layout() {
    const [filters, setFilters] = useState<FilterState>({
        type: null,
        selectedSkills: [],
        selectedMotivations: [],
        dreamText: ''
    });

    const filteredJobs = useMemo(() => filterAndSortJobs(JOBS, filters), [filters]);
    const [searchQuery, setSearchQuery] = useState('');

    const visibleJobs = useMemo(() => {
        const query = searchQuery.trim().toLocaleLowerCase('tr-TR');
        if (!query) {
            return filteredJobs;
        }

        return filteredJobs.filter(job => {
            const searchable = [
                job.title,
                job.type,
                job.description,
                ...job.tags,
                ...job.motivations,
                ...job.career_path
            ].join(' ').toLocaleLowerCase('tr-TR');

            return searchable.includes(query);
        });
    }, [filteredJobs, searchQuery]);

    const candidateJobs = useMemo(() => visibleJobs.slice(0, 12), [visibleJobs]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiContent, setAiContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [planValidationMessage, setPlanValidationMessage] = useState<string | null>(null);

    const [comparedJobIds, setComparedJobIds] = useState<string[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [latestQuizResult, setLatestQuizResult] = useState<QuizResult | null>(null);
    const [quizApplyMessage, setQuizApplyMessage] = useState<string | null>(null);
    const [isIntroGuideOpen, setIsIntroGuideOpen] = useState(true);
    const [isFilterSetupOpen, setIsFilterSetupOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [compareValidationMessage, setCompareValidationMessage] = useState<string | null>(null);
    const aiPlanCacheRef = useRef<Map<string, string>>(new Map());

    useEffect(() => {
        try {
            const rawTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
            if (rawTheme === 'dark') {
                setIsDarkMode(true);
            }
        } catch (error) {
            console.error('Tema tercihi yüklenemedi:', error);
        }
    }, []);

    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery, filters]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
        } catch (error) {
            console.error('Tema tercihi kaydedilemedi:', error);
        }
    }, [isDarkMode]);

    useEffect(() => {
        try {
            const rawFilters = window.localStorage.getItem(FILTERS_STORAGE_KEY);
            if (rawFilters) {
                const parsed = JSON.parse(rawFilters) as FilterState;
                if (parsed && Array.isArray(parsed.selectedSkills) && Array.isArray(parsed.selectedMotivations)) {
                    setFilters(parsed);
                }
            }

            const rawCompare = window.localStorage.getItem(COMPARE_STORAGE_KEY);
            if (rawCompare) {
                const parsedCompare = JSON.parse(rawCompare) as string[];
                if (Array.isArray(parsedCompare)) {
                    setComparedJobIds(parsedCompare.slice(0, 3));
                }
            }
        } catch (error) {
            console.error('Kaydedilmiş tercih verileri yüklenemedi:', error);
        }
    }, []);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(QUIZ_RESULT_STORAGE_KEY);
            if (!raw) {
                return;
            }
            const parsed = JSON.parse(raw) as QuizResult;
            if (parsed?.learningStyle && parsed?.suggestedType) {
                setLatestQuizResult(parsed);
            }
        } catch (error) {
            console.error('Quiz sonucu yüklenemedi:', error);
        }
    }, []);

    const comparedJobs = useMemo(
        () => comparedJobIds.map(id => JOBS.find(job => job.id === id)).filter(Boolean) as Job[],
        [comparedJobIds]
    );

    const selectedJobInsight = useMemo(() => {
        if (!selectedJob) {
            return null;
        }
        return buildJobInsight(selectedJob);
    }, [selectedJob]);

    const selectedJobFit = useMemo(() => {
        if (!selectedJob) {
            return null;
        }
        return getJobFitAnalysis(selectedJob, filters);
    }, [selectedJob, filters]);

    const isSelectedCompared = selectedJob ? comparedJobIds.includes(selectedJob.id) : false;

    const getMissingSections = useCallback(() => {
        const missing: string[] = [];
        if (!filters.type) missing.push('Bölüm Tercihin');
        if (filters.selectedSkills.length === 0) missing.push('Yeteneklerin');
        if (filters.selectedMotivations.length === 0) missing.push('Motivasyonun');
        return missing;
    }, [filters]);

    const isPlanDisabled = !filters.type || filters.selectedSkills.length === 0 || filters.selectedMotivations.length === 0;
    const isCompareDisabled = isPlanDisabled;
    const canOpenCompareModal = !isCompareDisabled && comparedJobIds.length >= 2;
    const canToggleSelectedCompare = isSelectedCompared || (!isCompareDisabled && comparedJobIds.length < 3);

    const handleAIPlan = useCallback(async () => {
        if (isPlanDisabled) {
            const missing = getMissingSections();
            setPlanValidationMessage(`Plan oluşturmak için ${missing.join(', ')} kısmından en az 1 tercih yapmalısın.`);
            return;
        }

        setPlanValidationMessage(null);
        setIsAIModalOpen(true);
        setIsLoading(true);
        setAiContent(null);

        try {
            const cacheKey = buildPlanCacheKey(filters, candidateJobs);
            const cachedPlan = aiPlanCacheRef.current.get(cacheKey);
            if (cachedPlan) {
                setAiContent(cachedPlan);
                setIsLoading(false);
                return;
            }

            const plan = await generateCareerPlan(filters, candidateJobs);
            aiPlanCacheRef.current.set(cacheKey, plan);
            setAiContent(plan);
        } catch (error) {
            console.error(error);
            setAiContent('Bir hata oluştu. Lütfen tekrar deneyiniz.');
        } finally {
            setIsLoading(false);
        }
    }, [candidateJobs, filters, getMissingSections, isPlanDisabled]);

    const handleSingleJobAIPlan = useCallback(async (job: Job) => {
        setPlanValidationMessage(null);
        setSelectedJob(null);
        setIsAIModalOpen(true);
        setIsLoading(true);
        setAiContent(null);

        try {
            const cacheKey = buildPlanCacheKey(filters, [job], job);
            const cachedPlan = aiPlanCacheRef.current.get(cacheKey);
            if (cachedPlan) {
                setAiContent(cachedPlan);
                setIsLoading(false);
                return;
            }

            const plan = await generateCareerPlan(filters, [job], { focusJob: job });
            aiPlanCacheRef.current.set(cacheKey, plan);
            setAiContent(plan);
        } catch (error) {
            console.error(error);
            setAiContent('Bir hata oluştu. Lütfen tekrar deneyiniz.');
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    const handleToggleCompare = useCallback((job: Job) => {
        setComparedJobIds(prev => {
            if (prev.includes(job.id)) {
                return prev.filter(id => id !== job.id);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, job.id];
        });
    }, []);

    const handleApplyQuizResult = useCallback((result: QuizResult) => {
        setFilters(prev => applyQuizResultToFilters(result, prev));
        setLatestQuizResult(result);
        setQuizApplyMessage('Quiz sonucuna göre filtrelerin otomatik güncellendi.');
        setIsQuizOpen(false);
    }, []);

    const handleCloseIntroGuide = useCallback(() => {
        setIsIntroGuideOpen(false);
        setIsFilterSetupOpen(true);
        setIsSidebarOpen(false);
    }, []);

    const handleCompleteFilterSetup = useCallback(() => {
        if (isPlanDisabled) {
            return;
        }
        setIsFilterSetupOpen(false);
    }, [isPlanDisabled]);

    useEffect(() => {
        if (!latestQuizResult) {
            return;
        }

        try {
            window.localStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(latestQuizResult));
        } catch (error) {
            console.error('Quiz sonucu kaydedilemedi:', error);
        }
    }, [latestQuizResult]);

    useEffect(() => {
        try {
            window.localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
        } catch (error) {
            console.error('Filtreler kaydedilemedi:', error);
        }
    }, [filters]);

    useEffect(() => {
        try {
            window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(comparedJobIds));
        } catch (error) {
            console.error('Karşılaştırma listesi kaydedilemedi:', error);
        }
    }, [comparedJobIds]);

    useEffect(() => {
        if (!isPlanDisabled && planValidationMessage) {
            setPlanValidationMessage(null);
        }
    }, [isPlanDisabled, planValidationMessage]);

    useEffect(() => {
        if (!quizApplyMessage) {
            return;
        }
        const timer = window.setTimeout(() => {
            setQuizApplyMessage(null);
        }, 5000);
        return () => window.clearTimeout(timer);
    }, [quizApplyMessage]);

    useEffect(() => {
        if (comparedJobIds.length < 2 && isCompareModalOpen) {
            setIsCompareModalOpen(false);
        }
    }, [comparedJobIds.length, isCompareModalOpen]);

    useEffect(() => {
        if (!compareValidationMessage) {
            return;
        }
        const timer = window.setTimeout(() => {
            setCompareValidationMessage(null);
        }, 4500);
        return () => window.clearTimeout(timer);
    }, [compareValidationMessage]);

    return (
        <div className="flex h-screen bg-bg text-ink font-sans overflow-hidden">
            {isSidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                filters={filters}
                setFilters={setFilters}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onOpenQuiz={() => setIsQuizOpen(true)}
            />

            <IntroGuideModal
                isOpen={isIntroGuideOpen}
                onClose={handleCloseIntroGuide}
            />

            <AIModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                isLoading={isLoading}
                content={aiContent}
            />

            <LearningQuizModal
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                onApply={handleApplyQuizResult}
            />

            <CompareModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
                jobs={comparedJobs}
                filters={filters}
            />

            {isFilterSetupOpen && (
                <div className="fixed inset-0 z-[65] flex items-end sm:items-center justify-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-ink/25 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                        className="relative w-full sm:w-[95vw] sm:max-w-5xl bg-surface border border-border shadow-elevated overflow-hidden sm:rounded-2xl rounded-t-2xl max-h-[90vh]"
                    >
                        <div className="grid lg:grid-cols-[20rem_minmax(0,1fr)]">
                            <div className="h-[52vh] sm:h-[56vh] lg:h-[78vh] lg:max-h-[44rem] border-b lg:border-b-0 lg:border-r border-border bg-surface">
                                <Sidebar
                                    filters={filters}
                                    setFilters={setFilters}
                                    isOpen
                                    onClose={() => undefined}
                                    onOpenQuiz={() => setIsQuizOpen(true)}
                                    mode="setup"
                                />
                            </div>

                            <div className="min-h-0 overflow-y-auto custom-scrollbar p-5 sm:p-6 lg:p-7">
                                <p className="section-label mb-3">Filtre Kurulumu</p>
                                <h2 className="font-sans text-[1.55rem] sm:text-[1.85rem] font-bold leading-tight tracking-tight text-ink">
                                    Başlamak için tercihlerini belirle.
                                </h2>
                                <p className="mt-4 text-[14.5px] sm:text-[15px] leading-7 text-ink-2">
                                    Bölüm Tercihin, Yeteneklerin ve Motivasyonun alanlarının her birinden en az 1 seçim yap. Eğer kararısz kaldıysan alttaki Kararsızım butonuyla quiz'i açıp filtreleri otomatik doldurabilirsin.
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                                    <button
                                        onClick={handleCompleteFilterSetup}
                                        disabled={isPlanDisabled}
                                        className={`px-6 py-3 rounded-full text-[14px] font-semibold transition-all border ${
                                            !isPlanDisabled
                                                ? 'bg-primary text-white border-primary hover:bg-primary-light hover:border-primary-light'
                                                : 'bg-surface-2 text-ink-3 border-border cursor-not-allowed'
                                        }`}
                                    >
                                        Filtreleri Uygula ve Devam Et
                                    </button>
                                    {isPlanDisabled && (
                                        <p className="text-[13px] text-ink-3">Gerekli yerleri doldurmadan devam edemezsin.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="relative flex-shrink-0 z-40">
                    <div className="h-[62px] flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-surface/95 backdrop-blur-md z-30">
                        <div className="flex items-center gap-3.5">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden text-ink-3 p-1.5 hover:text-ink transition-colors rounded-lg hover:bg-surface-2"
                            >
                                <Menu size={20} />
                            </button>
                            <div className="flex items-center gap-3">
                                <img
                                    src="/zeduva-icon.svg"
                                    alt="Zeduva"
                                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                                />
                                <h1 className="font-sans text-[1.5rem] font-extrabold tracking-tight text-ink leading-none">
                                    Zeduva
                                </h1>
                                <span className="hidden sm:block section-label text-ink-3/70 border-l border-border pl-3">
                                    Kariyer Planlama
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 relative">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsDarkMode(prev => !prev)}
                                className="relative h-9 w-[4.25rem] rounded-full border border-border bg-surface-2 px-1 flex items-center transition-colors"
                                aria-label="Tema değiştir"
                                title={isDarkMode ? 'Gündüz moduna geç' : 'Gece moduna geç'}
                            >
                                <span className={`absolute left-2.5 z-20 transition-colors ${isDarkMode ? 'text-ink-3' : 'text-amber-500'}`}><Sun size={14} /></span>
                                <span className={`absolute right-2.5 z-20 transition-colors ${isDarkMode ? 'text-sky-400' : 'text-ink-3'}`}><Moon size={14} /></span>
                                <motion.span
                                    layout
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="h-7 w-7 rounded-full bg-surface shadow-sm border border-border z-10"
                                    style={{ marginLeft: isDarkMode ? '1.85rem' : '0' }}
                                />
                            </motion.button>

                            <button
                                onClick={() => canOpenCompareModal && setIsCompareModalOpen(true)}
                                title={isCompareDisabled ? 'Karşılaştırma için Bölüm, Yetenek ve Motivasyon alanlarından en az 1 seçim yapmalısın.' : 'Seçili meslekleri karşılaştır'}
                                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold transition-all border ${
                                    canOpenCompareModal
                                        ? 'bg-surface text-ink border-border hover:border-primary/30 hover:bg-primary-dim/50 hover:text-primary'
                                        : 'bg-surface-2 text-ink-3 border-border cursor-default'
                                }`}
                            >
                                <GitCompare size={14} /> Karşılaştır ({comparedJobIds.length}/3)
                            </button>

                            <motion.button
                                whileHover={!isPlanDisabled ? { scale: 1.015 } : {}}
                                whileTap={!isPlanDisabled ? { scale: 0.985 } : {}}
                                onClick={handleAIPlan}
                                aria-disabled={isPlanDisabled}
                                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-[12.5px] font-semibold rounded-full transition-all duration-200 border
                                ${
                                    isPlanDisabled
                                        ? 'bg-surface-2 text-ink-3 cursor-default border-border'
                                        : 'bg-primary text-white border-primary hover:bg-primary-light hover:border-primary-light shadow-sm'
                                }`}
                            >
                                <Sparkles size={14} />
                                <span className="hidden sm:inline">Yapay Zeka ile Planla</span>
                                <span className="sm:hidden">Planla</span>
                            </motion.button>
                            <div className="absolute top-full right-0 mt-3 flex flex-col items-end gap-1.5 w-max z-50 pointer-events-none">
                                <AnimatePresence>
                                    {planValidationMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="max-w-xs text-right text-[11.5px] font-medium text-accent bg-surface/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-accent/20 pointer-events-auto"
                                        >
                                            {planValidationMessage}
                                        </motion.div>
                                    )}
                                    {quizApplyMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="max-w-xs text-right text-[11.5px] font-medium text-emerald-600 bg-surface/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-emerald-600/20 pointer-events-auto"
                                        >
                                            {quizApplyMessage}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    <div className="h-px bg-border flex-shrink-0" />
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="px-3 sm:px-5 lg:px-7 pt-4 sm:pt-5">
                            <div className="relative rounded-full border border-border bg-surface shadow-sm group focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Meslek ara..."
                                    className="w-full h-11 pl-11 pr-11 bg-transparent text-[13.5px] text-ink placeholder:text-ink-3 focus:outline-none rounded-full"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-3 hover:text-primary transition-colors"
                                        aria-label="Aramayı temizle"
                                    >
                                        <CircleX size={16} />
                                    </button>
                                )}
                            </div>
                            <div className="mt-2 px-0.5 text-[10.5px] text-ink-3 flex items-center justify-between">
                                <span className="font-mono">
                                    {searchQuery ? `"${searchQuery}" · ${visibleJobs.length} sonuç` : `${visibleJobs.length} meslek`}
                                </span>
                            </div>
                        </div>

                        <JobGrid
                            jobs={visibleJobs}
                            onJobClick={(job) => setSelectedJob(job)}
                            comparedJobIds={comparedJobIds}
                            compareEnabled={!isCompareDisabled}
                            onToggleCompare={handleToggleCompare}
                            isLoading={isSearching}
                            emptyMessage={searchQuery
                                ? `"${searchQuery}" için sonuç bulunamadı. Farklı bir anahtar kelime deneyebilirsin.`
                                : 'Bu kriterlere uygun meslek bulunamadı.'}
                        />

                        {comparedJobIds.length > 0 && (
                            <div className="sticky bottom-4 z-20 px-4 sm:px-7 pb-4 sm:pb-6 pointer-events-none">
                                <div className="pointer-events-auto rounded-2xl border border-border bg-surface/96 backdrop-blur-md shadow-elevated p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="section-label text-ink-3 mr-0.5">Seçili</span>
                                        {comparedJobs.map(job => (
                                            <span key={job.id} className="text-[11px] px-3 py-1 rounded-full bg-primary-dim text-primary border border-primary/25 font-medium">
                                                {job.title}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => setComparedJobIds([])}
                                            className="px-4 py-2 text-[12px] rounded-full border border-border text-ink-2 hover:bg-surface-2 transition-colors"
                                        >
                                            Temizle
                                        </button>
                                        <button
                                            onClick={() => canOpenCompareModal && setIsCompareModalOpen(true)}
                                            title={isCompareDisabled ? 'Karşılaştırma için Bölüm, Yetenek ve Motivasyon alanlarından en az 1 seçim yapmalısın.' : 'Seçili meslekleri karşılaştır'}
                                            className={`px-5 py-2 text-[12px] font-semibold rounded-full transition-all border ${
                                                canOpenCompareModal
                                                    ? 'bg-primary text-white border-primary hover:bg-primary-light hover:border-primary-light shadow-sm'
                                                    : 'bg-surface-2 text-ink-3 border-border cursor-default'
                                            }`}
                                        >
                                            Karşılaştır →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {selectedJob && (
                <div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-ink/25 backdrop-blur-sm"
                    onClick={() => setSelectedJob(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
                        className="bg-surface border border-border w-full sm:w-[94vw] sm:max-w-3xl shadow-elevated relative overflow-hidden sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={`h-[3px] w-full flex-shrink-0 ${
                            selectedJob.type === 'Sayısal' ? 'bg-gradient-to-r from-blue-500 to-blue-300' :
                            selectedJob.type === 'Eşit Ağırlık' ? 'bg-gradient-to-r from-violet-500 to-violet-300' :
                            selectedJob.type === 'Sözel' ? 'bg-gradient-to-r from-orange-500 to-orange-300' :
                            'bg-gradient-to-r from-emerald-500 to-emerald-300'
                        }`} />
                        <div className="flex items-start justify-between px-5 sm:px-7 pt-5 pb-4">
                            <div>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase rounded-full border mb-3
                                    ${
                                        selectedJob.type === 'Sayısal' ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-400/35' :
                                        selectedJob.type === 'Eşit Ağırlık' ? 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/15 dark:text-violet-200 dark:border-violet-400/35' :
                                        selectedJob.type === 'Sözel' ? 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-400/35' :
                                        'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/35'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                                        selectedJob.type === 'Sayısal' ? 'bg-blue-500 dark:bg-blue-300' :
                                        selectedJob.type === 'Eşit Ağırlık' ? 'bg-violet-500 dark:bg-violet-300' :
                                        selectedJob.type === 'Sözel' ? 'bg-orange-500 dark:bg-orange-300' :
                                        'bg-emerald-500 dark:bg-emerald-300'
                                    }`} />
                                    {selectedJob.type}
                                </span>
                                <h2 className="font-display text-3xl font-bold text-ink leading-tight">{selectedJob.title}</h2>
                            </div>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-ink-3 hover:text-ink transition-colors p-1.5 mt-1 flex-shrink-0 rounded-lg hover:bg-surface-2"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar px-5 sm:px-7 pb-6 space-y-5 flex-1">
                            <p className="text-ink-2 leading-relaxed text-base">{selectedJob.description}</p>

                            <AnimatePresence>
                                {compareValidationMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="sticky top-0 z-20 text-[13px] font-semibold text-accent bg-surface border border-accent/30 rounded-xl px-3.5 py-2.5 shadow-sm"
                                    >
                                        {compareValidationMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {selectedJobFit && (
                                <div className="p-4 rounded-xl border border-primary/25 bg-primary-dim/40 flex items-center gap-4">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-dim border border-primary/20 flex flex-col items-center justify-center">
                                        <span className="font-display text-xl font-bold text-primary leading-none">%{selectedJobFit.percent}</span>
                                        <span className="section-label text-primary/70">uyum</span>
                                    </div>
                                    <div>
                                        <p className="section-label text-ink-3 mb-1.5">Uyum Özeti</p>
                                        <p className="text-[12px] text-ink-2 leading-relaxed">
                                            <span className="text-ink font-medium">Yetenek:</span> {selectedJobFit.matchingSkills.slice(0, 3).join(', ') || '—'}<br />
                                            <span className="text-ink font-medium">Motivasyon:</span> {selectedJobFit.matchingMotivations.slice(0, 3).join(', ') || '—'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {selectedJobInsight && (
                                <>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl border border-border bg-surface-2">
                                            <p className="section-label text-ink-3 mb-2.5">Kimler İçin Uygun</p>
                                            <ul className="space-y-1.5">
                                                {selectedJobInsight.fitProfile.map(item => (
                                                    <li key={item} className="text-sm text-ink-2">• {item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-4 rounded-xl border border-border bg-surface-2">
                                            <p className="section-label text-ink-3 mb-2.5">Günlük İş Akışı</p>
                                            <ul className="space-y-1.5">
                                                {selectedJobInsight.dailyFlow.map(item => (
                                                    <li key={item} className="text-sm text-ink-2">• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl border border-border bg-surface-2">
                                            <p className="section-label text-ink-3 mb-2.5">Zorlayıcı Taraflar</p>
                                            <ul className="space-y-1.5">
                                                {selectedJobInsight.challengeAreas.map(item => (
                                                    <li key={item} className="text-sm text-ink-2">• {item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-4 rounded-xl border border-border bg-surface-2">
                                            <p className="section-label text-ink-3 mb-2.5">Okulda Odak Dersler</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {selectedJobInsight.focusCourses.map(course => (
                                                    <span key={course} className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-surface text-ink-2">
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl border border-border bg-surface-2">
                                            <p className="section-label text-ink-3 mb-2.5">Çalışma Modeli</p>
                                            <p className="text-sm text-ink-2 leading-relaxed">{selectedJobInsight.workModel}</p>
                                        </div>

                                        <div className="p-4 rounded-xl border border-border bg-surface-2">
                                            <p className="section-label text-ink-3 mb-2.5">Gelir Potansiyeli</p>
                                            <p className="text-sm text-ink-2">{selectedJobInsight.incomePotential}</p>
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {selectedJobInsight.suggestedMajors.map(major => (
                                                    <span key={major} className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-surface text-ink-2">
                                                        {major}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border border-border bg-surface-2">
                                        <p className="section-label text-ink-3 mb-2.5">Mini Portföy Fikri</p>
                                        <p className="text-sm text-ink-2">{selectedJobInsight.miniPortfolio}</p>
                                    </div>
                                </>
                            )}

                            <div>
                                <p className="section-label text-ink-3 mb-3">Kariyer Yolu</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {selectedJob.career_path.map((step, index) => (
                                        <div key={index} className="bg-surface-2 border border-border rounded-xl p-3 text-center group hover:border-primary/20 hover:bg-primary-dim transition-all duration-200">
                                            <div className="font-display text-[1.5rem] font-bold text-ink-3/20 group-hover:text-primary/30 mb-1 transition-colors">{String(index + 1).padStart(2, '0')}</div>
                                            <span className="text-[11.5px] font-medium text-ink-2 group-hover:text-ink transition-colors leading-tight block">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        if (canToggleSelectedCompare) {
                                            handleToggleCompare(selectedJob);
                                            setCompareValidationMessage(null);
                                            return;
                                        }
                                        const missing = getMissingSections();
                                        setCompareValidationMessage(`Karşılaştırmak için ${missing.join(', ')} kısmından en az 1 tercih yapmalısın.`);
                                    }}
                                    title={isCompareDisabled && !isSelectedCompared ? 'Karşılaştırma için Bölüm, Yetenek ve Motivasyon alanlarından en az 1 seçim yapmalısın.' : (isSelectedCompared ? 'Karşılaştırmadan çıkar' : 'Karşılaştırmaya ekle')}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-[13px] rounded-xl transition-all ${
                                        isSelectedCompared
                                            ? 'bg-primary-dim text-primary border border-primary/25'
                                            : canToggleSelectedCompare
                                                ? 'bg-surface-2 text-ink-2 border border-border hover:bg-primary-dim/50 hover:border-primary/25'
                                                : 'bg-surface-2 text-ink-3 border border-border cursor-not-allowed'
                                    }`}
                                >
                                    <GitCompare size={15} />
                                    {isSelectedCompared ? 'Karşılaştırmadan Çıkar' : 'Karşılaştırmaya Ekle'}
                                </button>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleSingleJobAIPlan(selectedJob)}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-[13px] rounded-xl bg-primary text-white hover:bg-primary-light transition-colors duration-200 shadow-glow-primary-sm"
                                >
                                    <Sparkles size={15} />
                                    Yapay Zeka ile Planla
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
