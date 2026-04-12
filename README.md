![Z Repo Banner](Z-Repo-Banner.png)

# Z 2.0 — React + TypeScript + Vite

Profesyonel bir başlangıç şablonu: React, TypeScript ve Vite ile hızlı geliştirme, HMR ve temel lint kuralları sağlar. Bu depo, üretim öncesi projeler için özelleştirilebilir yapılandırma ve geliştirici deneyimi iyileştirmeleri içerir.

**Özellikler:**
- Hızlı geliştirme için Vite + HMR
- TypeScript desteği ve örnek tsconfig dosyaları
- ESLint yapılandırma örnekleri (tip denetimli seçeneklerle genişletilebilir)

## Hızlı Başlangıç

Gerekli paketleri yükleyin ve geliştirme sunucusunu başlatın:

```bash
npm install
npm run dev
```

Üretim için derleme:

```bash
npm run build
npm run preview
```

## Proje Yapısı (Özet)

- `src/` — Uygulama kaynak kodu (bileşenler, stiller, varlıklar)
- `public/` — Statik dosyalar
- `tsconfig.*.json` — TypeScript yapılandırmaları
- `eslint.config.js` — ESLint kuralları ve eklentiler

Detaylı yapılandırma ve üçüncü taraf eklentileri README içeriğinde veya ilgili konfigürasyon dosyalarında bulunabilir.

## Özelleştirme ve İpuçları

- Produksiyon için tip denetimli ESLint konfigürasyonlarını etkinleştirin (`recommendedTypeChecked`, `strictTypeChecked`).
- Performans ve derleme hızını dengelemek için derleyici eklentilerini dikkatle seçin (ör. Babel vs SWC).

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır. Yeni özellik, hata düzeltme veya belge önerileri için lütfen bir issue açın ve ardından bir pull request gönderin.

## Lisans

Bu depo için uygun lisans bilgilerini ekleyin (ör. `MIT`).

## İletişim

Sorular veya geri bildirim için repository sahibi ile iletişime geçin.

---

_Bu README, projeyi daha profesyonel ve kullanım dostu gösterecek şekilde sadeleştirildi. Banner, repository kökünde bulunan `Z-Repo-Banner.png` dosyasından geliyor._
