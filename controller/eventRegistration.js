const {EventRegistration, Member} = require("../models/eventRegistration");
const Event= require("../models/event")

const createRegistration = async (req, res) => {
    try {
        // console.log(req.body.name);
        const paymentSS= [];

        if(req.files){
            const uploadResult = await cloudinary.uploader.upload(req.files[0].path);
                images.push({
                    url: uploadResult.secure_url,
                    filename: uploadResult.public_id,
                });
        }

        const { name, email, phone, members, teamName, eventId } = req.body;

        const allMembers = [];
        for (let member of members) {
            const newMember = new Member({
                memberName: member.memberName,
                memberEmail: member.memberEmail,
                memberPhone: member.memberPhone
            });

            const savedMember = await newMember.save();
            allMembers.push(savedMember);
        }

        const registration = new EventRegistration({
            name,
            email,
            phone,
            members: allMembers,
            teamName,
            event: eventId,
            paymentSS
        });

        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await EventRegistration.find({});
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRegistrationById = async (req, res) => {
    try {
        const registration = await EventRegistration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRegistration = async (req, res) => {
    try {
        const updatedData = req.body;
        const registration = await EventRegistration.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRegistration = async (req, res) => {
    try {
        const registration = await EventRegistration.findByIdAndDelete(req.params.id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRegistration,
    getAllRegistrations,
    getRegistrationById,
    updateRegistration,
    deleteRegistration
};