// API Configuration
const CONFIG = {
    UNSPLASH_ACCESS_KEY: 'YOUR_UNSPLASH_ACCESS_KEY', // Replace with your Unsplash API key
    WEATHER_API_KEY: 'YOUR_OPENWEATHER_API_KEY', // Replace with your OpenWeatherMap API key
    UNSPLASH_BASE_URL: 'https://api.unsplash.com',
    WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5'
};

// Sample destination data
const destinations = [
    {
        id: 1,
        name: 'Paris',
        country: 'France',
        description: 'The City of Light, known for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
        rating: 4.8,
        population: '2.16 million',
        timezone: 'CET (UTC+1)',
        coordinates: { lat: 48.8566, lon: 2.3522 }
    },
    {
        id: 2,
        name: 'Tokyo',
        country: 'Japan',
        description: 'A bustling metropolis blending traditional culture with cutting-edge technology. Experience ancient temples, modern skyscrapers, and incredible cuisine.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        rating: 4.7,
        population: '13.96 million',
        timezone: 'JST (UTC+9)',
        coordinates: { lat: 35.6762, lon: 139.6503 }
    },
    {
        id: 3,
        name: 'New York',
        country: 'United States',
        description: 'The Big Apple, a global hub for finance, arts, fashion, and culture. Iconic landmarks include Times Square, Central Park, and the Statue of Liberty.',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        rating: 4.6,
        population: '8.34 million',
        timezone: 'EST (UTC-5)',
        coordinates: { lat: 40.7128, lon: -74.0060 }
    },
    {
        id: 4,
        name: 'London',
        country: 'United Kingdom',
        description: 'A historic city with royal palaces, world-class museums, and vibrant neighborhoods. Experience Big Ben, Buckingham Palace, and the Tower of London.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
        rating: 4.5,
        population: '8.98 million',
        timezone: 'GMT (UTC+0)',
        coordinates: { lat: 51.5074, lon: -0.1278 }
    },
    {
        id: 5,
        name: 'Bali',
        country: 'Indonesia',
        description: 'A tropical paradise known for its stunning beaches, ancient temples, and vibrant culture. Perfect for relaxation and adventure.',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
        rating: 4.9,
        population: '4.32 million',
        timezone: 'WITA (UTC+8)',
        coordinates: { lat: -8.3405, lon: 115.0920 }
    },
    {
        id: 6,
        name: 'Sydney',
        country: 'Australia',
        description: 'Harbor city famous for its Opera House, Harbour Bridge, and beautiful beaches. A perfect blend of urban sophistication and natural beauty.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        rating: 4.7,
        population: '5.31 million',
        timezone: 'AEST (UTC+10)',
        coordinates: { lat: -33.8688, lon: 151.2093 }
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const destinationSearch = document.getElementById('destination-search');
const searchBtn = document.getElementById('search-btn');
const suggestions = document.getElementById('suggestions');
const destinationsGrid = document.getElementById('destinations-grid');
const destinationDetails = document.getElementById('destination-details');
const backBtn = document.getElementById('back-btn');
const galleryGrid = document.getElementById('gallery-grid');
const weatherLocation = document.getElementById('weather-location');
const weatherSearchBtn = document.getElementById('weather-search-btn');
const weatherDisplay = document.getElementById('weather-display');
const loadingSpinner = document.getElementById('loading-spinner');
const imageModal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalPhotographer = document.getElementById('modal-photographer');

// State
let currentDestination = null;
let searchTimeout = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderDestinations();
    loadDefaultGallery();
    
    // Check if API keys are configured
    if (CONFIG.UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
        console.warn('Please configure your Unsplash API key in the CONFIG object');
    }
    
    if (CONFIG.WEATHER_API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
        console.warn('Please configure your OpenWeatherMap API key in the CONFIG object');
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Search functionality
    destinationSearch.addEventListener('input', handleSearchInput);
    searchBtn.addEventListener('click', handleSearch);
    destinationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Back button
    backBtn.addEventListener('click', showDestinations);
    
    // Weather search
    weatherSearchBtn.addEventListener('click', handleWeatherSearch);
    weatherLocation.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleWeatherSearch();
        }
    });
    
    // Modal functionality
    closeModal.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!destinationSearch.contains(e.target) && !suggestions.contains(e.target)) {
            hideSuggestions();
        }
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!imageModal.classList.contains('hidden')) {
                closeImageModal();
            }
            if (!suggestions.classList.contains('hidden')) {
                hideSuggestions();
            }
        }
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function handleSearchInput() {
    const query = destinationSearch.value.trim().toLowerCase();
    
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    if (query.length === 0) {
        hideSuggestions();
        return;
    }
    
    // Debounce search to avoid too many API calls
    searchTimeout = setTimeout(() => {
        showSuggestions(query);
    }, 300);
}

