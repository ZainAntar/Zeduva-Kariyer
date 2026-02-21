import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import type { FilterState, Job } from '../lib/data';
import { getJobFitAnalysis } from '../lib/utils';
import { buildJobInsight } from '../lib/jobInsights';

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobs: Job[];
    filters: FilterState;
}

export function CompareModal({ isOpen, onClose, jobs, filters }: CompareModalProps) {
    const fitById = useMemo(
        () => Object.fromEntries(jobs.map(job => [job.id, getJobFitAnalysis(job, filters)])),
        [jobs, filters]
    );

    const recommendedJobId = useMemo(() => {
        if (jobs.length === 0) {
            return null;
        }

        let bestId: string | null = null;
        let bestPercent = -1;

        jobs.forEach(job => {
            const percent = fitById[job.id]?.percent ?? 0;
            if (percent > bestPercent) {
                bestPercent = percent;
                bestId = job.id;
            }
        });

        return bestId;
    }, [fitById, jobs]);

    const insightById = useMemo(
        () => Object.fromEntries(jobs.map(job => [job.id, buildJobInsight(job)])),
        [jobs]
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
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
                        className="relative w-full sm:w-[96vw] sm:max-w-6xl bg-surface border border-border shadow-elevated overflow-hidden sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-ink">Meslek Karşılaştırma</h3>
                                <p className="text-[11px] text-ink-3">En fazla 3 meslek yan yana karşılaştırılır</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-ink-3 hover:text-ink transition-colors rounded-lg hover:bg-surface-2"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-auto custom-scrollbar p-3 sm:p-6">
                            <div className="min-w-[560px] sm:min-w-[720px]">
                                <div className="grid gap-2.5 sm:gap-3" style={{ gridTemplateColumns: `160px repeat(${jobs.length}, minmax(180px, 1fr))` }}>
                                    <div className="text-xs uppercase tracking-wider text-ink-3 font-semibold p-3">Kriter</div>
                                    {jobs.map(job => (
                                        <div key={job.id} className="p-3 rounded-xl border border-border bg-surface-2">
                                            {recommendedJobId === job.id && (
                                                <span className="inline-flex items-center text-[10px] px-2 py-0.5 mb-2 rounded-full bg-primary text-white font-semibold tracking-wide">
                                                    Önerilen Seçim
                                                </span>
                                            )}
                                            <p className="text-sm font-semibold text-ink leading-tight">{job.title}</p>
                                            <p className="text-[11px] text-ink-3 mt-1">{job.type}</p>
                                        </div>
                                    ))}

                                    <div className="p-3 text-sm text-ink-3">Uyum Skoru</div>
                                    {jobs.map(job => {
                                        const fit = fitById[job.id];
                                        return (
                                            <div key={`${job.id}-score`} className="p-3 rounded-xl border border-border bg-surface">
                                                <p className="text-sm font-semibold text-primary">%{fit.percent}</p>
                                                <p className="text-[11px] text-ink-3">{fit.score} / {fit.maxScore} puan</p>
                                            </div>
                                        );
                                    })}

                                    <div className="p-3 text-sm text-ink-3">Yetenek Eşleşmesi</div>
                                    {jobs.map(job => {
                                        const fit = fitById[job.id];
                                        return (
                                            <div key={`${job.id}-skills`} className="p-3 rounded-xl border border-border bg-surface">
                                                <p className="text-xs text-ink-2">{fit.matchingSkills.slice(0, 3).join(', ') || 'Eşleşme yok'}</p>
                                            </div>
                                        );
                                    })}

                                    <div className="p-3 text-sm text-ink-3">Motivasyon Eşleşmesi</div>
                                    {jobs.map(job => {
                                        const fit = fitById[job.id];
                                        return (
                                            <div key={`${job.id}-mot`} className="p-3 rounded-xl border border-border bg-surface">
                                                <p className="text-xs text-ink-2">{fit.matchingMotivations.slice(0, 3).join(', ') || 'Eşleşme yok'}</p>
                                            </div>
                                        );
                                    })}

                                    <div className="p-3 text-sm text-ink-3">Öne Çıkan Etiketler</div>
                                    {jobs.map(job => (
                                        <div key={`${job.id}-tags`} className="p-3 rounded-xl border border-border bg-surface">
                                            <p className="text-xs text-ink-2">{job.tags.slice(0, 3).join(', ')}</p>
                                        </div>
                                    ))}

                                    <div className="p-3 text-sm text-ink-3">Kariyer Yolunun İlk Adımı</div>
                                    {jobs.map(job => (
                                        <div key={`${job.id}-path`} className="p-3 rounded-xl border border-border bg-surface">
                                            <p className="text-xs text-ink-2">{job.career_path[0]}</p>
                                        </div>
                                    ))}

                                    <div className="p-3 text-sm text-ink-3">Çalışma Modeli</div>
                                    {jobs.map(job => (
                                        <div key={`${job.id}-work`} className="p-3 rounded-xl border border-border bg-surface">
                                            <p className="text-xs text-ink-2">{insightById[job.id].workModel}</p>
                                        </div>
                                    ))}

                                    <div className="p-3 text-sm text-ink-3">Gelir Potansiyeli</div>
                                    {jobs.map(job => (
                                        <div key={`${job.id}-income`} className="p-3 rounded-xl border border-border bg-surface">
                                            <p className="text-xs text-ink-2">{insightById[job.id].incomePotential}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
