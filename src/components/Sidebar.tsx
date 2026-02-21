import { SKILL_OPTIONS, MOTIVATION_OPTIONS, TYPE_OPTIONS } from '../lib/data';
import type { FilterState } from '../lib/data';
import { X, Sparkles, SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    isOpen: boolean;
    onClose: () => void;
    onOpenQuiz: () => void;
    mode?: 'default' | 'setup';
}

export function Sidebar({ filters, setFilters, isOpen, onClose, onOpenQuiz, mode = 'default' }: SidebarProps) {
    const profileImageSrc = '/zaina-profile.png';
    const isSetupMode = mode === 'setup';

    const toggleSkill = (skill: string) => {
        setFilters(prev => ({
            ...prev,
            selectedSkills: prev.selectedSkills.includes(skill)
                ? prev.selectedSkills.filter(s => s !== skill)
                : [...prev.selectedSkills, skill]
        }));
    };

    const toggleMotivation = (motivation: string) => {
        setFilters(prev => ({
            ...prev,
            selectedMotivations: prev.selectedMotivations.includes(motivation)
                ? prev.selectedMotivations.filter(m => m !== motivation)
                : [...prev.selectedMotivations, motivation]
        }));
    };

    return (
        <aside className={isSetupMode
            ? 'relative w-full h-full bg-surface border border-border rounded-2xl shadow-card flex flex-col overflow-hidden'
            : `
            fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[17rem] bg-surface border-r border-border flex flex-col overflow-hidden transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:w-[17rem] md:translate-x-0 md:static md:flex
        `}
        >
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={13} className="text-ink-3" />
                    <span className="section-label">Filtreler</span>
                </div>
                <button onClick={onClose} className={`text-ink-3 hover:text-ink transition-colors p-1 rounded ${isSetupMode ? 'hidden' : 'md:hidden'}`}>
                    <X size={17} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-5 space-y-6">
                <div>
                    <p className="section-label mb-2.5">Bölüm Tercihin</p>
                    <div className="flex flex-wrap gap-1.5">
                        {TYPE_OPTIONS.map(type => (
                            <button
                                key={type}
                                onClick={() => setFilters(prev => ({ ...prev, type: prev.type === type ? null : type }))}
                                className={`filter-pill ${filters.type === type ? 'selected' : ''}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="section-label mb-2.5">Yeteneklerin</p>
                    <div className="flex flex-wrap gap-1.5">
                        {SKILL_OPTIONS.map(skill => (
                            <button
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className={`filter-pill ${filters.selectedSkills.includes(skill) ? 'selected' : ''}`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="section-label mb-2.5">Motivasyonun</p>
                    <div className="flex flex-wrap gap-1.5">
                        {MOTIVATION_OPTIONS.map(motivation => (
                            <button
                                key={motivation}
                                onClick={() => toggleMotivation(motivation)}
                                className={`filter-pill ${filters.selectedMotivations.includes(motivation) ? 'selected' : ''}`}
                            >
                                {motivation}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="section-label mb-2.5">
                        Hayalin <span className="normal-case tracking-normal font-normal text-ink-3">· opsiyonel</span>
                    </p>
                    <textarea
                        value={filters.dreamText}
                        onChange={(e) => setFilters(prev => ({ ...prev, dreamText: e.target.value }))}
                        placeholder="Gelecek hayalinden bahset..."
                        className="w-full h-24 bg-surface-2 border border-border rounded-lg text-ink-2 placeholder:text-ink-3 text-[13.5px] p-3 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 resize-none transition-all leading-relaxed"
                    />
                </div>
                <div>
                    <button
                        onClick={onOpenQuiz}
                        className="w-full p-3.5 rounded-lg border border-border bg-surface text-left hover:border-primary/30 hover:bg-primary-dim/60 transition-all duration-200 group"
                    >
                        <p className="section-label mb-1.5 inline-flex items-center gap-1.5 text-primary/70 group-hover:text-primary transition-colors">
                            <Sparkles size={11} /> Kararsızım
                        </p>
                        <p className="text-[13px] text-ink-2 leading-snug">Öğrenme Stili Quizini Aç</p>
                    </button>
                </div>
            </div>
            <div className="px-5 py-4 border-t border-border flex-shrink-0 space-y-3">
                <button
                    onClick={() => setFilters({ type: null, selectedSkills: [], selectedMotivations: [], dreamText: '' })}
                    className="w-full py-2 text-[11.5px] font-semibold tracking-wide uppercase text-ink-3 border border-border rounded-lg hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                    Tercihleri Sıfırla
                </button>

                {!isSetupMode && (
                    <a
                        href="https://github.com/ZainAntar"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 text-[11.5px] text-ink-3 hover:text-primary transition-colors group"
                    >
                        <img
                            src={profileImageSrc}
                            alt="zaina"
                            className="w-7 h-7 object-cover border border-border rounded flex-shrink-0"
                        />
                        <span className="leading-tight">
                            <span className="underline underline-offset-2">illimite</span> tarafından yapıldı
                        </span>
                    </a>
                )}
            </div>
        </aside>
    );
}
