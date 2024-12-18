const express = require('express');
const router = express.Router();
const Registration = require('../models/registerationmodel');
const Event = require('../models/eventModel');
const User = require('../models/usermodel');
const { userVerification } = require('../middlewares/authmiddleware');
// Register for an event
router.post('/register',userVerification,async (req, res) => {
  try {
    const { eventId, teamMembers } = req.body; 
    const userId = req.user._id;
    if (!userId || !eventId || !teamMembers) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Create a new registration
    const registration = new Registration({
      userId:userId,
      eventId,
      teamMembers,
    });

    await registration.save();
    res.status(200).json({ message: 'Registration successful', registration });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

module.exports = router;
