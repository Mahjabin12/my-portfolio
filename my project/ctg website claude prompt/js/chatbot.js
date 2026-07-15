// Chatbot for Chittagong Tourism Website

// Chatbot Elements
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotBody = document.getElementById('chatbotBody');
const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');

// Chatbot Responses Database
const chatbotResponses = {
    // Greetings
    greetings: {
        patterns: ['hi', 'hello', 'hey', 'assalamu alaikum', 'good morning', 'good evening'],
        responses: [
            "আসসালামু আলাইকুম! Welcome to Chittagong Tourism. How can I help you explore our beautiful city?",
            "Hello! I'm here to help you discover Chittagong. What would you like to know?",
            "Hi there! Ready to explore the Port City? Ask me anything about Chittagong!"
        ]
    },
    
    // Tourist Spots
    touristSpots: {
        patterns: ['tourist spot', 'places to visit', 'tourist place', 'where to go', 'attractions', 'sightseeing', 'visit'],
        responses: [
            "Chittagong has amazing tourist spots! Popular ones include:\n\n🏖️ Patenga Beach - Beautiful sea beach\n🏞️ Foy's Lake - Lake with amusement park\n🕌 Bayazid Bostami - Historic shrine\n⛰️ Chandranath Hill - Ancient temple\n🏛️ Ethnological Museum - Tribal heritage\n🌊 Karnaphuli River - Scenic boat rides\n\nWhich one interests you?"
        ]
    },
    
    // Patenga Beach
    patenga: {
        patterns: ['patenga', 'beach', 'sea beach'],
        responses: [
            "Patenga Beach is one of Chittagong's most popular destinations! 🏖️\n\n✨ Beautiful sunsets\n🌊 Fresh sea breeze\n🍴 Seafood restaurants nearby\n⏰ Best time: Evening (4-7 PM)\n📍 Location: 14 km from city center\n\nWould you like to know about nearby hotels?"
        ]
    },
    
    // Foy's Lake
    foyslake: {
        patterns: ['foys lake', 'foy lake', 'amusement park'],
        responses: [
            "Foy's Lake is perfect for families! 🏞️\n\n🎢 Amusement park\n🚤 Boating facilities\n🍽️ Restaurants\n📸 Great photo spots\n💰 Entry: 50-200 Tk\n⏰ Open: 10 AM - 8 PM\n\nIt's about 8 km from the city center."
        ]
    },
    
    // Hotels
    hotels: {
        patterns: ['hotel', 'accommodation', 'where to stay', 'stay', 'resort'],
        responses: [
            "Here are some top hotels in Chittagong:\n\n⭐⭐⭐⭐⭐ Luxury:\n• Radisson Blu - International chain\n• Peninsula Chittagong - Modern facilities\n• Hotel Agrabad - Business district\n\n⭐⭐⭐ Budget-Friendly:\n• Hotel Al-Amin\n• City Inn\n\nWould you like specific recommendations based on location?"
        ]
    },
    
    // Restaurants
    restaurants: {
        patterns: ['restaurant', 'food', 'eat', 'dining', 'cuisine', 'mezban'],
        responses: [
            "Chittagong has amazing food! 🍽️\n\n🥩 Must Try:\n• Mezban - Famous Mezbani beef\n• Chittagonian fish curry\n• Shutki (dried fish)\n\n🍴 Popular Restaurants:\n• Mezban Restaurant\n• Handi Restaurant\n• Nando's\n• KFC Chittagong\n\nWhat type of cuisine interests you?"
        ]
    },
    
    // How to Reach
    reach: {
        patterns: ['how to reach', 'how to go', 'transport', 'getting there', 'travel'],
        responses: [
            "Here's how to reach Chittagong:\n\n✈️ By Air:\nShah Amanat International Airport\n- Direct flights from Dhaka (45 min)\n- International connections\n\n🚂 By Train:\n- Subarna Express (Dhaka-CTG)\n- Turna Nishitha (Night train)\n- Journey: 5-6 hours\n\n🚌 By Bus:\n- Multiple operators from Dhaka\n- Journey: 5-7 hours\n\nNeed details about local transport?"
        ]
    },
    
    // Local Transport
    localTransport: {
        patterns: ['local transport', 'cng', 'taxi', 'uber', 'bus', 'getting around'],
        responses: [
            "Local transportation in Chittagong:\n\n🛺 CNG Auto-rickshaw:\n- Most common, available everywhere\n- Fare: 30-200 Tk (depending on distance)\n\n🚕 Taxi/Uber:\n- Available through apps\n- More comfortable\n\n🚌 City Buses:\n- Cheap but crowded\n- Fare: 10-30 Tk\n\n🚗 Rental Cars:\n- Available from hotels\n\nCNG is your best bet for easy travel!"
        ]
    },
    
    // Best Time
    bestTime: {
        patterns: ['best time', 'when to visit', 'weather', 'season', 'climate'],
        responses: [
            "Best time to visit Chittagong:\n\n🌤️ Winter (Nov-Feb):\n• Perfect weather (15-25°C)\n• Best for sightseeing\n• Recommended!\n\n🌦️ Monsoon (Jun-Sep):\n• Heavy rainfall\n• Lush greenery\n• Avoid if possible\n\n☀️ Summer (Mar-May):\n• Hot and humid (25-35°C)\n• Beach visits okay\n\nPlan your trip between November and February!"
        ]
    },
    
    // History
    history: {
        patterns: ['history', 'historical', 'heritage', 'ancient', 'past'],
        responses: [
            "Chittagong has a rich history! 📜\n\n• Over 1000 years old\n• Ancient port city\n• Ruled by various dynasties\n• Important in British era\n• Strategic WW2 location\n• Liberation War significance\n\nVisit our History page for detailed information about Chittagong's fascinating past!"
        ]
    },
    
    // Emergency
    emergency: {
        patterns: ['emergency', 'help', 'police', 'hospital', 'ambulance'],
        responses: [
            "🚨 Emergency Contacts:\n\n👮 Police: 999\n🚒 Fire Service: 102\n🚑 Ambulance: 199\n🏥 Chittagong Medical College Hospital: 031-2502951\n\nStay safe! Is there anything specific you need help with?"
        ]
    },
    
    // Thanks
    thanks: {
        patterns: ['thank', 'thanks', 'appreciate', 'helpful'],
        responses: [
            "You're welcome! Enjoy your visit to Chittagong! 🌊",
            "Happy to help! Have a wonderful time exploring our beautiful city!",
            "My pleasure! Feel free to ask if you need anything else!"
        ]
    },
    
    // Default response
    default: {
        responses: [
            "I can help you with:\n\n• Tourist spots and attractions\n• Hotels and restaurants\n• How to reach Chittagong\n• Local transportation\n• Best time to visit\n• History and culture\n\nWhat would you like to know?"
        ]
    }
};

// Toggle Chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    chatbotToggle.classList.add('hidden');
    chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    chatbotToggle.classList.remove('hidden');
});

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = `<p>${message.replace(/\n/g, '<br>')}</p>`;
    
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    
    return typingDiv;
}

// Get bot response
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check each category
    for (const [key, data] of Object.entries(chatbotResponses)) {
        if (key === 'default') continue;
        
        const matched = data.patterns.some(pattern => 
            message.includes(pattern.toLowerCase())
        );
        
        if (matched) {
            const responses = data.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Default response
    return chatbotResponses.default.responses[0];
}

// Handle user message
function handleUserMessage(message) {
    if (!message.trim()) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Simulate bot thinking time
    setTimeout(() => {
        typingIndicator.remove();
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 1000 + Math.random() * 1000);
}

// Send button click
chatbotSend.addEventListener('click', () => {
    handleUserMessage(chatbotInput.value);
});

// Enter key press
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage(chatbotInput.value);
    }
});

// Quick reply buttons
quickReplyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const query = button.getAttribute('data-query');
        chatbotInput.value = query;
        handleUserMessage(query);
    });
});

// Initial welcome message (already in HTML)
console.log('Chatbot initialized successfully! 💬');
