const Event= require('../models/event.js');

const home= (req, res)=>{
    res.render('./home.ejs')
}

const addEvent= (req, res)=>{
    res.render('./createEvent.ejs')
}

const seeAllEvents= async (req, res)=>{
    const events= await Event.find({});
    res.render('./allEvents.ejs', {events})
}

module.exports= {home, addEvent, seeAllEvents};