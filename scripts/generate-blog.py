#!/usr/bin/env python3
"""Generate Yakaplant blog article pages from a content data structure."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# ──────────────────────────── ARTICLE CONTENT ────────────────────────────
ARTICLES = [
    {
        "slug": "zeytin-bakimi",
        "title": "Zeytin Ağacı Bakımı: Toprak, Sulama ve Budama",
        "meta_desc": "Yüzlerce yıl yaşayan zeytin ağacının ilk yıllarında nelere dikkat etmeli? Toprak, sulama, budama ve hasat üzerine kapsamlı rehber.",
        "tag": "Tür Rehberi",
        "date": "15 Mart 2026",
        "read_time": "8 dk okuma",
        "hero": "/assets/farm-1.jpg",
        "tags": ["Zeytin", "Bakım", "Tür Rehberi", "Ege"],
        "sections": [
            {"id": "toprak", "h2": "1. Toprak ve Lokasyon",
             "body": [
                 "Zeytin, kalkerli ve drenajı iyi topraklarda en sağlıklı şekilde gelişir. Killi ve durgun sulu topraklar kök çürümesine yol açar; bu nedenle dikim öncesi toprağın drenaj kapasitesi mutlaka değerlendirilmelidir.",
                 "İdeal pH aralığı 6.5–8.0'dır. Hafif alkali eğilimli topraklar zeytin için en uygunudur. Dikim çukuruna iri çakıl ve organik gübre karıştırılması, hem havalanmayı hem de besin değerini artırır."
             ],
             "h3": "Konum Seçimi",
             "list": [
                 "Tam güneş alan, rüzgârdan korunmuş bir alan",
                 "Don ceplerinin oluşmadığı, hafif eğimli arazi",
                 "Yapı veya duvar dibinden en az 4–5 m mesafe"
             ]},
            {"id": "sulama", "h2": "2. Sulama Düzeni",
             "body": [
                 "Zeytin kuraklığa son derece dayanıklıdır; ancak ilk üç yılda kök sisteminin sağlam tutunması için düzenli sulama gerekir. Bu dönemde sulama sıklığı yaklaşık olarak haftada bir, derinlemesine ve yavaş yavaş olmalıdır.",
                 "Olgun ağaçlarda sulama büyük ölçüde yağışla karşılanabilir. Özellikle çiçeklenme ve meyve tutumu döneminde (mayıs–haziran) ek sulama, verimi belirgin şekilde artırır."
             ],
             "tip": "Damla sulama, su tasarrufu sağlamasının yanı sıra hastalıkların bulaşma riskini de azaltır. Yapraktan sulama yerine dip sulama tercih edilmelidir."},
            {"id": "budama", "h2": "3. Budama Tekniği",
             "body": [
                 "Zeytin ağacının formu, hem verimliliği hem de uzun vadeli sağlığını doğrudan etkiler. Açık vazo formu (ortası açık, 3–4 ana dal) hava akışını ve ışık girişini en üst düzeye çıkarır.",
                 "Budama, ağaç henüz uyanmadan, kış sonu (şubat–mart) yapılmalıdır. Çapraz duran, içe dönük ve obur dallar düzenli olarak temizlenmelidir."
             ],
             "h3": "Yıllık Budama Takvimi",
             "list": [
                 "Şubat–Mart: Ana yapısal budama (kuru, hasta, çakışan dallar)",
                 "Haziran: Hafif yaz temizliği (filiz alma)",
                 "Hasat sonrası: Yaralı dallarda kontrol budaması"
             ]},
            {"id": "hasat", "h2": "4. Hasat ve Sonrası",
             "body": [
                 "Sofralık zeytin için hasat ekim–kasım, yağlık zeytin için kasım–aralık dönemidir. El ile veya küçük tarakla yapılan hasat, dalı yaralamadan toplama imkânı sağlar; mekanik silkeleyiciler büyük bahçeler için pratiktir.",
                 "Hasattan sonra ağacın dinlenme dönemine girmesi önemlidir. Bu dönemde aşırı sulama veya gübreleme yapılmamalı; yalnızca kuru dallar uzaklaştırılmalıdır."
             ]}
        ],
        "plants": [
            {"slug": "zeytin", "name": "Zeytin", "sub": "Herdem yeşil · Kuraklığa dayanıklı", "img": "/assets/products/zeytin-1.png"},
            {"slug": "limon-servi", "name": "Limon Servi", "sub": "Aromatik · Akdeniz iklimi", "img": "/assets/products/limon-servi-1.png"},
            {"slug": "defne", "name": "Defne", "sub": "Aromatik · Akdeniz tipi", "img": "/assets/products/defne-1.png"},
        ]
    },
    {
        "slug": "mediteran-bahce",
        "title": "Mediteran Bahçe Tasarımında Bitki Paleti",
        "meta_desc": "Zeytin, defne, biberiye, lavanta — Ege esintisini bahçenize taşıyan mediteran bitki kombinasyonları ve tasarım ilkeleri.",
        "tag": "Peyzaj & Tasarım",
        "date": "5 Mart 2026",
        "read_time": "6 dk okuma",
        "hero": "/assets/farm-5.jpg",
        "tags": ["Mediteran", "Peyzaj", "Tasarım", "Akdeniz"],
        "sections": [
            {"id": "felsefe", "h2": "1. Mediteran Tasarım Felsefesi",
             "body": [
                 "Mediteran bahçe, az suyla yaşamaya alışmış bitkilerin doğal bir aradalığını esas alır. Burada temel ilke yapay değil, doğal görünmektir: simetri yerine ritim, mükemmellik yerine karakter.",
                 "Bitki seçiminde toprak rengi (beyaz çakıl, açık taş), gri-yeşil yaprak tonları ve aromatik bitkilerin baskınlığı belirleyicidir."
             ],
             "blockquote": "Akdeniz bahçesi sade görünür ama her bitkinin yıllık bir takvimi vardır."},
            {"id": "yapi-bitkileri", "h2": "2. Yapı Oluşturan Bitkiler",
             "body": [
                 "Bahçenin omurgasını oluşturan herdem yeşil türler, yıl boyu sahnede kalır. Bu grubun en yaygın temsilcileri: zeytin, defne, mersin ve kıbrıs serpanı."
             ],
             "h3": "Önerilen Yapı Bitkileri",
             "list": [
                 "Zeytin (Olea europaea) — heykelimsi formu ve uzun ömrü ile bahçenin merkezi",
                 "Defne (Laurus nobilis) — sık dokulu yaprakları gizlilik perdesi sağlar",
                 "Mersin (Myrtus communis) — yaz çiçeği ve aromatik yaprakları",
                 "Limon servi (Cupressus macrocarpa) — dikey aksent için"
             ]},
            {"id": "aromatikler", "h2": "3. Aromatik ve Çiçekli Bitkiler",
             "body": [
                 "Bahçeye koku, renk ve mevsimsel değişim katan aromatikler, yapı bitkilerinin önünde dolgu görevi görür. Lavanta ve biberiye ikilisi neredeyse her mediteran kompozisyonun değişmezidir.",
                 "Bunlara kekik, adaçayı, oregano ve İspanyol lavantası gibi türler eklenerek koku katmanları zenginleştirilebilir."
             ],
             "tip": "Lavantayı yarı gölge yerine tam güneş alan, kuru bir noktaya dikin. Aşırı sulama, lavantanın en sık ölüm sebebidir."},
            {"id": "yer-ortucu", "h2": "4. Yer Örtücüler ve Taş Düzenlemeleri",
             "body": [
                 "Mediteran tasarımın imza unsurlarından biri, açık renkli çakıl ve doğal taş kullanımıdır. Bu yüzeyler hem ısı yönetimi sağlar hem de bitkilerin formunu öne çıkaran bir kanvas oluşturur.",
                 "Yer örtücü olarak fare kulağı, gazanya ve cezayir menekşesi tercih edilebilir."
             ]}
        ],
        "plants": [
            {"slug": "lavanta", "name": "Lavanta", "sub": "Aromatik · Yaz çiçeği", "img": "/assets/products/lavanta-1.png"},
            {"slug": "biberiye", "name": "Biberiye", "sub": "Aromatik · Herdem yeşil", "img": "/assets/products/biberiye-1.png"},
            {"slug": "zeytin", "name": "Zeytin", "sub": "Heykelimsi form · Uzun ömür", "img": "/assets/products/zeytin-1.png"},
        ]
    },
    {
        "slug": "ilkbahar-2026",
        "title": "2026 İlkbahar Koleksiyonundan Öne Çıkanlar",
        "meta_desc": "Bu sezon Yakaplant koleksiyonuna eklenen yeni türler ve mevsimin öne çıkan formları üzerine bir derleme.",
        "tag": "Koleksiyon",
        "date": "22 Mart 2026",
        "read_time": "4 dk okuma",
        "hero": "/assets/farm-4.jpg",
        "tags": ["Koleksiyon", "Yenilikler", "İlkbahar 2026"],
        "sections": [
            {"id": "agaclar", "h2": "Bu Sezon Öne Çıkan Ağaçlar",
             "body": [
                 "İlkbahar 2026 koleksiyonunda akçaağaç ve süs kirazı çeşitliliğini önemli ölçüde genişlettik. Özellikle Acer palmatum çeşitlerinin sonbahar renkleri, koleksiyonumuza dramatik bir mevsim geçişi katıyor.",
                 "Yine bu sezon ihlamur ve sığla ağacı stoklarımız tazelendi; yapısal peyzaj projeleri için 10–15 yaş arası, formu olgunlaşmış örnekler mevcut."
             ]},
            {"id": "calilar", "h2": "Çalı ve Çiçekli Türler",
             "body": [
                 "Çalı kategorisinde ortanca, leylak ve kartopu gibi klasiklerin yanına yeni renk varyasyonları eklendi. Mavi ve mor tonlardaki ortanca çeşitleri, yarı gölge bahçeler için ideal seçenekler sunuyor."
             ],
             "h3": "Sezonun Yıldız Türleri",
             "list": [
                 "Acer palmatum 'Bloodgood' — koyu kırmızı yaprakları ile mevsim aksenti",
                 "Hydrangea 'Endless Summer' — yaz boyu çiçeklenen ortanca",
                 "Syringa vulgaris — geleneksel leylak, mor-beyaz çeşitleri ile",
                 "Viburnum opulus — yaz çiçeği, sonbahar meyveleri"
             ],
             "tip": "Çiçekli türlerde tedarik süresi mevsimine göre değişebilir. Toplu siparişler için en az 2–3 hafta öncesinden iletişim önerilir."},
            {"id": "ic-mekan", "h2": "İç Mekân Bitkileri",
             "body": [
                 "Modern yaşam alanları için tasarlanan iç mekân koleksiyonumuz; monstera, sansevieria ve ficus türlerinde yeni boy seçenekleri sunuyor. Özellikle 1.5–2 m boylarındaki ficus elastica örnekleri, ofis ve lobi projeleri için oldukça popüler."
             ]}
        ],
        "plants": [
            {"slug": "akcaagac", "name": "Akçaağaç", "sub": "Sonbahar rengi · Orta boy", "img": "/assets/products/akcaagac-1.png"},
            {"slug": "ortanca", "name": "Ortanca", "sub": "Çiçekli · Yarı gölge", "img": "/assets/products/ortanca-2.png"},
            {"slug": "monstera", "name": "Monstera", "sub": "İç mekân · Dramatik yaprak", "img": "/assets/products/monstera-1.png"},
        ]
    },
    {
        "slug": "yerli-turler",
        "title": "Yerli Türlerle Ekolojik Bahçe Tasarımı",
        "meta_desc": "Az su, az bakım, çok karakter. Yerli flora ile sürdürülebilir bahçe tasarımı üzerine pratik bir rehber.",
        "tag": "Sürdürülebilirlik",
        "date": "10 Mart 2026",
        "read_time": "6 dk okuma",
        "hero": "/assets/farm-1.jpg",
        "tags": ["Sürdürülebilirlik", "Yerli Türler", "Ekolojik Bahçe"],
        "sections": [
            {"id": "neden-yerli", "h2": "1. Neden Yerli Türler?",
             "body": [
                 "Yerli türler, bulundukları iklime ve toprak yapısına binlerce yıllık adaptasyon sürecinde uyum sağlamış bitkilerdir. Bu adaptasyon, bahçenizde dramatik biçimde daha az su, daha az gübre ve daha az müdahale anlamına gelir.",
                 "Aynı zamanda yerel arıların, kuşların ve faydalı böceklerin habitatına katkı sağlarlar; yani sadece estetik değil, ekolojik bir karar verirsiniz."
             ],
             "blockquote": "Bir bahçeyi sürdürülebilir kılan, kullandığınız bitkilerin doğayla olan ilişkisidir."},
            {"id": "anadolu-bitkileri", "h2": "2. Anadolu'nun Önerilen Bitkileri",
             "body": [
                 "Türkiye, dünyanın en yüksek bitki çeşitliliğine sahip bölgelerinden biridir. Bahçenizde kullanabileceğiniz onlarca yerli tür bulunur."
             ],
             "h3": "Çalı ve Yer Örtücüler",
             "list": [
                 "Defne (Laurus nobilis) — herdem yeşil, aromatik",
                 "Mersin (Myrtus communis) — yaz çiçeği, gizlilik perdesi",
                 "Süpürge çalısı (Calluna vulgaris) — kuraklığa dayanıklı yer örtücü",
                 "Adaçayı (Salvia officinalis) — aromatik, polen kaynağı"
             ]},
            {"id": "tasarim-prensipleri", "h2": "3. Tasarım Prensipleri",
             "body": [
                 "Ekolojik bahçenin temel ilkesi, doğal habitat yapısını taklit etmektir. Tek tip dikim yerine bitki katmanları (yüksek ağaçlar → çalılar → yer örtücüler → otsu bitkiler) bir arada düşünülmelidir.",
                 "Bu yaklaşım hem suyu daha verimli kullanır hem de yabani otların kendiliğinden bastırılmasını sağlar."
             ],
             "tip": "Bahçenizin %60'ını yerli türlerden oluşturmak, sulama ve bakım yükünüzü yarıdan fazla azaltabilir."},
            {"id": "bakim", "h2": "4. Düşük Bakım Düzeni",
             "body": [
                 "Yerli türler kuruldukları ilk iki yıl dışında neredeyse müdahalesiz yaşar. Bu dönemden sonra düzenli sulama, gübreleme ve sık budama ihtiyaçları minimuma iner.",
                 "Yıllık olarak yapılması gereken bakım: kış sonu temizlik budaması, ilkbahar başında organik kompost dağıtımı ve gerekirse mulch yenilemesi."
             ]}
        ],
        "plants": [
            {"slug": "defne", "name": "Defne", "sub": "Yerli tür · Herdem yeşil", "img": "/assets/products/defne-1.png"},
            {"slug": "kekik", "name": "Kekik", "sub": "Aromatik · Kuraklığa dayanıklı", "img": "/assets/products/kekik-1.png"},
            {"slug": "lavanta", "name": "Lavanta", "sub": "Polen kaynağı · Az su", "img": "/assets/products/lavanta-1.png"},
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
                 "Manolya cinsinin yüzlerce türü vardır; bunların yalnızca bir kısmı Türkiye iklimine uygundur. En yaygın kullanılan üç türün özellikleri: Magnolia grandiflora (herdem yeşil, beyaz çiçek), Magnolia × soulangeana (yaprak döken, pembe çiçek) ve Magnolia stellata (yaprak döken, küçük formlu).",
                 "Küçük bahçeler için stellata, orta-büyük alanlar için soulangeana, yapısal bir vurgu için ise grandiflora ideal seçimdir."
             ]},
            {"id": "dikim", "h2": "2. Dikim ve Lokasyon",
             "body": [
                 "Manolya, kök sistemini geç geliştirir; bu yüzden sıkıştırılmamış, gevşek toprakta dikilmesi önemlidir. Dikim çukuru kök topağının iki katı genişlikte, aynı derinlikte olmalıdır.",
                 "Yarı gölge–tam güneş arasında bir konum tercih edilmeli; sert kuzey rüzgârından korunaklı bir alan, çiçeklerin zarar görmesini engeller."
             ],
             "tip": "Manolyayı kalıcı yerine dikin. Yetişkin ağaç, taşınmaya çok dayanıksızdır ve transplantasyon başarısı oldukça düşüktür."},
            {"id": "sulama-besleme", "h2": "3. Sulama ve Besleme",
             "body": [
                 "Toprağın sürekli nemli ama suyla doymuş olmaması idealdir. Yaz aylarında haftada 1–2 kez derinlemesine sulama, kuru sıcak rüzgârlara karşı koruma sağlar.",
                 "Besleme, ilkbahar başında bir kez asit eğilimli organik gübre ile yapılmalıdır. Manolya kireçli toprakları sevmez; gerekirse alüminyum sülfat veya kükürt ile pH düşürülmelidir."
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
                 "Doğru yaklaşım: az sıklıkla, derinlemesine sulamaktır. Bir sulamada toprağa 25–30 cm derinliğe ulaşacak miktarda su verilmelidir."
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
                 "Damla sulama: en verimli, su tasarrufu %50'ye kadar",
                 "Tava (havuz) sulama: yeni dikilen ağaçlar için ideal",
                 "Hortum: küçük bahçelerde pratik, dikkat gerektirir",
                 "Spreyleme: sebze ve çiçek tarhları için, yapraklara dikkat"
             ]},
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
                 "Tırmanıcılar, doğal yapıları gereği yatay alandan minimum yer kaplar ama yüksek görsel etki yaratır. Türkiye iklimine uygun başlıca tırmanıcılar: yaseminler, hanımeli, sarmaşıklar ve begonvil."
             ],
             "h3": "Konum-Tırmanıcı Eşleşmesi",
             "list": [
                 "Tam güneş + sıcak: Begonvil, yıldız yasemin",
                 "Yarı gölge: Hedera, hanımeli",
                 "Gölge tolere eden: Hedera helix, akzambağı sarmaşığı",
                 "Aromatik istiyorsanız: Yıldız yasemin, hanımeli"
             ],
             "tip": "Tırmanıcılar mutlaka bir desteğe ihtiyaç duyar. Tel kafes, ahşap pergola veya espalier sistemi önceden planlanmalıdır."},
            {"id": "modul", "h2": "3. Modüler Dikey Bahçe Sistemleri",
             "body": [
                 "Yer örtücüleri ve küçük bitkileri dikey bir yüzeye uygulamak için modüler dikey bahçe panelleri kullanılabilir. Bu sistemler genellikle keçe-cep yapısı veya plastik modüllerden oluşur.",
                 "Sulama, otomatik damla hatları ile yukarıdan aşağıya yapılır. Modüler sistem, balkon ve teras gibi sınırlı alanlarda en pratik dikey yeşil çözümüdür."
             ]},
            {"id": "tasarim", "h2": "4. Tasarım Önerileri",
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
