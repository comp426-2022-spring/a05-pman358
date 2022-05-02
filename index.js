import { coinFlip, coinFlips, countFlips, flipACoin } from "./coin.mjs";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.static("./public"));
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000


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


app.use(function (req, res) {
  res.status(404).send("404 NOT FOUND");
});