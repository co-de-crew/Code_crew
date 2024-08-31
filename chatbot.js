const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const predefinedMessages = document.getElementById('predefinedMessages');

function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return;
    
    // Display user message
    displayMessage(text, 'user');

    // Generate and display bot response
    const response = getBotResponse(text);
    displayMessage(response, 'bot');

    // Clear input
    userInput.value = '';
}

function sendPredefinedMessage() {
    const selectedValue = predefinedMessages.value;
    if (!selectedValue) return;
    
    // Map predefined options to messages
    const messages = {
        hotel: "For hotel booking, please specify your destination and dates.",
        taxi: "For taxi booking, please provide your pick-up location and destination.",
        ticket: "For ticket booking, please provide the event name and date.",
        route: "For route checking, please specify your starting point and destination.",
    };

    const message = messages[selectedValue];
    if (message) {
        // Display user message
        displayMessage(message, 'user');

        // Generate and display bot response
        const response = getBotResponse(message);
        displayMessage(response, 'bot');

        // Clear selection
        predefinedMessages.value = '';
    }
}

function displayMessage(text, type) {
    const messageElement = document.createElement('p');
    messageElement.textContent = text;
    messageElement.className = type;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(userMessage) {

    userMessage = userMessage.toLowerCase();
    let response = "";

    // Regular expressions to detect dates and numbers
    const datePattern = /\b(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}|\d{2}-\d{2}-\d{4})\b/;
    const numberPattern = /\b\d+\b/;

    // Check if the userMessage contains a date or number
    if (datePattern.test(userMessage) || numberPattern.test(userMessage)) {
        response = "Your request has been noted.";
    } else if (userMessage.includes('hi') || userMessage.includes('hello')) {
        response = "Hi there! How can I assist you today? Here are the services we offer: travel ticket booking, hotel reservations, taxi services, route finding, dining recommendations, local events, transport info, and emergency contacts.";
    } else if (userMessage.includes('hotel')) {
        if (userMessage.includes('rabong')) {
            response = "For hotel bookings in Rabong, please provide your travel dates and any specific requirements you have. here are some of the best hotels in rabong:  Ligmoo hotel, sikkim residency, hotel buddha ";
        } else {
            response = "For hotel booking, please specify your destination and dates.";
        }
    } else if (userMessage.includes('taxi')) {
        if (userMessage.includes('rabong')) {
            response = "To book a taxi in Rabong, please provide your pick-up location and destination within the town.";
        }else  if (userMessage.includes('nit sikkim')) {
            response = "your taxi booking is confirmed. Our driver will contact you soon ";
        }
         else {
            response = "For taxi booking, please provide your pick-up location and destination.";
        } 
    } else if (userMessage.includes('ticket')) {
        response = "For ticket booking, please provide the event name and date.";
    } else if (userMessage.includes('route')) {
        if (userMessage.includes('rabong')) {
            response = "For route checking in Rabong, please specify your starting point and destination within the area.";
        } else {
            response = "For route checking, please specify your starting point and destination.";
        }
    } else if (userMessage.includes('weather')) {
        response = "For weather updates, please specify the location you're interested in.";
    } else if (userMessage.includes('attractions')) {
        if (userMessage.includes('rabong')) {
            response = "Rabong offers several attractions including scenic spots and cultural sites. Would you like more details on specific attractions?";
        } else {
            response = "For information on attractions, please specify the location you're interested in.";
        }
    } else if (userMessage.includes('dining') || userMessage.includes('restaurant')) {
        if (userMessage.includes('rabong')) {
            response = "In Rabong, you can find a variety of dining options ranging from local cuisine to international dishes. Let me know if you need recommendations!";
        } else {
            response = "For dining recommendations, please specify the location you're interested in.";
        }
    } else if (userMessage.includes('events')) {
        if (userMessage.includes('rabong')) {
            response = "Rabong hosts various local events throughout the year. Please provide a date or type of event you're interested in for more details.";
        } else {
            response = "For information on local events, please specify the location and type of event you're interested in.";
        }
    } else if (userMessage.includes('transport') || userMessage.includes('public transport')) {
        if (userMessage.includes('rabong')) {
            response = "In Rabong, public transport options include buses and shared taxis. Let me know if you need specific routes or schedules.";
        } else {
            response = "For information on public transport, please specify the location you're interested in.";
        }
    } else if (userMessage.includes('emergency')) {
        response = "For emergency contacts, please specify your location, and I can provide the relevant emergency services information.";
    } else {
        response = "Sorry, I didn't understand that. Can you please specify if you need help with hotel, taxi, ticket, route, weather, attractions, dining, events, transport, or emergency services?";
    }

    return response;
}
