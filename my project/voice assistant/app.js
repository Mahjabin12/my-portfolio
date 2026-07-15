// Select elements
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to speak text
function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Function to wish the user based on the time of day
function wishMe() {
    const day = new Date();
    const hr = day.getHours();

    if (hr >= 0 && hr < 12) {
        speak("Good Morning Boss");
    } else if (hr === 12) {
        speak("Good Noon Boss");
    } else if (hr > 12 && hr <= 17) {
        speak("Good Afternoon Boss");
    } else {
        speak("Good Evening Boss");
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    speak("Activating Inertia");
    speak("Going online");
    wishMe();
});

// Set up speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript.toLowerCase();
    content.textContent = transcript;
    handleIntent(transcript);
};

btn.addEventListener('click', () => {
    recognition.start();
    console.log("Voice recognition started");
});

// Handle commands using NLP
function handleIntent(message) {
    const doc = nlp(message);
    const response = {
        reply: "I did not understand what you said, please try again.",
        action: null
    };

    // Detect intent using NLP
    const greetings = doc.match('(hello|hi|hey)').found;
    const askName = doc.match('(your name|who are you)').found;
    const howAreYou = doc.match('(how are you)').found;
    const openGoogle = doc.match('open google').found;
    const openInstagram = doc.match('open instagram').found;
    const searchQuery = doc.match('(what is|who is|what are)').found;
    const timeRequest = doc.match('time').found;
    const dateRequest = doc.match('date').found;
    const wikipediaSearch = doc.match('wikipedia').found;

    // Determine response and action
    if (greetings) {
        response.reply = "Hello Boss!";
    } else if (askName) {
        response.reply = "My name is Inertia.";
    } else if (howAreYou) {
        response.reply = "I am fine, boss. Tell me how can I help you.";
    } else if (openGoogle) {
        response.reply = "Opening Google.";
        response.action = () => window.location.href = "https://google.com";
    } else if (openInstagram) {
        response.reply = "Opening Instagram.";
        response.action = () => window.location.href = "https://instagram.com";
    } else if (searchQuery) {
        const query = doc.after('(what is|who is|what are)').text().trim();
        response.reply = `Searching the internet for ${query}.`;
        response.action = () => window.location.href = `https://www.google.com/search?q=${query.replace(" ", "+")}`;
    } else if (wikipediaSearch) {
        const query = doc.after('wikipedia').text().trim();
        response.reply = `Searching Wikipedia for ${query}.`;
        response.action = () => window.location.href = `https://en.wikipedia.org/wiki/${query}`;
    } else if (timeRequest) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        response.reply = `The time is ${time}.`;
    } else if (dateRequest) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        response.reply = `Today's date is ${date}.`;
    } else {
        const query = message.replace(" ", "+");
        response.reply = `I found some information for ${message} on Google.`;
        response.action = () => window.location.href = `https://www.google.com/search?q=${query}`;
    }

    // Execute action and speak the reply
    if (response.action) {
        setTimeout(response.action, 1000); // Delay action to ensure speech is completed
    }
    speak(response.reply);
}
