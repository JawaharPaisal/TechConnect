const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors");
const bodyParser = require('body-parser');
const achievementRoutes = require('./routes/achievements'); // Import the router
const Achievement = require('./models/achievement'); // Import Achievement model
const app = express();
const path = require('path');
const Event = require('./models/eventModel');
require("dotenv").config();
const cookieParser =require("cookie-parser");
const authroute = require("./routes/authroute");
const adminroute = require("./routes/adminroute");
const { MONGO_URL, PORT } = process.env;
const User = require("./models/usermodel");
const Registration = require("./models/registerationmodel")
const registrationRoutes = require('./routes/registerationroute');
const jwt = require('jsonwebtoken');


mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


app.use(
  cors({
    origin: ["http://127.0.0.1:5500/client/","null"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true ,
  })
);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static('uploads'));

app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/Image', express.static(path.join(__dirname, 'public/Image')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/", authroute);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', registrationRoutes);
app.use('/achievements', achievementRoutes);
app.use('/admin',adminroute);

app.get('/login', (req, res) => {
  res.render('login');  
});

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    admissionsEveryYear: 200,
    placementEveryYear: 160,
    passingRate: 98
  });
});
// Logout Route
//app.get('/logout', (req, res) => 
//   res.clearCookie('token'); 
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).send('Error during session destruction');
//     }
//     res.redirect('/'); 
//   });
// });

app.get('/contact', (req, res) => {
  res.render('contact');  // Render the login.ejs page
});

// app.get('/allEvents', async (req, res) => {
//   try {
//     const events = await Event.find(); // Fetch events from the database
//     res.render('event', { events }); // Pass the events to event.ejs
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).send("An error occurred while fetching events.");
//   }
// });

app.get('/allEvents', async (req, res) => {
  try {
      const events = await Event.find(); // Fetch events from database
      const currentDate = new Date();

      const expiredEvents = events.filter(event => new Date(event.dateTime) < currentDate);
      const upcomingEvents = events.filter(event => new Date(event.dateTime) >= currentDate);

      res.render('event', { events,expiredEvents, upcomingEvents });
  } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('An error occurred while fetching events.');
  }
});



app.get('/achievements', async (req, res) => {
  try {
      const achievements = await Achievement.find({ status: 'Approved' }).populate('user', 'username rollnumber'); // Fetch only approved achievements
      res.render('achievement_page', { achievements });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching achievements');
  }
});


// Route to render the achievements page
app.get('/achievementpost', (req, res) => {
  res.render('achievementpost');
});
app.get('/admin/adminlogin', (req, res) => {
  res.render('adminlogin'); // Render the adminlogin.ejs file
});
app.get('/admin/adminhome', (req, res) => {
  res.render('adminhome'); // Render the adminlogin.ejs file
});

app.get('/admin/events-post', (req, res) => {
  res.render('post-event'); // Render events-post.ejs
});

const eventRoutes = require('./routes/eventRoutes');
app.use('/admin', eventRoutes);

// Route to render achievements page
app.get('/admin/achievement-verify', async (req, res) => {
  try {
    // Fetch all achievements with status "Requested" and populate user details
    const achievements = await Achievement.find({ status: 'Requested' }).populate('user', 'username rollnumber');
    res.render('achievementverify', { achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).send("An error occurred while fetching achievements.");
  }
});

// Route to handle approve action
app.post('/admin/approve-achievement/:id', async (req, res) => {
  try {
    // Update the status of the achievement to "Approved"
    await Achievement.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.redirect('/admin/achievement-verify'); // Redirect to the achievement verify page
  } catch (error) {
    console.error("Error approving achievement:", error);
    res.status(500).send("An error occurred while approving the achievement.");
  }
});

// Route to handle reject action
app.post('/admin/reject-achievement/:id', async (req, res) => {
  try {
    // Delete the achievement from the database
    await Achievement.findByIdAndDelete(req.params.id);
    res.redirect('/admin/achievement-verify'); // Redirect to the achievement verify page
  } catch (error) {
    console.error("Error rejecting achievement:", error);
    res.status(500).send("An error occurred while rejecting the achievement.");
  }
});

// app.get('/admin/registered-users', async (req, res) => {
//   try {
//     const users = await User.find(); 
//     console.log("Fetched Users:", users); 
//     res.render('registeruser', { users }); 
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send("An error occurred while fetching users.");
//   }
// });
app.get('/admin/registered-users', async (req, res) => {
    const { eventName, eventDate } = req.query;

    try {
        // Fetch all events for the dropdown
        const events = await Event.find({}, 'eventTitle');

        if (eventName || eventDate) {
            const eventFilter = {};
            if (eventName) eventFilter.eventTitle = eventName;
            if (eventDate) eventFilter.dateTime = new Date(eventDate);

            const filteredEvents = await Event.find(eventFilter);
            const eventIds = filteredEvents.map(event => event._id);

            // Assuming a Registration schema linking users to events
            const registeredUsers = await Registration.find({ eventId: { $in: eventIds } }).populate('userId');
            const users = registeredUsers.map(registration => registration.userId);

            return res.render('registeruser', { users, events });
        }

        // Default: Show all users
        const users = await User.find();
        res.render('registeruser', { users, events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



app.get('/admin/adminlogout', (req, res) => {
  // Clear session or cookies as needed
  res.redirect('/admin/adminlogin'); // Redirect to admin login page

});