function showSuggestions(query) {
    const filteredDestinations = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.country.toLowerCase().includes(query)
    );
    
    if (filteredDestinations.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestions.innerHTML = '';
    suggestions.classList.remove('hidden');
    
    filteredDestinations.forEach(dest => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = `
            <strong>${dest.name}</strong>, ${dest.country}
        `;
        suggestionItem.addEventListener('click', () => {
            selectDestination(dest);
            hideSuggestions();
        });
        suggestions.appendChild(suggestionItem);
    });
}

function hideSuggestions() {
    suggestions.classList.add('hidden');
    suggestions.innerHTML = '';
}

function handleSearch() {
    const query = destinationSearch.value.trim().toLowerCase();
    if (!query) return;
    
    const destination = destinations.find(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.country.toLowerCase().includes(query)
    );
    
    if (destination) {
        selectDestination(destination);
    } else {
        // If no exact match, show first suggestion or create a generic search
        showGenericSearch(query);
    }
    
    hideSuggestions();
}

function selectDestination(destination) {
    currentDestination = destination;
    destinationSearch.value = `${destination.name}, ${destination.country}`;
    showDestinationDetails(destination);
    loadDestinationGallery(destination.name);
}

function showGenericSearch(query) {
    // For generic searches, load photos based on the search term
    loadDestinationGallery(query);
    
    // Scroll to gallery section
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function renderDestinations() {
    destinationsGrid.innerHTML = '';
    
    destinations.forEach(destination => {
        const card = createDestinationCard(destination);
        destinationsGrid.appendChild(card);
    });
}

function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Available'">
        <div class="destination-card-content">
            <h3>${destination.name}</h3>
            <p>${destination.country}</p>
            <div class="destination-rating">
                <div class="stars">
                    ${generateStars(destination.rating)}
                </div>
                <span>${destination.rating}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        selectDestination(destination);
    });
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function showDestinationDetails(destination) {
    // Hide destinations grid and show details
    document.getElementById('destinations').style.display = 'none';
    destinationDetails.classList.remove('hidden');
    
    // Populate destination details
    document.getElementById('destination-name').textContent = destination.name;
    document.getElementById('destination-country').textContent = destination.country;
    document.getElementById('destination-desc').textContent = destination.description;
    document.getElementById('destination-population').textContent = destination.population;
    document.getElementById('destination-timezone').textContent = destination.timezone;
    
    // Scroll to destination details
    destinationDetails.scrollIntoView({ behavior: 'smooth' });
}

