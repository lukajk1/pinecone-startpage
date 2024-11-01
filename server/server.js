const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

let links = [
//  { id: 1, title: "goodreads", url: "https://www.goodreads.com" },
//  { id: 2, title: "youtube", url: "https://www.youtube.com" },
//  { id: 3, title: "reddit", url: "https://www.reddit.com" }
];

// Serve static files (like your HTML)
app.use(express.static(__dirname));

// Get all links
app.get('/links', (req, res) => {
  res.json(links);
});

// Add a new link
app.post('/links', (req, res) => {
  const newLink = {
    id: links.length ? links[links.length - 1].id + 1 : 1,
    title: req.body.title,
    url: req.body.url
  };
  links.push(newLink);
  res.status(201).json(newLink);
});

// Update an existing link
app.put('/links/:id', (req, res) => {
  const linkId = parseInt(req.params.id, 10);
  const linkIndex = links.findIndex(link => link.id === linkId);

  if (linkIndex !== -1) {
    links[linkIndex] = { ...links[linkIndex], ...req.body };
    res.json(links[linkIndex]);
  } else {
    res.status(404).send('Link not found');
  }
});

// Delete a link
app.delete('/links/:id', (req, res) => {
  const linkId = parseInt(req.params.id, 10);
  const linkIndex = links.findIndex(link => link.id === linkId);

  if (linkIndex !== -1) {
    links.splice(linkIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Link not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
