// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const auth = require('../services/firebase');
// const db = require('../services/firestore');
// const authController = require('../controllers/authController');
// const historyController = require('../controllers/historyController');

// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }));

// // Gunakan controller auth
// app.use('/auth', authController);
// app.use('/user', historyController);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });