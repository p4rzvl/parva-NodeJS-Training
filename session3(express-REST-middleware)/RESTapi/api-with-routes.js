const express = require("express");
const app = express();
app.use(express.json());
PORT = 3000

let authors = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
let books = [
{ id: 1, title: 'Clean Code', authorId: 1 },
{ id: 2, title: 'Refactoring', authorId: 1 },
{ id: 3, title: 'SICP', authorId: 2 },
];
// Done: GET /api/authors
app.get('api/authors', (req, res) => {
    res.json(authors);
})

// Done: GET /api/authors/:id
app.get('api/authors/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id, 10));
    if (!author) return res.status(404).json({ error: "Author not found"})
})
// Done: GET /api/authors/:id/books
app.get('/api/authors/:id/books', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id, 10))
    if (!author) return res.status(404).json({ error: "Author not found"})
    res.json(books.filter(b => b.authorId === author.id))    
});

// Done: POST /api/authors/:id/books
app.post("/api/authors/:id/books", (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id, 10));
    if (!author) return res.status(404).json({ error: 'Author not found' });
    if(!req.body.title)
        return res.status(400).json({error: "title is required"})

    const book = {
        id: books.length + 1,
        title: req.body.title,
        authorId: author.id
        }
    books.push(book);
    res.status(201).json(book)
})
// Done: GET /api/books
app.get('/api/books', (req, res) => {
    res.json(books)
})

app.listen(PORT)