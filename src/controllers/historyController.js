const express = require('express');
const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');
const db = admin.firestore();
const router = express.Router();
require('../services/firebase');
require('../services/firestore');

// router.post('/history/:uid?', async (req, res) => {
//     const uid = req.params.uid || req.body.uid;
//     const history = req.body.history || req.body.historyItem;

//     if (!history.foto || !history.namaSampah || !history.jenisSampah || !history.deskripsi) {
//       return res.status(400).send({ error: 'Missing required history properties' });
//     }

//     let now = new Date(Timestamp.now().seconds * 1000);
//     let offsetInHours = 7;
//     now.setHours(now.getHours() + offsetInHours);
//     history.waktu = now.toISOString();

//     try {
//       const userRef = db.collection('users').doc(uid);
//       const doc = await userRef.get();

//       if (!doc.exists) {
//         return res.status(404).send({ error: 'User not found' });
//       }

//       await userRef.set({ history: admin.firestore.FieldValue.arrayUnion(history) }, { merge: true });
  
//       res.status(200).send({ uid, history });
//     } catch (error) {
//       res.status(400).send(error);
//     }
// });

async function postHistory(req, res) {
  const uid = req.params.uid || req.body.uid;
  const history = req.body.history || req.body.historyItem;

  if (!history.foto || !history.namaSampah || !history.jenisSampah || !history.deskripsi) {
    return res.status(400).send({ error: 'Missing required history properties' });
  }

  let now = new Date(Timestamp.now().seconds * 1000);
  let offsetInHours = 7;
  now.setHours(now.getHours() + offsetInHours);
  history.waktu = now.toISOString();

  try {
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send({ error: 'User not found' });
    }

    await userRef.set({ history: admin.firestore.FieldValue.arrayUnion(history) }, { merge: true });

    res.status(200).send({ uid, history });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getHistory(req, res) {
  const uid = req.params.uid;

  if (!uid) {
    return res.status(400).send({ error: 'Missing uid' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send({ error: 'User not found' });
    }

    const userData = doc.data();
    const history = userData.history;

    res.status(200).send({ uid, history });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {postHistory, getHistory};