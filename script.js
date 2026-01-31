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
    themeToggle.innerHTML = isDark ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Check preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
}

themeToggle.addEventListener('click', toggleTheme);

// Toggle Mobile Menu

// Toggle Mobile Menu
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon between list and x
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        icon.classList.replace('ph-x', 'ph-list');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.replace('ph-x', 'ph-list');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
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
const plantData = plantCatalog.reduce((acc, plant) => {
    acc[plant.id] = plant;
    return acc;
}, {});

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
const renderShop = async (filter = 'all') => {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? plantCatalog
        : plantCatalog.filter(p => p.category === filter);

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

    filtered.forEach(plant => {
        const isFav = favorites.has(plant.id);
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.innerHTML = `
            <div class="product-image">
                <img src="${plant.image}" alt="${plant.title}">
                <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${plant.id}" onclick="toggleFavorite(event, '${plant.id}')">
                    <i class="ph ${isFav ? 'ph-heart-fill' : 'ph-heart'}" style="${isFav ? 'color: #e63946;' : ''}"></i>
                </button>
                <div class="add-btn-container">
                    <button class="add-btn"><i class="ph ph-plus"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${plant.title}</h3>
                <p class="scientific-name">${plant.scientific}</p>
                <a href="contact.html" class="btn-order">Sipariş İçin İletişime Geç <i class="ph ph-whatsapp-logo"></i></a>
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

        grid.appendChild(card);
    });

    // Re-trigger scroll observer for new elements
    document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));
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
        icon.className = 'ph ph-heart-fill';
        icon.style.color = '#e63946';
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
            icon.className = 'ph ph-heart-fill';
            icon.style.color = '#e63946';
        }
        if (typeof YakaUI !== 'undefined') YakaUI.toast.error('İşlem başarısız');
    }
};

// Filter Button Listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle Active Class
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Render
        renderShop(btn.getAttribute('data-category'));
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) {
        renderShop('all');
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
        ctaBtn.href = "contact.html";
    }

    // Populate Data
    if (title_el) title_el.textContent = data.title;
    if (scientific_el) scientific_el.textContent = data.scientific;
    if (desc_el) desc_el.innerHTML = data.desc;
    if (img_el) {
        img_el.src = data.image;
        img_el.alt = data.title;
    }

    // Update Stats
    if (water_el) water_el.textContent = data.water;
    if (light_el) light_el.textContent = data.env;
    if (humidity_el) humidity_el.textContent = data.humidity;
    if (temp_el) temp_el.textContent = data.temp;

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
                <img src="${plant.image}" alt="${plant.title}">
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
                <img src="${plant.image}" alt="${plant.title}" style="width: 100%; height: 100%; object-fit: contain; padding: 1rem; background: #f8f9fa;">
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
        modalCtaText.innerHTML = 'Sorununu bulamadın mı? <a href="contact.html">Bizimle iletişime geç!</a>';
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
                 <img src="${plant.image}" alt="${plant.title}">
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
