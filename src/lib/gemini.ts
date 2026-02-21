import { GoogleGenerativeAI } from "@google/generative-ai";
import type { FilterState, Job } from "./data";

interface CareerPlanOptions {
    focusJob?: Job;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

function formatCandidateJobs(candidateJobs: Job[]): string {
    if (candidateJobs.length === 0) {
        return "- Uygun aday meslek bulunamadı";
    }

    return candidateJobs
        .slice(0, 8)
        .map((job, index) => {
            const tags = job.tags.slice(0, 4).join(", ");
            const motivations = job.motivations.slice(0, 3).join(", ");
            return `${index + 1}. ${job.title} | Tür: ${job.type} | Etiketler: ${tags} | Motivasyonlar: ${motivations}`;
        })
        .join("\n");
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
        return error.message;
    }

    return "Bilinmeyen hata";
}

function buildPersonalizedDemoPlan(filters: FilterState, candidateJobs: Job[], focusJob?: Job): string {
    const selectedSkills = filters.selectedSkills.length ? filters.selectedSkills : ["Genel Beceriler"];
    const selectedMotivations = filters.selectedMotivations.length ? filters.selectedMotivations : ["Kişisel Gelişim"];

    if (focusJob) {
        const focusSkill = selectedSkills[0] ?? 'Temel Beceriler';
        const supportSkill = selectedSkills[1] ?? selectedSkills[0] ?? 'Uygulama';
        const boostMotivation = selectedMotivations[0] ?? 'Kişisel Gelişim';

        const dreamLine = filters.dreamText.trim()
            ? `Hayalin: "${filters.dreamText.trim()}" hedefini ${focusJob.title} kariyer adımlarına aylık hedef olarak bağla.`
            : `${focusJob.title} yolunda ilerlemek için her ay ölçülebilir bir gelişim hedefi belirle.`;

        return `## 🤖 Demo Modu (API Anahtarı Yok)
Gerçek Gemini çağrısı yapılamadığı için yerel, **tek meslek odaklı** plan üretildi.

## 🎯 Hedef Meslek Planı
- **Meslek:** ${focusJob.title}
- **Neden Uygun:** ${selectedSkills[0]} becerin ve ${selectedMotivations[0]} motivasyonun bu meslekle doğrudan örtüşüyor.

## ✅ Kısa Eylem Planı
- **Bu Hafta:** ${focusJob.title} için net bir öğrenme hedefi koy ve ${focusSkill} odağında 2 pratik tamamla.
- **Sonraki 2-3 Hafta:** ${supportSkill} tarafını güçlendirecek küçük bir proje üret.
- **Takip:** Her hafta 15 dakikalık değerlendirme yap; ${boostMotivation} motivasyonunu canlı tutan noktaları not et.

## 💡 Kritik Tavsiye
${dreamLine}`;
    }

    const topJobs = candidateJobs.slice(0, 3);
    const jobList = topJobs.length > 0 ? topJobs : [{ title: "Kariyer Danışmanı ile detaylandırılmalı" } as Job];

    const focusSkill = selectedSkills[0] ?? 'Temel Beceriler';
    const supportSkill = selectedSkills[1] ?? selectedSkills[0] ?? 'Uygulama';
    const boostMotivation = selectedMotivations[0] ?? 'Kişisel Gelişim';

    const dreamLine = filters.dreamText.trim()
        ? `Hayalin: "${filters.dreamText.trim()}" ifadesini plana entegre ederek ilerle.`
        : "Hayalini netleştirmek için 1 cümlelik hedef metni yaz ve her ay güncelle.";

    return `## 🤖 Demo Modu (API Anahtarı Yok)
Gerçek Gemini çağrısı yapılamadığı için yerel, **tercih bazlı** örnek plan üretildi.

## 🎯 Önerilen 3 Meslek
- **${jobList[0].title}:** ${selectedSkills[0]} becerin ve ${selectedMotivations[0]} motivasyonunla uyumlu.
- **${jobList[1]?.title ?? jobList[0].title}:** ${selectedSkills[Math.min(1, selectedSkills.length - 1)]} yönünü güçlendirerek öne çıkabilirsin.
- **${jobList[2]?.title ?? jobList[0].title}:** ${selectedMotivations[Math.min(1, selectedMotivations.length - 1)]} odaklı çalışma tarzına uygun.

## ✅ Kısa Eylem Planı
- **Bu Hafta:** ${focusSkill} odağında başlangıç rutini kur ve 2 küçük görev bitir.
- **Sonraki 2-3 Hafta:** En çok ilgini çeken meslek için ${supportSkill} destekli mini çıktı üret.
- **Takip:** ${boostMotivation} motivasyonunu koruyacak haftalık kontrol listesi kullan.

## 💡 Kritik Tavsiye
${dreamLine}`;
}

export async function generateCareerPlan(
    filters: FilterState,
    candidateJobs: Job[] = [],
    options?: CareerPlanOptions
): Promise<string> {
    const isSingleJobMode = Boolean(options?.focusJob);
    const effectiveCandidates = isSingleJobMode && options?.focusJob ? [options.focusJob] : candidateJobs;

    if (!genAI || !API_KEY) {
        console.log("Demo Modu: API Anahtarı eksik, sahte veri dönülüyor.");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(buildPersonalizedDemoPlan(filters, effectiveCandidates, options?.focusJob));
            }, 1000);
        });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
        Sen uzman bir kariyer danışmanısın ve SADECE verilen kullanıcı verisine göre cevap verirsin.

        Kullanıcı Profili:
        - Bölüm Türü: ${filters.type || "Belirtilmemiş"}
        - Seçili Yetenekler: ${filters.selectedSkills.join(', ') || "Belirtilmemiş"}
        - Seçili Motivasyonlar: ${filters.selectedMotivations.join(', ') || "Belirtilmemiş"}
        - Hayal Metni: "${filters.dreamText || "Belirtilmemiş"}"
        ${isSingleJobMode && options?.focusJob ? `- Hedef Meslek (Zorunlu Odak): ${options.focusJob.title}` : ""}

        Filtreye göre en uygun meslek havuzu:
        ${formatCandidateJobs(effectiveCandidates)}

        KURALLAR:
        1) Genel/geçiştirme metin yazma. Cevap doğrudan bu profile özel olmalı.
        2) ${isSingleJobMode
            ? 'Hedef Meslek verildiyse SADECE o meslek için plan yaz, başka meslek önerme.'
            : '"Önerilen 3 Meslek" kısmında mümkünse sadece yukarıdaki meslek havuzundan seçim yap.'}
        3) Cevap içinde en az iki seçili yetenek ve en az iki seçili motivasyonu aynen geçir.
        4) Hayal metni varsa son tavsiyede bu hayale doğrudan referans ver.
        5) Yanıt Türkçe, kısa, madde madde ve net olsun.

        FORMAT:
        ${isSingleJobMode
            ? '## 🎯 Hedef Meslek Planı\n- Meslek: ...\n- Neden Uygun: ...'
            : '## 🎯 Önerilen 3 Meslek\n- ...'}

        ## ✅ Kısa Eylem Planı
        - Bu Hafta: ...
        - Sonraki 2-3 Hafta: ...
        - Takip: ...

        ## 💡 Kritik Tavsiye
        - ...
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: unknown) {
        console.error("Gemini API Error:", error);
        return `⚠️ Bir hata oluştu: ${getErrorMessage(error)}.
        
        (Not: Eğer API anahtarını yeni eklediyseniz, terminali kapatıp yeniden başlatmanız gerekebilir.)`;
    }
}
