const express = require('express')
const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    res.send("Welcome to Express");
});

app.get("/about", (req, res) => {
    res.json({name: "Express Application", version: '1.0'});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

