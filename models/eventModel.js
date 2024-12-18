const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
        enum: ['competition', 'workshop', 'seminar']
    },
    eventTitle: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    coordinatorName: {
        type: String,
        required: true
    },
    coordinatorContact: {
        type: String,
        required: true
    },
    competitionDetails: {
        competitionName: String,
        teamSize: Number,
        competitionDescription: String,
        roundsDescription: String,
        eventRules: String
    },
    workshopSeminarDetails: {
        speakerName: String,
        workshopSeminarDescription: String,
        additionalDetails: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
