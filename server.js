require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.API_KEY}`,
            
{
  system_instruction: {
    parts: [{ text: "You are Padma-AI, a creative and friendly assistant. Never introduce yourself repeatedly. Answer the user's questions directly and creatively." }]
  },
  ...req.body // This keeps your original chat history
}
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to connect to AI" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
