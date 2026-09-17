const http = require("http");

const hostname = 'E-machine68';
const port = 3000;

const server = http.createServer( (req, res) => {
    //request takes all the data of the request coming into the server
    // res = response gives all the response data 
    let method = req.method + ' ';
    let url = req.url + "\n\n";
    let headers = JSON.stringify(req.headers, null, 4);

    res.writeHead(200, {'Content-Type': 'text/plain'}); //the 200 code means 'OK'
    res.write(method);
    res.write(url);
    res.write(headers);
    read.end();
    });

server.listen(port, hostname, () =>{ //make the server start listening.
    console.log('server running at http://'+hostname+": "+port);
});



