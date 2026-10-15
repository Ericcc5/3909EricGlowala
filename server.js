//eric glowala #3157631
const express = require("express");
const path = require("path");

const app = express();
let logo = path.join(__dirname,"pictures/MtgLogo.png");
const PORT = process.env.PORT || 3000;
app.use('/pictures', express.static(path.join(__dirname, 'pictures')));
app.get("/", (req, res) => {
    
    res.sendFile(__dirname+"/public/ericnexus.html");
});


app.listen(PORT, "0.0.0.0", () => {console.log(`Server listening on port http://localhost:${PORT}`);});

app.get('/api/getName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ name: "MTG EricScore™" });
});

app.get('/api/getImage', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(logo);
});

app.use((req,res)=>{//404 handler
    res.status(404).sendFile(__dirname+"/public/404.html");
});
app.use((err,req,res,next)=>{//500 handler
    res.status(500).sendFile(__dirname+"/public/500.html");
});
