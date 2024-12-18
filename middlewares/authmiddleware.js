
// const jwt = require('jsonwebtoken');
// const User = require('../models/usermodel');

// module.exports.userVerification = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false });
//   }

//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.id);
//       if (user) {
//         req.user = user;  
//         return next();  
//         return res.json({ status: false });
//       }
//     }
//   });
// };
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user;  
        return next();  
        return res.json({ status: false });
      }
    }
  });
};
