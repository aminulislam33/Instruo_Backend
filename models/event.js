const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    filename: {
        type: String
    },
    type: {
        type: String,
        enum: ['poster', 'gallery'],
        required: true
    }
});

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rules:{
        type: String,
        required: true
    },
    rulesDoc:{
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    images: [imageSchema],
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;