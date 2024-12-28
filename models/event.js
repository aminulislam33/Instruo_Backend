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
    type:{
        type: String,
        enum: ['Single', 'Team', 'Combined'],
        required: true
    },
    size:{
        type:{
            max: Number,
            min: Number
        }
    },
    description: {
        type: String,
        required: true
    },
    rules:{
        type: String,
    },
    rulesDoc:{
        type: String,
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
    registrationUrl:{
        type: String,
        required: true
    },
    registrationAmount:{
        type: Number
    },
    images: [imageSchema],
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;