const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Course Server</title>
        </head>
        <body>
            <h1>Hello from Erics Server!</h1>
            <p>This page is being served by Node.js and Express.</p>
            <p></p>
            <img src="https://static.vecteezy.com/system/resources/previews/055/395/710/non_2x/a-white-duck-slightly-angled-with-its-orange-webbed-feet-the-duck-appears-alert-and-curious-gazing-forward-with-bright-round-eyes-free-png.png" alt="duck pic" width="400">
        </body>
        </html>
    `);
});

app.listen(PORT, "0.0.0.0", () => {console.log(`Server listening on port ${PORT}`);});

app.get('/api/getName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ name: "Eric was here" });
});

app.get('/api/getImage', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile('Smile.jpg');
});