const express = require("express");
const app = express();
app.use(express.json());
PORT = 3000
let products = [
    { id: 1, name: 'Laptop', category: 'tech', price: 999 },
    { id: 2, name: 'Phone', category: 'tech', price: 499 },
    { id: 3, name: 'Desk', category: 'furniture', price: 299 },
    { id: 4, name: 'Chair', category: 'furniture', price: 199 },
    ];
    app.get('/api/products', (req, res) => {
    const { category, sort, page = 1, limit = 10 } = req.query;
    let result = [...products];
    // Done: filter by categorya (case-insensitive)
    if(category){
        result = result.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
        )
    }
    // Done: sort — check for '-' prefix to determine direction
    if (sort) {
        const descending = sort.startsWith('-');
        const field = ((a, b) => descending
        ? b[field] - a[field]
        : a[field] - b[field]);
    }
    const total = result.length;
    // Done: paginate — slice result based on page & limit

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const start = (pageNum - 1) * limitNum;
    result = result.slice(start, start + limitNum)

    res.json({ data: result, total, page: +page, limit: +limit });
    });

app.listen(PORT)