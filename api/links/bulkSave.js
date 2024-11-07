
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const linksFilePath = path.join(process.cwd(), 'links.json');
    if (req.method === 'POST') {
        const newLinks = req.body;
        fs.writeFile(linksFilePath, JSON.stringify(newLinks, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to save links' });
            res.json({ message: 'All links saved successfully', links: newLinks });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}   