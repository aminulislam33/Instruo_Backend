const mongoose= require("mongoose")
const User = require("../models/user.js");
const {EventRegistration}= require("../models/eventRegistration.js");

const searchEmail = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email || email.length < 5) {
            return res.status(400).json({ message: "Email query must be at least 5 characters long." });
        }

        const users = await User.find({
            email: { $regex: `^${email}`, $options: 'i' }
        }).select('name email')
        .limit(10);

        if (users.length === 0) {
            return res.status(404).json({ message: "No emails found matching the query." });
        }

        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getStatus= async(req, res)=>{
    if (req.user) {
        const id= req.user;
        const objectId = new mongoose.Types.ObjectId(id);
        const u= await User.findOne({_id: objectId});
        return res.json({ loggedIn: true, user: u });
    } else {
        return res.json({ loggedIn: false });
    }
}

const getAllRegistrations= async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userEmail = user.email;

        const evt = await EventRegistration.find({
            $or: [
                { email: userEmail },
                { 'members.memberEmail': userEmail }
            ]
        }).populate('event');


        const registeredEvents= evt.map(reg=>({
            id: reg.event._id,
            name: reg.event.name
        }));

        if (registeredEvents.length === 0) {
            return res.status(404).json({ message: 'No registered events found' });
        }
        return res.status(200).json(registeredEvents);
    } catch (error) {
        console.error('Error finding user registered events:', error);
        return res.status(500).json(error);
    }
}

module.exports = {
    searchEmail,
    getStatus,
    getAllRegistrations
};