// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const Achievement = require('../models/achievement');
// const User = require('../models/usermodel');
// const { userVerification } = require('../middlewares/authmiddleware');
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/; // Allowed image formats
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);  // Accept file
//     }
//     cb('Error: Only images are allowed!');  // Reject file
//   },
// });

// // POST route to upload achievement
// router.post('/upload', userVerification, upload.single('image'), async (req, res) => {
//   try {
//     const { title, description ,date ,type } = req.body;


//     // If no image was uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload an image!" });
//     }

//     const image = req.file.path;  // The path of the uploaded image

//     // Ensure the user ID is available from the authentication middleware
//     const userId = req.user._id;

//     // Create a new achievement document
//     const achievement = new Achievement({
//       title,
//       description,
//       date,
//       type,
//       category,
//       level,
//       group
//       image,
//       user: userId,  // Store the authenticated user's ID
//     });

//     // Save achievement and log any validation errors
//     await achievement.save()
//       .then(() => {

       
//         res.redirect('/achievements?success=true');
        
//       })
//       .catch((error) => {
//         console.error('Error saving achievement:', error);
//         res.status(500).json({ message: 'Error saving achievement: ' + error.message });
//       });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const Achievement = require('../models/achievement');
const User = require('../models/usermodel');
const { userVerification } = require('../middlewares/authmiddleware');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/; // Allowed image formats
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);  // Accept file
      }
      cb('Error: Only images are allowed!');  // Reject file
    },
  });
// Route to handle achievement upload
router.post('/upload',userVerification, upload.single('image'), async (req, res) => {
    try {
        const {
            title,
            date,
            type,
            category,
            level,
            reward,
            description,
            isGroupAchievement,
            groupMembers,
        } = req.body;

        const userId = req.user._id;
        const achievement = new Achievement({
            title,
            date,
            type,
            category,
            level,
            reward,
            description,
            isGroupAchievement: isGroupAchievement === 'on',
            groupMembers: JSON.parse(groupMembers || '[]'),
            image: req.file ? req.file.path : null,
            user: userId,
        });

        await achievement.save()
              .then(() => {
        res.redirect('/achievements?success=true');
      })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to upload achievement' });
    }
});

module.exports = router;
