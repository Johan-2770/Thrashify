app.post('/history', async (req, res) => {
    const { uid, history } = req.body;
  
    try {
      const userRef = db.collection('users').doc(uid);
      await userRef.update({ history });
  
      res.status(200).send({ uid, history });
    } catch (error) {
      res.status(400).send(error);
    }
  });