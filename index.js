import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.static("./public"));
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5555


const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/app/', (req, res) => {
    res.status(200).end('OK') 
})

app.get('/app/flip/', (req, res) => {
    flip = coinFlip()
    res.status(200).json({"flip":flip})
})

app.get('/app/flips/:number', (req, res) => {
    flips = coinFlips(req.params.number)
    res.status(200).json({"raw":flips, "summary":countFlips(flips)})
})

app.get('/app/flip/call/heads', (req, res) => {
    flip = flipACoin("heads")
    res.status(200).json(flip)
})

app.get('/app/flip/call/tails', (req, res) => {
    flip = flipACoin("tails")
    res.status(200).json(flip)
})


function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function coinFlips(flips) {
    let flippedCoins = [];
    if(flips < 1 || typeof flips == 'undefined'){
      flips = 1
    }
    for(let i=0; i<flips; i++) {
      flippedCoins.push(coinFlip())
    }
    return flippedCoins
}

function countFlips(array) {
    let head = 0;
    let tail = 0;
    for(let i=0; i < array.length; i++) {
      if(array[i] == 'heads') {
        head++;
      }
      else {tail++;}
    }
    return {heads: head, tails: tail}
}

function flipACoin(call) {
    let result = coinFlip()
    let guess = ' '
    if(result == call) {
      guess = 'win' 
    }
    else {
      guess = 'lose' 
    }
    return {call: call, flip: result, result: guess}
}

app.use(function(req, res) {
    res.status(404).send("404 NOT FOUND")
    res.type("text/plain")
})