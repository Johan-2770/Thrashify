const express = require('express');
const admin = require('firebase-admin');
const auth = admin.auth();
const db = admin.firestore();
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, userName } = req.body;
  
    try {
      const userRecord = await auth.createUser({ email, password, userName });
      if (!userRecord || !userRecord.uid) {
        throw new Error('User creation failed');
      }
      await db.collection('users').doc(userRecord.uid).set({ email, userName });
  
      res.status(201).send({ uid: userRecord.uid });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
});
  
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userRecord = await auth.getUserByEmail(email);
      if (!userRecord || !userRecord.uid) {
        throw new Error('User not found');
      }

      // TODO: Validate password
  
      res.status(200).send({ uid: userRecord.uid });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
});

module.exports = router;