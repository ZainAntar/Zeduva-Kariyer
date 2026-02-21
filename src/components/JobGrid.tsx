import type { Job } from '../lib/data';
import { JobCard } from './JobCard';
import { JobCardSkeleton } from './JobCardSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react';

interface JobGridProps {
    jobs: Job[];
    onJobClick: (job: Job) => void;
    comparedJobIds: string[];
    compareEnabled: boolean;
    onToggleCompare: (job: Job) => void;
    emptyMessage?: string;
    isLoading?: boolean;
}

export function JobGrid({ jobs, onJobClick, comparedJobIds, compareEnabled, onToggleCompare, emptyMessage, isLoading }: JobGridProps) {
    if (isLoading) {
        return (
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-5 lg:p-7"
            >
                <AnimatePresence>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <JobCardSkeleton key={`skeleton-${i}`} />
                    ))}
                </AnimatePresence>
            </motion.div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-ink-3 gap-3">
                <SearchX size={24} className="text-ink-3/35" />
                <p className="text-[12.5px] font-medium text-center px-5 text-ink-3 tracking-wide">{emptyMessage ?? 'Bu kriterlere uygun meslek bulunamadı.'}</p>
            </div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-5 lg:p-7"
        >
            <AnimatePresence>
                {jobs.map((job, i) => (
                    <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: i * 0.03 } }}
                        exit={{ opacity: 0 }}
                    >
                        <JobCard
                            job={job}
                            onClick={onJobClick}
                            isCompared={comparedJobIds.includes(job.id)}
                            canToggleCompare={(compareEnabled && comparedJobIds.length < 3) || comparedJobIds.includes(job.id)}
                            onToggleCompare={onToggleCompare}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
