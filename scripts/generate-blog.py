#!/usr/bin/env python3
"""Generate Yakaplant blog article pages from a content data structure."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# ──────────────────────────── ARTICLE CONTENT ────────────────────────────
ARTICLES = [
    {
        "slug": "zeytin-bakimi",
        "title": "Zeytin Ağacı Bakımı: Toprak, Sulama ve Budama",
        "meta_desc": "Olea europaea — zeytin ağacının dikim, toprak, sulama, budama ve hasat dönemleri üzerine peyzaj mimarları ve bahçe sahipleri için kapsamlı rehber.",
        "tag": "Tür Rehberi",
        "date": "15 Mart 2026",
        "read_time": "8 dk okuma",
        "hero": "/assets/farm-1.jpg",
        "tags": ["Zeytin", "Olea europaea", "Bakım", "Tür Rehberi", "Akdeniz"],
        "sections": [
            {"id": "toprak", "h2": "1. Toprak ve Lokasyon",
             "body": [
                 "Zeytin (<em>Olea europaea</em>), kalkerli ve drenajı iyi topraklarda en sağlıklı şekilde gelişir. Killi ve durgun sulu topraklar kök çürümesine yol açar; bu nedenle dikim öncesi toprağın drenaj kapasitesi mutlaka değerlendirilmelidir.",
                 "İdeal pH aralığı 6.5–7.5; ancak zeytin pH 8.5'a kadar olan hafif alkali toprakları da iyi tolere eder. Sertlik bölgesi USDA Z8b–Z10 arasındadır; mutlak don sınırı yaklaşık -10 °C'dir, dolayısıyla İç Anadolu için riskli, Marmara güneyi/Ege/Akdeniz için idealdir.",
                 "Drenaj testi pratik: 30 cm derinliğinde bir çukur açın, suyla doldurun. Su 4 saat içinde tamamen iniyorsa drenaj yeterlidir; daha yavaşsa dikim çukuruna iri çakıl ve organik madde eklenmesi gerekir."
             ],
             "h3": "Konum ve Dikim Aralığı",
             "list": [
                 "Tam güneş alan, kuzey rüzgârından korunmuş bir alan",
                 "Don ceplerinin oluşmadığı, hafif eğimli arazi",
                 "Yapı veya duvar dibinden en az 4–5 m mesafe",
                 "Sofralık bahçelerde dikim aralığı: 6×6 m; intensif sistemde 4×6 m",
                 "Kök topağı için minimum 80–100 cm dikim çukuru derinliği"
             ]},
            {"id": "sulama", "h2": "2. Sulama Düzeni",
             "body": [
                 "Zeytin kuraklığa son derece dayanıklıdır; ancak ilk üç yılda kök sisteminin sağlam tutunması için düzenli sulama gerekir. Bu dönemde sulama sıklığı haftada bir, derinlemesine ve yavaş yavaş olmalıdır.",
                 "Olgun ağaçlarda sulama büyük ölçüde yağışla karşılanabilir. Özellikle çiçeklenme ve meyve tutumu döneminde (mayıs–haziran) ek sulama, verimi belirgin şekilde artırır. Hasat öncesi son 3–4 hafta sulama azaltılmalıdır."
             ],
             "tip": "Damla sulama, salma sulamaya kıyasla %30–60 oranında su tasarrufu sağlar; aynı zamanda yapraktan ıslanmayı engelleyerek <em>Verticillium</em> ve sirke sineği gibi hastalık/zararlı baskısını azaltır."},
            {"id": "budama", "h2": "3. Budama Tekniği",
             "body": [
                 "Zeytin ağacının formu, hem verimliliği hem de uzun vadeli sağlığını doğrudan etkiler. Açık vazo formu (ortası açık, 3–4 ana dal) hava akışını ve ışık girişini en üst düzeye çıkarır — bu, mantar hastalıklarına karşı en güçlü koruma yöntemidir.",
                 "Budama, ağaç henüz uyanmadan, kış sonu (şubat–mart) yapılmalıdır. Çapraz duran, içe dönük ve <em>obur dallar</em> (gövdeden veya ana dallardan dik çıkan, meyve vermeyen sürgünler) düzenli olarak temizlenmelidir."
             ],
             "h3": "Yıllık Budama Takvimi",
             "list": [
                 "Şubat–Mart: Ana yapısal budama (kuru, hasta, çakışan dallar)",
                 "Haziran: <em>Filiz alma</em> (gövdeden ve ana dal yarılarından çıkan ince obur sürgünleri elle koparma)",
                 "Hasat sonrası (Kasım–Aralık): Yaralı dallarda kontrol budaması"
             ]},
            {"id": "hasat", "h2": "4. Hasat ve Sonrası",
             "body": [
                 "Sofralık zeytin için hasat ekim–kasım, yağlık zeytin için kasım–aralık dönemidir. El ile veya küçük tarakla yapılan hasat, dalı yaralamadan toplama imkânı sağlar; mekanik silkeleyiciler büyük bahçeler için pratiktir.",
                 "Hasattan sonra ağacın dinlenme dönemine girmesi önemlidir. Bu dönemde aşırı sulama veya gübreleme yapılmamalı; yalnızca kuru dallar uzaklaştırılmalıdır. Gövde dibine 5–8 cm kalınlığında organik mulch (gövdeye 5 cm temas etmeden) yerleştirilmesi, kışlık nemi koruyacaktır."
             ]}
        ],
        "plants": [
            {"slug": "zeytin", "name": "Zeytin", "sub": "Olea europaea · Kuraklığa dayanıklı", "img": "/assets/products/zeytin-1.png"},
            {"slug": "defne", "name": "Defne", "sub": "Laurus nobilis · Aromatik, yerli", "img": "/assets/products/defne-1.png"},
            {"slug": "limon-servi", "name": "Limon Servi", "sub": "Cupressus macrocarpa · Aromatik", "img": "/assets/products/limon-servi-1.png"},
        ]
    },
    {
        "slug": "mediteran-bahce",
        "title": "Mediteran Bahçe Tasarımında Bitki Paleti",
        "meta_desc": "Zeytin, defne, biberiye, lavanta — Akdeniz havzası bitkileriyle az su tüketen, polinatör dostu bahçe tasarımı için kapsamlı palet rehberi.",
        "tag": "Peyzaj & Tasarım",
        "date": "5 Mart 2026",
        "read_time": "6 dk okuma",
        "hero": "/assets/farm-5.jpg",
        "tags": ["Mediteran", "Peyzaj", "Tasarım", "Akdeniz", "Polinatör"],
        "sections": [
            {"id": "felsefe", "h2": "1. Mediteran Tasarım Felsefesi",
             "body": [
                 "Mediteran bahçe, az suyla yaşamaya alışmış bitkilerin doğal bir aradalığını esas alır. Burada temel ilke yapay değil, doğal görünmektir: simetri yerine ritim, mükemmellik yerine karakter.",
                 "Bitki seçiminde açık renkli zemin (beyaz çakıl, açık taş), gri-yeşil yaprak tonları ve aromatik bitkilerin baskınlığı belirleyicidir. Bu palet aynı zamanda <strong>polinatör (arı, kelebek)</strong> dostu bir habitat oluşturur — Akdeniz aromatikleri en zengin nektar kaynaklarındandır."
             ],
             "blockquote": "Akdeniz bahçesi sade görünür ama her bitkinin yıllık bir takvimi vardır."},
            {"id": "yapi-bitkileri", "h2": "2. Yapı Oluşturan Bitkiler",
             "body": [
                 "Bahçenin omurgasını oluşturan herdem yeşil türler, yıl boyu sahnede kalır. Bu grubun en yaygın temsilcileri zeytin, defne, mersin ve gerçek Akdeniz servisidir.",
                 "Yaygın bir yanılgı: \"limon servi\" diye satılan <em>Cupressus macrocarpa</em> aslında Kaliforniya kökenlidir; gerçek Akdeniz servisi <em>Cupressus sempervirens</em>'tir ve dikey aksent için tercih edilen türdür."
             ],
             "h3": "Önerilen Yapı Bitkileri",
             "list": [
                 "Zeytin (<em>Olea europaea</em>) — heykelimsi formu ve uzun ömrü ile bahçenin merkezi",
                 "Defne (<em>Laurus nobilis</em>) — sık dokulu yaprakları gizlilik perdesi sağlar; Türkiye'de yerli",
                 "Mersin (<em>Myrtus communis</em>) — yaz çiçeği ve aromatik yaprakları, polinatör dostu",
                 "Akdeniz servisi (<em>Cupressus sempervirens</em> 'Stricta') — dar dikey form, gerçek Akdeniz türü"
             ]},
            {"id": "aromatikler", "h2": "3. Aromatik ve Çiçekli Bitkiler",
             "body": [
                 "Bahçeye koku, renk, mevsimsel değişim ve <strong>polinatör çekiciliği</strong> katan aromatikler, yapı bitkilerinin önünde dolgu görevi görür. Lavanta ve biberiye ikilisi neredeyse her mediteran kompozisyonun değişmezidir; her ikisi de bal arıları ve toplayıcı arılar için yüksek değerli nektar kaynağıdır.",
                 "Bunlara kekik (<em>Thymus</em>), Anadolu adaçayı (<em>Salvia fruticosa</em>), kekikler ve karabaş otu (<em>Lavandula stoechas</em>) gibi türler eklenerek koku ve nektar katmanları zenginleştirilebilir."
             ],
             "tip": "Lavantayı yarı gölge yerine tam güneş alan, kuru bir noktaya dikin. Aşırı sulama, lavantanın en sık ölüm sebebidir. Çiçeklenme sonrası %30 oranında kısa kesim, bitkinin formunu uzun yıllar korur."},
            {"id": "yer-ortucu", "h2": "4. Yer Örtücüler ve Taş Düzenlemeleri",
             "body": [
                 "Mediteran tasarımın imza unsurlarından biri, açık renkli çakıl ve doğal taş kullanımıdır. Bu yüzeyler hem ısı yönetimi sağlar hem de bitkilerin formunu öne çıkaran bir kanvas oluşturur.",
                 "Yer örtücü olarak fare kulağı (<em>Cerastium tomentosum</em>) ve gazanya tercih edilebilir. <strong>Cezayir menekşesi (<em>Vinca major</em>) bazı bölgelerde yayılmacı (invazif) davranabilir</strong>; sınırlı, kontrollü alanlarda kullanılması önerilir."
             ]}
        ],
        "plants": [
            {"slug": "lavanta", "name": "Lavanta", "sub": "Lavandula sp. · Polinatör dostu", "img": "/assets/products/lavanta-1.png"},
            {"slug": "biberiye", "name": "Biberiye", "sub": "Salvia rosmarinus · Aromatik", "img": "/assets/products/biberiye-1.png"},
            {"slug": "zeytin", "name": "Zeytin", "sub": "Olea europaea · Heykelimsi form", "img": "/assets/products/zeytin-1.png"},
        ]
    },
    {
        "slug": "ilkbahar-2026",
        "title": "2026 İlkbahar Koleksiyonundan Öne Çıkanlar",
        "meta_desc": "Yakaplant 2026 ilkbahar koleksiyonu — akçaağaç, ortanca, manolya çeşitleri ve yapısal peyzaj projeleri için tedarik notları.",
        "tag": "Koleksiyon",
        "date": "22 Mart 2026",
        "read_time": "4 dk okuma",
        "hero": "/assets/farm-4.jpg",
        "tags": ["Koleksiyon", "Yenilikler", "İlkbahar 2026", "Endemik"],
        "sections": [
            {"id": "agaclar", "h2": "Bu Sezon Öne Çıkan Ağaçlar",
             "body": [
                 "İlkbahar 2026 koleksiyonunda Japon akçaağacı (<em>Acer palmatum</em>) ve süs kirazı (<em>Prunus serrulata</em>) çeşitliliğini önemli ölçüde genişlettik. <em>Acer palmatum</em> 'Bloodgood' kırmızı yaprak rengini ilkbahardan kışa kadar koruyan, küçük-orta bahçeler için ideal bir aksent türüdür.",
                 "Yine bu sezon ihlamur (<em>Tilia tomentosa</em>, gümüşi ihlamur) ve sığla ağacı stoklarımız tazelendi; yapısal peyzaj projeleri için 10–15 yaş arası, kök topağı 60–80 cm çapında olgunlaşmış örnekler mevcut."
             ],
             "tip": "Sığla ağacı (<em>Liquidambar orientalis</em>), Köyceğiz–Marmaris kuşağına özgü <strong>endemik</strong> bir türdür ve doğal popülasyonu IUCN tarafından tehlike altında listelenmiştir. Yakaplant'ta sunduğumuz tüm sığla fidanları, doğadan toplama değil, fidanlık üretiminden sertifikalı tohumla yetiştirilmiştir."},
            {"id": "calilar", "h2": "Çalı ve Çiçekli Türler",
             "body": [
                 "Çalı kategorisinde ortanca, leylak ve kartopu gibi klasiklerin yanına yeni renk varyasyonları eklendi. Mavi ve mor tonlardaki ortanca çeşitleri, yarı gölge bahçeler için ideal seçenekler sunuyor.",
                 "Bilmeyenler için: ortancanın çiçek rengi toprağın pH'ına bağlıdır — asit topraklarda (pH < 6.0) çiçekler maviye, alkali topraklarda (pH > 7.0) pembeye döner. Mavi tonu korumak için toprağa düzenli torf veya çam kabuğu eklenmesi yeterlidir."
             ],
             "h3": "Sezonun Yıldız Türleri",
             "list": [
                 "<em>Acer palmatum</em> 'Bloodgood' — koyu kırmızı yaprakları ile mevsim aksenti",
                 "<em>Hydrangea macrophylla</em> 'Endless Summer' — yaz boyu çiçeklenen yenilikçi ortanca",
                 "<em>Syringa vulgaris</em> — geleneksel leylak, mor-beyaz çeşitleri ile",
                 "<em>Viburnum opulus</em> (kartopu) — yaz çiçeği, sonbahar meyveleri, yerli tür"
             ]},
            {"id": "ic-mekan", "h2": "İç Mekân Bitkileri",
             "body": [
                 "Modern yaşam alanları için tasarlanan iç mekân koleksiyonumuz; monstera, sansevieria ve <em>Ficus</em> türlerinde yeni boy seçenekleri sunuyor. Özellikle 1.5–2 m boylarındaki <em>Ficus elastica</em> örnekleri, ofis ve lobi projeleri için oldukça popüler."
             ]},
            {"id": "tedarik", "h2": "Tedarik ve Sipariş",
             "body": [
                 "Çiçekli ve dış mekân türlerinde tedarik süresi mevsime göre değişir; özellikle olgun ağaçlarda root-balled (kök topraklı) sevkiyat dikim mevsimi (kış sonu / erken ilkbahar) ile sınırlıdır.",
                 "Toplu sipariş, proje bazlı seçim ve fidanlık ziyareti için lütfen en az 2–3 hafta öncesinden bizimle iletişime geçin. Boy, kap çapı ve form fotoğraflı sevk öncesi paylaşılır."
             ]}
        ],
        "plants": [
            {"slug": "akcaagac", "name": "Akçaağaç", "sub": "Acer palmatum · Sonbahar rengi", "img": "/assets/products/akcaagac-1.png"},
            {"slug": "ortanca", "name": "Ortanca", "sub": "Hydrangea macrophylla · Yarı gölge", "img": "/assets/products/ortanca-2.png"},
            {"slug": "monstera", "name": "Monstera", "sub": "Monstera deliciosa · İç mekân", "img": "/assets/products/monstera-1.png"},
        ]
    },
    {
        "slug": "yerli-turler",
        "title": "Yerli Türlerle Ekolojik Bahçe Tasarımı",
        "meta_desc": "Türkiye florasından yerli türlerle az su, az bakım, polinatör dostu sürdürülebilir bahçe tasarımı için pratik rehber.",
        "tag": "Sürdürülebilirlik",
        "date": "10 Mart 2026",
        "read_time": "6 dk okuma",
        "hero": "/assets/farm-1.jpg",
        "tags": ["Sürdürülebilirlik", "Yerli Türler", "Ekolojik Bahçe", "Endemik", "Polinatör"],
        "sections": [
            {"id": "neden-yerli", "h2": "1. Neden Yerli Türler?",
             "body": [
                 "Yerli türler, bulundukları iklime ve toprak yapısına on binlerce yıllık adaptasyon sürecinde uyum sağlamış bitkilerdir. Bu adaptasyon, bahçenizde dramatik biçimde daha az su, daha az gübre ve daha az müdahale anlamına gelir.",
                 "Türkiye, yaklaşık 12.000 doğal bitki türü ve <strong>3.000'i aşkın endemik tür</strong> ile dünyanın en yüksek bitki çeşitliliğine sahip ülkelerinden biridir. Burada \"yerli\" geniş anlamda Türkiye'de doğal yetişen, \"endemik\" ise yalnızca Türkiye'de yetişen türler için kullanılır.",
                 "Yerli türleri seçmek; yerel arıların, kelebeklerin, kuşların ve faydalı böceklerin habitatına doğrudan katkı sağlar — sadece estetik değil, ekolojik bir karardır."
             ],
             "blockquote": "Bir bahçeyi sürdürülebilir kılan, kullandığınız bitkilerin doğayla olan ilişkisidir."},
            {"id": "anadolu-bitkileri", "h2": "2. Anadolu'nun Önerilen Bitkileri",
             "body": [
                 "Akdeniz, Ege ve İç Anadolu peyzajına uygun, ticari fidanlıklarda bulunabilen yerli türlerin kısa bir listesi:"
             ],
             "h3": "Ağaç ve Çalılar (Türkiye Yerlisi)",
             "list": [
                 "Defne (<em>Laurus nobilis</em>) — herdem yeşil, aromatik, kıyı kuşağı yerlisi",
                 "Mersin (<em>Myrtus communis</em>) — yaz çiçeği, polinatör değeri yüksek",
                 "Erguvan (<em>Cercis siliquastrum</em>) — Akdeniz havzası yerlisi, ilkbaharda mor çiçek",
                 "Anadolu adaçayı (<em>Salvia fruticosa</em>) — yerli aromatik, arı için yüksek nektar değeri",
                 "Karabaş otu (<em>Lavandula stoechas</em>) — Akdeniz yerlisi, gerçek Anadolu lavantası",
                 "Laden (<em>Cistus creticus</em>) — Akdeniz makisi, kuraklığa dayanıklı yer örtücü"
             ],
             "tip": "Süpürge çalısı (<em>Calluna vulgaris</em>) ve tıbbi adaçayı (<em>Salvia officinalis</em>) yaygın \"yerli\" sayılır ama doğal yayılışları dar (Karadeniz nemli orman / Akdeniz havzası dışı). Anadolu'nun kuru iklimi için <em>Salvia fruticosa</em> çok daha uygundur."},
            {"id": "tasarim-prensipleri", "h2": "3. Tasarım Prensipleri",
             "body": [
                 "Ekolojik bahçenin temel ilkesi, doğal habitat yapısını taklit etmektir. Tek tip dikim yerine bitki katmanları (yüksek ağaçlar → çalılar → yer örtücüler → otsu bitkiler) bir arada düşünülmelidir.",
                 "Bu yaklaşım hem suyu daha verimli kullanır hem de yabani otların kendiliğinden bastırılmasını sağlar. Ek olarak; <strong>yağmur suyu hasadı</strong> için sarnıç/varil sistemi, <strong>mulch (organik örtü) uygulaması</strong> ve damla sulama, ekolojik bahçenin üç temel pratik unsurudur."
             ],
             "tip": "Deneyimimize göre bahçenin en az %50'sini yerli ve adaptif türlerden oluşturmak, yıllık sulama ve bakım yükünü belirgin biçimde azaltır. Kesin oran proje bazında toprak, eğim ve mikro-iklime göre değişir."},
            {"id": "bakim", "h2": "4. Düşük Bakım Düzeni",
             "body": [
                 "Yerli türler kuruldukları ilk iki yıl dışında neredeyse müdahalesiz yaşar. Bu dönemden sonra düzenli sulama, gübreleme ve sık budama ihtiyaçları minimuma iner.",
                 "Yıllık olarak yapılması gereken bakım: kış sonu temizlik budaması, ilkbahar başında organik kompost dağıtımı, yaz başında mulch yenilemesi (5–8 cm) ve sezon sonunda kuru tohum kafalarının (kuş yemi olarak) bir kısmının bırakılması."
             ]}
        ],
        "plants": [
            {"slug": "defne", "name": "Defne", "sub": "Laurus nobilis · Yerli, aromatik", "img": "/assets/products/defne-1.png"},
            {"slug": "erguvan", "name": "Erguvan", "sub": "Cercis siliquastrum · Yerli", "img": "/assets/products/erguvan-1.png"},
            {"slug": "kekik", "name": "Kekik", "sub": "Thymus sp. · Polinatör dostu", "img": "/assets/products/kekik-1.png"},
        ]
    },
    {
        "slug": "manolya-bakimi",
        "title": "Manolya: Görkemli Çiçeğin Dikim ve Bakım Notları",
        "meta_desc": "Bahçenin en etkileyici aksesuarı manolyalar için ışık, toprak, sulama ve mevsim önerileri.",
        "tag": "Tür Rehberi",
        "date": "1 Mart 2026",
        "read_time": "5 dk okuma",
        "hero": "/assets/farm-2.jpg",
        "tags": ["Manolya", "Bakım", "Tür Rehberi"],
        "sections": [
            {"id": "secim", "h2": "1. Doğru Manolya Türünün Seçimi",
             "body": [
                 "Manolya cinsinin yüzlerce türü vardır; bunların yalnızca bir kısmı Türkiye iklimine uygundur. En yaygın kullanılan üç tür ve don tolerans değerleri:"
             ],
             "list": [
                 "<em>Magnolia grandiflora</em> — herdem yeşil, büyük beyaz çiçek; min. ~-15 °C, USDA Z7–10. Akdeniz/Ege/Marmara güneyi için ideal.",
                 "<em>Magnolia × soulangeana</em> — yaprak döken, büyük pembe-mor çiçek; min. ~-25 °C, USDA Z5–9. İç Anadolu için en güvenli seçim.",
                 "<em>Magnolia stellata</em> — yaprak döken, küçük yıldız çiçekli, kompakt form; min. ~-30 °C, USDA Z4–8. Küçük bahçeler ve soğuk bölgeler için."
             ],
             "tip": "Küçük bahçeler için <em>stellata</em>, orta-büyük alanlar için <em>soulangeana</em>, yapısal görkem isteyen ılıman bölge projeleri için ise <em>grandiflora</em> ideal seçimdir. Olgun ağacın çatı çapı 5–8 m'yi bulabilir; dikim noktası buna göre planlanmalıdır."},
            {"id": "dikim", "h2": "2. Dikim ve Lokasyon",
             "body": [
                 "Manolya, kök sistemini geç geliştirir; bu yüzden sıkıştırılmamış, gevşek toprakta dikilmesi önemlidir. Dikim çukuru kök topağının iki katı genişlikte, aynı derinlikte olmalıdır.",
                 "Yarı gölge–tam güneş arasında bir konum tercih edilmeli; sert kuzey rüzgârından korunaklı bir alan, çiçeklerin zarar görmesini engeller."
             ],
             "tip": "Manolyayı kalıcı yerine dikin. Yetişkin ağaç, taşınmaya çok dayanıksızdır ve transplantasyon başarısı oldukça düşüktür."},
            {"id": "sulama-besleme", "h2": "3. Sulama ve Besleme",
             "body": [
                 "Toprağın sürekli nemli ama suyla doymuş olmaması idealdir. Yaz aylarında haftada 1–2 kez derinlemesine sulama, kuru sıcak rüzgârlara karşı koruma sağlar.",
                 "Tür-toprak uyumu nüansını bilmek önemli: <em>Magnolia × soulangeana</em> ve <em>M. stellata</em> hafif asit (pH 5.5–6.5) toprakları tercih eder; <em>M. grandiflora</em> ise nötr–hafif alkali toprakları (pH 6.0–7.5) iyi tolere eder. Yani \"manolya kireçli toprağı sevmez\" genellemesi sadece yaprak döken Asya kökenli türler için geçerlidir.",
                 "Besleme, ilkbahar başında bir kez asit eğilimli organik gübre (örn. çam kabuğu mulch, yaprak küfü, ericaceous gübre) ile yapılmalıdır. pH yükselmişse kükürt tercih edilmeli; alüminyum sülfat hızlı çözüm sunsa da toprakta zamanla birikim yaparak fitotoksisite riski oluşturabilir."
             ],
             "h3": "Yıllık Bakım Takvimi",
             "list": [
                 "Mart: Organik gübre uygulaması",
                 "Nisan–Mayıs: Çiçeklenme dönemi (sulama düzenli olmalı)",
                 "Temmuz–Ağustos: Yaz mulch yenilemesi",
                 "Kasım: Kuru yaprak temizliği"
             ]},
            {"id": "budama", "h2": "4. Budama",
             "body": [
                 "Manolya genel olarak az budama ister. Sadece çapraz duran, hasta ve kuru dallar çıkarılmalıdır. Şekil budaması yapılacaksa, çiçeklenme bitiminin hemen sonrası (haziran) ideal zamandır."
             ]}
        ],
        "plants": [
            {"slug": "manolya", "name": "Manolya", "sub": "Görkemli çiçek · Yapısal", "img": "/assets/products/manolya-1.png"},
            {"slug": "leylak", "name": "Leylak", "sub": "İlkbahar çiçeği · Aromatik", "img": "/assets/products/leylak-1.png"},
            {"slug": "ortanca", "name": "Ortanca", "sub": "Yarı gölge · Mavi-mor", "img": "/assets/products/ortanca-2.png"},
        ]
    },
    {
        "slug": "yazin-sulama",
        "title": "Yazın Sulama: Sıklık mı, Miktar mı?",
        "meta_desc": "Sıcak aylarda yanlış sulama düzeni bitkinin strese girmesine neden olur. Doğru yöntemi adım adım inceliyoruz.",
        "tag": "Bakım",
        "date": "20 Şubat 2026",
        "read_time": "5 dk okuma",
        "hero": "/assets/farm-2.jpg",
        "tags": ["Sulama", "Bakım", "Yaz", "Su Yönetimi"],
        "sections": [
            {"id": "ilkeler", "h2": "1. Doğru Sulamanın Temel İlkeleri",
             "body": [
                 "Yaz sulaması konusundaki en yaygın hata, sık ama yüzeysel sulamadır. Bu yöntem kökleri yüzeyde tutar ve bitkiyi yaz sıcaklarına karşı daha kırılgan hale getirir.",
                 "Doğru yaklaşım: az sıklıkla, derinlemesine sulamaktır. Hedef ıslanma derinliği bitki tipine göre değişir: çiçek ve yer örtücüler için 25–30 cm, çalı için 30–45 cm, ağaçlar için 45–60 cm. Toprak tipine göre infiltrasyon hızı değişir; kumlu topraklarda su hızla iner, killi topraklarda yavaşça."
             ],
             "blockquote": "Bitki kökleri suyu nereye ulaşırsa oraya gider. Yüzeysel sulama, yüzeysel kök sistemi demektir."},
            {"id": "saat", "h2": "2. Hangi Saatte Sulamalı?",
             "body": [
                 "İdeal sulama zamanı sabahın erken saatleri (06:00–09:00) ya da akşamüstü (18:00 sonrası) olarak belirlenmelidir. Bu saatlerde buharlaşma kaybı minimumdadır ve bitki suyu en verimli şekilde kullanır.",
                 "Öğle vakti yapılan sulama, yaprakların güneş altında lekelenmesine yol açabilir; ayrıca büyük oranda buharlaşır."
             ],
             "tip": "Akşam sulamasında yaprakları ıslatmamaya özen gösterin — gece nemli kalan yapraklar mantar hastalıklarına davetiye çıkarır."},
            {"id": "yontemler", "h2": "3. Sulama Yöntemleri",
             "body": [
                 "Hangi yöntemi seçeceğiniz bitkinin türüne, bahçenin büyüklüğüne ve su kaynağınıza göre değişir."
             ],
             "h3": "Yöntem Karşılaştırması",
             "list": [
                 "Damla sulama: en verimli; salma sulamaya kıyasla %30–60 su tasarrufu, yapraktan ıslanmayı engellediği için hastalık baskısını azaltır",
                 "Tava (havuz) sulama: yeni dikilen ağaçlar için ideal — kök topağına yavaş, derin su penetrasyonu sağlar",
                 "Hortum: küçük bahçelerde pratik; tek noktada yığılmadan, alanı tarayarak uygulanmalı",
                 "Spreyleme: sebze ve çiçek tarhları için; öğle sıcağında yapılırsa mantar hastalığı ve buharlaşma riski yüksektir"
             ],
             "tip": "Yağmur suyu hasadı, yaz sulaması maliyetini ve şebeke su tüketimini ciddi şekilde azaltır. 100 m² bir çatıdan tipik bir İzmir kışında ~50.000 L su toplanabilir; basit bir sarnıç + damla sistemi yatırımı 2–3 sezonda kendini amorti eder."},
            {"id": "isaretler", "h2": "4. Bitkinin Sinyallerini Okumak",
             "body": [
                 "Bitki sulanmaya ihtiyaç duyduğunda farklı işaretler verir: yapraklarda solgunlaşma, sarkma, kenarlardan içe doğru kıvrılma. Ancak benzer belirtiler aşırı sulamada da görülür — fark, toprağın nem durumudur.",
                 "Sulamadan önce parmağınızı toprağa 5–7 cm batırın. Eğer bu derinlikte toprak nemli ise sulama gereksizdir."
             ]}
        ],
        "plants": [
            {"slug": "lavanta", "name": "Lavanta", "sub": "Az su · Tam güneş", "img": "/assets/products/lavanta-1.png"},
            {"slug": "kekik", "name": "Kekik", "sub": "Kuraklığa dayanıklı", "img": "/assets/products/kekik-1.png"},
            {"slug": "ortanca", "name": "Ortanca", "sub": "Yüksek su ihtiyacı", "img": "/assets/products/ortanca-2.png"},
        ]
    },
    {
        "slug": "dikey-yesil",
        "title": "Küçük Bahçelerde Dikey Yeşil Kullanımı",
        "meta_desc": "Sınırlı alanda maksimum etki: tırmanıcılar, çitler ve dikey bahçe çözümleri ile bahçenize derinlik kazandırın.",
        "tag": "Peyzaj",
        "date": "10 Şubat 2026",
        "read_time": "4 dk okuma",
        "hero": "/assets/farm-5.jpg",
        "tags": ["Dikey Bahçe", "Peyzaj", "Küçük Alan", "Tırmanıcı"],
        "sections": [
            {"id": "neden", "h2": "1. Neden Dikey Yeşil?",
             "body": [
                 "Küçük bahçelerin ya da terasların en büyük kısıtı yatay alandır. Dikey yeşil kullanımı, bu kısıtı yatay alandan bağımsız büyüyen bir tasarım katmanına çevirir.",
                 "Aynı zamanda dikey yeşil; gizlilik perdesi, gürültü kesici, mikro-iklim düzenleyici ve görsel odak noktası gibi pek çok işlevi tek seferde sağlar."
             ]},
            {"id": "tirmanicilar", "h2": "2. Tırmanıcı Bitki Seçimi",
             "body": [
                 "Tırmanıcılar, doğal yapıları gereği yatay alandan minimum yer kaplar ama yüksek görsel etki yaratır. Türkiye iklimine uygun başlıca tırmanıcılar: yıldız yasemin (<em>Trachelospermum jasminoides</em>), hanımeli (<em>Lonicera</em>), sarmaşık (<em>Hedera helix</em> — yerli) ve begonvil (<em>Bougainvillea</em>).",
                 "Önemli iklim notu: <em>Bougainvillea</em> dona toleranssızdır (USDA Z9b+) ve yalnızca Akdeniz/Ege kıyı kuşağında dış mekânda yaşar. İstanbul'un kuzeyi, İç Anadolu ve Doğu Anadolu'da kışın saksıda korunaklı alana alınmalıdır."
             ],
             "h3": "Konum-Tırmanıcı Eşleşmesi",
             "list": [
                 "Tam güneş + sıcak kıyı: Begonvil, yıldız yasemin",
                 "Yarı gölge: Hedera helix, hanımeli (<em>Lonicera</em>)",
                 "Tam gölge tolere eden: Hedera helix, tırmanıcı ortanca (<em>Hydrangea petiolaris</em>)",
                 "Aromatik istiyorsanız: Yıldız yasemin, hanımeli (özellikle gece kokulu)"
             ],
             "tip": "Tırmanıcılar mutlaka bir desteğe ihtiyaç duyar. Tel kafes, ahşap pergola veya <em>espalier</em> (duvara yatay-dikey bağlanmış meyve ağacı sistemi) önceden planlanmalıdır. <strong>Hedera doğrudan duvara tırmandırılmamalıdır</strong> — yapışkan kökleri sıvayı, derzleri ve boyayı zamanla bozar; mutlaka ayrı bir kafes/tel ile duvardan ~5 cm uzakta yetiştirin."},
            {"id": "modul", "h2": "3. Modüler Dikey Bahçe Sistemleri",
             "body": [
                 "Yer örtücüleri ve küçük bitkileri dikey bir yüzeye uygulamak için modüler dikey bahçe panelleri kullanılabilir. Bu sistemler genellikle keçe-cep yapısı veya plastik modüllerden oluşur.",
                 "Sulama, otomatik damla hatları ile yukarıdan aşağıya yapılır. Modüler sistem, balkon ve teras gibi sınırlı alanlarda en pratik dikey yeşil çözümüdür.",
                 "Profesyonel kurulumda dikkat edilmesi gerekenler: <strong>yapı statik yükü</strong> (ıslak halde 40–80 kg/m²), <strong>duvar nem yalıtımı</strong> (panel arkasında havalandırma boşluğu), <strong>donma riski</strong> (kışın boşaltılan veya ısıtılan damla hatları), düzenli besleme ve modüler bitki yenilemesi."
             ]},
            {"id": "ekoloji", "h2": "4. Ekolojik ve Mikro-İklim Etkisi",
             "body": [
                 "Dikey yeşilin estetiğin ötesinde gerçek faydaları vardır: yaz aylarında bina cephesi sıcaklığını 5–15 °C düşürür, kentsel ısı adası etkisini hafifletir, akustik yalıtım sağlar (3–8 dB azalma) ve PM2.5 partikül emiliminde rol alır.",
                 "Aynı zamanda kentsel polinatörler için kritik bir habitat sunar — özellikle çiçekli tırmanıcı seçildiğinde balkon/teras bahçesi şehir arıları için adacık görevi görür."
             ]},
            {"id": "tasarim", "h2": "5. Tasarım Önerileri",
             "body": [
                 "Dikey yeşili tasarlarken doku, renk ve mevsimsel değişim katmanlı olarak düşünülmelidir. Tek bir türün tekdüze tekrarı, başlangıçta çekici görünse de zamanla dramatik etki kaybeder.",
                 "İdeal kompozisyon: 1–2 yapı oluşturan tırmanıcı + 2–3 farklı doku ve renkte dolgu bitkisi + mevsimsel çiçek aksanı."
             ]}
        ],
        "plants": [
            {"slug": "yildiz-yasemin", "name": "Yıldız Yasemin", "sub": "Aromatik · Tırmanıcı", "img": "/assets/products/yildiz-yasemin-1.png"},
            {"slug": "begonvil", "name": "Begonvil", "sub": "Renkli · Tam güneş", "img": "/assets/products/begonvil-1.png"},
            {"slug": "hedera", "name": "Hedera", "sub": "Gölge · Herdem yeşil", "img": "/assets/products/hedera-1.png"},
        ]
    },
]


# ──────────────────────────── HTML TEMPLATE ────────────────────────────
def render_section(s, idx):
    parts = [f'<h2 id="{s["id"]}">{s["h2"]}</h2>']
    for p in s["body"]:
        parts.append(f'<p>{p}</p>')
    if "blockquote" in s:
        parts.append(f'<blockquote><p>"{s["blockquote"]}"</p></blockquote>')
    if "h3" in s:
        parts.append(f'<h3>{s["h3"]}</h3>')
    if "list" in s:
        items = "".join(f'<li>{li}</li>' for li in s["list"])
        parts.append(f'<ul>{items}</ul>')
    if "tip" in s:
        parts.append(f'''<div class="yp-tip-box">
                    <div class="yp-tip-box__label">Uzman Notu</div>
                    <p>{s["tip"]}</p>
                </div>''')
    return "\n                ".join(parts)


def render_toc(sections):
    items = []
    for i, s in enumerate(sections):
        cls = ' class="is-active"' if i == 0 else ''
        items.append(f'<li><a href="#{s["id"]}"{cls}>{s["h2"]}</a></li>')
    return "\n                        ".join(items)


def render_plants(plants):
    return "\n                    ".join(
        f'''<a class="yp-plant-card" href="/shop?p={p["slug"]}">
                        <img src="{p["img"]}" alt="{p["name"]}">
                        <div class="yp-plant-card__body">
                            <div class="yp-plant-card__name">{p["name"]}</div>
                            <div class="yp-plant-card__sub">{p["sub"]}</div>
                        </div>
                    </a>'''
        for p in plants
    )


def render_tags(tags):
    return "\n                    ".join(f'<span class="yp-tag">{t}</span>' for t in tags)


def render_related(current_slug):
    related = [a for a in ARTICLES if a["slug"] != current_slug][:3]
    items = []
    for a in related:
        items.append(f'''<a class="yp-related-mini" href="/blog/{a["slug"]}">
                        <img src="{a["hero"]}" alt="">
                        <div>
                            <div class="yp-related-mini__title">{a["title"]}</div>
                            <div class="yp-related-mini__date">{a["date"]}</div>
                        </div>
                    </a>''')
    return "\n                    ".join(items)


HEAD_TEMPLATE = '''<!DOCTYPE html>
<html lang="tr">

<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9BWZ83ZHPR"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-9BWZ83ZHPR');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__ | Yakaplant Blog</title>
    <meta name="description" content="__META_DESC__">
    <link rel="canonical" href="https://www.yakaplant.com/blog/__SLUG__" />

    <meta property="og:title" content="__TITLE__ | Yakaplant Blog">
    <meta property="og:description" content="__META_DESC__">
    <meta property="og:image" content="https://www.yakaplant.com__HERO__">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.yakaplant.com/blog/__SLUG__">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">

    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/assets/css/yakaplant-blog.css">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>

<body>

    <nav class="navbar">
        <div class="container nav-container">
            <a href="/" class="logo"><img src="/assets/logo.jpeg" alt="Yakaplant Logo" class="logo-img"><span class="logo-text">Yaka<span class="highlight">plant</span><span class="dot">.</span></span></a>

            <ul class="nav-links" id="nav-links">
                <li><a href="/" class="nav-link" data-i18n="nav.home">Ana Sayfa</a></li>
                <li><a href="/about" class="nav-link" data-i18n="nav.about">Hakkımızda</a></li>
                <li><a href="/care" class="nav-link" data-i18n="nav.care">Bakım Rehberi</a></li>
                <li><a href="/shop" class="nav-link" data-i18n="nav.shop">Koleksiyon</a></li>
                <li><a href="/blog" class="nav-link active" data-i18n="nav.blog">Blog</a></li>
                <li><a href="/contact" class="nav-link button-primary" data-i18n="nav.contact">İletişim</a></li>
                <!-- Auth container (populated by auth.js) -->
                <li id="nav-auth-container">
                    <a href="/login" class="nav-link auth-link" data-i18n="nav.login">
                        <i class="ph ph-sign-in"></i> Giriş Yap
                    </a>
                </li>
            </ul>

            <div class="nav-actions">
                <div class="lang-selector">
                    <button class="lang-toggle" id="lang-toggle">
                        <i class="ph ph-globe"></i>
                        <span id="current-lang">TR</span>
                    </button>
                    <div class="lang-dropdown" id="lang-dropdown">
                        <button class="lang-option" data-lang="tr">TR Türkçe</button>
                        <button class="lang-option" data-lang="en">EN English</button>
                        <button class="lang-option" data-lang="de">DE Deutsch</button>
                        <button class="lang-option" data-lang="nl">NL Nederlands</button>
                    </div>
                </div>
                <button class="theme-toggle" id="theme-toggle" aria-label="Karanlık Mod" data-i18n-aria="nav.darkMode">
                    <i class="ph ph-moon"></i>
                </button>
                <button class="mobile-toggle" aria-label="Menüyü Aç" id="mobile-toggle" data-i18n-aria="nav.openMenu">
                    <i class="ph ph-list"></i>
                </button>
            </div>
        </div>
    </nav>
    <div style="margin-top: 80px;"></div>

    <div class="yp-blog">

    <div class="yp-breadcrumb">
        <a href="/">Ana Sayfa</a>
        <span class="yp-breadcrumb__sep">›</span>
        <a href="/blog">Blog</a>
        <span class="yp-breadcrumb__sep">›</span>
        __TITLE__
    </div>

    <div class="yp-hero">
        <img src="__HERO__" alt="__TITLE__">
        <div class="yp-hero__overlay"></div>
    </div>

    <div class="yp-container">

        <header class="yp-article-header">
            <span class="yp-article-tag">__TAG__</span>
            <h1 class="yp-article-title">__TITLE__</h1>
            <div class="yp-article-meta">
                <span>Yakaplant Ekibi</span>
                <div class="yp-article-meta__sep"></div>
                <span>__DATE__</span>
                <div class="yp-article-meta__sep"></div>
                <span>__READ__</span>
            </div>
        </header>

        <div class="yp-content-grid">

            <article class="yp-article-body" id="article">
                __SECTIONS__

                <h3>İlgili Türler</h3>
                <div class="yp-plant-grid">
                    __PLANTS__
                </div>

                <div class="yp-article-tags">
                    __TAGS__
                </div>
            </article>

            <aside class="yp-sidebar">
                <div class="yp-sidebar-section">
                    <div class="yp-sidebar-title">İçindekiler</div>
                    <ul class="yp-toc-list">
                        __TOC__
                    </ul>
                </div>

                <div class="yp-sidebar-section">
                    <div class="yp-sidebar-title">Benzer Yazılar</div>
                    __RELATED__
                </div>

                <div class="yp-sidebar-cta">
                    <h4>Projeniz için bitki önerisi alın.</h4>
                    <p>Uzman ekibimiz ihtiyacınıza uygun türleri belirler.</p>
                    <a href="/contact">İletişime Geç</a>
                </div>
            </aside>
        </div>
    </div>

    </div><!-- /.yp-blog -->

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="/" class="logo">Yaka<span class="highlight">plant</span><span class="dot">.</span></a>
                    <p data-i18n="footer.rights">© 2026 Tüm hakları saklıdır.</p>
                </div>
                <div class="social-links">
                    <a href="https://www.instagram.com/yakaplant" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>
                    <a href="https://wa.me/905318433309" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="ph ph-whatsapp-logo"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="/js/supabase.js"></script>
    <script src="/js/ui.js"></script>
    <script src="/js/auth.js"></script>
    <script src="/js/translations.js"></script>
    <script src="/js/lang.js"></script>
    <script src="/script.js"></script>

    <script>
        const headings = document.querySelectorAll('#article h2[id]');
        const tocLinks = document.querySelectorAll('.yp-toc-list a');
        if (headings.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        tocLinks.forEach(a => a.classList.remove('is-active'));
                        const active = document.querySelector(`.yp-toc-list a[href="#${entry.target.id}"]`);
                        if (active) active.classList.add('is-active');
                    }
                });
            }, { rootMargin: '-20% 0px -70% 0px' });
            headings.forEach(h => observer.observe(h));
        }
    </script>
</body>
</html>
'''


def generate(article):
    sections_html = "\n\n                ".join(render_section(s, i) for i, s in enumerate(article["sections"]))
    html = HEAD_TEMPLATE
    html = html.replace("__TITLE__", article["title"])
    html = html.replace("__META_DESC__", article["meta_desc"])
    html = html.replace("__SLUG__", article["slug"])
    html = html.replace("__HERO__", article["hero"])
    html = html.replace("__TAG__", article["tag"])
    html = html.replace("__DATE__", article["date"])
    html = html.replace("__READ__", article["read_time"])
    html = html.replace("__SECTIONS__", sections_html)
    html = html.replace("__PLANTS__", render_plants(article["plants"]))
    html = html.replace("__TAGS__", render_tags(article["tags"]))
    html = html.replace("__TOC__", render_toc(article["sections"]))
    html = html.replace("__RELATED__", render_related(article["slug"]))
    return html


def main():
    out_dir = ROOT / "blog"
    out_dir.mkdir(exist_ok=True)
    for art in ARTICLES:
        path = out_dir / f"{art['slug']}.html"
        path.write_text(generate(art), encoding="utf-8")
        print(f"Generated: blog/{art['slug']}.html")


if __name__ == "__main__":
    main()
