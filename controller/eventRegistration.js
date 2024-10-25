const EventRegistration = require("../models/eventRegistration");

const createRegistration = async (req, res) => {
    try {
        const { name, email, phone, members, teamName, event } = req.body;
        
        const registration = new EventRegistration({
            name,
            email,
            phone,
            members,
            teamName,
            event
        });

        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await EventRegistration.find();
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