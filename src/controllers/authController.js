const express = require('express');
const admin = require('firebase-admin');
const auth = admin.auth();
const db = admin.firestore();
const router = express.Router();
const bcrypt = require('bcrypt');
require('../services/firebase');
require('../services/firestore');

// router.post('/register', async (req, res) => {
//     const { email, password, confirmPassword, userName } = req.body;
  
//     if (password !== confirmPassword) {
//         return res.status(400).send({ error: 'Passwords do not match' });
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const userRecord = await auth.createUser({ email, hashedPassword, userName });
//       if (!userRecord || !userRecord.uid) {
//         throw new Error('User creation failed');
//       }
//       await db.collection('users').doc(userRecord.uid).set({ email, hashedPassword, userName });
  
//       res.status(201).send({ uid: userRecord.uid });
//     } catch (error) {
//       console.error(error);
//       res.status(400).send({ error: error.message });
//     }
// });

async function Register(req, res) {
  const { email, password, confirmPassword, userName } = req.body;
  
    if (password !== confirmPassword) {
        return res.status(400).send({ error: 'Passwords do not match' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userRecord = await auth.createUser({ email, hashedPassword, userName });
      if (!userRecord || !userRecord.uid) {
        throw new Error('User creation failed');
      }
      await db.collection('users').doc(userRecord.uid).set({ email, hashedPassword, userName });
  
      res.status(201).send({ uid: userRecord.uid });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
}

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const userRecord = await db.collection('users').where('email', '==', email).get();
//       if (userRecord.empty) {
//         throw new Error('Login failed');
//       }

//       const userData = userRecord.docs[0].data();
//       const passwordMatch = await bcrypt.compare(password, userData.hashedPassword);
//       if (!passwordMatch) {
//         throw new Error('Login failed');
//       }
  
//       res.status(200).send({ uid: userRecord.docs[0].id });
//     } catch (error) {
//       console.error(error);
//       res.status(400).send({ error: error.message });
//     }
// });

async function Login(req, res) {
  const { email, password } = req.body;
  
    try {
      const userRecord = await db.collection('users').where('email', '==', email).get();
      if (userRecord.empty) {
        throw new Error('Login failed');
      }

      const userData = userRecord.docs[0].data();
      const passwordMatch = await bcrypt.compare(password, userData.hashedPassword);
      if (!passwordMatch) {
        throw new Error('Login failed');
      }
  
      res.status(200).send({ uid: userRecord.docs[0].id });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
}

// router.post('/logout', async (req, res) => {
//     const { uid } = req.body;
  
//     try {
//       req.session.destroy(err => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send({ error: err.message });
//         }

//         res.status(200).send({ message: 'Logout success' });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(400).send({ error: error.message });
//     }
// });

async function Logout(req, res) {
  const { uid } = req.body;
  
    try {
      req.session.destroy(err => {
        if (err) {
          console.error(err);
          return res.status(500).send({ error: err.message });
        }

        res.status(200).send({ message: 'Logout success' });
      });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
}

// module.exports = router;
module.exports = {Register, Login, Logout};