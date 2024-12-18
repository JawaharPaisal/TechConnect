// registration.controller.js
const Registration = require('../models/registration');
const Event = require('../models/eventModel');

exports.registerForEvent = async (req, res) => {
    const { userId, eventId, teamMembers } = req.body;

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the event requires team members
        if (event.eventType === 'competition' && event.competitionDetails.teamSize > 1) {
            if (!teamMembers || teamMembers.length !== event.competitionDetails.teamSize - 1) {
                return res.status(400).json({ message: `This event requires ${event.competitionDetails.teamSize - 1} team members` });
            }
        }

        // Save the registration
        const registration = new Registration({
            userId,
            eventId,
            teamMembers: teamMembers || []
        });
        await registration.save();

        res.status(201).json({ message: 'Registered successfully', registration });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
