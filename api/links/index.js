const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const linksFilePath = path.join(process.cwd(), 'links.json');
    if (req.method === 'GET') {
        fs.readFile(linksFilePath, 'utf-8', (err, data) => {
            if (err) return res.status(500).json({ error: 'Failed to load links' });
            const links = JSON.parse(data);
            res.json(links);
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}