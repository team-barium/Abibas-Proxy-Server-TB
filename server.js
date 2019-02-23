const express = require('express');
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const axios = require('axios');
let id = null;

const app = express();
const port = 3005;

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.post('/randomid', (req, res) => {
    const {randomId} = req.body;
    id = randomId;
    console.log('proxy id', id)
})

app.get('/suggestions', (req, res) => {
    axios
        .get('http://localhost:3004/suggestions', {
            params: {
                id: id
            }
        })
        .then(({ data }) => res.send(JSON.stringify(data)))
        .catch(err => res.send(JSON.stringify(err)))
})

app.get('/abibas/product', (req, res) => {
    axios
        .get('http://localhost:3002/abibas/product', {
            params: {
                id: id
            }
        })
        .then(({ data }) => res.send((data)))
        .catch(err => res.send(err))
})

app.get('/reviews', (req, res) => {
    axios
        .get('http://localhost:3003/reviews', {
            params: {
                id: id
            }
        })
        .then(({ data }) => res.send(JSON.stringify(data)))
        .catch(err => res.send(err))
})

app.get('/reviews/stats', (req, res) => {
    axios
        .get('http://localhost:3003/reviews/stats', {
            params: {
                id: id
            }
        })
        .then(({ data }) => res.send(JSON.stringify(data)))
        .catch(err => res.send(err))
})




app.listen(port, () => console.log(`Server running on port ${port}`));