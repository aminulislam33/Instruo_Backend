const {EventRegistration, Member} = require("../models/eventRegistration");
const { cloudinary } = require("../config/cloudinary");
const Event= require("../models/event")

const createRegistration = async (req, res) => {
    try {
        // console.log(req.body.name);
        const { name, email, phone, members, teamName, eventId } = req.body;

        const alreadyRegistered = await EventRegistration.findOne({email, event: eventId});
        if(alreadyRegistered){
            return res.status(409).json({message: "You have already registered for this event"});
        }

        let paymentProofUrl = '';
        if (req.file && req.file.path) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'PaymentProof',
                resource_type: 'image'
            });
            paymentProofUrl = uploadResult.secure_url;
        }

        const allMembers = [];
        if(members){
            for (let member of members) {
                const newMember = new Member({
                    memberName: member.memberName,
                    memberEmail: member.memberEmail,
                    memberPhone: member.memberPhone
                });
    
                const savedMember = await newMember.save();
                allMembers.push(savedMember);
            }
        }

        const registration = new EventRegistration({
            name,
            email,
            phone,
            members: allMembers,
            teamName,
            event: eventId,
            paymentProof: paymentProofUrl
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