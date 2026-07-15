// Search Functionality for Chittagong Tourism Website

// Search Data - All searchable content
const searchData = [
    // Tourist Spots
    {
        title: "Patenga Beach",
        description: "Beautiful sea beach with stunning sunsets and fresh sea breeze",
        category: "Tourist Spot",
        url: "pages/tourist-spots.html#patenga",
        keywords: ["beach", "sea", "sunset", "patenga", "bay of bengal"]
    },
    {
        title: "Foy's Lake",
        description: "Man-made lake surrounded by hills, perfect for family outings",
        category: "Tourist Spot",
        url: "pages/tourist-spots.html#foyslake",
        keywords: ["lake", "foys", "hills", "amusement park", "picnic"]
    },
    {
        title: "Bayazid Bostami Shrine",
        description: "Historic shrine with sacred pond and turtles",
        category: "Religious Site",
        url: "pages/tourist-spots.html#bayazid",
        keywords: ["shrine", "bayazid", "bostami", "turtles", "religious", "mazaar"]
    },
    {
        title: "Chandranath Hill",
        description: "Ancient Hindu temple atop a hill with panoramic views",
        category: "Religious Site",
        url: "pages/tourist-spots.html#chandranath",
        keywords: ["temple", "hill", "hindu", "chandranath", "sitakunda"]
    },
    {
        title: "Karnaphuli River",
        description: "The lifeline of Chittagong with scenic boat rides",
        category: "Natural",
        url: "pages/tourist-spots.html#karnaphuli",
        keywords: ["river", "karnaphuli", "boat", "cruise", "sadarghat"]
    },
    {
        title: "Ethnological Museum",
        description: "Museum showcasing tribal culture and heritage",
        category: "Museum",
        url: "pages/tourist-spots.html#museum",
        keywords: ["museum", "tribal", "culture", "ethnological", "heritage"]
    },
    {
        title: "War Cemetery",
        description: "World War II Commonwealth War Cemetery",
        category: "Historical",
        url: "pages/tourist-spots.html#cemetery",
        keywords: ["war", "cemetery", "wwii", "memorial", "british"]
    },
    
    // Hotels
    {
        title: "Hotel Agrabad",
        description: "Luxury hotel in the heart of business district",
        category: "Hotel",
        url: "pages/hotels.html#agrabad",
        keywords: ["hotel", "luxury", "agrabad", "accommodation", "5-star"]
    },
    {
        title: "Peninsula Chittagong",
        description: "Premium hotel with modern amenities",
        category: "Hotel",
        url: "pages/hotels.html#peninsula",
        keywords: ["hotel", "peninsula", "luxury", "modern"]
    },
    {
        title: "Radisson Blu",
        description: "International chain hotel with excellent service",
        category: "Hotel",
        url: "pages/hotels.html#radisson",
        keywords: ["hotel", "radisson", "international", "luxury"]
    },
    
    // Restaurants
    {
        title: "Mezban",
        description: "Famous for traditional Chittagonian Mezbani beef",
        category: "Restaurant",
        url: "pages/hotels.html#mezban",
        keywords: ["restaurant", "mezban", "beef", "mezbani", "traditional", "food"]
    },
    {
        title: "Nando's Chittagong",
        description: "Popular chain restaurant for grilled chicken",
        category: "Restaurant",
        url: "pages/hotels.html#nandos",
        keywords: ["restaurant", "nandos", "chicken", "international"]
    },
    {
        title: "Spice & Rice",
        description: "Multi-cuisine restaurant with great ambiance",
        category: "Restaurant",
        url: "pages/hotels.html#spicerice",
        keywords: ["restaurant", "cuisine", "food", "dining"]
    },
    
    // History & Culture
    {
        title: "History of Chittagong",
        description: "Ancient port city with over 1000 years of history",
        category: "History",
        url: "pages/history.html",
        keywords: ["history", "heritage", "ancient", "port", "trade"]
    },
    {
        title: "Chittagonian Dialect",
        description: "Unique dialect of Bengali language",
        category: "Culture",
        url: "pages/history.html#dialect",
        keywords: ["language", "dialect", "chittagonian", "culture"]
    },
    
    // Travel Guide
    {
        title: "How to Reach Chittagong",
        description: "Complete guide on reaching Chittagong by air, rail, and road",
        category: "Travel Guide",
        url: "pages/travel-guide.html#reach",
        keywords: ["travel", "transport", "airport", "train", "bus", "how to reach"]
    },
    {
        title: "Best Time to Visit",
        description: "Weather and seasonal information for planning your trip",
        category: "Travel Guide",
        url: "pages/travel-guide.html#season",
        keywords: ["weather", "season", "best time", "climate"]
    },
    {
        title: "Local Transportation",
        description: "CNG, taxi, bus services in Chittagong",
        category: "Travel Guide",
        url: "pages/travel-guide.html#transport",
        keywords: ["cng", "taxi", "bus", "transport", "local"]
    }
];

// Search Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Search Function
function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm.length < 2) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
    }
    
    // Filter results
    const results = searchData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const descMatch = item.description.toLowerCase().includes(searchTerm);
        const categoryMatch = item.category.toLowerCase().includes(searchTerm);
        const keywordMatch = item.keywords.some(keyword => keyword.includes(searchTerm));
        
        return titleMatch || descMatch || categoryMatch || keywordMatch;
    });
    
    // Display results
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <h4>No results found</h4>
                <p>Try different keywords or browse our pages</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.slice(0, 8).map(item => `
            <div class="search-result-item" onclick="window.location.href='${item.url}'">
                <h4>${highlightText(item.title, searchTerm)}</h4>
                <p>${item.category} • ${highlightText(item.description, searchTerm)}</p>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('active');
}

// Highlight matching text
function highlightText(text, search) {
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--primary-green);">$1</strong>');
}

// Event Listeners
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (searchResults && !searchResults.contains(e.target) && 
        e.target !== searchInput && e.target !== searchBtn) {
        searchResults.classList.remove('active');
    }
});

// Prevent closing when clicking inside search results
if (searchResults) {
    searchResults.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
