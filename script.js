// DOM Elements
const mobileToggle = document.getElementById('mobile-toggle');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.getElementById('nav-links');
const contactForm = document.getElementById('contactForm');
const header = document.querySelector('.navbar');

// Theme Toggle
const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    // Update Icon - Using innerHTML to ensure we re-render the icon correctly if libraries mess with it
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
    }

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Check preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Toggle Mobile Menu

// Toggle Mobile Menu
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon between list and x
        const icon = mobileToggle.querySelector('i');
        if (!icon) return;
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu when a link is clicked (scope to the menu)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.classList.replace('ph-x', 'ph-list');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Form Submission (Mock)
// Form Submission (Mock)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Simple validation feedback (Visual)
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="ph ph-check"></i> Gönderildi!';
        btn.style.backgroundColor = '#40916c';

        alert(`Teşekkürler ${name}! Mesajınız alındı. En kısa sürede ${email} adresinden dönüş yapacağız.`);

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 3000);
    });
}

// Reveal Animations on Scroll logic is consolidated below in "Modern Homepage Animations" section

// Product Image Slider Logic
document.querySelectorAll('.slider-container').forEach(container => {
    const wrapper = container.querySelector('.slider-wrapper');
    const slides = container.querySelectorAll('.slide');
    const btnPrev = container.querySelector('.slider-btn.prev');
    const btnNext = container.querySelector('.slider-btn.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Function to update slide position
    const updateSlide = () => {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Next Button Click
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering other card clicks if any
        currentIndex = (currentIndex + 1) % totalSlides; // Loop to start
        updateSlide();
    });

    // Prev Button Click
    btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop to end
        updateSlide();
    });
});

// Plant Catalog is now loaded from plant_data.js
// We expect plantCatalog to be available globally.

// Map for lookup
// Map for lookup
const plantData = (typeof plantCatalog !== 'undefined') ? plantCatalog.reduce((acc, plant) => {
    acc[plant.id] = plant;
    return acc;
}, {}) : {};

// ... Render functions ...

// Modal Elements (Update this part via search/replace in next tool call or assume this replaces the top block)
// Actually I need to make sure the openModal function is updated. 
// Since I can't see the openModal function in this replacement block (it's further down), I need to use a separate replacement or include it here if I am replacing the whole file. 
// I will replace the data structure block first, then do a targeted replace for openModal.

// WAIT. The replacement content above replaces the definition of plantCatalog, but I also need to update openModal. 
// I will stick to replacing the array definition here. Then a second call for openModal.



// Create a lookup object for Modals (compatibility with existing openModal code)
// Already defined above at line 326, removing duplicate here.


