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
        validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
        default: null,
    },
    teamName: {
        type: String,
        trim: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    paymentProof: {
        type: String
    },
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
    return !val || (val.length >= 0 && val.length <= 5);
}

const EventRegistration = mongoose.model("EventRegistration", eventRegistrationSchema);
const Member= mongoose.model("Member", memberSchema);

module.exports = {EventRegistration, Member};



/*
1. Name of the Person who is registering (Name)
2. Email Id
3. Phone No.
4. Team members (To be kept optional.. must be shown for team registration) (Max 5 members including the person who is registering)
   -- For each member.. collect their name, email, phone no.
5. Team Name (Optional) (Only for Team registration)
*/

