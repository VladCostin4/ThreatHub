const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sunlit-plasma-338710-default-rtdb.firebaseio.com',
});

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Middleware to validate API key
const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized: API key missing' });
  }

  // Check if the apiKey is valid (you need to implement this logic)
  // For simplicity, let's assume apiKey is stored in a Firestore collection named 'apiKeys'
  const apiKeySnapshot = await admin.firestore().collection('apiKeys').where('key', '==', apiKey).get();

  if (apiKeySnapshot.empty) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  // API key is valid, continue to the next middleware
  next();
};

app.use(validateApiKey);

app.post('/query', async (req, res) => {
  try {
    const { type, query } = req.body;

    let result;

    if (type === 'url') {
      // Query Firestore based on URL
      const urlSnapshot = await admin.firestore().collection('detected_urls').where('url', '==', query).get();
      result = urlSnapshot.docs.map(doc => doc.data());
    } else if (type === 'file') {
      // Query Firestore based on file
      const fileSnapshot = await admin.firestore().collection('detected_files').where('filename', '==', query).get();
      result = fileSnapshot.docs.map(doc => doc.data());
    } else {
      return res.status(400).json({ error: 'Invalid query type' });
    }

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});