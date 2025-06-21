/**
 * This script seeds the MongoDB database with sample contacts.
 * Run it with `npm run seed` or `node seed/seed.js` after installing dependencies.
 */
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const contacts = [
  { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567' },
  { name: 'Bob Brown', email: 'bob@example.com', phone: '444-555-6666' },
  { name: 'Rupam Bhakta', email: 'rupam@example.com', phone: '333-444-5555' },
  { name: 'Charlie White', email: 'charlie@example.com', phone: '222-333-4444' },
  { name: 'Diana Prince', email: 'diana@example.com', phone: '111-222-3333' }
];

async function seedDB() {
  try {
    await Contact.deleteMany({});
    await Contact.insertMany(contacts);
    console.log('Database seeded with contacts');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDB();
