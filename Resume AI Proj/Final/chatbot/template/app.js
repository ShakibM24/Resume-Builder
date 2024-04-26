const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the main chat interface
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'chatbot.html');
});

// API endpoint for handling chat messages
app.post('/api', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful chatbot that gives resume advice." },
                { role: "user", content: userMessage }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.sk-proj-I6za8zUVF4AUOCP7DTVRT3BlbkFJkEPgfgiWg0xhgOXbBI38}`,
                'Content-Type': 'application/json'
            }
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ response: botMessage });
    } catch (error) {
        console.error('Failed to fetch from OpenAI:', error);
        res.status(500).json({ error: 'OpenAI API error', 'details': error.response.data });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
