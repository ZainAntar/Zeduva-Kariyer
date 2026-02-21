import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AIModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLoading: boolean;
    content: string | null;
}

export function AIModal({ isOpen, onClose, isLoading, content }: AIModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (content) {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        className="relative w-full sm:w-[94vw] sm:max-w-3xl bg-surface border border-border shadow-elevated overflow-hidden sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="h-[3px] bg-gradient-to-r from-primary via-primary-light to-transparent flex-shrink-0" />
                        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-border">
                            <div className="flex items-center gap-3.5">
                                <div className="w-9 h-9 bg-primary-dim border border-primary/20 rounded-xl flex items-center justify-center">
                                    <Sparkles size={16} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-ink leading-tight">Zeduva</h3>
                                    <p className="section-label text-ink-3">Kariyer Planı</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                {content && !isLoading && (
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 text-ink-3 hover:text-primary transition-colors rounded-lg hover:bg-primary-dim"
                                        title="Kopyala"
                                    >
                                        {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 text-ink-3 hover:text-ink transition-colors rounded-lg hover:bg-surface-2"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-7 bg-surface">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-6">
                                    <div className="relative w-14 h-14">
                                        <div className="absolute inset-0 border-t-2 border-l-2 border-primary rounded-full animate-spin" />
                                        <div className="absolute inset-2 border-b-2 border-r-2 border-primary/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles size={14} className="text-primary animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="font-display text-xl font-bold text-ink">Analiz ediliyor...</p>
                                        <p className="text-[11.5px] text-ink-3 tracking-wide">Kariyer planınız hazırlanıyor</p>
                                    </div>
                                </div>
                            ) : content ? (
                                <div className="space-y-1 text-sm">
                                    {content.split('\n').map((line, index) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return <div key={index} className="h-3" />;

                                        const renderBold = (text: string) => {
                                            const parts = text.split(/(\*\*.*?\*\*)/g);
                                            return parts.map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i} className="text-ink font-semibold">{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            });
                                        };

                                        if (trimmed.startsWith('## ')) {
                                            return (
                                                <h3 key={index} className="font-display text-[1.05rem] font-bold text-ink mt-7 mb-3 pb-2 border-b border-border flex items-center gap-2.5">
                                                    <span className="w-1 h-4 bg-primary rounded-full flex-shrink-0" />
                                                    {trimmed.replace(/^## /, '')}
                                                </h3>
                                            );
                                        }

                                        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                                            return (
                                                <div key={index} className="flex items-start gap-2.5 mb-2.5 pl-1">
                                                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mt-[0.45rem] flex-shrink-0" />
                                                    <p className="text-ink-2 leading-relaxed">
                                                        {renderBold(trimmed.replace(/^[-*] /, ''))}
                                                    </p>
                                                </div>
                                            );
                                        }

                                        return (
                                            <p key={index} className="text-ink-2 leading-relaxed mb-2">
                                                {renderBold(line)}
                                            </p>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-ink-3">
                                    <p className="text-sm">Henüz bir plan oluşturulmadı.</p>
                                </div>
                            )}
                        </div>

                        <div className="px-5 sm:px-6 py-3 border-t border-border flex items-center justify-center gap-2 rounded-b-2xl">
                            <Sparkles size={10} className="text-primary/50" />
                            <span className="section-label text-ink-3">Powered by </span>
                            <span className="section-label text-primary">Gemini 2.5 Flash</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
