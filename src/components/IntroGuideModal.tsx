import { AnimatePresence, motion } from 'framer-motion';

interface IntroGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STEPS = [
    {
        num: '01',
        title: 'Filtrelerini seç',
        desc: 'Sol panelden bölüm, yetenek ve motivasyon alanlarından seçim yap.',
    },
    {
        num: '02',
        title: 'Meslekleri incele ve karşılaştır',
        desc: 'Kartlardan detay aç, istersen birden fazla mesleği seçip yan yana karşılaştır.',
    },
    {
        num: '03',
        title: 'Yapay zeka planı oluştur',
        desc: 'Tercihlerine göre kişisel bir kariyer eylem planı al.',
    },
];

export function IntroGuideModal({ isOpen, onClose }: IntroGuideModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-ink/25 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                        className="relative w-full sm:w-[92vw] sm:max-w-lg bg-surface border border-border shadow-elevated overflow-hidden sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-[3px] bg-primary-dim/45 flex-shrink-0" />

                        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-border flex items-start justify-between">
                            <div>
                                <p className="section-label text-ink-3 mb-1.5">Hoş geldin</p>
                                <h3 className="font-display text-xl font-bold text-ink leading-tight">Zeduva Kariyer Seçme Rehberi Nasıl Kullanılır?</h3>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6 space-y-3 overflow-y-auto custom-scrollbar">
                            {STEPS.map((step) => (
                                <div key={step.num} className="relative p-4 rounded-xl border border-border-light bg-surface-3/65 overflow-hidden">
                                    <span aria-hidden className="absolute top-0 right-3 font-display text-[3.5rem] font-bold leading-none select-none pointer-events-none text-primary/10">
                                        {step.num}
                                    </span>
                                    <p className="text-[11.5px] font-semibold text-ink mb-1.5 relative z-10">{step.title}</p>
                                    <p className="text-[12.5px] text-ink-2 leading-relaxed relative z-10">{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="px-5 sm:px-6 pb-5 pt-1">
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-[13px] font-semibold tracking-wide rounded-full bg-primary text-white hover:bg-primary-light transition-colors shadow-sm"
                            >
                                Anladım, Başlayalım
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
