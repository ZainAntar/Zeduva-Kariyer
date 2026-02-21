export interface Job {
    id: string;
    title: string;
    type: 'Sayısal' | 'Eşit Ağırlık' | 'Sözel' | 'Dil';
    tags: string[];
    motivations: string[];
    description: string;
    career_path: string[];
}

export interface FilterState {
    type: Job['type'] | null;
    selectedSkills: string[];
    selectedMotivations: string[];
    dreamText: string;
}

export const JOBS: Job[] = [
    {
        id: "1",
        title: "Yapay Zeka Mühendisi",
        type: "Sayısal",
        tags: ["Kodlama", "Algoritma", "Matematik", "Gelecek"],
        motivations: ["İnovasyon", "Maaş", "Etki"],
        description: "Makinelere öğrenmeyi öğreten, geleceğin zekasını inşa eden teknoloji mimarı.",
        career_path: ["AI Researcher", "AI Engineer", "Lead AI Scientist", "CTO"]
    },
    {
        id: "2",
        title: "Tıp Doktoru",
        type: "Sayısal",
        tags: ["Sağlık", "Biyoloji", "İnsan İlişkileri", "Analiz"],
        motivations: ["Yardım", "Statü", "Maaş", "Anlam"],
        description: "İnsan hayatına dokunan, hastalıkları teşhis ve tedavi eden sağlık kahramanı.",
        career_path: ["Pratisyen Hekim", "Uzman Doktor", "Doçent", "Profesör"]
    },
    {
        id: "3",
        title: "Diş Hekimi",
        type: "Sayısal",
        tags: ["Sağlık", "El Becerisi", "Estetik", "Detaycılık"],
        motivations: ["Maaş", "Bağımsızlık", "Statü"],
        description: "Ağız ve diş sağlığını koruyan, gülüşleri güzelleştiren uzman.",
        career_path: ["Diş Hekimi", "Uzman Diş Hekimi", "Klinik Sahibi", "Akademisyen"]
    },
    {
        id: "4",
        title: "Yazılım Mühendisi",
        type: "Sayısal",
        tags: ["Kodlama", "Teknoloji", "Problem Çözme", "Yaratıcılık"],
        motivations: ["Esneklik", "Maaş", "İnovasyon"],
        description: "Dijital dünyayı kodlarla inşa eden, yazılımlar geliştiren modern mühendis.",
        career_path: ["Junior Developer", "Senior Developer", "Tech Lead", "Software Architect"]
    },
    {
        id: "5",
        title: "Endüstri Mühendisi",
        type: "Sayısal",
        tags: ["Verimlilik", "Yönetim", "Analiz", "Sistem"],
        motivations: ["Liderlik", "Maaş", "Problem Çözme"],
        description: "Sistemleri optimize eden, verimliliği artıran ve süreçleri yöneten mühendis.",
        career_path: ["Süreç Analisti", "Üretim Müdürü", "Operasyon Direktörü", "CEO"]
    },
    {
        id: "6",
        title: "Pilot",
        type: "Sayısal",
        tags: ["Havacılık", "Dikkat", "Teknoloji", "Seyahat"],
        motivations: ["Maaş", "Statü", "Özgürlük", "Keşif"],
        description: "Gökyüzünde özgürce dolaşan, uçuş güvenliğini ve operasyonu yöneten kaptan.",
        career_path: ["Second Officer", "First Officer", "Kaptan Pilot", "Eğitmen Pilot"]
    },
    {
        id: "7",
        title: "Uçak ve Uzay Mühendisi",
        type: "Sayısal",
        tags: ["Havacılık", "Fizik", "Tasarım", "Teknoloji"],
        motivations: ["İnovasyon", "Keşif", "Yaratıcılık"],
        description: "Hava ve uzay araçlarını tasarlayan, gökyüzü teknolojilerini geliştiren mühendis.",
        career_path: ["Tasarım Mühendisi", "Ar-Ge Mühendisi", "Proje Yöneticisi", "Baş Mühendis"]
    },
    {
        id: "8",
        title: "Mimar",
        type: "Sayısal",
        tags: ["Tasarım", "Sanat", "Matematik", "Çizim"],
        motivations: ["Yaratıcılık", "Estetik", "Kalıcı Eser"],
        description: "Yaşam alanlarını tasarlayan, estetik ve fonksiyonelliği birleştiren sanatçı mühendis.",
        career_path: ["Mimar", "Proje Mimarı", "Şantiye Şefi", "Mimar Ofisi Sahibi"]
    },
    {
        id: "9",
        title: "Siber Güvenlik Uzmanı",
        type: "Sayısal",
        tags: ["Güvenlik", "Kodlama", "Analiz", "Teknoloji"],
        motivations: ["Adalet", "Maaş", "Problem Çözme"],
        description: "Dijital dünyayı siber tehditlere karşı koruyan, sistemlerin güvenliğini sağlayan dijital polis.",
        career_path: ["Güvenlik Analisti", "Pentester", "Güvenlik Mimarı", "CISO"]
    },
    {
        id: "10",
        title: "Eczacı",
        type: "Sayısal",
        tags: ["Kimya", "Sağlık", "İlaç", "Dikkat"],
        motivations: ["Yardım", "Bağımsızlık", "Statü"],
        description: "İlaçların uzmanı olan, hastaların tedavisinde ilaç danışmanlığı yapan sağlık profesyoneli.",
        career_path: ["Serbest Eczacı", "Klinik Eczacı", "İlaç Sektörü Yöneticisi", "Akademisyen"]
    },
    {
        id: "11",
        title: "Moleküler Biyolog ve Genetikçi",
        type: "Sayısal",
        tags: ["Biyoloji", "Araştırma", "Laboratuvar", "Bilim"],
        motivations: ["Keşif", "İnovasyon", "Bilim"],
        description: "Yaşamın şifresini çözen, genetik hastalıkları araştıran bilim insanı.",
        career_path: ["Araştırmacı", "Laboratuvar Sorumlusu", "Ar-Ge Uzmanı", "Profesör"]
    },
    {
        id: "12",
        title: "Veteriner Hekim",
        type: "Sayısal",
        tags: ["Hayvanlar", "Sağlık", "Biyoloji", "Merhamet"],
        motivations: ["Yardım", "Doz Sevgisi", "Bağımsızlık"],
        description: "Can dostlarımızın sağlığını koruyan ve tedavi eden hayvan hekimi.",
        career_path: ["Klinisyen Veteriner", "Cerrahi Uzmanı", "Gıda Hijyenisti", "Klinik Sahibi"]
    },
    {
        id: "13",
        title: "Beslenme ve Diyetetik Uzmanı",
        type: "Sayısal",
        tags: ["Sağlık", "Beslenme", "İletişim", "Biyoloji"],
        motivations: ["Yardım", "Sağlıklı Yaşam", "İnsan Odaklılık"],
        description: "Sağlıklı yaşam için beslenme programları hazırlayan, toplum sağlığını koruyan uzman.",
        career_path: ["Diyetisyen", "Klinik Diyetisyen", "Spor Diyetisyeni", "Danışmanlık Merkezi Sahibi"]
    },
    {
        id: "14",
        title: "Fizyoterapist",
        type: "Sayısal",
        tags: ["Sağlık", "Anatomi", "Hareket", "Rehabilitasyon"],
        motivations: ["Yardım", "İyileştirme", "İnsan Odaklılık"],
        description: "Hastaların fiziksel hareket kabiliyetini geri kazandıran rehabilitasyon uzmanı.",
        career_path: ["Fizyoterapist", "Manuel Terapist", "Spor Fizyoterapisti", "Klinik Sahibi"]
    },
    {
        id: "15",
        title: "Matematik Öğretmeni",
        type: "Sayısal",
        tags: ["Matematik", "Öğretme", "Analitik", "Mantık"],
        motivations: ["Paylaşım", "Öğretme Aşkı", "Düzen"],
        description: "Sayıların dilini öğreten, analitik düşünmeyi geliştiren eğitimci.",
        career_path: ["Öğretmen", "Bölüm Başkanı", "Eğitim Danışmanı", "Yazar"]
    },
    {
        id: "16",
        title: "Dijital Oyun Tasarımcısı",
        type: "Sayısal",
        tags: ["Oyun", "Tasarım", "Kodlama", "Yaratıcılık"],
        motivations: ["Eğlence", "Yaratıcılık", "İnovasyon"],
        description: "Sanal dünyalar yaratan, oyun mekaniklerini ve hikayelerini kurgulayan tasarımcı.",
        career_path: ["Level Designer", "Game Designer", "Senior Game Designer", "Creative Director"]
    },
    {
        id: "17",
        title: "Veri Bilimci",
        type: "Sayısal",
        tags: ["Veri", "İstatistik", "Yapay Zeka", "Analiz"],
        motivations: ["Keşif", "Maaş", "Problem Çözme"],
        description: "Büyük verileri analiz ederek anlamlı sonuçlar çıkaran ve geleceği öngören dedektif.",
        career_path: ["Data Analyst", "Data Scientist", "Lead Data Scientist", "Chief Data Officer"]
    },
    {
        id: "18",
        title: "Biyomedikal Mühendisi",
        type: "Sayısal",
        tags: ["Tıp", "Teknoloji", "Mühendislik", "Cihaz"],
        motivations: ["İnovasyon", "Sağlık", "Fayda"],
        description: "Tıbbi cihazlar ve teknolojiler geliştirerek sağlık sektörüne yön veren mühendis.",
        career_path: ["Klinik Mühendis", "Ar-Ge Mühendisi", "Ürün Müdürü", "Medikal Direktör"]
    },
    {
        id: "19",
        title: "İnşaat Mühendisi",
        type: "Sayısal",
        tags: ["Yapı", "Matematik", "Proje", "Şantiye"],
        motivations: ["Kalıcı Eser", "Problem Çözme", "Üretim"],
        description: "Binalar, köprüler ve yollar inşa eden, yapıların güvenliğini sağlayan mühendis.",
        career_path: ["Saha Mühendisi", "Proje Müdürü", "Şantiye Şefi", "Müteahhit"]
    },
    {
        id: "20",
        title: "Acil Yardım ve Afet Yönetimi",
        type: "Sayısal",
        tags: ["Kriz Yönetimi", "Sağlık", "Liderlik", "Organizasyon"],
        motivations: ["Yardım", "Adrenalin", "Toplumsal Fayda"],
        description: "Afet ve acil durumlarda hayat kurtaran, kriz anlarını yöneten uzman.",
        career_path: ["Afet Uzmanı", "Saha Koordinatörü", "Yönetici", "Akademisyen"]
    },
    {
        id: "21",
        title: "Adli Bilimler Uzmanı",
        type: "Sayısal",
        tags: ["Analiz", "Hukuk", "Laboratuvar", "Delil"],
        motivations: ["Adalet", "Merak", "Gerçek"],
        description: "Suçları aydınlatmak için bilimsel delilleri inceleyen ve analiz eden uzman.",
        career_path: ["Adli Bilimci", "Laboratuvar Uzmanı", "Olay Yeri İnceleme", "Bilirkişi"]
    },
    {
        id: "22",
        title: "Astronomi ve Uzay Bilimleri",
        type: "Sayısal",
        tags: ["Uzay", "Fizik", "Gözlem", "Bilim"],
        motivations: ["Keşif", "Merak", "Evren"],
        description: "Evrenin sırlarını araştıran, gezegenleri ve yıldızları inceleyen bilim insanı.",
        career_path: ["Astronom", "Araştırmacı", "Gözlemevi Sorumlusu", "Akademisyen"]
    },

    {
        id: "23",
        title: "Hukukçu (Avukat/Hakim/Savcı)",
        type: "Eşit Ağırlık",
        tags: ["Adalet", "Kanun", "Hitabet", "Analiz"],
        motivations: ["Adalet", "Statü", "Güç", "Toplumsal Düzen"],
        description: "Hukuk sistemini uygulayan, hakları savunan ve adaleti sağlayan kişi.",
        career_path: ["Stajyer", "Avukat", "Savcı", "Hakim"]
    },
    {
        id: "24",
        title: "Psikolog",
        type: "Eşit Ağırlık",
        tags: ["İnsan", "Dinleme", "Analiz", "Empati"],
        motivations: ["Yardım", "Anlama", "İçgörü"],
        description: "İnsan davranışlarını ve zihinsel süreçleri inceleyen, ruh sağlığını destekleyen uzman.",
        career_path: ["Psikolog", "Klinik Psikolog", "Uzman Psikolog", "Psikoterapist"]
    },
    {
        id: "25",
        title: "Bankacılık ve Finans Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Para", "Ekonomi", "Analiz", "Yatırım"],
        motivations: ["Maaş", "Kariyer", "Finansal Güç"],
        description: "Finansal piyasaları analiz eden, yatırımları yöneten ve ekonomik stratejiler geliştiren uzman.",
        career_path: ["Uzman Yardımcısı", "Finans Uzmanı", "Portföy Yöneticisi", "Banka Müdürü"]
    },
    {
        id: "26",
        title: "İnsan Kaynakları Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["İletişim", "Yönetim", "Organizasyon", "Mülakat"],
        motivations: ["İnsan İlişkileri", "Organizasyon", "Kültür"],
        description: "Şirketlerin en değerli varlığı olan insan kaynağını yöneten ve geliştiren profesyonel.",
        career_path: ["İK Asistanı", "İK Uzmanı", "İK Müdürü", "CHRO"]
    },
    {
        id: "27",
        title: "Ekonomist",
        type: "Eşit Ağırlık",
        tags: ["Ekonomi", "Matematik", "Analiz", "Piyasa"],
        motivations: ["Analiz", "Öngörü", "Danışmanlık"],
        description: "Piyasa trendlerini analiz eden, ekonomik modeller geliştiren iktisatçı.",
        career_path: ["Analist", "Ekonomist", "Baş Ekonomist", "Danışman"]
    },
    {
        id: "28",
        title: "Çocuk Gelişimi Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Çocuklar", "Eğitim", "Psikoloji", "Gelişim"],
        motivations: ["Yardım", "Sevgi", "Gelecek"],
        description: "Çocukların bedensel, zihinsel ve sosyal gelişimini destekleyen uzman.",
        career_path: ["Çocuk Gelişimci", "Aile Danışmanı", "Kurum Müdürü", "Akademisyen"]
    },
    {
        id: "29",
        title: "Havacılık Yönetimi Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Havacılık", "Yönetim", "Operasyon", "Lojistik"],
        motivations: ["Dinamizm", "Sektörel İlgi", "Kariyer"],
        description: "Havalimanı ve havayolu işletmelerinin operasyonlarını yöneten uzman.",
        career_path: ["Operasyon Uzmanı", "Harekat Memuru", "İstasyon Müdürü", "Havalimanı Yöneticisi"]
    },
    {
        id: "30",
        title: "Siyaset Bilimi ve Kamu Yön. Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Siyaset", "Yönetim", "Toplum", "Analiz"],
        motivations: ["Liderlik", "Toplumsal Etki", "Yönetim"],
        description: "Devlet yönetimi, siyasi süreçler ve kamu politikaları üzerine uzmanlaşmış kişi.",
        career_path: ["Uzman", "Danışman", "Bürokrat", "Siyasetçi"]
    },
    {
        id: "31",
        title: "Lojistik Yöneticisi",
        type: "Eşit Ağırlık",
        tags: ["Planlama", "Organizasyon", "Tedarik", "Nakliye"],
        motivations: ["Düzen", "Verimlilik", "Ticaret"],
        description: "Ürünlerin tedarik zincirini ve nakliye süreçlerini yöneten profesyonel.",
        career_path: ["Lojistik Sorulusu", "Operasyon Müdürü", "Tedarik Zinciri Müdürü", "Lojistik Direktörü"]
    },
    {
        id: "32",
        title: "Sosyolog",
        type: "Eşit Ağırlık",
        tags: ["Toplum", "Araştırma", "Kültür", "Analiz"],
        motivations: ["Anlama", "Toplumsal Fayda", "Araştırma"],
        description: "Toplumsal yapıları, ilişkileri ve değişimleri inceleyen bilim insanı.",
        career_path: ["Araştırmacı", "Danışman", "İK Uzmanı", "Akademisyen"]
    },
    {
        id: "33",
        title: "Arkeolog",
        type: "Eşit Ağırlık",
        tags: ["Tarih", "Kazı", "Kültür", "Keşif"],
        motivations: ["Keşif", "Geçmiş", "Merak"],
        description: "Geçmiş uygarlıkların izlerini süren, kazılarla tarihi aydınlatan bilim insanı.",
        career_path: ["Kazı Ekibi Üyesi", "Müze Araştırmacısı", "Kazı Başkanı", "Küratör"]
    },
    {
        id: "34",
        title: "Felsefe Grubu Öğretmeni",
        type: "Eşit Ağırlık",
        tags: ["Düşünce", "Mantık", "Sorgulama", "Öğretme"],
        motivations: ["Bilgelik", "Sorgulama", "Aydınlanma"],
        description: "Düşünmeyi, sorgulamayı ve felsefi akımları öğreten eğitimci.",
        career_path: ["Öğretmen", "Danışman", "Yazar", "Akademisyen"]
    },
    {
        id: "35",
        title: "Sağlık Yönetimi Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Sağlık", "Yönetim", "Hastane", "Organizasyon"],
        motivations: ["Yönetim", "Sağlık Sektörü", "Kariyer"],
        description: "Sağlık kurumlarını yöneten, sağlık hizmetlerinin verimliliğini sağlayan profesyonel.",
        career_path: ["Hasta Hizmetleri Müdürü", "Hastane Müdürü", "Sağlık Direktörü", "CEO"]
    },
    {
        id: "36",
        title: "Sosyal Hizmet Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Yardım", "Toplum", "Destek", "İletişim"],
        motivations: ["İyilik", "Toplumsal Denge", "Yardım"],
        description: "Dezavantajlı gruplara destek olan, sosyal sorunlara çözüm üreten uzman.",
        career_path: ["Sosyal Çalışmacı", "Kurum Müdürü", "Danışman", "Politika Geliştirici"]
    },
    {
        id: "37",
        title: "Otel Yöneticisi",
        type: "Eşit Ağırlık",
        tags: ["Turizm", "Hizmet", "Yönetim", "Organizasyon"],
        motivations: ["Misafirperverlik", "Kariyer", "Dinamizm"],
        description: "Otellerin operasyonunu yöneten, misafir memnuniyetini sağlayan yönetici.",
        career_path: ["Departman Müdürü", "Otel Müdürü", "Genel Müdür", "Bölge Direktörü"]
    },
    {
        id: "38",
        title: "Antropolog",
        type: "Eşit Ağırlık",
        tags: ["Kültür", "İnsan", "Tarih", "Araştırma"],
        motivations: ["Keşif", "İnsanlığı Anlama", "Bilim"],
        description: "İnsanlığın geçmişini, kültürlerini ve evrimini inceleyen bilim insanı.",
        career_path: ["Araştırmacı", "Müze Uzmanı", "Kültür Danışmanı", "Akademisyen"]
    },
    {
        id: "39",
        title: "Dijital Pazarlama Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["İnternet", "Reklam", "Analiz", "Sosyal Medya"],
        motivations: ["Yaratıcılık", "Trendler", "Etki"],
        description: "Dijital kanallarda markaları büyüten, stratejik pazarlama kampanyaları yöneten uzman.",
        career_path: ["SEO Uzmanı", "Pazarlama Müdürü", "Dijital Direktör", "Ajans Sahibi"]
    },
    {
        id: "40",
        title: "Uluslararası İlişkiler Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["Diplomasi", "Siyaset", "Yabancı Dil", "Dünya"],
        motivations: ["Dünya Barışı", "Seyahat", "Analiz"],
        description: "Devletler arası ilişkileri analiz eden ve diplomasi alanında çalışan uzman.",
        career_path: ["Diplomat", "Dış İşleri Uzmanı", "Danışman", "Büyükelçi"]
    },
    {
        id: "41",
        title: "Yönetim Bilişim Sistemleri Uzmanı",
        type: "Eşit Ağırlık",
        tags: ["IT", "İşletme", "Teknoloji", "Veri"],
        motivations: ["Teknoloji", "Yönetim", "Köprü Kurma"],
        description: "İş dünyası ile teknoloji arasında köprü kuran, bilişim süreçlerini yöneten uzman.",
        career_path: ["İş Analisti", "IT Yöneticisi", "Proje Yöneticisi", "CIO"]
    },
    {
        id: "42",
        title: "İç Mimar ve Çevre Tasarımcısı",
        type: "Eşit Ağırlık",
        tags: ["Dekorasyon", "Sanat", "Tasarım", "Mekan"],
        motivations: ["Estetik", "Yaratıcılık", "Dönüşüm"],
        description: "Mekanların iç tasarımlarını yapan, estetik ve işlevsel yaşam alanları yaratan tasarımcı.",
        career_path: ["İç Mimar", "Tasarımcı", "Sanat Yönetmeni", "Ofis Sahibi"]
    },
    {
        id: "43",
        title: "Sınıf Öğretmeni",
        type: "Eşit Ağırlık",
        tags: ["Çocuklar", "Eğitim", "Sabır", "Öğretme"],
        motivations: ["Geleceği Şekillendirme", "Sevgi", "Öğretme"],
        description: "İlkokul çağındaki çocuklara temel eğitimi veren, hayata hazırlayan öğretmen.",
        career_path: ["Öğretmen", "Müdür Yardımcısı", "Okul Müdürü", "Müfettiş"]
    },
    {
        id: "44",
        title: "Rehberlik ve Psikolojik Danışman",
        type: "Eşit Ağırlık",
        tags: ["Psikoloji", "Okul", "Danışmanlık", "İletişim"],
        motivations: ["Yardım", "Yönlendirme", "Destek"],
        description: "Eğitim kurumlarında öğrencilere psikolojik destek ve kariyer rehberliği sağlayan uzman.",
        career_path: ["Okul Psikolojik Danışmanı", "Rehberlik Araştırma Merkezi", "Klinik PDR", "Terapist"]
    },
    {
        id: "45",
        title: "Antrenörlük Eğitimi",
        type: "Eşit Ağırlık",
        tags: ["Spor", "Liderlik", "Motivasyon", "Sağlık"],
        motivations: ["Başarı", "Takım Ruhu", "Spor Aşkı"],
        description: "Sporcuları eğiten, performanslarını artıran ve takımları yöneten spor eğitmeni.",
        career_path: ["Yardımcı Antrenör", "Baş Antrenör", "Teknik Direktör", "Spor Yöneticisi"]
    },

    {
        id: "46",
        title: "Okul Öncesi Öğretmeni",
        type: "Sözel",
        tags: ["Oyun", "Çocuk", "Eğitim", "Sabır"],
        motivations: ["Sevgi", "Oyun", "Gelişim"],
        description: "Küçük çocukların eğitim hayatına ilk adımlarını atmasını sağlayan öğretmen.",
        career_path: ["Öğretmen", "Anaokulu Müdürü", "Kreş Sahibi", "Eğitim Danışmanı"]
    },
    {
        id: "47",
        title: "Özel Eğitim Öğretmeni",
        type: "Sözel",
        tags: ["Engel Tanımayan", "Sabır", "Özveri", "Eğitim"],
        motivations: ["Fark Yaratma", "Yardım", "Hümanizm"],
        description: "Özel gereksinimli bireylerin eğitimini üstlenen fedakar öğretmen.",
        career_path: ["Özel Eğitimci", "Kurum Müdürü", "Rehabilitasyon Uzmanı", "Danışman"]
    },
    {
        id: "48",
        title: "Türkçe Öğretmeni",
        type: "Sözel",
        tags: ["Dil", "Edebiyat", "Dilbilgisi", "Kültür"],
        motivations: ["Dil Sevgisi", "Kültür Mirası", "Öğretme"],
        description: "Türkçeyi doğru kullanmayı ve sevmeyi öğreten eğitimci.",
        career_path: ["Öğretmen", "Yazar", "Editör", "Bölüm Başkanı"]
    },
    {
        id: "49",
        title: "Tarih Öğretmeni",
        type: "Sözel",
        tags: ["Tarih", "Geçmiş", "Araştırma", "Kültür"],
        motivations: ["Merak", "Tarih Bilinci", "Anlatıcılık"],
        description: "Geçmişi öğreterek geleceğe ışık tutan tarih eğitimcisi.",
        career_path: ["Öğretmen", "Tarihçi", "Araştırmacı", "Akademisyen"]
    },
    {
        id: "50",
        title: "Türk Dili ve Edebiyatı Öğretmeni",
        type: "Sözel",
        tags: ["Şiir", "Roman", "Sanat", "Dil"],
        motivations: ["Sanat", "Estetik", "Edebiyat Aşkı"],
        description: "Edebiyat eserlerini inceleyen ve Türk edebiyatını öğreten öğretmen.",
        career_path: ["Edebiyat Öğretmeni", "Yazar", "Şair", "Eleştirmen"]
    },
    {
        id: "51",
        title: "Gastronomi ve Mutfak Sanatları",
        type: "Sözel",
        tags: ["Yemek", "Sanat", "Lezzet", "Yaratıcılık"],
        motivations: ["Yaratıcılık", "Lezzet Tutkusu", "Estetik"],
        description: "Yemek yapmayı sanata dönüştüren şef ve mutfak profesyoneli.",
        career_path: ["Ahçı", "Sous Chef", "Executive Chef", "Restoran Sahibi"]
    },
    {
        id: "52",
        title: "Radyo, TV ve Sinema Uzmanı",
        type: "Sözel",
        tags: ["Medya", "Film", "Kamera", "Senaryo"],
        motivations: ["Yaratıcılık", "Hikaye Anlatıcılığı", "Şöhret"],
        description: "Sinema ve televizyon dünyasında içerik üreten, yöneten ve kurgulayan uzman.",
        career_path: ["Senarist", "Yönetmen", "Yapımcı", "Medya Yöneticisi"]
    },
    {
        id: "53",
        title: "Halkla İlişkiler ve Tanıtım Uzmanı",
        type: "Sözel",
        tags: ["İletişim", "İmaj", "Medya", "Organizasyon"],
        motivations: ["Sosyal İlişkiler", "İkna", "Marka Yönetimi"],
        description: "Kurumların itibarını yöneten ve kamuoyu ile iletişimini sağlayan uzman.",
        career_path: ["PR Uzmanı", "Basın Danışmanı", "Kurumsal İletişim Müdürü", "Ajans Başkanı"]
    },
    {
        id: "54",
        title: "Yeni Medya ve İletişim Uzmanı",
        type: "Sözel",
        tags: ["Sosyal Medya", "Dijital", "İçerik", "Teknoloji"],
        motivations: ["Trendler", "Yenilik", "Dijital Dünya"],
        description: "Dijital medya kanallarını yöneten, yeni nesil iletişim stratejileri geliştiren uzman.",
        career_path: ["Sosyal Medya Uzmanı", "Dijital İçerik Yöneticisi", "Topluluk Yöneticisi", "Medya Direktörü"]
    },
    {
        id: "55",
        title: "Gazeteci",
        type: "Sözel",
        tags: ["Haber", "Araştırma", "Yazma", "Merak"],
        motivations: ["Gerçekler", "Toplumsal Bilinç", "Adrenalin"],
        description: "Olayları araştıran, haberleştiren ve toplumu bilgilendiren basın mensubu.",
        career_path: ["Muhabir", "Editör", "Köşe Yazarı", "Genel Yayın Yönetmeni"]
    },
    {
        id: "56",
        title: "Reklamcı",
        type: "Sözel",
        tags: ["Yaratıcılık", "İkna", "Pazarlama", "Tasarım"],
        motivations: ["Yaratıcılık", "Rekabet", "Etki"],
        description: "Markalar için yaratıcı kampanyalar hazırlayan ve yöneten reklam profesyoneli.",
        career_path: ["Reklam Yazarı", "Art Direktör", "Kreatif Direktör", "Ajans Sahibi"]
    },
    {
        id: "57",
        title: "Görsel İletişim Tasarımcısı",
        type: "Sözel",
        tags: ["Tasarım", "Görsel", "Sanat", "İletişim"],
        motivations: ["Estetik", "Yaratıcılık", "Görsel Düşünme"],
        description: "Mesajları görsel dille ifade eden, grafik ve dijital tasarım uzmanı.",
        career_path: ["Tasarımcı", "Sanat Yönetmeni", "Kreatif Direktör", "Multimedya Tasarımcısı"]
    },
    {
        id: "58",
        title: "Çizgi Film ve Animasyon Sanatçısı",
        type: "Sözel",
        tags: ["Çizim", "Animasyon", "Hikaye", "Sanat"],
        motivations: ["Hayal Gücü", "Eğlence", "Sanat"],
        description: "Karakterlere ve hikayelere hareket kazandıran animasyon sanatçısı.",
        career_path: ["Animatör", "Karakter Tasarımcısı", "Storyboard Sanatçısı", "Animasyon Yönetmeni"]
    },
    {
        id: "59",
        title: "Sanat Tarihçisi",
        type: "Sözel",
        tags: ["Sanat", "Tarih", "Müze", "Kültür"],
        motivations: ["Estetik", "Geçmiş", "Sanat Aşkı"],
        description: "Sanat eserlerini ve tarihsel gelişimini inceleyen uzman.",
        career_path: ["Müze Uzmanı", "Küratör", "Sanat Danışmanı", "Akademisyen"]
    },
    {
        id: "60",
        title: "Fotoğrafçı ve Videographer",
        type: "Sözel",
        tags: ["Kamera", "Görsel", "Işık", "Sanat"],
        motivations: ["Anı Yakalamak", "Yaratıcılık", "Görsel Estetik"],
        description: "Anları ölümsüzleştiren, görsel hikayeler anlatan sanatçı.",
        career_path: ["Fotoğrafçı", "Görüntü Yönetmeni", "Stüdyo Sahibi", "Belgesel Yapımcısı"]
    },
    {
        id: "61",
        title: "İlahiyatçı / Din Kültürü Öğretmeni",
        type: "Sözel",
        tags: ["Din", "Felsefe", "Öğretme", "Kültür"],
        motivations: ["Maneviyat", "Öğretme", "Rehberlik"],
        description: "Din bilimleri alanında uzmanlaşmış eğitimci ve araştırmacı.",
        career_path: ["Öğretmen", "Din Görevlisi", "Müftü", "Akademisyen"]
    },
    {
        id: "62",
        title: "Coğrafya Öğretmeni",
        type: "Sözel",
        tags: ["Dünya", "Doğa", "Harita", "İklim"],
        motivations: ["Doğa Sevgisi", "Keşif", "Öğretme"],
        description: "Yeryüzü şekillerini, iklimi ve insan-doğa ilişkisini öğreten öğretmen.",
        career_path: ["Öğretmen", "Coğrafyacı", "Çevre Danışmanı", "Yazar"]
    },
    {
        id: "63",
        title: "Rekreasyon Yöneticisi",
        type: "Sözel",
        tags: ["Eğlence", "Spor", "Organizasyon", "Aktivite"],
        motivations: ["Enerji", "Sosyal Etkileşim", "Eğlence"],
        description: "Boş zaman aktivitelerini planlayan ve yöneten, yaşam kalitesini artıran uzman.",
        career_path: ["Etkinlik Yöneticisi", "Animasyon Müdürü", "Tesis Yöneticisi", "Yaşam Koçu"]
    },
    {
        id: "67",
        title: "Editör ve Redaktör",
        type: "Sözel",
        tags: ["Yazı", "Dilbilgisi", "Kitap", "Düzenleme"],
        motivations: ["Okuma Aşkı", "Mükemmeliyetçilik", "Kültür"],
        description: "Metinleri yayına hazırlayan, içerik kalitesini denetleyen yayıncılık uzmanı.",
        career_path: ["Editör", "Baş Editör", "Yayın Koordinatörü", "Yayınevi Sahibi"]
    },
    {
        id: "68",
        title: "Dijital İçerik Yazarı",
        type: "Sözel",
        tags: ["Yazma", "Blog", "SEO", "Yaratıcılık"],
        motivations: ["Yazma Tutkusu", "İfade Özgürlüğü", "Dijital Dünya"],
        description: "Dijital platformlar için ilgi çekici metinler ve bloglar üreten yazar.",
        career_path: ["İçerik Yazarı", "Copywriter", "İçerik Stratejisti", "Creative Director"]
    },
    {
        id: "70",
        title: "Kurumsal İletişim Uzmanı",
        type: "Sözel",
        tags: ["Şirket", "İletişim", "Marka", "Strateji"],
        motivations: ["Kurumsal İmaj", "Strateji", "Medya"],
        description: "Şirketin iç ve dış iletişim süreçlerini yöneten iletişim profesyoneli.",
        career_path: ["Uzman", "Yönetici", "Direktör", "Danışman"]
    },
    {
        id: "71",
        title: "Yönetici Asistanı",
        type: "Sözel",
        tags: ["Organizasyon", "Planlama", "İletişim", "Yönetim"],
        motivations: ["Düzen", "Destek", "Sorumluluk"],
        description: "Üst düzey yöneticilerin iş süreçlerini organize eden ve asiste eden profesyonel.",
        career_path: ["Asistan", "Üst Düzey Asistan", "Ofis Müdürü", "İdari İşler Müdürü"]
    },

    {
        id: "64",
        title: "Mütercim Tercüman",
        type: "Dil",
        tags: ["Dil", "Çeviri", "Kültür", "İletişim"],
        motivations: ["Kültürlerarası Köprü", "Dil Tutkusu", "Keşif"],
        description: "Diller arası yazılı ve sözlü çeviri yaparak iletişimi sağlayan uzman.",
        career_path: ["Çevirmen", "Simultane Tercüman", "Editör", "Çeviri Bürosu Sahibi"]
    },
    {
        id: "65",
        title: "İngilizce Öğretmeni",
        type: "Dil",
        tags: ["İngilizce", "Eğitim", "Global", "İletişim"],
        motivations: ["Öğretme", "Dünya Vatandaşlığı", "Gelişim"],
        description: "Global dil olan İngilizceyi öğreten ve dünyaya açılan kapıyı aralayan eğitimci.",
        career_path: ["Öğretmen", "Eğitim Koordinatörü", "Yabancı Diller Bölüm Başkanı", "Dil Okulu Sahibi"]
    },
    {
        id: "66",
        title: "Turizm Rehberi",
        type: "Dil",
        tags: ["Seyahat", "Tarih", "Yabancı Dil", "Kültür"],
        motivations: ["Gezme Tutkusu", "Sosyalleşme", "Kültür Elçiliği"],
        description: "Turistlere ülkemizi ve kültürümüzü tanıtan profesyonel rehber.",
        career_path: ["Rehber", "Tur Lideri", "Acente Yöneticisi", "Seyahat Yazarı"]
    },
    {
        id: "69",
        title: "Online Dil Eğitmeni",
        type: "Dil",
        tags: ["Dijital Eğitim", "Dil", "Teknoloji", "Esneklik"],
        motivations: ["Bağımsızlık", "Global Erişim", "Öğretme"],
        description: "Dijital platformlar üzerinden küresel ölçekte dil eğitimi veren eğitmen.",
        career_path: ["Eğitmen", "İçerik Üreticisi", "Kurs Tasarımcısı", "Eğitim Girişimcisi"]
    },
    {
        id: "72",
        title: "Çeviribilim Uzmanı",
        type: "Dil",
        tags: ["Teori", "Dil", "Araştırma", "Çeviri"],
        motivations: ["Bilim", "Dil Analizi", "Akademi"],
        description: "Çeviri süreçlerini bilimsel olarak inceleyen ve teoriler geliştiren uzman.",
        career_path: ["Akademisyen", "Araştırmacı", "Terminolog", "Proje Yöneticisi"]
    },
    {
        id: "73",
        title: "Yabancı Dil ve Edebiyatı Uzmanı",
        type: "Dil",
        tags: ["Edebiyat", "Kültür", "Dil", "Sanat"],
        motivations: ["Sanat", "Kültür Tanıtımı", "Araştırma"],
        description: "Yabancı dillerin edebiyatını ve kültürünü inceleyen filolog.",
        career_path: ["Filolog", "Editör", "Eleştirmen", "Akademisyen"]
    },
    {
        id: "74",
        title: "Dilbilimci (Linguist)",
        type: "Dil",
        tags: ["Dil Yapısı", "Analiz", "Bilim", "Konuşma"],
        motivations: ["Merak", "Analitik", "Dilin Matematiği"],
        description: "İnsan dillerinin yapısını, kökenini ve işleyişini inceleyen bilim insanı.",
        career_path: ["Dilbilimci", "NLP Uzmanı", "Konuşma Terapisti", "Akademisyen"]
    },
    {
        id: "75",
        title: "Alman Dili ve Edebiyatı Uzmanı",
        type: "Dil",
        tags: ["Almanca", "Kültür", "Edebiyat", "Avrupa"],
        motivations: ["Kültür", "Dil", "Edebiyat"],
        description: "Alman dili, kültürü ve edebiyatı üzerine uzmanlaşmış kişi.",
        career_path: ["Eğitmen", "Tercüman", "Turizmci", "Akademisyen"]
    },
    {
        id: "76",
        title: "Rusça Mütercim ve Tercüman",
        type: "Dil",
        tags: ["Rusça", "Çeviri", "Ticaret", "Diplomasi"],
        motivations: ["İletişim", "Ticaret", "Kültür"],
        description: "Rusça-Türkçe arasında köprü kuran çeviri uzmanı.",
        career_path: ["Tercüman", "Dış Ticaret Uzmanı", "Rehber", "Danışman"]
    },
    {
        id: "77",
        title: "Japon Dili ve Edebiyatı Uzmanı",
        type: "Dil",
        tags: ["Japonca", "Asya", "Kültür", "Zorlu Dil"],
        motivations: ["Farklılık", "Asya Kültürü", "Dil"],
        description: "Japon dili ve kültürü üzerine uzmanlaşmış filolog.",
        career_path: ["Akademisyen", "Çevirmen", "Kültür Ataşeliği", "Rehber"]
    }
];

export const SKILL_OPTIONS = [
    "İletişim", "Liderlik", "Problem Çözme", "Yaratıcılık", "Analitik Düşünme", "Takım Çalışması",
    "Kodlama", "Matematik", "Biyoloji", "Fizik", "Kimya", "Sağlık", "Teknoloji", "Mühendislik", "Analiz",
    "Yazma", "Okuma", "Hitabet", "Tarih", "Coğrafya", "Sanat", "Çizim", "Tasarım", "Müzik",
    "Psikoloji", "Empati", "İkna", "Yönetim", "Ekonomi", "Hukuk", "Organizasyon",
    "Yabancı Dil", "Çeviri", "Kültür", "Öğretme", "Dinleme"
];

export const MOTIVATION_OPTIONS = [
    "Maaş", "Statü", "Kariyer", "Yardım", "Toplumsal Fayda",
    "Yaratıcılık", "İnovasyon", "Keşif", "Merak",
    "Özgürlük", "Bağımsızlık", "Esneklik", "Gezme",
    "İnsan İlişkileri", "Adalet", "Güvenlik", "Liderlik", "Sanat"
];

export const TYPE_OPTIONS = ["Sayısal", "Eşit Ağırlık", "Sözel", "Dil"] as const;
