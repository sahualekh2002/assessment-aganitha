const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // allow frontend requests
app.use(bodyParser.json());

// In-memory links storage
let links = []; // { code, longUrl, clicks, lastClicked }

// Create link
app.post('/api/links', (req, res) => {
    const { longUrl, customCode } = req.body;
    const code = customCode || Math.random().toString(36).substring(2, 8);

    const newLink = { code, longUrl, clicks: 0, lastClicked: null };
    links.push(newLink);
    res.json({ success: true, link: newLink });
});

// Get all links
app.get('/api/links', (req, res) => {
    res.json(links);
});

// Redirect short link
app.get('/:code', (req, res) => {
    const link = links.find(l => l.code === req.params.code);
    if (link) {
        link.clicks++;
        link.lastClicked = new Date().toISOString();
        res.redirect(link.longUrl);
    } else {
        res.status(404).send('Link not found');
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
