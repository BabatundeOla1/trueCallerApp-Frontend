import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './Contact.module.css';

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      setContacts(parsedContacts);
      setFilteredContacts(parsedContacts);
      console.log("Stored data: ", parsedContacts);
    }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:8080/contact/viewAllContact");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data);
      localStorage.setItem("contacts", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load contacts. Please try again.",
      });
    }
  };

  const handleSearch = (event) => {
    const contactToSearch = event.target.value.toLowerCase();
    setSearchTerm(contactToSearch);
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(contactToSearch) ||
        contact.phoneNumber.toLowerCase().includes(contactToSearch)
    );
    setFilteredContacts(filtered);
  };

  const handleAddContact = () => {
    navigate("/add-contact");
  };

  const handleBlockedContacts = () => {
    navigate('/blocked-contacts');
  };

  const handleContactClick = (contactId) => {
    navigate(`/contact-details/${contactId}`); 
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.addContactAndContacts}>
        <h2 className={styles.title}>Contacts</h2>
        <button className={styles.addContact} onClick={handleAddContact}>
          + Add
        </button>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or phone number..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.contactList}>
        {filteredContacts.length === 0 ? (
          <p className={styles.noContacts}>No contacts found.</p>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id}  className={styles.contactBox} onClick={() => handleContactClick(contact.id)} >
              <div className={styles.contactAvatar}>
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.contactDetails}>
                <span className={styles.contactName}>{contact.name}</span>
                <span className={styles.contactPhone}>{contact.phoneNumber}</span>
              </div>

              {contact.blocked && ( <span className={styles.blockedIcon}>🔒 <p>Blocked</p> </span> )}
                            
            </div>
          ))
        )}
      </div>

      <button
        className={styles.blockedContact}
        onClick={handleBlockedContacts}
      >
        🔒 Blocked Contacts
      </button>
    </div>
  );
}