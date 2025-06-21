const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to local MongoDB (make sure MongoDB is running locally)
mongoose.connect('mongodb://localhost:27017/contactdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Simple route to check server
app.get('/', (req, res) => {
  res.send('Contact Search API is running');
});

/**
 * GET /contacts
 * Optional query parameter: ?search=keyword
 * If `search` is provided, perform a case-insensitive search on name and email.
 * Otherwise, return all contacts.
 */
app.get('/contacts', async (req, res) => {
  try {
    const searchTerm = req.query.search;
    let query = {};
    if (searchTerm) {
      // Case-insensitive regex match on name or email
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } }
        ]
      };
    }
    const contacts = await Contact.find(query);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /contacts
 * Add a new contact
 */
app.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
