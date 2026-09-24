
const http = require('http');
const fs = require("fs");
const path = require("path");

const hostname = '127.0.0.1'
const port = 3000; //port number where the server will run

var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.jpg': 'image/jpeg'
}

function send404(response){
    response.writeHead(404, {'Content-Type': ""})

}

const server = http.createServer( (req, res) => {
    //request takes all the data of the request coming into the server
    // res = response gives all the response data 
    let file_url
    if (req.url === "/"){
    file_url = req.url;
    }
    
    let filepath = path.join(__dirname, "public",req.url); 
    if(!fs.existsSync(filepath)){
        send404(res);//todo
        return;
    }
    
    let fileExt = path.extname(filepath);
    //time to make a dictionary to fid the Mimetype
    let mimeType = mimeLookup[fileExt]
    if (!mimeType){
        send404(res);
        return;
    }
    //if we are at this point then we're past checking for correct stuff
   

    
    let method = req.method + ' pebis';
    let url = req.url + "\n\n";
    let headers = JSON.stringify(req.headers, null, 4);

// the res means the response that we write to send back to the client of our server

    res.writeHead(200, {'Content-Type': mimeType}); //the 200 code means 'OK'
    //res.writeHead(200, {'Content-Type': mimeType});
    fs.createReadStream(filepath).pipe(res);
    });

server.listen(port, hostname, () =>{ //make the server start listening.
    console.log(`server running at http://${hostname}:${port}/`);
});