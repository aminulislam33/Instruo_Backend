const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    filename: {
        type: String
    }
});

const eventSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String
    },
    gallery: [imageSchema]

}, { timestamps: true });

const Event = mongoose.model("event", eventSchema);
module.exports = Event;