const Event = require('../models/eventModel');

// Render the Post Event Page
exports.getPostEventPage = (req, res) => {
    res.render('admin/events-post');
};

// Handle Event Submission
module.exports.postEvent = async (req, res) => {
    try {
        const {
            eventType,
            eventTitle,
            dateTime,
            location,
            coordinatorName,
            coordinatorContact,
            competitionName,
            teamSize,
            competitionDescription,
            roundsDescription,
            eventRules,
            speakerName,
            workshopSeminarDescription,
            additionalDetails
        } = req.body;

        const eventData = {
            eventType,
            eventTitle,
            dateTime,
            location,
            coordinatorName,
            coordinatorContact
        };

        if (eventType === 'competition') {
            eventData.competitionDetails = {
                competitionName,
                teamSize,
                competitionDescription,
                roundsDescription,
                eventRules
            };
        } else if (eventType === 'workshop' || eventType === 'seminar') {
            eventData.workshopSeminarDetails = {
                speakerName,
                workshopSeminarDescription,
                additionalDetails
            };
        }

        const newEvent = new Event(eventData);
        await newEvent.save()
        .then(() => {
            res.redirect('/admin/adminhome');
          })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while posting the event.' });
    }
};

// Fetch All Events (for admin dashboard)
module.exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching events.' });
    }
};
