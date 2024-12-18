const Achievement = require('../models/achievement');

module.exports.uploadAchievement = async (req, res) => {
  try {
    const { title, description ,date ,type } = req.body;

    // Check if an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image!' });
    }

    const image = req.file.path; // Path of the uploaded image

    // Create a new achievement document
    const achievement = new Achievement({
      title,
      description,
      date,
      type,
      image,
      user: req.user._id, // User ID from authMiddleware
    });

    await achievement.save();
    res.status(201).json({ success: true, message: 'Achievement uploaded successfully!', achievement });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
