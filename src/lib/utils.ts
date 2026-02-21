import type { Job, FilterState } from './data';

export interface JobFitAnalysis {
    score: number;
    maxScore: number;
    percent: number;
    matchingSkills: string[];
    matchingMotivations: string[];
    dreamKeywordMatches: string[];
}

const TURKISH_STOP_WORDS = new Set([
    've', 'ile', 'için', 'ama', 'fakat', 'gibi', 'çok', 'daha', 'az', 'bir', 'bu',
    'şu', 'o', 'da', 'de', 'ki', 'mi', 'mı', 'mu', 'mü', 'ben', 'sen', 'biz', 'siz',
    'onlar', 'olarak', 'kadar', 'sonra', 'önce', 'üzere', 'hem', 'ya', 'yada', 'veya'
]);

function tokenizeDreamText(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[.,!?;:()"'`]/g, ' ')
        .split(/\s+/)
        .map(token => token.trim())
        .filter(token => token.length >= 3 && !TURKISH_STOP_WORDS.has(token));
}

export function getJobFitAnalysis(job: Job, filters: FilterState): JobFitAnalysis {
    const matchingSkills = job.tags.filter(tag => filters.selectedSkills.includes(tag));
    const matchingMotivations = job.motivations.filter(motivation => filters.selectedMotivations.includes(motivation));

    let score = matchingSkills.length * 10 + matchingMotivations.length * 5;

    const dreamText = filters.dreamText.trim();
    let dreamKeywordMatches: string[] = [];
    if (dreamText) {
        const jobText = `${job.title} ${job.description} ${job.tags.join(' ')} ${job.motivations.join(' ')}`.toLowerCase();
        const dreamKeywords = tokenizeDreamText(dreamText);
        dreamKeywordMatches = dreamKeywords.filter(keyword => jobText.includes(keyword));
        score += dreamKeywordMatches.length * 4;

        if (jobText.includes(dreamText.toLowerCase())) {
            score += 15;
        }
    }

    const expectedMax =
        Math.max(filters.selectedSkills.length, 1) * 10 +
        Math.max(filters.selectedMotivations.length, 1) * 5 +
        Math.max(tokenizeDreamText(filters.dreamText).length, 0) * 4 +
        (filters.dreamText.trim() ? 15 : 0);

    const maxScore = Math.max(expectedMax, 15);
    const percent = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));

    return {
        score,
        maxScore,
        percent,
        matchingSkills,
        matchingMotivations,
        dreamKeywordMatches
    };
}

export function calculateMatchScore(job: Job, filters: FilterState): number {
    return getJobFitAnalysis(job, filters).score;
}

export function filterAndSortJobs(jobs: Job[], filters: FilterState): Job[] {
    let filtered = jobs;
    if (filters.type) {
        filtered = jobs.filter(job => job.type === filters.type);
    }

    const scoredJobs = filtered.map(job => ({
        ...job,
        score: calculateMatchScore(job, filters)
    }));

    scoredJobs.sort((a, b) => b.score - a.score);

    return scoredJobs;
}
