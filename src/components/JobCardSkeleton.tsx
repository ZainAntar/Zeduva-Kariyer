import { motion } from 'framer-motion';

export function JobCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-surface border border-border rounded-2xl shadow-card flex flex-col overflow-hidden"
        >
            <div className="p-6 flex-1 flex flex-col animate-pulse">
                <div className="flex items-start justify-between mb-4">
                    <div className="h-6 w-20 bg-surface-3 rounded-full"></div>
                    <div className="h-7 w-24 bg-surface-3 rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-surface-3 rounded-md mb-3"></div>
                <div className="space-y-2 mb-5">
                    <div className="h-3.5 w-full bg-surface-3 rounded-md"></div>
                    <div className="h-3.5 w-5/6 bg-surface-3 rounded-md"></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    <div className="h-6 w-16 bg-surface-3 rounded-full"></div>
                    <div className="h-6 w-20 bg-surface-3 rounded-full"></div>
                    <div className="h-6 w-14 bg-surface-3 rounded-full"></div>
                </div>
            </div>
        </motion.div>
    );
}
