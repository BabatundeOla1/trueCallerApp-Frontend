import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './BlockedContact.module.css';
import UnblockContact from './UnblockContact';


export default function BlockedContact() {
  const [blockedContacts, setBlockedContacts] = useState([]); 
  const [filteredBlockedContacts, setFilteredBlockedContacts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchBlockedContact(); 
  }, []);

  const fetchBlockedContact = async () => {
    try {
      const response = await fetch('http://localhost:8080/contact/contacts/viewBlocked', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blocked contacts");
      }

      const data = await response.json();
      setBlockedContacts(data);
      setFilteredBlockedContacts(data); 
    } catch (error) {
      Swal.fire(error.message);
    }
  };

  const handleSearch = (event) => {
    const searchedBlockedContact = event.target.value.toLowerCase();
    setSearchTerm(searchedBlockedContact);
    
    const filtered = blockedContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchedBlockedContact) ||
        contact.phoneNumber.toLowerCase().includes(searchedBlockedContact)
    );
    
    setFilteredBlockedContacts(filtered);
  };

  const handleBackToContact = () => {
    navigate('/contact'); 
  };

  return (
    <div className={styles.blockedContactsPage}>
      <div className={styles.header}>
        <h2 className={styles.title}>Blocked Contacts</h2>
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
        {filteredBlockedContacts.length === 0 ? ( 
          <p className={styles.noContacts}>No blocked contacts found.</p>
        ) : (
          filteredBlockedContacts.map((contact) => (
            <div key={contact.id} className={styles.contactBox}>
              <div className={styles.contactDetails}>
                <span className={styles.contactName}>{contact.name}</span>
                <span className={styles.contactPhone}>{contact.phoneNumber}</span>
              </div>
              <div className={styles.blockAndUnblockSymbol}>

                <span className={styles.blockedIcon}>🔒 <p>Blocked</p></span>
                <UnblockContact phoneNumber={contact.phoneNumber} isBlocked={contact.isBlocked ?? true} onBlockToggle={fetchBlockedContact} />
                                               
             </div>
            </div>
          ))
        )}
      </div>

      <button className={styles.backButton} onClick={handleBackToContact}>
        Back to Contacts
      </button>
    </div>
  );
}
