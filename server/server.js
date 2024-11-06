const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const linksFilePath = path.join(__dirname, 'links.json');
app.use(express.json()); // Middleware to parse JSON request bodies

// serve static page
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});


app.post('/api/links/clear', (req, res) => {
    fs.writeFile(linksFilePath, JSON.stringify([], null, 2), (err) => { //writefile will create the filepath if it doesn't exist
        if (err) {
            console.error('Error clearing links:', err);
            return res.status(500).json({ error: 'Failed to clear links' });
        }
        res.json({ message: 'Links cleared successfully' });
    });
});

app.get('/api/links', (req, res) => {
    fs.readFile(linksFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading links:', err);
            return res.status(500).json({ error: 'Failed to load links' });
        }
        const links = JSON.parse(data);
        res.json(links);
    });
});

app.post('/api/links/bulkSave', (req, res) => {
    const newLinks = req.body;

    fs.writeFile(linksFilePath, JSON.stringify(newLinks, null, 2), (err) => {
        if (err) {
            console.error('Error saving links:', err);
            return res.status(500).json({ error: 'Failed to save links' });
        }
        res.json({ message: 'All links saved successfully', links: newLinks });
    });
});





