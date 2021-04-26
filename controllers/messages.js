const Messages = require('../models/Message');

exports.getMessages = (req, res, next) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
};

exports.newMessage = (req, res, next) => {
    const dbMessage = req.body;
    console.log(dbMessage);

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else
            res.status(201).send(data);
    })
};