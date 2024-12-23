const User = require("../models/user.js");
const mongoose= require("mongoose")

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

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getStatus= async(req, res)=>{
    if (req.user) {
        const id= req.user;
        const objectId = new mongoose.Types.ObjectId(id);
        const u= await User.findOne({_id: objectId});
        res.json({ loggedIn: true, user: u });
    } else {
        res.json({ loggedIn: false });
    }
}

module.exports = {
    searchEmail,
    getStatus
};
