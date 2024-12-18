
const router = require('express').Router()
const Admin = require("../models/adminLogin");
router.post("/adminlogin", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body for debugging
        const { adminemail, adminpassword } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({  adminemail });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email " });
        }

        // Compare the entered password
        if (admin.adminpassword !== adminpassword) {
            return res.status(400).json({ message: " Invalid password" });
        }

        // Successfully logged in
        res.redirect('/admin/adminhome')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
});
// const User = require('../models/usermodel'); // Import the User model

// router.get('/admin/registered-users', async (req, res) => {
    
//     try {
      
//       const users = await User.find();
//       console.log("Fetched Users:", users); // Log the fetched users data for debugging
//       res.render('registeruser', { users });
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).send("An error occurred while fetching users.");
//     }
//   });
  

module.exports = router
