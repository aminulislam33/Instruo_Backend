const Event = require("../models/event");
const { cloudinary } = require("../config/cloudinary");

const createEvent = async (req, res) => {
    try {
        const images = [];

        if (req.files && req.files.poster) {
            const posterResult = await cloudinary.uploader.upload(req.files.poster[0].path);
            images.push({
                url: posterResult.secure_url,
                filename: posterResult.public_id,
                type: 'poster'
            });
        }

        if (req.files && req.files.gallery) {
            for (const file of req.files.gallery) {
                const galleryResult = await cloudinary.uploader.upload(file.path);
                images.push({
                    url: galleryResult.secure_url,
                    filename: galleryResult.public_id,
                    type: 'gallery'
                });
            }
        }

        const event = new Event({
            ...req.body,
            images: images
        });

        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

async function getEvents(req, res) {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const updatedData = req.body;
        const event = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};