// API Configuration Template
// Copy this file and rename it to 'config.js', then update with your actual API keys

const CONFIG = {
    // Get your Unsplash API key from: https://unsplash.com/developers
    UNSPLASH_ACCESS_KEY: 'YOUR_UNSPLASH_ACCESS_KEY',
    
    // Get your OpenWeatherMap API key from: https://openweathermap.org/api
    WEATHER_API_KEY: 'YOUR_OPENWEATHER_API_KEY',
    
    // API Base URLs (don't change these)
    UNSPLASH_BASE_URL: 'https://api.unsplash.com',
    WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5'
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}