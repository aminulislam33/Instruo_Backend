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
    images: [imageSchema],
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;