// --- RENDER SHOP FUNCTION ---
const renderShop = async (filter = 'all', options = {}) => {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const withCardEntrance = Boolean(options.withCardEntrance);
    const query = (options.query || '').trim();

    const normalizeStringSimple = (str) => {
        return String(str || '')
            .toLocaleLowerCase('tr-TR')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "");
    };

    const stripHtmlSimple = (html) => {
        return String(html || '')
            .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
            .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
            .replace(/<\/?[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    let filtered = filter === 'all'
        ? plantCatalog
        : plantCatalog.filter(p => p.category === filter);

    if (query) {
        const q = normalizeStringSimple(query);
        filtered = filtered.filter(p => {
            const hay = normalizeStringSimple([
                p.title,
                p.scientific,
                p.category,
                p.env,
                p.water,
                p.difficulty,
                stripHtmlSimple(p.desc)
            ].join(' '));
            return hay.includes(q);
        });
    }

    // Fetch user favorites if logged in
    let favorites = new Set();
    const user = typeof YakaAuth !== 'undefined' ? YakaAuth.getUser() : null;
    if (user) {
        try {
            const data = await YakaAPI.favorites.getAll();
            if (data.favorites) {
                data.favorites.forEach(f => favorites.add(f.product_id));
            }
        } catch (err) {
            console.error('Failed to fetch favorites', err);
        }
    }

    const nextCardsFragment = document.createDocumentFragment();

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'product-card';
        empty.style.gridColumn = '1 / -1';
        empty.innerHTML = `
            <div class="product-info" style="text-align:center; padding: 2.25rem 1.5rem;">
                <h3 style="margin-bottom: 0.35rem;">Sonuç bulunamadı</h3>
                <p class="scientific-name" style="margin-bottom: 1.1rem;">Farklı bir arama veya kategori deneyin.</p>
                <a href="/shop" class="btn btn-outline">Aramayı Temizle</a>
            </div>
        `;
        nextCardsFragment.appendChild(empty);
        grid.replaceChildren(nextCardsFragment);
        return;
    }

    filtered.forEach((plant, index) => {
        const isFav = favorites.has(plant.id);
        const quoteMessage = `Merhaba, ${plant.title} (${plant.scientific}) bitkisi hakkında fiyat bilgisi almak istiyorum.`;
        const quoteUrl = `https://wa.me/905318433309?text=${encodeURIComponent(quoteMessage)}`;
        const card = document.createElement('div');
        card.className = 'product-card';
        if (withCardEntrance) {
            card.classList.add('shop-card-enter');
            card.style.setProperty('--shop-card-delay', `${Math.min(index * 45, 360)}ms`);
        }
        card.innerHTML = `
            <div class="product-image">
                <img src="${plant.image}" alt="${plant.title}" loading="${index < 4 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index < 2 ? 'high' : 'auto'}">
                <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${plant.id}" onclick="toggleFavorite(event, '${plant.id}')">
                    <i class="${isFav ? 'ph-fill ph-heart' : 'ph ph-heart'}" style="${isFav ? 'color: #2d6a4f;' : ''}"></i>
                </button>
                <div class="add-btn-container">
                    <button class="add-btn"><i class="ph ph-plus"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${plant.title}</h3>
                <p class="scientific-name">${plant.scientific}</p>
                <a href="/contact" class="btn-order">Sipariş İçin İletişime Geç <i class="ph ph-whatsapp-logo"></i></a>
                <a href="${quoteUrl}" class="btn-quote" target="_blank" rel="noopener">Teklif İste <i class="ph ph-whatsapp-logo"></i></a>
            </div>
        `;

        // Add click listener (delegating to existing openModal logic)
        // Click on image opens modal
        card.querySelector('.product-image img').addEventListener('click', (e) => {
            // Ensure we are not clicking a button on top
            openModal(plant.id);
        });

        // Add click listener for add button (Quick view)
        card.querySelector('.add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(plant.id);
        });

        nextCardsFragment.appendChild(card);
    });

    // Swap content only after the next state is fully prepared to avoid blank flashes.
    grid.replaceChildren(nextCardsFragment);

};

// Global Favorite Toggle Function
window.toggleFavorite = async (event, productId) => {
    event.stopPropagation(); // Don't trigger modal

    // Check auth
    if (typeof YakaAuth === 'undefined' || !YakaAuth.isLoggedIn()) {
        if (typeof YakaUI !== 'undefined') {
            YakaUI.toast.info('Favorilere eklemek için giriş yapmalısınız');
        } else {
            alert('Favorilere eklemek için giriş yapmalısınız');
        }
        return;
    }

    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    const wasActive = btn.classList.contains('active');

    // Optimistic UI update
    btn.classList.toggle('active');

    // Update icon class and style immediately
    if (!wasActive) {
        icon.className = 'ph-fill ph-heart';
        icon.style.color = '#2d6a4f';
    } else {
        icon.className = 'ph ph-heart';
        icon.style.color = '';
    }

    try {
        if (!wasActive) {
            // Add
            await YakaAPI.favorites.add(productId);
            if (typeof YakaUI !== 'undefined') YakaUI.toast.success('Favorilere eklendi');
        } else {
            // Remove
            await YakaAPI.favorites.remove(productId);
            if (typeof YakaUI !== 'undefined') YakaUI.toast.success('Favorilerden çıkarıldı');
        }
    } catch (err) {
        console.error('Favorite toggle failed', err);
        // Revert UI on error
        btn.classList.toggle('active');
        if (!wasActive) {
            icon.className = 'ph ph-heart';
            icon.style.color = '';
        } else {
            icon.className = 'ph-fill ph-heart';
            icon.style.color = '#2d6a4f';
        }
        if (typeof YakaUI !== 'undefined') YakaUI.toast.error('İşlem başarısız');
    }
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const shopFilterButtons = document.querySelectorAll('.shop-filters .filter-btn');
const shopGrid = document.getElementById('product-grid');
let currentShopFilter = document.querySelector('.shop-filters .filter-btn.active')?.getAttribute('data-category') || 'all';
let currentShopQuery = '';
let isShopFilterTransitioning = false;

if (shopFilterButtons.length > 0) {
    shopFilterButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const nextFilter = btn.getAttribute('data-category');
            if (!nextFilter || nextFilter === currentShopFilter || isShopFilterTransitioning) return;

            isShopFilterTransitioning = true;
            shopFilterButtons.forEach(b => b.disabled = true);

            shopFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (shopGrid) {
                shopGrid.classList.add('shop-grid-transition-out');
                await wait(130);
            }

            await renderShop(nextFilter, { withCardEntrance: true, query: currentShopQuery });

            if (shopGrid) {
                shopGrid.classList.remove('shop-grid-transition-out');
                shopGrid.classList.add('shop-grid-transition-in');
                requestAnimationFrame(() => {
                    shopGrid.classList.add('shop-grid-transition-in-active');
                });
                await wait(320);
                shopGrid.classList.remove('shop-grid-transition-in', 'shop-grid-transition-in-active');
            }

            currentShopFilter = nextFilter;
            shopFilterButtons.forEach(b => b.disabled = false);
            isShopFilterTransitioning = false;
        });
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) {
        renderShop(currentShopFilter || 'all', { query: currentShopQuery });
    }
});

