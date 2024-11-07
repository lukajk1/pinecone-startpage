const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const linksFilePath = path.join(process.cwd(), 'links.json');
    if (req.method === 'POST') {
        fs.writeFile(linksFilePath, JSON.stringify([], null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to clear links' });
            res.json({ message: 'Links cleared successfully' });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}