function showDestinations() {
    // Show destinations grid and hide details
    document.getElementById('destinations').style.display = 'block';
    destinationDetails.classList.add('hidden');
    currentDestination = null;
    
    // Clear search
    destinationSearch.value = '';
    
    // Scroll to destinations
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

// Gallery Functions
async function loadDefaultGallery() {
    const defaultQuery = 'travel destinations';
    await loadGalleryImages(defaultQuery);
}

async function loadDestinationGallery(destination) {
    await loadGalleryImages(destination);
}

async function loadGalleryImages(query) {
    if (CONFIG.UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
        loadPlaceholderGallery();
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch(`${CONFIG.UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=12`, {
            headers: {
                'Authorization': `Client-ID ${CONFIG.UNSPLASH_ACCESS_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        renderGallery(data.results);
    } catch (error) {
        console.error('Error loading gallery:', error);
        loadPlaceholderGallery();
    } finally {
        hideLoading();
    }
}

function loadPlaceholderGallery() {
    const placeholderImages = [
        { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', alt: 'Mountain Lake', photographer: 'Sample Photographer' },
        { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', alt: 'Sydney Opera House', photographer: 'Sample Photographer' },
        { url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400', alt: 'Paris Eiffel Tower', photographer: 'Sample Photographer' },
        { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', alt: 'Tokyo City', photographer: 'Sample Photographer' },
        { url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400', alt: 'Bali Beach', photographer: 'Sample Photographer' },
        { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', alt: 'London Bridge', photographer: 'Sample Photographer' }
    ];
    
    renderGallery(placeholderImages.map(img => ({
        urls: { small: img.url, regular: img.url },
        alt_description: img.alt,
        user: { name: img.photographer, links: { html: '#' } }
    })));
}

function renderGallery(images) {
    galleryGrid.innerHTML = '';
    
    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.urls.small}" alt="${image.alt_description || 'Travel photo'}" loading="lazy">
            <div class="gallery-overlay">
                <p>${image.alt_description || 'Beautiful destination'}</p>
                <small>Photo by ${image.user.name}</small>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => {
            openImageModal(image);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

function openImageModal(image) {
    modalImage.src = image.urls.regular || image.urls.small;
    modalImage.alt = image.alt_description || 'Travel photo';
    modalDescription.textContent = image.alt_description || 'Beautiful destination photo';
    modalPhotographer.textContent = `Photo by ${image.user.name}`;
    modalPhotographer.href = image.user.links.html;
    
    imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    imageModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Weather Functions
async function handleWeatherSearch() {
    const location = weatherLocation.value.trim();
    if (!location) return;
    
    await getWeatherData(location);
}

async function getWeatherData(location) {
    if (CONFIG.WEATHER_API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
        showPlaceholderWeather(location);
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch(
            `${CONFIG.WEATHER_BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        
        const data = await response.json();
        renderWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        showWeatherError(error.message);
    } finally {
        hideLoading();
    }
}

function showPlaceholderWeather(location) {
    const placeholderData = {
        name: location,
        main: {
            temp: 22,
            feels_like: 25,
            humidity: 65,
            pressure: 1013
        },
        weather: [{
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
        }],
        wind: {
            speed: 3.5
        },
        visibility: 10000
    };
    
    renderWeatherData(placeholderData);
}

function renderWeatherData(data) {
    weatherDisplay.innerHTML = `
        <div class="weather-current">
            <h3>${data.name}</h3>
            <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
            <p class="weather-description">${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        </div>
        <div class="weather-details">
            <div class="weather-detail">
                <i class="fas fa-thermometer-half"></i>
                <span>${Math.round(data.main.feels_like)}°C</span>
                <small>Feels like</small>
            </div>
            <div class="weather-detail">
                <i class="fas fa-tint"></i>
                <span>${data.main.humidity}%</span>
                <small>Humidity</small>
            </div>
            <div class="weather-detail">
                <i class="fas fa-wind"></i>
                <span>${data.wind.speed} m/s</span>
                <small>Wind Speed</small>
            </div>
            <div class="weather-detail">
                <i class="fas fa-eye"></i>
                <span>${(data.visibility / 1000).toFixed(1)} km</span>
                <small>Visibility</small>
            </div>
        </div>
    `;
}

function showWeatherError(message) {
    weatherDisplay.innerHTML = `
        <div class="weather-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Sorry, we couldn't find weather data for this location.</p>
            <small>${message}</small>
        </div>
    `;
}

// Utility Functions
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Error handling for images
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
    img.onerror = null;
}

// Initialize error handling for all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.destination-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});