// Shop Search: coordinated with category filters
document.addEventListener('DOMContentLoaded', () => {
    const searchWrap = document.querySelector('.shop-search');
    const input = document.getElementById('shop-search');
    const clearBtn = document.getElementById('shop-search-clear');
    const meta = document.getElementById('shop-search-meta');
    const grid = document.getElementById('product-grid');
    if (!input || !grid) return;

    let t = null;
    const updateMeta = () => {
        if (!meta) return;
        if (!currentShopQuery && currentShopFilter === 'all') {
            meta.textContent = '';
            return;
        }
        const filterLabel = document.querySelector('.shop-filters .filter-btn.active')?.textContent?.trim() || '';
        meta.textContent = `${filterLabel}${currentShopQuery ? ` • "${currentShopQuery}"` : ''}`;
    };

    const apply = async (withAnim) => {
        updateMeta();
        await renderShop(currentShopFilter || 'all', { withCardEntrance: Boolean(withAnim), query: currentShopQuery });
    };

    const setWrapState = () => {
        if (!searchWrap) return;
        if (input.value.trim()) searchWrap.classList.add('has-value');
        else searchWrap.classList.remove('has-value');
    };

    setWrapState();
    updateMeta();

    input.addEventListener('input', () => {
        currentShopQuery = input.value.trim();
        setWrapState();
        if (t) clearTimeout(t);
        t = setTimeout(() => apply(true), 160);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.value = '';
            currentShopQuery = '';
            setWrapState();
            apply(true);
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            currentShopQuery = '';
            setWrapState();
            input.focus();
            apply(true);
        });
    }
});

// Modal Elements (Keep existing)
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalScientific = document.getElementById('modal-scientific');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');


// UI Stats Elements
const statWater = document.getElementById('stat-water');
const statLight = document.getElementById('stat-light');
const statHumidity = document.getElementById('stat-humidity');
const statTemp = document.getElementById('stat-temp');

// Badge Elements
const badgeDifficulty = document.getElementById('badge-difficulty');
const badgePet = document.getElementById('badge-pet');

const modalPrice = document.getElementById('modal-price');

