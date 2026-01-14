const plantCatalog = [
    // --- TREES (Ağaçlar) ---
    {
        id: 'zeytin',
        category: 'agac',
        title: 'Zeytin Ağacı',
        scientific: 'Olea europaea',
        desc: `<p><strong>Akdeniz'in Ölümsüz Ağacı</strong><br>
        Zeytin ağacı, binlerce yıldır barışın, bereketin ve sağlığın simgesi olmuştur. Gümüşi yeşil yaprakları, kıvrımlı ve karakterli gövdesiyle peyzaj tasarımlarına sofistike ve rustik bir hava katar. Soliter (tek başına) kullanıldığında bahçenin odak noktası haline gelir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Modern ve minimalist bahçelerde saksı bitkisi olarak, giriş yollarında veya geniş çim alanlarda vurgu bitkisi olarak mükemmeldir. Kuraklığa ve tuza dayanıklı olduğu için deniz kenarı bahçeleri için de idealdir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Zeytin ağacı güneşi çok sever. Toprağın iyi drene olması hayati önem taşır; köklerinde su birikmesinden hoşlanmaz. Genç fidanlar düzenli sulama isterken, yetişkin ağaçlar kuraklığa son derece toleranslıdır. Budama ile kolayca şekillendirilebilir ve bonsai uygulamaları için de uygundur.</p>`,
        env: 'Tam güneş.',
        water: 'Az (Kurudukça)',
        price: 'Bize Ulaşın',
        image: 'assets/products/zeytin-1.png',
        difficulty: 'Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '15-40°C'
    },
    {
        id: 'manolya',
        category: 'agac',
        title: 'Manolya',
        scientific: 'Magnolia grandiflora',
        desc: `<p><strong>Asaletin Simgesi</strong><br>
        Manolya, devasa, kremsi beyaz çiçekleri ve parlak, deri gibi koyu yeşil yapraklarıyla bilinen en gösterişli süs ağaçlarından biridir. Çiçekleri, özellikle yaz aylarında çevreye enfes, limonumsu bir koku yayar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geniş bahçelerde gölge ağacı olarak veya bina girişlerinde prestijli bir karşılama elemanı olarak kullanılır. Her dem yeşil yapısı sayesinde kışın da bahçenize renk ve doku kazandırır. Yapraklarının alt yüzeyi genellikle pas rengi tüylerle kaplıdır, bu da ona ekstra bir dekoratif özellik katar.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Manolya, besin maddelerince zengin, hafif asidik ve nemli toprakları sever. Kireçli topraklarda yaprak sararması görülebilir. Rüzgardan korunaklı, güneşli veya yarı gölge alanlarda en iyi gelişimini gösterir. Kök sistemi hassastır, bu nedenle dikimden sonra yerinin değiştirilmesi önerilmez.</p>`,
        env: 'Güneş veya yarı gölge.',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/manolya-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-30°C'
    },
    {
        id: 'oya',
        category: 'agac',
        title: 'Oya Ağacı',
        scientific: 'Lagerstroemia indica',
        desc: `<p><strong>Yazın En Renkli Hali</strong><br>
        Oya ağacı, yazın en sıcak günlerinde bile pes etmeyip açan canlı pembe, mor, kırmızı veya beyaz çiçek salkımlarıyla tanınır. "Isparta Gülü" olarak da bilinen bu ağaç, sadece çiçekleriyle değil, pürüzsüz, benekli gövdesiyle de kışın bile dekoratif bir görünüm sunar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Küçük bahçeler, yol kenarları veya veranda köşeleri için mükemmel bir seçimdir. Çok gövdeli çalı formunda veya tek gövdeli küçük ağaç formunda yetiştirilebilir. Şehir kirliliğine karşı oldukça dayanıklıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Tam güneş, bol çiçeklenmenin anahtarıdır. Gölgede kalırsa çiçek verimi düşer ve külleme hastalığına açık hale gelebilir. Kuraklığa dayanıklıdır ancak yazın düzenli sulandığında daha canlı olur. Kış sonunda yapılacak sert budama, yeni sürgünlerin ve dolayısıyla daha çok çiçeğin oluşmasını teşvik eder.</p>`,
        env: 'Tam güneş.',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/oya-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '5-35°C'
    },
    {
        id: 'erguvan',
        category: 'agac',
        title: 'Erguvan',
        scientific: 'Cercis siliquastrum',
        desc: `<p><strong>İstanbul'un Rengi</strong><br>
        Baharın müjdecisi olan Erguvan, yapraklanmadan önce dallarını saran binlerce mor-pembe çiçeğiyle büyüleyici bir görsel şölen sunar. Kalp şeklindeki yaprakları, çiçekler döküldükten sonra ortaya çıkar ve sonbaharda sarıya dönerek mevsimsel bir renk geçişi sağlar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Doğal görünümlü bahçeler, koruluklar veya tek başına vurgu bitkisi olarak idealdir. Tarihi ve kültürel değeriyle de peyzaj tasarımına derinlik katar. Havadaki azotu toprağa bağlama özelliği sayesinde toprağı iyileştirir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Erguvan, kireçli topraklara toleranslıdır ve fazla bakım istemez. Güneşli veya yarı gölge alanlarda yetişebilir. Ancak, genç fidanların ilk yıllarda düzenli sulanması gerekir. Kökleri hassas olduğu için yer değiştirilmekten hoşlanmaz. Budama ihtiyacı azdır, sadece kurumuş dalların temizlenmesi yeterlidir.</p>`,
        env: 'Güneşli veya yarı gölge.',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/erguvan-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-30°C'
    },
    {
        id: 'ihlamur',
        category: 'agac',
        title: 'Ihlamur',
        scientific: 'Tilia tomentosa',
        desc: `<p><strong>Huzurun Kokusu</strong><br>
        Yaz başında açan sarı çiçekleriyle çevresine baygın ve rahatlatıcı bir koku yayan, kalp şeklinde yapraklara sahip ulu bir ağaçtır. Gövdesi ve taç yapısıyla bahçelere görkemli bir hava katar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geniş caddeler, parklar ve büyük bahçeler için mükemmel bir gölge ağacıdır. Hava kirliliğine karşı oldukça dayanıklıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Derin, serin ve besince zengin toprakları sever. Işık isteği yüksektir ancak yarı gölgeye de tolere eder.</p>`,
        env: 'Güneşli / Yarı gölge',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/ihlamur-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '5-30°C'
    },
    {
        id: 'cinar',
        category: 'agac',
        title: 'Çınar Ağacı',
        scientific: 'Platanus orientalis',
        desc: `<p><strong>Tarihin Tanığı</strong><br>
        Yüzyıllara meydan okuyan ömrü ve devasa boyutlarıyla bilinen, parçalı yaprakları ve benekli gövdesiyle karakteristik bir ağaçtır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Çok geniş alanlarda, meydanlarda ve su kenarlarında kullanım için uygundur. Hızlı büyür ve geniş bir gölge alanı oluşturur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Suyu çok sever, kökleri suya ulaşmak için uzar. Kireçli topraklarda da yetişebilir.</p>`,
        env: 'Tam güneş',
        water: 'Bol',
        price: 'Bize Ulaşın',
        image: 'assets/products/cinar-1.png',
        difficulty: 'Kolay',
        humidity: 'Yüksek',
        petFriendly: true,
        temp: '5-35°C'
    },
    {
        id: 'sus-kirazi',
        category: 'agac',
        title: 'Süs Kirazı',
        scientific: 'Prunus serrulata',
        desc: `<p><strong>Baharın Estetiği</strong><br>
        Japon kirazı olarak da bilinir. Bahar aylarında yapraklanmadan önce açan yoğun pembe çiçekleriyle büyüleyici bir güzellik sunar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Vurgu bitkisi olarak, girişlerde veya yürüyüş yollarında kullanılır. Zen bahçeleri için idealdir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        İyi drene edilmiş, nemli toprakları sever. Budama gerektirmez, doğal formu çok estetiktir.</p>`,
        env: 'Tam güneş',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/sus-kirazi-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-25°C'
    },
    {
        id: 'akcaagac',
        category: 'agac',
        title: 'Akçaağaç',
        scientific: 'Acer platanoides',
        desc: `<p><strong>Sonbahar Ressamı</strong><br>
        Sonbaharda sarı, turuncu ve kırmızıya dönen yapraklarıyla mevsim geçişlerini görsel bir şölene dönüştürür.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Yol ağacı veya geniş çim alanlarda soliter olarak kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Serin iklimleri sever. Toprak nemi önemlidir.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/akcaagac-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '0-30°C'
    },
    {
        id: 'mimoza',
        category: 'agac',
        title: 'Mimoza',
        scientific: 'Acacia dealbata',
        desc: `<p><strong>Kış Güneşi</strong><br>
        Kış sonunda açan sapsarı, top top çiçekleriyle gri kış günlerine neşe katar. Gümüşi yaprakları yıl boyu dekoratiftir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Sıcak iklimlerde, rüzgardan korunaklı köşelerde kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Kireçsiz, asidik toprakları sever. Soğuğa karşı hassastır.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/mimoza-1.png',
        difficulty: 'Orta',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '10-35°C'
    },
    {
        id: 'limon-servi',
        category: 'agac',
        title: 'Limon Servi',
        scientific: 'Cupressus macrocarpa',
        desc: `<p><strong>Altın Dokunuş</strong><br>
        Dokunulduğunda limon kokusu yayan, parlak sarı-yeşil iğne yapraklarıyla dikkat çeken piramit formlu bir ağaççıktır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Çit bitkisi olarak, saksılarda veya girişlerde simetrik olarak kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Rüzgara karşı hassastır. Düzenli sulama renginin canlı kalmasını sağlar.</p>`,
        env: 'Güneş',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/limon-servi-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-30°C'
    },
    {
        id: 'mavi-ladin',
        category: 'agac',
        title: 'Mavi Ladin',
        scientific: 'Picea pungens',
        desc: `<p><strong>Gümüşi Zarafet</strong><br>
        Mavi-gri iğne yaprakları ve simetrik piramidal yapısıyla en sevilen ibreli ağaçlardandır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geniş bahçelerde odak noktası olarak kullanılır. Soğuk iklimlere çok uygundur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Nemi sever ama su birikimine gelemez. Asidik toprakları tercih eder.</p>`,
        env: 'Tam güneş',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/mavi-ladin-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '-10-25°C'
    },
    {
        id: 'defne',
        category: 'agac',
        title: 'Defne Ağacı',
        scientific: 'Laurus nobilis',
        desc: `<p><strong>Mitolojik Miras</strong><br>
        Her dem yeşil, aromatik kokulu yapraklarıyla bilinen, Akdeniz ikliminin simge bitkisidir. Yaprakları mutfakta baharat olarak kullanılır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Çit yapımında, budanarak şekil vermede (topiary) veya doğal formunda kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Budamaya çok dayanıklıdır. Kuraklığa toleranslıdır.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/defne-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-35°C'
    },
    {
        id: 'palmiye',
        category: 'agac',
        title: 'Palmiye',
        scientific: 'Phoenix canariensis',
        desc: `<p><strong>Tropikal Esinti</strong><br>
        Geniş ve tüysü yapraklarıyla bahçelere egzotik ve heybetli bir görünüm kazandırır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geniş caddelerde, havuz kenarlarında veya parklarda sıra halinde kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Sıcağı ve güneşi sever. Kırmızı palmiye böceğine karşı ilaçlama gerekebilir.</p>`,
        env: 'Tam güneş',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/palmiye-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: false,
        temp: '10-40°C'
    },
    {
        id: 'jakaranda',
        category: 'agac',
        title: 'Jakaranda',
        scientific: 'Jacaranda mimosifolia',
        desc: `<p><strong>Mor Rüya</strong><br>
        İlkbahar sonu ve yaz başında açan boru şeklindeki mor-mavi çiçekleriyle büyüleyicidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Ege ve Akdeniz sahil şeridinde yol ağacı olarak harika durur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Don olaylarına karşı hassastır. Genç fidanlar kışın korunmalıdır.</p>`,
        env: 'Tam güneş',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/jakaranda-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '15-35°C'
    },
    {
        id: 'sigla',
        category: 'agac',
        title: 'Sığla Ağacı',
        scientific: 'Liquidambar orientalis',
        desc: `<p><strong>Anadolu'nun Hazinesi</strong><br>
        Endemik bir tür olan Sığla, hoş kokusu ve sonbaharda kızıla çalan yapraklarıyla değerlidir. Gövdesinden elde edilen yağ kozmetikte kullanılır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Sulak alanlar ve parklar için uygundur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Bol su ister, kuraklığa gelemez.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Bol',
        price: 'Bize Ulaşın',
        image: 'assets/products/sigla-1.png',
        difficulty: 'Orta',
        humidity: 'Yüksek',
        petFriendly: true,
        temp: '10-30°C'
    },
    {
        id: 'at-kestanesi',
        category: 'agac',
        title: 'At Kestanesi',
        scientific: 'Aesculus hippocastanum',
        desc: `<p><strong>Gölgenin Efendisi</strong><br>
        Geniş, parmaklı yaprakları ve ilkbaharda dik salkımlar halinde açan beyaz-pembe çiçekleriyle çok gösterişlidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geniş parklar ve caddeler için ideal gölge ağacıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Derin ve nemli toprakları sever.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/at-kestanesi-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-30°C'
    },
    {
        id: 'hus',
        category: 'agac',
        title: 'Huş Ağacı',
        scientific: 'Betula pendula',
        desc: `<p><strong>Beyaz Gövde</strong><br>
        Soyulan beyaz kabuğu ve zarif, sarkan dallarıyla peyzajda grafik bir etki yaratır. Sonbaharda yaprakları altına döner.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Grup halinde dikildiğinde etkisi artar. Modern bahçeler için uygundur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Serin ve nemli yerleri sever. Sıcak ve kurak iklimlerden hoşlanmaz.</p>`,
        env: 'Tam güneş',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/hus-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '-5-25°C'
    },

    // --- SHRUBS (Çalılar) ---
    {
        id: 'alev-calisi',
        category: 'cali',
        title: 'Alev Çalısı',
        scientific: 'Photinia fraseri',
        desc: `<p><strong>Bahçenin Ateşi</strong><br>
        Adını, yeni sürgünlerinin parlak, alev kırmızısı renginden alan bu bitki, bahçelere dinamik bir enerji katar. Yapraklar olgunlaştıkça koyu yeşile döner, bu da bitki üzerinde sürekli bir renk oyunu yaratır. İlkbaharda açan beyaz çiçekleri de ayrı bir güzellik katar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        En popüler çit bitkilerinden biridir. Yoğun yapısı sayesinde mükemmel bir gizlilik perdesi oluşturur. Ayrıca budamaya çok dayanıklı olduğu için topiary (şekilli budama) uygulamalarında veya sınır belirleyici olarak da sıkça kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Hızlı büyüyen bir türdür, bu nedenle formunu korumak ve yeni kırmızı sürgünleri teşvik etmek için yılda birkaç kez budama yapılması önerilir. Güneşli alanlarda yaprak rengi daha canlı olur. Toprak seçiciliği yoktur, hemen hemen her tür toprakta yetişebilir.</p>`,
        env: 'Güneş veya yarı gölge.',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/alev-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-30°C'
    },
    {
        id: 'kartopu',
        category: 'cali',
        title: 'Kartopu',
        scientific: 'Viburnum opulus',
        desc: `<p><strong>Beyazın Zarafeti</strong><br>
        Kartopu çalısı, adından da anlaşılacağı gibi, kar topuna benzeyen büyük, yuvarlak, beyaz çiçek kümeleriyle ünlüdür. İlkbaharda çiçeklenir, yazın yeşil yapraklarıyla arka fon oluşturur ve sonbaharda yaprakları kızararak görsel bir şölen sunar. Kışın ise kırmızı meyveleri dallarda kalır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geleneksel ve kır bahçeleri için vazgeçilmezdir. Gruplar halinde veya tek başına kullanılabilir. Kuşları bahçeye çeken meyveleriyle ekolojik bir katkı da sağlar.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Serin ve nemli ortamları sever. Yarı gölge alanlarda da gayet iyi gelişir. Düzenli sulama, özellikle çiçeklenme döneminde önemlidir. Çiçeklenme bittikten sonra hafif bir budama yapılabilir. Yaprak bitlerine karşı zaman zaman kontrol edilmesi önerilir.</p>`,
        env: 'Yarı gölge.',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/kartopu-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '5-25°C'
    },
    {
        id: 'ortanca',
        category: 'cali',
        title: 'Ortanca',
        scientific: 'Hydrangea macrophylla',
        desc: `<p><strong>Renk Cümbüşü</strong><br>
        Toprak pH'ına göre pembe veya maviye dönüşebilen devasa çiçek topları vardır. Yaz bahçelerin vazgeçilmezidir. Büyük yaprakları ile de dolgun bir görünüm sağlar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Gölge ve yarı gölge alanlar, bina kuzey cepheleri için idealdir. Ağaç altlarında renkli öbekler oluşturmak için kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Bol su sever, susuzluğa hiç gelemez. Sabah güneşi alıp öğleden sonra gölgede olması idealdir. Asidik toprakta mavi, bazik toprakta pembe açar.</p>`,
        env: 'Yarı gölge',
        water: 'Bol',
        price: 'Bize Ulaşın',
        image: 'assets/products/ortanca-1.png',
        difficulty: 'Orta',
        humidity: 'Yüksek',
        petFriendly: false,
        temp: '10-25°C'
    },
    {
        id: 'lavanta',
        category: 'cali',
        title: 'Lavanta',
        scientific: 'Lavandula angustifolia',
        desc: `<p><strong>Mor Terapi</strong><br>
        Gümüşi yaprakları ve mor başaklarıyla hem göze hem buruna hitap eder. Sakinleştirici kokusuyla bilinir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Kenar bitkisi, koku bahçesi veya alçak çit olarak kullanılır. Kelebekleri ve arıları bahçeye çeker.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Kuraklığa çok dayanıklıdır. Aşırı sulamadan kaçınılmalıdır. Çiçeklenme sonrası budama formu korur.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/lavanta-1.png',
        difficulty: 'Kolay',
        humidity: 'Düşük',
        petFriendly: false,
        temp: '15-35°C'
    },
    {
        id: 'biberiye',
        category: 'cali',
        title: 'Biberiye',
        scientific: 'Rosmarinus officinalis',
        desc: `<p><strong>Mutfaktan Bahçeye</strong><br>
        İğne yapraklı, aromatik ve her dem yeşil bir çalıdır. Mavi minik çiçekler açar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Kaya bahçeleri, şevler ve mutfak bahçeleri için uygundur. Budanarak şekil verilebilir. Deniz kenarı bahçelerinde başarılıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşi sever, susuzluğa dayanıklıdır. Drenajı iyi toprak şarttır.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/biberiye-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '5-35°C'
    },
    {
        id: 'simsir',
        category: 'cali',
        title: 'Şimşir',
        scientific: 'Buxus sempervirens',
        desc: `<p><strong>Klasik Yeşil</strong><br>
        Küçük, parlak yeşil yaprakları ve budamaya yatkınlığıyla bilinir. Şekil verdikçe güzelleşir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Topiary (şekilli budama) sanatı ve alçak çitler için bir numaralı tercihtir. Formel bahçelerin yapı taşıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Yarı gölgeyi sever. Düzenli budama ister. Şimşir güvesine dikkat edilmelidir.</p>`,
        env: 'Yarı gölge',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/simsir-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-30°C'
    },
    {
        id: 'zakkum',
        category: 'cali',
        title: 'Zakkum',
        scientific: 'Nerium oleander',
        desc: `<p><strong>Sahil Güzeli</strong><br>
        Uzun, mızrak gibi yaprakları ve yaz boyu açan pembe, beyaz veya kırmızı çiçekleriyle bilinir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Otoyol kenarları, parklar ve sahil bahçelerinde rüzgar ve güneşe karşı dayanıklılığı için seçilir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Çok dayanıklıdır, bakım istemez. <strong style="color:var(--accent-color);">Dikkat: Zehirlidir.</strong> Yenmesi durumunda tehlikelidir.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/zakkum-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '15-40°C'
    },
    {
        id: 'taflan',
        category: 'cali',
        title: 'Taflan',
        scientific: 'Euonymus japonicus',
        desc: `<p><strong>Altın ve Yeşil</strong><br>
        Parlak, kösele gibi yaprakları genellikle sarı-yeşil alacalıdır. Her dem yeşildir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Çit bitkisi olarak çok yaygındır. Hava kirliliğine ve tuza dayanıklıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Gölgeye dayanıklıdır. Budama ile kolayca kontrol altında tutulur. Küllemeye karşı hassas olabilir.</p>`,
        env: 'Güneş / Gölge',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/taflan-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-30°C'
    },
    {
        id: 'abelya',
        category: 'cali',
        title: 'Abelya',
        scientific: 'Abelia grandiflora',
        desc: `<p><strong>Zarif Çiçekler</strong><br>
        Küçük, parlak yaprakları ve yazdan sonbahara kadar açan beyaz-pembe çan şeklindeki çiçekleriyle çok zariftir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Grup halinde veya kelebekleri çekmek için kullanılır. Yarı her dem yeşildir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşli yerlerde daha bol çiçek açar. Budama gençleştirir.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/abelya-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-30°C'
    },
    {
        id: 'yasemin',
        category: 'cali',
        title: 'Yasemin',
        scientific: 'Jasminum officinale',
        desc: `<p><strong>Büyüleyici Koku</strong><br>
        Yıldız şeklindeki beyaz çiçekleri akşamları yoğun bir koku yayar. Tırmanıcı özelliktedir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Çardakları, duvarları ve giriş kapılarını sarmak için kullanılır. Romantik bahçeler için idealdir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Desteklenmesi gerekir. Düzenli budama çiçeği artırır. Kışın koruma isteyebilir.</p>`,
        env: 'Güneş',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/yasemin-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '15-30°C'
    },
    {
        id: 'gul',
        category: 'cali',
        title: 'Gül',
        scientific: 'Rosa',
        desc: `<p><strong>Bahçelerin Kraliçesi</strong><br>
        Yüzyıllardır sevginin ve güzelliğin sembolüdür. Sayısız renk ve koku çeşidi vardır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Gül bahçeleri, saksılar, çitler. Her yere yakışır. Peyzaj gülleri daha az bakım ister.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşi sever. Hastalıklardan (külleme) korumak için havadar yerlere dikilmeli ve düzenli budanmalıdır. Gübrelemeyi sever.</p>`,
        env: 'Tam güneş',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/gul-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: false,
        temp: '10-30°C'
    },
    {
        id: 'ates-dikeni',
        category: 'cali',
        title: 'Ateş Dikeni',
        scientific: 'Pyracantha coccinea',
        desc: `<p><strong>Kışın Enerjisi</strong><br>
        Dikenli yapısı ve sonbahar-kış aylarında dalları kaplayan turuncu-kırmızı meyveleriyle dikkat çeker. Her dem yeşildir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Geçilmez güvenlik çitleri oluşturmak için idealdir. Kuşlar için iyi bir besin kaynağıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Budamaya dayanıklıdır. Kuraklığa toleranslıdır. Meyveleri için budama zamanlamasına dikkat edilmeli.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/ates-dikeni-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-30°C'
    },
    {
        id: 'hanagaci',
        category: 'cali',
        title: 'Hanağacı',
        scientific: 'Hibiscus syriacus',
        desc: `<p><strong>Egzotik Dokunuş</strong><br>
        Gül hatmi olarak da bilinir. Yazın açan büyük, trompet şeklindeki çiçekleriyle tropikal bir hava verir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Soliter çalı veya çit bitkisi olarak kullanılır. Geç yapraklanır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşi ve sıcağı sever. Kuraklığa dayanıklıdır.</p>`,
        env: 'Tam güneş',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/hanagaci-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '15-35°C'
    },
    {
        id: 'begonvil',
        category: 'cali',
        title: 'Begonvil',
        scientific: 'Bougainvillea',
        desc: `<p><strong>Akdeniz'in Gelini</strong><br>
        Kağıt inceliğindeki canlı renkli çiçek苞leri (aslında yaprakları) ile duvarları, balkonları örter. Bodrum ve Antalya ile özdeşleşmiştir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Tırmanıcı olarak çatı, duvar ve çardaklarda kullanılır. Saksıda da yetiştirilebilir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Bol güneş ve sıcaklık şarttır. Soğuğa dayanamaz, dondan korunmalı. Suyu kısıldıkça çiçeklenir.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/begonvil-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: false,
        temp: '20-40°C'
    },
    {
        id: 'mahonya',
        category: 'cali',
        title: 'Mahonya',
        scientific: 'Mahonia aquifolium',
        desc: `<p><strong>Sarı Kış Güneşi</strong><br>
        Dikenli, her dem yeşil yaprakları ve kışın açan sarı çiçek salkımlarıyla bilinir. Yaprakları soğukta kızarabilir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Gölge alanlarda, ağaç altlarında güvenlik ve estetik amaçlı kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Gölgeyi sever, kireçli topraklara dayanıklıdır. Fazla bakım istemez.</p>`,
        env: 'Gölge / Yarı gölge',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/mahonya-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-25°C'
    },
    {
        id: 'bodur-defne',
        category: 'cali',
        title: 'Bodur Defne',
        scientific: 'Viburnum tinus',
        desc: `<p><strong>Kış Çiçeği</strong><br>
        Koyu yeşil yaprakları ve kış aylarında açan beyaz çiçekleriyle bahçeyi kışın da canlı tutar. Sonrasında siyah meyveler verir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Çit bitkisi ve dolgu malzemesi olarak çok kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Her türlü toprağa uyum sağlar. Budamaya elverişlidir. Gölgeli alanlarda da gelişir.</p>`,
        env: 'Güneş / Gölge',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/bodur-defne-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '5-25°C'
    },
    {
        id: 'altin-canak',
        category: 'cali',
        title: 'Altın Çanak',
        scientific: 'Forsythia',
        desc: `<p><strong>Baharın Habercisi</strong><br>
        Yapraklanmadan önce dalları saran parlak sarı çiçekleriyle baharı müjdeler.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Vurgu bitkisi veya çit olarak kullanılır. Gri kış günlerinden sonra ilk renk cümbüşünü sağlar.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Çiçeklenme bittikten hemen sonra budanmalıdır, aksi takdirde bir sonraki yılın çiçekleri azalır.</p>`,
        env: 'Güneş',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/altin-canak-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-25°C'
    },
    {
        id: 'leylak',
        category: 'cali',
        title: 'Leylak',
        scientific: 'Syringa vulgaris',
        desc: `<p><strong>Nostaljik Koku</strong><br>
        Kalp şeklindeki yaprakları ve mor/beyaz çiçek salkımlarının eşsiz kokusuyla bahçelerin vazgeçilmezidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Soliter veya grup halinde kullanılır. Kesme çiçek için de uygundur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Serin iklimleri ve kireçli toprakları sever. Budama gençleştirir.</p>`,
        env: 'Güneş',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/leylak-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '5-25°C'
    },
    {
        id: 'pitos',
        category: 'cali',
        title: 'Pitos',
        scientific: 'Pittosporum tobira',
        desc: `<p><strong>Sahil Bahçelerinin Yıldızı</strong><br>
        Parlak, etli yaprakları ve portakal çiçeğini andıran kokulu beyaz çiçekleri vardır. Toplu halde büyümeye yatkındır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Deniz etkisine dayanıklıdır, çit ve rüzgar kesici olarak kullanılır. Bodur cinsleri yer örtücü olabilir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Kuraklığa çok dayanıklıdır. Budama ile kolayca şekil alır.</p>`,
        env: 'Güneş / Yarı gölge',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/pitos-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-35°C'
    },
    {
        id: 'ardic',
        category: 'cali',
        title: 'Ardıç',
        scientific: 'Juniperus',
        desc: `<p><strong>Doğal Doku</strong><br>
        İğne yapraklı, her dem yeşil, yayılıcı veya dik formlu çeşitleri olan dayanıklı bir bitkidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Erozyon kontrolü, yer örtücü veya vurgu bitkisi olarak kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Hemen hemen hiç bakım istemez. Kuraklığa tam dayanıklıdır.</p>`,
        env: 'Tam güneş',
        water: 'Çok az',
        price: 'Bize Ulaşın',
        image: 'assets/products/ardic-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '-10-35°C'
    },

    // --- GROUND COVERS (Yer Örtücüler) ---
    {
        id: 'cezayir-meneksesi',
        category: 'yer',
        title: 'Cezayir Menekşesi',
        scientific: 'Vinca minor',
        desc: `<p><strong>Gölgenin Hakimi</strong><br>
        Cezayir Menekşesi, gölgede kalan, zorlu alanları yeşillendirmek için en iyi seçeneklerden biridir. Parlak, koyu yeşil yaprakları yere yakın uzanır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Ağaç altları, eğimli araziler veya çimin yetişmediği gölge alanlar için mükemmel bir yer örtücüdür. Erozyonu önlemeye yardımcı olur.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Bir kez yerleştiğinde bakımı kolaydır. Kuraklığa ve gölgeye dayanıklıdır.</p>`,
        env: 'Gölge, yarı gölge.',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/cezayir-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '5-25°C'
    },
    {
        id: 'buz-cicegi',
        category: 'yer',
        title: 'Buz Çiçeği',
        scientific: 'Aptenia cordifolia',
        desc: `<p><strong>Kuraklığa Meydan Okuyan Güzellik</strong><br>
        Etli, kalp şeklindeki parlak yeşil yaprakları ve minik pembe-kırmızı çiçekleriyle tanınan sukulent türü bir bitkidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Kaya bahçeleri, duvar üstleri, kurak alanlar ve deniz kenarları için idealdir. Hızla yayılarak toprağı örter.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Aşırı sulamadan kaçınılmalıdır, kök çürümesine yol açabilir.</p>`,
        env: 'Tam güneş.',
        water: 'Çok az',
        price: 'Bize Ulaşın',
        image: 'assets/products/buz-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '15-40°C'
    },
    {
        id: 'acem-halisi',
        category: 'yer',
        title: 'Acem Halısı',
        scientific: 'Drosanthemum',
        desc: `<p><strong>Pembe Halı</strong><br>
        İlkbaharda açtığında yaprakları görünmeyecek kadar yoğun, fosforlu pembe çiçeklerle kaplanan sukulent bir bitkidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Şevler, taş duvarlar ve kurak alanları örtmek için birebirdir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşi sever. Kış soğuklarına karşı hassastır.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/acem-halisi-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: true,
        temp: '-5-30°C'
    },
    {
        id: 'gazanya',
        category: 'yer',
        title: 'Gazanya',
        scientific: 'Gazania rigens',
        desc: `<p><strong>Güneş Aşığı</strong><br>
        Büyük, papatya benzeri, canlı sarı ve turuncu renkli çiçeklerini sadece güneşli havalarda açar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Bordürler, kaya bahçeleri ve saksılar için renkli bir seçimdir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Kuraklığa ve tuza dayanıklıdır. Güneşsiz yerde çiçek açar.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/gazanya-1.png',
        difficulty: 'Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '10-35°C'
    },
    {
        id: 'kedi-tirnagi',
        category: 'yer',
        title: 'Kedi Tırnağı',
        scientific: 'Carpobrotus edulis',
        desc: `<p><strong>Kumulların Koruyucusu</strong><br>
        Kalın, etli, üçgen kesitli yaprakları ve büyük sarı/pembe çiçekleri olan çok hızlı yayılan bir bitkidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Özellikle deniz kenarında kumu tutmak ve erozyonu önlemek için kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Hiç bakım istemez, en zorlu kıyı koşullarında yetişir.</p>`,
        env: 'Tam güneş',
        water: 'Çok az',
        price: 'Bize Ulaşın',
        image: 'assets/products/kedi-tirnagi-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Normal',
        petFriendly: true,
        temp: '10-35°C'
    },
    {
        id: 'kekik',
        category: 'yer',
        title: 'Kekik',
        scientific: 'Thymus',
        desc: `<p><strong>Kokulu Halı</strong><br>
        Üzerine basıldığında nefis bir koku yayan, minik yapraklı ve çiçekli bir yer örtücüdür.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Taş araları, yürüyüş yolları ve kaya bahçeleri için idealdir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Kuru ve fakir toprakları sever. Drenaj iyi olmalıdır.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/kekik-1.png',
        difficulty: 'Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '5-30°C'
    },
    {
        id: 'fare-kulagi',
        category: 'yer',
        title: 'Fare Kulağı',
        scientific: 'Dichondra repens',
        desc: `<p><strong>Yeşil Kadife</strong><br>
        Böbrek şeklindeki minik yapraklarıyla zemini sıkıca örten, biçilmesi gerekmeyen çim alternatifidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Gölge alanlarda, taş aralarında çim yerine kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Nemi sever. Üzerine çok basılmaya gelmez.</p>`,
        env: 'Gölge / Yarı gölge',
        water: 'Düzenli',
        price: 'Bize Ulaşın',
        image: 'assets/products/fare-kulagi-1.png',
        difficulty: 'Orta',
        humidity: 'Yüksek',
        petFriendly: true,
        temp: '10-25°C'
    },
    {
        id: 'sedum',
        category: 'yer',
        title: 'Dam Koruğu',
        scientific: 'Sedum',
        desc: `<p><strong>Çatı Bahçesi Bitkisi</strong><br>
        Etli yaprakları suyu depolar, bu sayede susuzluğa çok dayanıklıdır. Farklı renk ve dokularda türleri vardır.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Kaya bahçeleri, yeşil çatılar ve saksılar için mükemmeldir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşi sever, fazla sudan çürür.</p>`,
        env: 'Güneş',
        water: 'Çok az',
        price: 'Bize Ulaşın',
        image: 'assets/products/sedum-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '-5-30°C'
    },
    {
        id: 'hedera',
        category: 'yer',
        title: 'Sarmaşık (Hedera)',
        scientific: 'Hedera helix',
        desc: `<p><strong>Her Yer Yeşil</strong><br>
        Hem tırmanıcı hem de yer örtücü olabilen, çok dayanıklı ve hızlı yayılan bir bitkidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Duvarları kaplamak veya geniş gölge alanlarda zemin örtmek için kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Gölgeye çok dayanıklıdır. Kontrol altında tutulmazsa istilacı olabilir.</p>`,
        env: 'Gölge / Yarı gölge',
        water: 'Orta',
        price: 'Bize Ulaşın',
        image: 'assets/products/hedera-1.png',
        difficulty: 'Kolay',
        humidity: 'Normal',
        petFriendly: false,
        temp: '0-25°C'
    },
    {
        id: 'lippia',
        category: 'yer',
        title: 'Lippia',
        scientific: 'Lippia nodiflora',
        desc: `<p><strong>Çam Alternatifi</strong><br>
        Kuraklığa dayanıklı, basılmaya elverişli, minik çiçekli bir yer örtücüdür. Güçlü kök yapısıyla toprağı tutar.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Köpekli bahçeler ve az su isteyen yeşil alanlar için çim yerine ekilir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşi sever. Kışın toprak üstü kuruyabilir, baharda yeşerir.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/lippia-1.png',
        difficulty: 'Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '5-35°C'
    },
    {
        id: 'arap-saci',
        category: 'yer',
        title: 'Arap Saçı',
        scientific: 'Soleirolia soleirolii',
        desc: `<p><strong>Bebek Gözyaşı</strong><br>
        Çok minik, narin yapraklarıyla yosun benzeri yumuşak bir doku oluşturur.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Nemli gölge alanlarda, teraryumlarda ve kaya diplerinde kullanılır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Sürekli nem ister, kurumasına izin verilmemelidir. Güneşten korunmalıdır.</p>`,
        env: 'Tam gölge',
        water: 'Bol',
        price: 'Bize Ulaşın',
        image: 'assets/products/arap-saci-1.png',
        difficulty: 'Orta',
        humidity: 'Yüksek',
        petFriendly: true,
        temp: '15-25°C'
    },
    {
        id: 'mavi-cim',
        category: 'yer',
        title: 'Mavi Çim',
        scientific: 'Festuca glauca',
        desc: `<p><strong>Mavi Kirpi</strong><br>
        Mavi-gri renkli, iğne yapraklı, yumak formunda büyüyen dekoratif bir saz bitkisidir.</p>
        <p><strong>Peyzajda Kullanımı:</strong><br>
        Kaya bahçelerinde renk kontrastı yaratmak için grup halinde dikilir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Güneşli ve kuru yerleri sever. Gölgede yeşile döner.</p>`,
        env: 'Tam güneş',
        water: 'Az',
        price: 'Bize Ulaşın',
        image: 'assets/products/mavi-cim-1.png',
        difficulty: 'Kolay',
        humidity: 'Düşük',
        petFriendly: true,
        temp: '5-30°C'
    },
    {
        id: 'monstera',
        category: 'salon',
        title: 'Deve Tabanı',
        scientific: 'Monstera Deliciosa',
        desc: `<p><strong>Tropikal Devin Dönüşü</strong><br>Evlerde tropikal bir orman havası yaratmak isteyenlerin ilk tercihi. İkonik delikli yapraklarıyla her mekana karakter katar.</p><p>Devetabanı tırmanıcı bir bitkidir, bu nedenle yosunlu bir destek çubuğu ile büyütülmesi yapraklarının daha da büyümesini sağlar. Havadaki nemi sever, yapraklarına su püskürtülmesinden hoşlanır.</p>`,
        env: 'Aydınlık',
        water: 'Haftada bir',
        price: '450 ₺',
        image: 'assets/products/monstera-1.png',
        difficulty: 'Kolay',
        humidity: 'Yüksek',
        petFriendly: false,
        temp: '18-24°C'
    },
    {
        id: 'sansevieria',
        category: 'salon',
        title: 'Paşa Kılıcı',
        scientific: 'Sansevieria',
        desc: `<p><strong>Yatak Odası Dostu</strong><br>
        Gece oksijen üreten ender bitkilerdendir. Şehirli ve yoğun insanlar için mükemmeldir çünkü ihmal edilmeye çok dayanıklıdır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Az ışıkta da yaşayabilir ama aydınlıkta daha hızlı büyür. Çok az su ister.</p>`,
        env: 'Yarı gölge',
        water: 'Ayda iki',
        price: '350 ₺',
        image: 'assets/products/sansevieria-1.png',
        difficulty: 'Çok Kolay',
        humidity: 'Düşük',
        petFriendly: false,
        temp: '15-30°C'
    },
    {
        id: 'ficus',
        category: 'salon',
        title: 'Kauçuk Ağacı',
        scientific: 'Ficus elastica',
        desc: `<p><strong>Parlak Yapraklar</strong><br>
        Kalın, parlak ve koyu yeşil büyük yapraklarıyla güçlü bir duruş sergiler. Havadaki toksinleri temizleme özelliği vardır.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Yapraklarının tozunu nemli bezle silmek gerekir.</p>`,
        env: 'Aydınlık',
        water: 'Haftada bir',
        price: '550 ₺',
        image: 'assets/products/ficus-1.png',
        difficulty: 'Orta',
        humidity: 'Normal',
        petFriendly: false,
        temp: '18-25°C'
    },
    {
        id: 'spathiphyllum',
        category: 'salon',
        title: 'Barış Çiçeği',
        scientific: 'Spathiphyllum',
        desc: `<p><strong>Zarif ve Huzurlu</strong><br>
        Zarif beyaz çiçekleri ve koyu yeşil yapraklarıyla bilinen, bakımı kolay ve en popüler salon bitkilerindendir.</p>
        <p><strong>Bakım İpuçları:</strong><br>
        Susadığında yapraklarını büker, su verince hemen toparlar.</p>`,
        env: 'Yarı gölge',
        water: 'Haftada iki',
        price: '300 ₺',
        image: 'assets/products/spathiphyllum-1.png',
        difficulty: 'Kolay',
        humidity: 'Yüksek',
        petFriendly: false,
        temp: '18-24°C'
    }
];
