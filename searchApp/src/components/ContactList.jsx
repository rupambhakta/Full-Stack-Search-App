import React from 'react';

function ContactList({ contacts }) {
  if (!contacts.length) return <p className="text-center">No contacts found.</p>;

  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <div key={contact._id} className="border rounded p-4 shadow-sm">
          <h2 className="text-xl font-semibold">{contact.name}</h2>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default ContactList;