// Open Modal Function
const openModal = (plantKey) => {
    // Robust element querying - ensuring we find them even if global vars failed
    const modal_local = document.getElementById('product-modal');
    const title_el = document.getElementById('modal-title');
    const scientific_el = document.getElementById('modal-scientific');
    const desc_el = document.getElementById('modal-desc');
    const img_el = document.getElementById('modal-img');
    const water_el = document.getElementById('stat-water');
    const light_el = document.getElementById('stat-light');
    const humidity_el = document.getElementById('stat-humidity');
    const temp_el = document.getElementById('stat-temp');
    const dif_badge = document.getElementById('badge-difficulty');
    const pet_badge = document.getElementById('badge-pet');

    const data = plantData[plantKey];
    if (!data || !modal_local) return;

    // Reset UI visibility
    if (scientific_el) scientific_el.style.display = 'block';
    const badges = modal_local.querySelector('.modal-badges');
    if (badges) badges.style.display = 'flex';
    const stats = modal_local.querySelector('.stats-grid');
    if (stats) stats.style.display = 'grid';

    // Reset Footer CTA
    const ctaBtn = modal_local.querySelector('.modal-footer .btn');
    if (ctaBtn) {
        ctaBtn.innerHTML = `Sipariş için İletişime Geç <i class="ph ph-whatsapp-logo"></i>`;
        ctaBtn.href = "/contact";
    }

    // Populate Data
    if (title_el) {
        const a = document.createElement('a');
        a.className = 'modal-care-link';
        a.href = `/bakim/${plantKey}`;
        a.textContent = data.title;
        title_el.replaceChildren(a);
    }
    if (scientific_el) scientific_el.textContent = data.scientific;
    if (desc_el) desc_el.innerHTML = data.desc;
    if (img_el) {
        img_el.src = data.image;
        img_el.alt = data.title;
    }

    // Helper functions to convert values to informative sentences
    const waterToSentence = (water) => {
        const waterMap = {
            'Az': 'Toprağı kurudukça sulayın, su biriktirmeyin.',
            'Çok az': 'Nadiren sulayın, kuraklığa dayanır.',
            'Orta': 'Haftada 1-2 kez toprak nemini kontrol edin.',
            'Düzenli': 'Toprağı sürekli nemli tutun ama su birikmesine izin vermeyin.',
            'Bol': 'Bol su sever, toprağın kurumasına izin vermeyin.'
        };
        return waterMap[water] || water;
    };

    const lightToSentence = (env) => {
        if (!env) return 'Işık ihtiyacı belirtilmemiş.';
        if (env.includes('Tam güneş')) return 'Doğrudan güneş ışığı alan bir yer tercih edin.';
        if (env.includes('Yarı gölge') || env.includes('yarı gölge')) return 'Dolaylı ışık veya yarı gölge alanlarda mutlu olur.';
        if (env.includes('Gölge') || env.includes('gölge')) return 'Gölgeli veya düşük ışıklı alanları tercih eder.';
        if (env.includes('Güneş')) return 'Bol ışık alan bir konumda yetiştirin.';
        if (env.includes('Aydınlık')) return 'Parlak, dolaylı ışık alan ortamlarda en iyi gelişir.';
        return env;
    };

    const humidityToSentence = (humidity) => {
        const humidityMap = {
            'Normal': 'Standart ev ortamı nemi yeterlidir.',
            'Düşük': 'Kuru ortamlara toleranslıdır, ekstra nem gerekmez.',
            'Yüksek': 'Nemli ortamları sever, yaprakları düzenli nemlendirin.'
        };
        return humidityMap[humidity] || humidity;
    };

    const tempToSentence = (temp) => {
        if (!temp) return 'Sıcaklık bilgisi belirtilmemiş.';
        return `İdeal sıcaklık aralığı ${temp} arasındadır.`;
    };

    // Update Stats with informative sentences
    if (water_el) water_el.textContent = waterToSentence(data.water);
    if (light_el) light_el.textContent = lightToSentence(data.env);
    if (humidity_el) humidity_el.textContent = humidityToSentence(data.humidity);
    if (temp_el) temp_el.textContent = tempToSentence(data.temp);

    // Update Difficulty Badge
    if (dif_badge) {
        dif_badge.textContent = data.difficulty;
        dif_badge.className = 'modal-badge badge-difficulty';
        if (data.difficulty === 'Kolay' || data.difficulty === 'Çok Kolay') {
            dif_badge.classList.add('easy');
        } else if (data.difficulty === 'Orta') {
            dif_badge.classList.add('medium');
        } else {
            dif_badge.classList.add('hard');
        }
    }

    // Update Pet Friendly Badge
    if (pet_badge) {
        if (data.petFriendly) {
            pet_badge.innerHTML = '<i class="ph ph-paw-print"></i> Hayvan Dostu';
            pet_badge.classList.remove('danger');
            pet_badge.classList.add('success');
        } else {
            pet_badge.innerHTML = '<i class="ph ph-warning"></i> Toksik Olabilir';
            pet_badge.classList.remove('success');
            pet_badge.classList.add('danger');
        }
    }

    modal_local.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Trigger Animations
    const staggerItems = modal_local.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
        item.style.animation = 'none';
        item.offsetHeight; /* trigger reflow */
        item.style.animation = `fadeInUpStagger 0.5s ease forwards ${index * 0.1}s`;
    });
};

