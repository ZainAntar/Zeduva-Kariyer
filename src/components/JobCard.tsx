import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Job } from '../lib/data';
import { ArrowUpRight, Check } from 'lucide-react';

interface JobCardProps {
    job: Job;
    onClick: (job: Job) => void;
    isCompared: boolean;
    canToggleCompare: boolean;
    onToggleCompare: (job: Job) => void;
}

const TYPE_BADGE: Record<Job['type'], string> = {
    'Sayısal':      'type-sayisal',
    'Eşit Ağırlık': 'type-esit',
    'Sözel':        'type-sozel',
    'Dil':          'type-dil',
};

function JobCardComponent({ job, onClick, isCompared, canToggleCompare, onToggleCompare }: JobCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            className="bg-surface border border-border rounded-2xl cursor-pointer group hover:shadow-card-hover hover:border-primary/30 shadow-card flex flex-col transition-all duration-300"
            onClick={() => onClick(job)}
        >
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3.5">
                    <span className={`px-2.5 py-1 text-[12.5px] font-semibold rounded-full border ${TYPE_BADGE[job.type]}`}>
                        {job.type}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (canToggleCompare || isCompared) onToggleCompare(job);
                        }}
                        className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-[12.5px] font-semibold transition-all duration-150 ${
                            isCompared
                                ? 'bg-primary text-white border-primary'
                                : canToggleCompare
                                    ? 'bg-surface text-ink-3 border-border hover:border-primary/40 hover:text-primary'
                                    : 'bg-surface-2 text-ink-3 border-border cursor-not-allowed opacity-40'
                        }`}
                        title={isCompared ? 'Karşılaştırmadan çıkar' : 'Karşılaştırmaya ekle'}
                    >
                        {isCompared && <Check size={10} strokeWidth={2.5} />}
                        Karşılaştır
                    </button>
                </div>
                <h3 className="font-sans text-[1.55rem] font-bold text-ink group-hover:text-primary transition-colors duration-200 leading-tight mb-2.5">
                    {job.title}
                </h3>
                <p className="text-ink-2 text-[14.5px] leading-relaxed mb-4.5 flex-1 line-clamp-2">
                    {job.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[12px] text-ink-2 bg-surface-2 border border-border rounded-full px-2.5 py-0.5">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex gap-2 flex-wrap">
                        {job.motivations.slice(0, 2).map(m => (
                            <span key={m} className="text-[12.5px] text-ink-2">{m}</span>
                        ))}
                    </div>
                    <ArrowUpRight
                        size={15}
                        className="text-ink-3 group-hover:text-primary transition-colors flex-shrink-0"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export const JobCard = memo(JobCardComponent);
