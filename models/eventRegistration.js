const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },
    memberEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validateEmail,
            message: 'Please enter a valid email address'
        }
    },
    memberPhone: {
        type: String,
        required: true,
        validate: {
            validator: validatePhone,
            message: 'Please enter a valid 10-digit phone number'
        }
    }
});

const eventRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validateEmail,
            message: 'Please enter a valid email address'
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: validatePhone,
            message: 'Please enter a valid 10-digit phone number'
        }
    },
    members: {
        type: [memberSchema],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    teamName: {
        type: String,
        trim: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
}, { timestamps: true });

function validateEmail(email) {
    const emailRegex = /.+@.+\..+/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function arrayLimit(val) {
    return val.length >= 1 && val.length <= 5; 
}

const EventRegistration = mongoose.model("EventRegistration", eventRegistrationSchema);
module.exports = EventRegistration;