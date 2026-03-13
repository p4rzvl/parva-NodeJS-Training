const express = require('express')
const app = express()
const PORT = 3000

app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.get('/info', (req, res) => {
    res.json({
        node: process.version,
        platform: process.platform
    });
});

app.get("/env", (req, res) => {
    res.json({
        environment: process.env.NODE_ENV || "developement"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});