import type { FilterState, Job } from './data';

export interface QuizOption {
    label: string;
    skills: string[];
    motivations: string[];
    typeBoost: Partial<Record<Job['type'], number>>;
    learningTrait: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
}

export interface QuizResult {
    learningStyle: string;
    summary: string;
    topSkills: string[];
    topMotivations: string[];
    suggestedType: Job['type'];
}

export const LEARNING_QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Yeni bir konu öğrenirken en rahat hissettiğin yöntem hangisi?',
        options: [
            {
                label: 'Adım adım problem çözerim ve örnek uygularım',
                skills: ['Analitik Düşünme', 'Problem Çözme'],
                motivations: ['Keşif'],
                typeBoost: { 'Sayısal': 2, 'Eşit Ağırlık': 1 },
                learningTrait: 'Analitik öğrenen'
            },
            {
                label: 'İnsanlarla konuşup tartışarak öğrenirim',
                skills: ['İletişim', 'Hitabet'],
                motivations: ['İnsan İlişkileri'],
                typeBoost: { 'Eşit Ağırlık': 2, 'Sözel': 2 },
                learningTrait: 'Sosyal öğrenen'
            },
            {
                label: 'Görsel/yaratıcı üretimle öğrenirim',
                skills: ['Yaratıcılık', 'Tasarım'],
                motivations: ['Yaratıcılık'],
                typeBoost: { 'Sözel': 2, 'Dil': 1 },
                learningTrait: 'Yaratıcı öğrenen'
            },
            {
                label: 'Dinleme, okuma ve dil pratiğiyle öğrenirim',
                skills: ['Yabancı Dil', 'Dinleme'],
                motivations: ['Keşif'],
                typeBoost: { 'Dil': 3 },
                learningTrait: 'Dil odaklı öğrenen'
            }
        ]
    },
    {
        id: 'q2',
        question: 'Bir projede seni en çok ne motive eder?',
        options: [
            {
                label: 'Somut bir problemi çözmek',
                skills: ['Problem Çözme', 'Analiz'],
                motivations: ['Kariyer', 'Merak'],
                typeBoost: { 'Sayısal': 2 },
                learningTrait: 'Çözüm üretici'
            },
            {
                label: 'İnsanlara fayda sağlamak',
                skills: ['Empati', 'İletişim'],
                motivations: ['Yardım', 'Toplumsal Fayda'],
                typeBoost: { 'Eşit Ağırlık': 2, 'Sözel': 1 },
                learningTrait: 'Toplum odaklı'
            },
            {
                label: 'Kendimi yaratıcı şekilde ifade etmek',
                skills: ['Sanat', 'Yazma'],
                motivations: ['Yaratıcılık'],
                typeBoost: { 'Sözel': 2, 'Dil': 1 },
                learningTrait: 'İfade odaklı'
            },
            {
                label: 'Yeni kültürleri ve dilleri keşfetmek',
                skills: ['Yabancı Dil', 'Kültür'],
                motivations: ['Keşif', 'Özgürlük'],
                typeBoost: { 'Dil': 3 },
                learningTrait: 'Keşif odaklı'
            }
        ]
    },
    {
        id: 'q3',
        question: 'Takım çalışmasında en çok hangi rolü alırsın?',
        options: [
            {
                label: 'Planlayan ve işi organize eden',
                skills: ['Organizasyon', 'Yönetim'],
                motivations: ['Liderlik'],
                typeBoost: { 'Eşit Ağırlık': 2, 'Sayısal': 1 },
                learningTrait: 'Planlayıcı'
            },
            {
                label: 'Teknik kısmı çözen kişi',
                skills: ['Kodlama', 'Teknoloji'],
                motivations: ['İnovasyon'],
                typeBoost: { 'Sayısal': 3 },
                learningTrait: 'Teknik uygulayıcı'
            },
            {
                label: 'Sunum ve anlatımı üstlenen',
                skills: ['Hitabet', 'Yazma'],
                motivations: ['Statü'],
                typeBoost: { 'Sözel': 2, 'Eşit Ağırlık': 1 },
                learningTrait: 'Anlatıcı'
            },
            {
                label: 'Araştırma ve kaynak taramasını yapan',
                skills: ['Okuma', 'Analiz'],
                motivations: ['Merak'],
                typeBoost: { 'Dil': 1, 'Sözel': 1, 'Sayısal': 1, 'Eşit Ağırlık': 1 },
                learningTrait: 'Araştırmacı'
            }
        ]
    },
    {
        id: 'q4',
        question: 'Hangi ders grubu sana daha yakın?',
        options: [
            {
                label: 'Matematik - Fen',
                skills: ['Matematik', 'Analitik Düşünme'],
                motivations: ['Kariyer'],
                typeBoost: { 'Sayısal': 3 },
                learningTrait: 'Sayısal düşünür'
            },
            {
                label: 'Edebiyat - Tarih',
                skills: ['Yazma', 'Tarih'],
                motivations: ['Yaratıcılık'],
                typeBoost: { 'Sözel': 3 },
                learningTrait: 'Sözel düşünür'
            },
            {
                label: 'Matematik - Türkçe dengeli',
                skills: ['Analiz', 'İletişim'],
                motivations: ['Kariyer'],
                typeBoost: { 'Eşit Ağırlık': 3 },
                learningTrait: 'Dengeli düşünür'
            },
            {
                label: 'Yabancı dil dersleri',
                skills: ['Yabancı Dil', 'Çeviri'],
                motivations: ['Gezme'],
                typeBoost: { 'Dil': 3 },
                learningTrait: 'Dil düşünürü'
            }
        ]
    },
    {
        id: 'q5',
        question: 'Uzun vadede nasıl bir iş ortamı istersin?',
        options: [
            {
                label: 'Teknoloji ve inovasyon odaklı',
                skills: ['Teknoloji', 'Kodlama'],
                motivations: ['İnovasyon', 'Maaş'],
                typeBoost: { 'Sayısal': 2 },
                learningTrait: 'İnovasyon odaklı'
            },
            {
                label: 'İnsanlarla yoğun iletişimde olduğum',
                skills: ['İletişim', 'Empati'],
                motivations: ['İnsan İlişkileri'],
                typeBoost: { 'Eşit Ağırlık': 2, 'Sözel': 1 },
                learningTrait: 'İlişki odaklı'
            },
            {
                label: 'Esnek ve yaratıcı üretim alanı',
                skills: ['Yaratıcılık', 'Sanat'],
                motivations: ['Özgürlük'],
                typeBoost: { 'Sözel': 2, 'Dil': 1 },
                learningTrait: 'Üretim odaklı'
            },
            {
                label: 'Uluslararası ve çok kültürlü',
                skills: ['Yabancı Dil', 'Kültür'],
                motivations: ['Gezme', 'Keşif'],
                typeBoost: { 'Dil': 2 },
                learningTrait: 'Global odaklı'
            }
        ]
    },
    {
        id: 'q6',
        question: 'Seni zorlayan bir görevde ilk refleksin ne olur?',
        options: [
            {
                label: 'Veri toplarım ve analiz ederim',
                skills: ['Analiz', 'Analitik Düşünme'],
                motivations: ['Güvenlik'],
                typeBoost: { 'Sayısal': 2, 'Eşit Ağırlık': 1 },
                learningTrait: 'Veri odaklı'
            },
            {
                label: 'Deneyimli biriyle konuşur, geri bildirim alırım',
                skills: ['Dinleme', 'İletişim'],
                motivations: ['İnsan İlişkileri'],
                typeBoost: { 'Eşit Ağırlık': 1, 'Sözel': 1 },
                learningTrait: 'Geri bildirim odaklı'
            },
            {
                label: 'Alternatif yaratıcı yollar denerim',
                skills: ['Yaratıcılık', 'Problem Çözme'],
                motivations: ['Merak'],
                typeBoost: { 'Sözel': 1, 'Sayısal': 1 },
                learningTrait: 'Deneysel öğrenen'
            },
            {
                label: 'Kaynak okuyup sistematik çalışırım',
                skills: ['Okuma', 'Organizasyon'],
                motivations: ['Kariyer'],
                typeBoost: { 'Dil': 1, 'Eşit Ağırlık': 1, 'Sayısal': 1, 'Sözel': 1 },
                learningTrait: 'Sistematik öğrenen'
            }
        ]
    },
    {
        id: 'q7',
        question: 'Başarıyı nasıl tanımlarsın?',
        options: [
            {
                label: 'Uzmanlık ve teknik yetkinlik',
                skills: ['Mühendislik', 'Teknoloji'],
                motivations: ['Kariyer', 'Maaş'],
                typeBoost: { 'Sayısal': 2 },
                learningTrait: 'Uzmanlık odaklı'
            },
            {
                label: 'Topluma dokunmak ve fark yaratmak',
                skills: ['Empati', 'Öğretme'],
                motivations: ['Toplumsal Fayda', 'Yardım'],
                typeBoost: { 'Sözel': 1, 'Eşit Ağırlık': 2 },
                learningTrait: 'Etki odaklı'
            },
            {
                label: 'Kendi üretimimle tanınmak',
                skills: ['Sanat', 'Tasarım'],
                motivations: ['Yaratıcılık', 'Statü'],
                typeBoost: { 'Sözel': 2 },
                learningTrait: 'Üretim ve görünürlük odaklı'
            },
            {
                label: 'Dünya ile bağlantıda, hareketli bir yaşam',
                skills: ['Yabancı Dil', 'İletişim'],
                motivations: ['Gezme', 'Özgürlük'],
                typeBoost: { 'Dil': 2 },
                learningTrait: 'Hareket odaklı'
            }
        ]
    },
    {
        id: 'q8',
        question: 'Bir öğrenme programında hangisi seni en çok sürükler?',
        options: [
            {
                label: 'Net hedef + haftalık ölçülebilir görevler',
                skills: ['Organizasyon', 'Problem Çözme'],
                motivations: ['Güvenlik'],
                typeBoost: { 'Sayısal': 1, 'Eşit Ağırlık': 1 },
                learningTrait: 'Disiplinli ilerleyen'
            },
            {
                label: 'Atölye, sunum, tartışma',
                skills: ['Hitabet', 'Takım Çalışması'],
                motivations: ['İnsan İlişkileri'],
                typeBoost: { 'Sözel': 1, 'Eşit Ağırlık': 1 },
                learningTrait: 'Etkileşimli öğrenen'
            },
            {
                label: 'Uygulama/proje üretimi',
                skills: ['Yaratıcılık', 'Kodlama'],
                motivations: ['İnovasyon'],
                typeBoost: { 'Sayısal': 1, 'Sözel': 1 },
                learningTrait: 'Proje tabanlı öğrenen'
            },
            {
                label: 'Okuma, not çıkarma, çeviri ve analiz',
                skills: ['Çeviri', 'Okuma'],
                motivations: ['Keşif'],
                typeBoost: { 'Dil': 2 },
                learningTrait: 'Metin tabanlı öğrenen'
            }
        ]
    }
];

