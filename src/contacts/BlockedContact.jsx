// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import styles from './BlockedContact.module.css';


// export default function BlockedContact() {
// const [blockedContacts, setBlockedContacts] = useState();
// const [filteredBlockedContacts, setFilteredBlockedContacts] = useState();
// const [searchTerm, setSearchTerm] = React.useState("");

// const handleSearch = (event) => {
//   const term = event.target.value.toLowerCase();
//   setSearchTerm(term);
//   const filtered = contacts.filter(
//     (contact) =>
//       contact.name.toLowerCase().includes(term) ||
//       contact.phoneNumber.toLowerCase().includes(term)
//   );
//   setFilteredContacts(filtered);
// };

// const handleSubmit = (event) => {
//   event.preventDefault();

//   fetchBlockedContact();
// }

//   const fetchBlockedContact = async () => {
//     try{
//       const response = await fetch('http://localhost:8080/contact/contacts/viewBlocked', {
//         method: 'GET',
//         headers:  { 'Content-Type': 'application/json' },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch blocked contacts");
//         }
//         const data = await response.json();
//         setBlockedContacts(data);
//         setFilteredBlockedContacts(data);
        
//     }
    
//     catch(error){
//       Swal.fire(error.message)
//     }
// }

// const handleBackToContact = () => {
//   navigate('/contact')
// }

// return (
//   <div className={styles.blockedContactsPage}>
//     <div className={styles.header}>
//       <h2 className={styles.title}>
//         Blocked Contacts
//       </h2>
//     </div>

//     <div className={styles.searchContainer}>
//       <input type="text" placeholder="Search by name or phone number..." 
//       value={searchTerm} onChange={handleSearch} className={styles.searchInput} />    
//     </div>

//     <div className={styles.contactList}>
//       {filteredBlockedContacts ? (
//         <p className={styles.noContacts}>No blocked contacts found.</p>
//       ) : (
//         filteredBlockedContacts.map((contact) => (
//           <div key={contact.id} className={styles.contactBox}>
//             <div className={styles.contactDetails}>
//               <span className={styles.contactName}>{contact.name}</span>
//               <span className={styles.contactPhone}>{contact.phoneNumber}</span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>

//     <button className={styles.backButton} onClick={handleBackToContact} >
//       Back to Contacts
//     </button>
//   </div>
// );

// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './BlockedContact.module.css';

export default function BlockedContact() {
  const [blockedContacts, setBlockedContacts] = useState([]); // Fixed
  const [filteredBlockedContacts, setFilteredBlockedContacts] = useState([]); // Fixed
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Fixed: Initialize useNavigate()

  useEffect(() => {
    fetchBlockedContact(); // Fetch blocked contacts on component mount
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
      setFilteredBlockedContacts(data); // Fixed
    } catch (error) {
      Swal.fire(error.message);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = blockedContacts.filter( // Fixed
      (contact) =>
        contact.name.toLowerCase().includes(term) ||
        contact.phoneNumber.toLowerCase().includes(term)
    );
    
    setFilteredBlockedContacts(filtered);
  };

  const handleBackToContact = () => {
    navigate('/contact'); // Fixed
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
        {filteredBlockedContacts.length === 0 ? ( // Fixed
          <p className={styles.noContacts}>No blocked contacts found.</p>
        ) : (
          filteredBlockedContacts.map((contact) => (
            <div key={contact.id} className={styles.contactBox}>
              <div className={styles.contactDetails}>
                <span className={styles.contactName}>{contact.name}</span>
                <span className={styles.contactPhone}>{contact.phoneNumber}</span>
              </div>
              
              <span className={styles.blockedIcon}>🔒 Blocked</span>
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
