# Travel Explorer Website

A modern, responsive web application for exploring travel destinations around the world. Features destination search, photo galleries powered by Unsplash API, and real-time weather information using OpenWeatherMap API.

## 🌟 Features

- **Destination Explorer**: Browse popular travel destinations with detailed information
- **Smart Search**: Real-time search with autocomplete suggestions
- **Photo Gallery**: High-quality destination photos from Unsplash
- **Weather Information**: Current weather conditions for any city
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI**: Smooth animations and user-friendly interface
- **Modal Image Viewer**: Full-screen image viewing with photographer credits

## 🚀 Live Demo

🌐 **Live Website**: [https://travel-explorer-omega.vercel.app/](https://travel-explorer-omega.vercel.app/)

You can also run it locally by opening `index.html` in your web browser.

## 📋 Prerequisites

To use the full functionality of this application, you'll need:

1. **Unsplash API Key** - For photo gallery functionality
2. **OpenWeatherMap API Key** - For weather information

## 🔧 Setup Instructions

### 1. Get API Keys

#### Unsplash API Key:
1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Create a free account
3. Create a new application
4. Copy your Access Key

#### OpenWeatherMap API Key:
1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Copy your API key

### 2. Configure the Application

1. Open `js/script.js`
2. Replace the placeholder API keys in the CONFIG object:

```javascript
const CONFIG = {
    UNSPLASH_ACCESS_KEY: 'your_actual_unsplash_access_key_here',
    WEATHER_API_KEY: 'your_actual_openweather_api_key_here',
    // ... rest of the config
};
```

### 3. Launch the Application

1. Open `index.html` in a modern web browser
2. The application will work with placeholder data if API keys are not configured
3. Configure API keys for full functionality

## 📁 Project Structure

```
travel-explorer/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet with responsive design
├── js/
│   └── script.js       # Main JavaScript functionality
├── images/             # Directory for local images (optional)
└── README.md          # Project documentation
```

## 🎨 Key Components

### HTML Structure
- **Header**: Navigation with responsive mobile menu
- **Hero Section**: Search functionality with autocomplete
- **Destinations**: Grid of popular destinations
- **Gallery**: Dynamic photo gallery
- **Weather**: Real-time weather information
- **Footer**: Additional information and credits

### CSS Features
- **CSS Variables**: Consistent color scheme and spacing
- **Flexbox & Grid**: Modern layout techniques
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and hover effects
- **Modern Typography**: Google Fonts integration

### JavaScript Functionality
- **ES6+ Features**: Modern JavaScript syntax
- **API Integration**: Fetch API for external services
- **Event Handling**: Interactive user interface
- **Error Handling**: Graceful fallbacks for API failures
- **Performance**: Debounced search and lazy loading

## 🌐 API Integration

### Unsplash API
- **Endpoint**: `https://api.unsplash.com/search/photos`
- **Usage**: Fetches high-quality destination photos
- **Rate Limit**: 50 requests per hour (demo level)
- **Fallback**: Placeholder images when API is unavailable

### OpenWeatherMap API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Usage**: Current weather conditions
- **Rate Limit**: 1000 requests per day (free tier)
- **Features**: Temperature, humidity, wind speed, visibility

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

Key responsive features:
- Collapsible navigation menu
- Flexible grid layouts
- Optimized touch targets
- Readable typography across all devices

## ⚡ Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Debounced Search**: Reduces API calls during typing
- **Image Optimization**: Responsive images with fallbacks
- **Minimal Dependencies**: Lightweight external libraries only
- **Efficient DOM Manipulation**: Optimized JavaScript operations

## 🎯 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

## 🚀 Future Enhancements

Potential features for future development:
- [ ] User accounts and favorites
- [ ] Trip planning functionality
- [ ] Social sharing capabilities
- [ ] Offline mode with service worker
- [ ] Extended weather forecasts
- [ ] Interactive maps integration
- [ ] Multi-language support
- [ ] Advanced filtering options

## 🤝 Contributing

This project was created as part of an IBM project assignment. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of an IBM project assignment.

## 📞 Support

If you encounter any issues:

1. **Check API Keys**: Ensure they're correctly configured
2. **Browser Console**: Check for error messages
3. **Network Tab**: Verify API requests are successful
4. **Fallback Mode**: The app works with placeholder data

## 🙏 Credits

- **Unsplash**: Beautiful travel photography
- **OpenWeatherMap**: Reliable weather data
- **Font Awesome**: Professional icons
- **Google Fonts**: Typography (Poppins font family)

## 📊 Project Stats

- **Lines of Code**: ~1000+ (HTML, CSS, JavaScript combined)
- **Components**: 8 major sections
- **API Integrations**: 2 external services
- **Responsive Breakpoints**: 3 major breakpoints
- **Browser Compatibility**: Modern browsers (ES6+)

---

**Built with ❤️ for IBM Project Assignment**