function getTopItems(weightMap: Record<string, number>, count: number): string[] {
    return Object.entries(weightMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([item]) => item);
}

export function generateQuizResult(answers: number[]): QuizResult {
    const skillWeights: Record<string, number> = {};
    const motivationWeights: Record<string, number> = {};
    const typeWeights: Record<Job['type'], number> = {
        'Sayısal': 0,
        'Eşit Ağırlık': 0,
        'Sözel': 0,
        'Dil': 0
    };
    const traitWeights: Record<string, number> = {};

    LEARNING_QUIZ_QUESTIONS.forEach((question, questionIndex) => {
        const answerIndex = answers[questionIndex];
        const selectedOption = question.options[answerIndex];
        if (!selectedOption) {
            return;
        }

        selectedOption.skills.forEach(skill => {
            skillWeights[skill] = (skillWeights[skill] || 0) + 1;
        });

        selectedOption.motivations.forEach(motivation => {
            motivationWeights[motivation] = (motivationWeights[motivation] || 0) + 1;
        });

        Object.entries(selectedOption.typeBoost).forEach(([type, value]) => {
            typeWeights[type as Job['type']] += value ?? 0;
        });

        traitWeights[selectedOption.learningTrait] = (traitWeights[selectedOption.learningTrait] || 0) + 1;
    });

    const topSkills = getTopItems(skillWeights, 4);
    const topMotivations = getTopItems(motivationWeights, 3);
    const suggestedType = (Object.entries(typeWeights).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Eşit Ağırlık') as Job['type'];
    const learningStyle = getTopItems(traitWeights, 1)[0] ?? 'Dengeli öğrenen';

    return {
        learningStyle,
        summary: `Öğrenme stilin: ${learningStyle}. ${suggestedType} ağırlığında ilerlersen güçlü yönlerini daha hızlı büyütebilirsin.`,
        topSkills,
        topMotivations,
        suggestedType
    };
}

export function applyQuizResultToFilters(result: QuizResult, previousFilters: FilterState): FilterState {
    return {
        ...previousFilters,
        type: result.suggestedType,
        selectedSkills: result.topSkills.slice(0, 4),
        selectedMotivations: result.topMotivations.slice(0, 3)
    };
}
