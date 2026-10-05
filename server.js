const express = require("express");
const path = require("path");

const app = express();
let logo = path.join(__dirname,"pictures/MtgLogo.png");
const PORT = process.env.PORT || 3000;
app.use('/pictures', express.static(path.join(__dirname, 'pictures')));
app.get("/", (req, res) => {
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MTG EricScore™</title>
        </head>
        <body>
            <h1>Welcome to EricScore™!</h1>
            <p>This page is currently under construction.</p>
            <p></p>
            <img src="/pictures/MtgLogo.png" alt="Awesome Logo" width="400">
        </body>
        </html>
    `);
});

app.listen(PORT, "0.0.0.0", () => {console.log(`Server listening on port ${PORT}`);});

app.get('/api/getName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ name: "MTG EricScore™" });
});

app.get('/api/getImage', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(logo);
});