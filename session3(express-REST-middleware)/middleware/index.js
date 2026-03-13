const express = require('express')
const app = express()

const requestLogger = (req, res, next) => {
    const start = Date.now()
    const ts = new Date().toISOString();

    res.on("finish", () => {
        const ms = Date.now() - start;
        console.log(
            `[${ts}] ${req.originalUrl} ${res.statusCode} ${ms}ms`
        )
    })

    next();
}

app.use(requestLogger)
app.use(express.json())

app.get('/api/products', (req, res) => {
    res.json([{ id: 1, name: 'Laptop'}]);
})

app.post('/api/users', (req, res) => {
    res.status(201).json({ id : 1, ...req.body})
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))