import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [addError, setAddError] = useState('');

  // Fetch all contacts
  const fetchAllContacts = () => {
    fetch('/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  };

  // Fetching contacts by search term
  const fetchContactsBySearch = (term) => {
    fetch(`/contacts?search=${term}`)
      .then(res => res.json())
      .then(data => setContacts(data));
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchAllContacts();
    } else {
      fetchContactsBySearch(searchTerm);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  // Clear search and show all contacts
  const handleClear = () => {
    setSearchTerm('');
    fetchAllContacts();
  };

  // Handle add contact form change
  const handleAddChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  // Handle add contact submit
  const handleAddContact = async (e) => {
    e.preventDefault();
    setAddError('');
    if (!newContact.name || !newContact.email || !newContact.phone) {
      setAddError('All fields are required');
      return;
    }
    try {
      const res = await fetch('/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      });
      if (!res.ok) {
        const err = await res.json();
        setAddError(err.error || 'Failed to add contact');
        return;
      }
      setNewContact({ name: '', email: '', phone: '' });
      fetchAllContacts();
    } catch (err) {
      setAddError('Failed to add contact');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">Contact Search</h1>
      {/* Search Section */}
      <form onSubmit={e => e.preventDefault()} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="flex-grow border px-3 py-2 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Show All
          </button>
        )}
      </form>
      {/* Add Contact Section */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Add New Contact</h2>
        <form onSubmit={handleAddContact} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border px-3 py-2 rounded"
            value={newContact.name}
            onChange={handleAddChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={newContact.email}
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border px-3 py-2 rounded"
            value={newContact.phone}
            onChange={handleAddChange}
          />
          {addError && <p className="text-red-500 text-sm">{addError}</p>}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Contact</button>
        </form>
      </div>
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;