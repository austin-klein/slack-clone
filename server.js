// imports
require('dotenv').config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room')
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const Pusher = require('pusher');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

const pusher = new Pusher({
    appId: "1180792",
    key: "a638627c0b2d7ee10312",
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true
});

const db = mongoose.connection;


db.once('open', () => {
    console.log('db connected')

    const msgCollection = db.collection('messages');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                image: messageDetails.image,
                time: messageDetails.time,
                repeat: messageDetails.repeat,
                room: messageDetails.room
            });
        } else {
            console.log('error');
        }
    }))
});

//connect to mongoDB database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(messageRoutes);

// user route

app.get('/user', async (req, res, next) => {
    const username = req.query.user;
    User.findOne({ username: username }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data.image)
        }
    });
})

// room routes

app.post('/new', async (req, res, next) => {
    console.log(req.body)

    try {
        const newRoom = await Room.create(req.body)
        res.send(newRoom)
    } catch (error) {
        res.send(error);
    }
})

app.get('/rooms', async (req, res, next) => {

    Room.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            console.log(data);
            res.status(200).send(data)
        }
    })
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));