// Close Modal Function
const closeProductModal = () => {
    const modal_el = document.getElementById('product-modal');
    if (modal_el) {
        modal_el.classList.remove('show');
    }
    document.body.style.overflow = '';
};

// Event Listeners for Closing - Attach after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
});

// Click outside modal to close
window.addEventListener('click', (e) => {
    const modal_el = document.getElementById('product-modal');
    if (modal_el && e.target === modal_el) {
        closeProductModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    const modal_el = document.getElementById('product-modal');
    if (e.key === 'Escape' && modal_el && modal_el.classList.contains('show')) {
        closeProductModal();
    }
});



// Attach Click Handlers to Products
// We'll assume the add-btn triggers the details for now, 
// OR we can make the image clickable. Let's make the add-btn trigger it
// and map products based on their index or a data attribute.
// Since we don't have data attributes in HTML yet, let's map by order.

const productKeys = ['monstera', 'sansevieria', 'ficus', 'spathiphyllum'];
const productImages = document.querySelectorAll('.product-image');

productImages.forEach((imageContainer, index) => {
    if (index < productKeys.length) {
        // Add click listener to the container
        imageContainer.addEventListener('click', (e) => {
            // Check if the click originated from a slider button
            if (e.target.closest('.slider-btn')) {
                return; // Do nothing, let the slider logic handle it
            }
            openModal(productKeys[index]);
        });

        // Make it obvious it's clickable
        imageContainer.style.cursor = 'pointer';
    }
});

// --- Search Functionality (Care Guide) ---
const plantSearchInput = document.getElementById('plant-search');
const searchDropdown = document.getElementById('search-dropdown');
const searchResultContainer = document.getElementById('search-result-container');
const modalCtaText = document.getElementById('modal-cta-text');

// Helper to normalize strings for search (Turkish char support)
const normalizeString = (str) => {
    return str.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};

// Search Logic
const searchPlants = (query) => {
    const normalizedQuery = normalizeString(query);
    if (!normalizedQuery) return [];

    return Object.keys(plantData).filter(key => {
        const plant = plantData[key];

        // Create a large searchable string from all relevant properties
        const searchableContent = `
            ${plant.title} 
            ${plant.scientific} 
            ${plant.desc} 
            ${plant.category} 
            ${plant.difficulty} 
            ${plant.env} 
            ${plant.water}
        `;

        return normalizeString(searchableContent).includes(normalizedQuery);
    });
};

// Render Dropdown
const renderDropdown = (results) => {
    searchDropdown.innerHTML = '';

    if (results.length > 0) {
        searchDropdown.classList.add('active');
        results.forEach(key => {
            const plant = plantData[key];
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <img src="${plant.image}" alt="${plant.title}" loading="lazy" decoding="async">
                <div>
                    <div style="font-weight: 500; color: var(--primary-dark);">${plant.title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">${plant.scientific}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                selectPlant(key);
            });
            searchDropdown.appendChild(item);
        });
    } else {
        searchDropdown.classList.remove('active');
    }
};

// Select Plant
const selectPlant = (key) => {
    const plant = plantData[key];
    plantSearchInput.value = plant.title;
    searchDropdown.classList.remove('active');

    // Render Result Card dynamically
    searchResultContainer.innerHTML = `
        <div class="product-card" id="search-result-card" style="cursor: pointer;">
            <div class="product-image">
                <img src="${plant.image}" alt="${plant.title}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: contain; padding: 1rem; background: #f8f9fa;">
            </div>
            <div class="product-info">
                <h3>${plant.title}</h3>
                <p class="scientific-name">${plant.scientific}</p>
            </div>
        </div>
    `;

    // Animate in
    requestAnimationFrame(() => {
        searchResultContainer.classList.add('show');
    });

    // Add click event to open modal
    const resultCard = document.getElementById('search-result-card');
    resultCard.addEventListener('click', () => {
        openCareModal(key);
    });
};

