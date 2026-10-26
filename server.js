//eric glowala #3157631
const express = require("express");
const path = require("path");

const app = express();
let logo = path.join(__dirname,"pictures/MtgLogo.png");
const PORT = process.env.PORT || 3000;

    app.use(express.json());//hey I know the milestone says "url-encoded or general form-data through a body parser" so I hope that parsing some JSON is okay even through you don't explicity list it!

app.use('/pictures', express.static(path.join(__dirname, 'pictures')));

//I use route parameters to accept a cardname from the URL instead of using the form
app.get("/card/:name", (req, res) => {
    let cardname = req.params.name;
    console.log("parameter detected on serverside: "+cardname);
    res.sendFile(__dirname+"/public/ericnexus.html");
});


//base case they get sent to the homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/ericnexus.html");
});

app.post("/ericscore",(req,res)=>{
    //note to self: when a card has no color (Eldrazi) the color identity will be == 0. If it's a land, power/toughness will be undefined.  
    const card = req.body; //I don't want to keep on typing req.body.blah blah blah
    console.log(card);
    let score = 0;
    //To make creating my HTML addition easy i'll make arrays to keep track of the reasoning 
    let details = [];//This is where I'll keep track of the stuff to build the returned HTML with
    const favorites = ["Emrakul, the Aeons Torn", "Kozilek, the Great Distortion", "Ulamog, the Ceaseless Hunger", "Endbrigner","All Is Dust", "Eldrazi Scion", "Glaring Fleshraker", "Kozilek's Command"];
    let s = `<div id="cardiv">`; //start the new html as a new div to be nested inside one on the webpage
    s+=`<h1>ERIC'S MTG CARD EVALUATOR™`;
    s+="<p>===========================</p></h1>";//cool dividing line
    s+=`<img src="${card.image_uris.normal}"></img>`;//get the cool image of the card
    s+=`<p>Card: ${card.name}</p>`;

    if (favorites.includes(card.name)) { //I am very biased
    score += 15;
    details.push("Eric's personal favorite: +15");}
    //Check the CMC of the card
    let cmc = card.cmc;
    //I think that certain CMCs are better than others so imma use a switch case to check em
    switch (cmc) { //gonna make all the cases a single line so i can save line space, you're welcome.
        case cmc=0:score +=3; details.push("You can't get a better mana cost than free! +3");break;
        case cmc=1:score +=2; details.push("A one-drop is pretty cool +2");break;
        case cmc=2:score +=3; details.push("Pretty cheap! +3");break;
        case cmc=3:score +=1; details.push("Three cost is nice +1"); break;
        case cmc=4:score +=0; details.push("Four cost is kinda mid. +0");break;
        case cmc=5:score -=5; details.push("Five mana drops are lame -5");break;
        case cmc=6:score +=1; details.push("Six mana? things are getting interesting +1");break;
        case cmc=7:score +=4; details.push("Seven mana? thats enough to proc Ugin's Labrinth! +4");break;
        case cmc=8:score -=1; details.push("Expensive mana cost -1");break;
        case cmc=9:score -=2; details.push("Expensive mana cost -2");break;
        case cmc=10:score +=7; details.push("TEN MANA?? THIS SPELL MUST BE SO GOOD +7");break;
        case cmc=11:score +=5; details.push("ELEVEN MANA?? ARE YOU CASTING ULAGMOG? HOORAY!! +5");break;
        case cmc=12:score +=5; details.push("TWELVE MANA?? THIS CARD MUST BE GOATED +5");break;
        case cmc=13:score +=13; details.push("IS THAT EMRAKUL THE PROMISED END?? +13");break;
        case cmc=14:score -=14; details.push("I don't even think there is a 14-CMC spell dude -14");break;
        case cmc=15:score +=15; details.push("IS THAT EMRAKUL THE AEONS TORN?? +15");break; //I love emrakul
        case cmc=16:score +=3; details.push("Draco is pretty cool +3");break;
        case cmc>16:score +=100; details.push("ARE YOU CASTING GLEEMAX?? +100");break;
        default:
           score-=1; details.push("What is the cmc? -1");
            break;}


            //Time to judge the contents of the card's typeline! 
    let subtypes = card.type_line;
    if(subtypes.includes("Creature")){score+=2; details.push("Creatures are pretty cool +2");}
    if(subtypes.includes("Basic")){score+=2; details.push("Can't go wrong with a basic land +2");}
    if(subtypes.includes("Legendary")){score+=1; details.push("Legendary +1");}
    if(subtypes.includes("Token")){score+=3; details.push("Tokens are cool +3");}
    if(subtypes.includes("Artifact")){score+=3; details.push("Artifacts are cool +3");}
    if(subtypes.includes("Instant")){score-=3; details.push("Instants are for nerds -3");}
    if(subtypes.includes("Enchantment")){score-=5; details.push("Enchantments are for losers -5");}
    if(subtypes.includes("Eldrazi")){score+=21; details.push("I love Eldrazi!!!! +21");}
    if(subtypes.includes("Drone")){score+=6; details.push("Drones are so cool! +6");}
    if(subtypes.includes("Processor")){score+=8; details.push("Eldrazi Processor?? Amazing +8");}
    if(subtypes.includes("Merfolk")){score-=8; details.push("Merfolk are so lame -8");}
    if(subtypes.includes("Goblin")){score-=2; details.push("Goblin -2");}
    if(subtypes.includes("Human")){score-=3; details.push("Humans are boring -3");}
    if(subtypes.includes("Dinosaur")){score-=5; details.push("Dinosaurs are lameeee -5");}


    if(card.power!=undefined){//if it is a creature then it will have a toughness so I don't need to check for both
        //check out my cool P/T formula:
        let PT = (Number(card.power) + Number(card.toughness)) - (cmc * 2); //higher stats for lower cost will get a better score.
        score += PT;
        details.push(`Power/Toughness rating: ${PT}`);
    }

    //checking for keywords in the card now
    let keywordArray = card.keywords; 
    if(keywordArray.length!=undefined && keywordArray.length != 0){//if the card has any keywords
        for(keywords in keywordArray){
            score+=2;//card gets +2 points for every keyword it has!
        }
        details.push(`${keywordArray.length} keywords +${keywordArray.length * 2} `);
    }

    //now that the calculation is out of the way, we can keep appending to the html.
    s+=  `<h2>Ericscore: ${score}</h2>`;

//time to list all the details and reasoning
   s += "<ul>";//start the list
for (const reason of details) {//add all the details we pushed earlier!
    s += `<li>${reason}</li>`;
}
s += "</ul>";//end the list 
    s+=`</div>`//close the new div
    res.send(s);
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

app.use((req,res)=>{//404 handler goes last
    res.status(404).sendFile(__dirname+"/public/404.html");
});
app.use((err,req,res,next)=>{//500 handler
    res.status(500).sendFile(__dirname+"/public/500.html");
});