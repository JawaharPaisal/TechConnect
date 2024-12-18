const express = require('express');
const router = express.Router();
const { postEvent } = require('../controllers/eventController')
router.get('/admin/events-post', (req, res) => {
  res.render('post-event');
});


router.post('/events-post',postEvent)

module.exports = router;
