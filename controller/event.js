const Event = require("../models/event");
const {cloudinary} = require("../config/cloudinary");

async function createEvent(req, res) {
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
}

async function getEvents(req, res) {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEvent,
    getEvents
};