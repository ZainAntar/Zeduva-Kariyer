import type { Job } from './data';

export interface JobInsight {
    fitProfile: string[];
    dailyFlow: string[];
    challengeAreas: string[];
    focusCourses: string[];
    miniPortfolio: string;
    workModel: string;
    incomePotential: string;
    suggestedMajors: string[];
}

const FOCUS_COURSES_BY_TYPE: Record<Job['type'], string[]> = {
    'Sayısal': ['Matematik', 'Fizik', 'Biyoloji', 'Problem Çözme'],
    'Eşit Ağırlık': ['Matematik', 'Türkçe', 'Tarih', 'Analiz'],
    'Sözel': ['Türkçe', 'Edebiyat', 'Tarih', 'Sosyal Bilimler'],
    'Dil': ['Yabancı Dil', 'Okuma', 'Yazma', 'Kültür']
};

const CHALLENGES_BY_TYPE: Record<Job['type'], string[]> = {
    'Sayısal': ['Yoğun teknik öğrenme temposu', 'Sürekli güncel kalma ihtiyacı', 'Hata toleransının düşük olduğu süreçler'],
    'Eşit Ağırlık': ['İletişim ve analiz dengesini koruma', 'Karar süreçlerinde çoklu paydaş yönetimi', 'Yoğun dokümantasyon ve takip'],
    'Sözel': ['Sürekli üretim ve ifade disiplini', 'Farklı bakış açılarını yönetme', 'Zaman baskısı altında içerik kalitesi'],
    'Dil': ['Düzenli pratik yapılmadığında gerileme', 'Kültürel bağlamı doğru aktarma', 'Uzun metinlerde tutarlılık ve doğruluk']
};

const WORK_MODEL_BY_TYPE: Record<Job['type'], string> = {
    'Sayısal': 'Proje + teknik uygulama odaklı, hibrit/uzaktan çalışma olasılığı yüksek.',
    'Eşit Ağırlık': 'İletişim ve analiz dengeli, ofis + saha/insan etkileşimi karışık.',
    'Sözel': 'İçerik, anlatım ve araştırma odaklı; üretim temposu yüksek.',
    'Dil': 'Uluslararası iletişim ve metin/konuşma pratiği odaklı, esnek çalışma olası.'
};

const INCOME_POTENTIAL_BY_TYPE: Record<Job['type'], string> = {
    'Sayısal': 'Orta-Yüksek (uzmanlaşma ile yüksek potansiyel)',
    'Eşit Ağırlık': 'Orta-Yüksek (rol ve sektöre göre değişken)',
    'Sözel': 'Orta (uzmanlık/markalaşma ile artabilir)',
    'Dil': 'Orta (uluslararası tecrübe ile artabilir)'
};

const MAJORS_BY_TYPE: Record<Job['type'], string[]> = {
    'Sayısal': ['Mühendislik', 'Bilgisayar', 'Sağlık Bilimleri', 'Fen Bilimleri'],
    'Eşit Ağırlık': ['Hukuk', 'Psikoloji', 'İşletme', 'İktisat'],
    'Sözel': ['İletişim', 'Edebiyat', 'Tarih', 'Sosyoloji'],
    'Dil': ['Mütercim Tercümanlık', 'Dil ve Edebiyat', 'Uluslararası İlişkiler', 'Turizm Rehberliği']
};

export function buildJobInsight(job: Job): JobInsight {
    const fitProfile = [
        `${job.tags[0] ?? 'Analiz'} tarafın güçlü ise`,
        `${job.motivations[0] ?? 'Kariyer'} motivasyonuyla çalışabiliyorsan`,
        `${job.tags[1] ?? 'İletişim'} odaklı görevlerde enerjin düşmüyorsa`
    ];

    const dailyFlow = [
        `Güne ${job.tags[0] ?? 'ana görev'} odaklı planlama ile başla`,
        `Gün içinde ${job.tags[1] ?? 'iş birliği'} ve uygulama adımlarını yürüt`,
        `Gün sonunda çıktılarını değerlendirip ertesi güne kısa not çıkar`
    ];

    const challengeAreas = CHALLENGES_BY_TYPE[job.type];

    const focusCourses = [
        ...FOCUS_COURSES_BY_TYPE[job.type].slice(0, 3),
        job.tags[0] ?? 'Alan Bilgisi'
    ];

    const miniPortfolio = `${job.title} için 2 haftalık mini proje hazırla: ${job.tags.slice(0, 2).join(' + ')} temasında bir çıktı üret ve kısa sunum dosyası ekle.`;
    const workModel = WORK_MODEL_BY_TYPE[job.type];
    const incomePotential = INCOME_POTENTIAL_BY_TYPE[job.type];
    const suggestedMajors = MAJORS_BY_TYPE[job.type].slice(0, 3);

    return {
        fitProfile,
        dailyFlow,
        challengeAreas,
        focusCourses,
        miniPortfolio,
        workModel,
        incomePotential,
        suggestedMajors
    };
}
