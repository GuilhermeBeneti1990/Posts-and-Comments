const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    // POSTS MICROSERVICE
    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    // COMMENTS MICROSERVICE
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    // QUERY MICROSERVICE
    axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    // MODERATION MICROSERVICE
    axios.post('http://moderation-srv:4003/events', event).catch((err) => { 
        console.log(err.message);
    });

    res.send({
        status: 'OK'
    });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('App running on 4005');
});