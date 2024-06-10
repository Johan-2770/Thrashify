const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./src/config/firebase');
const db = require('./src/config/firestore'); // Ganti dengan path yang benar ke file firestore.js Anda
const authController = require('./src/controllers/authController'); // Ganti dengan path yang benar ke file authController Anda

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Gunakan controller auth
app.use('/auth', authController);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});