// Event Listeners
if (plantSearchInput) {
    plantSearchInput.addEventListener('input', (e) => {
        const results = searchPlants(e.target.value);
        renderDropdown(results);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchDropdown?.classList.remove('active');
        }
    });

    // Enter key support
    plantSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const results = searchPlants(e.target.value);
            if (results.length > 0) {
                selectPlant(results[0]); // Select first match
            }
        }
    });
}

// Open Modal with Care Context
const openCareModal = (key) => {
    openModal(key);
    // Override the footer text for Care Guide context
    if (modalCtaText) {
        modalCtaText.innerHTML = 'Sorununu bulamadın mı? <a href="/contact">Bizimle iletişime geç!</a>';
    }
};




// Update selectPlant to use openCareModal
// We need to re-attach the event listener since we can't redefine const selectPlant easily
// But wait, the function is called later. The definition above is what's used.
// We should have defined selectPlant to call openCareModal initially.
// Since we can't strictly redefine 'const', we will rely on the implementation below to fix the previous block.
// Actually, let's just make sure the click handler calls the right function.
// We can't change the already defined 'selectPlant' logic by appending code.
// We must edit the 'selectPlant' function body above using a separate replacement.

// This block just cleans up the end of the file.


// --- Modern Homepage Animations ---
// Reveal elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Target elements to recruit for animation
document.querySelectorAll('.reveal, .product-card, .card').forEach(el => {
    // Ensure they have the class for CSS transitions if not already
    // Ideally they should have .reveal class in HTML, but we can be robust:
    if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
    }
    revealOnScroll.observe(el);
});

// Dynamic Title Parallax (Optional Polish)
const modernHero = document.querySelector('.modern-hero');
const modernHeroTitle = document.querySelector('.modern-hero-title');

if (modernHero && modernHeroTitle) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Subtle parallax for text
        modernHeroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        // Fade out on scroll
        modernHeroTitle.style.opacity = 1 - (scrolled / 500);

    });
}

// --- New Care Guide Filter Logic ---
const filterCareResults = (criteria) => {
    let filtered = [];

    // Normalize data structure access (handle array vs object if needed, currently array)
    const catalog = typeof plantCatalog !== 'undefined' ? plantCatalog :
        (typeof plantData !== 'undefined' ? Object.values(plantData) : []);

    switch (criteria) {
        case 'easy':
            filtered = catalog.filter(p => p.difficulty === 'Kolay' || p.difficulty === 'Çok Kolay');
            break;
        case 'pet':
            filtered = catalog.filter(p => p.petFriendly === true);
            break;
        case 'shade':
            filtered = catalog.filter(p => p.env && (p.env.includes('Gölge') || p.env.includes('Düşük Işık')));
            break;
        case 'succulent':
            filtered = catalog.filter(p => p.water === 'Az' || p.water === 'Çok az');
            break;
    }

    if (filtered.length > 0) {
        renderSearchResults(filtered);
    } else {
        searchResultContainer.innerHTML = `
            <div class="no-results" style="text-align:center; padding: 2rem;">
                <i class="ph ph-plant" style="font-size: 3rem; color: #ccc;"></i>
                <p>Bu kategoride henüz bitki bulunamadı.</p>
            </div>`;
    }

    // Smooth scroll to results
    const resultsSection = document.getElementById('care-results');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Render function adjustment
const renderSearchResults = (plants) => {
    const container = document.getElementById('search-result-container'); // Ensure correct reference
    if (!container) return;

    container.innerHTML = '';
    container.style.display = 'grid'; // Grid layout for results
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    container.style.gap = '2rem';

    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'product-card reveal'; // Reuse product card style
        card.style.animation = 'fadeInUp 0.5s ease backwards';

        // Assuming openModal is globally available or defined earlier
        card.innerHTML = `
            <div class="product-image">
                 <img src="${plant.image}" alt="${plant.title}" loading="lazy" decoding="async">
                 <div class="product-overlay">
                    <button class="add-btn" onclick="openModal('${plant.id}')">
                        <i class="ph ph-eye"></i> İncele
                    </button>
                 </div>
            </div>
            <div class="product-info">
                <h3>${plant.title}</h3>
                <p class="scientific">${plant.scientific}</p>
                <div class="product-meta">
                    <span><i class="ph ph-drop"></i> ${plant.water}</span>
                    <span><i class="ph ph-sun"></i> ${plant.env ? plant.env.split(' ')[0] : 'Güneş'}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};
