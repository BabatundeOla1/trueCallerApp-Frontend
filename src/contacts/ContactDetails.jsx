import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './ContactDetails.module.css';

export default function ContactDetails() {
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const { contactId } = useParams(); 

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      const foundContact = parsedContacts.find((c) => c.id === contactId);
      console.log(foundContact)
      if (foundContact) {
        setContact(foundContact);
      } else {
        Swal.fire({
          icon: "error",
          title: "Contact Not Found",
          text: "The selected contact could not be found in local storage.",
        });
        navigate("/contact");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Contacts",
        text: "No contacts are stored locally. Please fetch contacts first.",
      });
      navigate("/contact");
    }
  }, [contactId, navigate]);

  if (!contact) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.contactDetailsPage}>

      <button className={styles.backButton} onClick={() => navigate("/contact")} > ← </button>          

      <div className={styles.detailsBox}>

      <h2 className={styles.title}>Contact Details</h2>

        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
        <p><strong>Email:</strong> {contact.email || "Not provided"}</p>
        <p><strong>Address:</strong> {contact.address || "Not provided"}</p>
        <p><strong>Blocked:</strong> {contact.blocked ? "Yes" : "No"}</p>
      </div>

      <div className={styles.deleteAndEditButton}>
        <button className={styles.deleteButton} >Delete</button>
        <button className={styles.editButton} onClick={() => navigate("/contact")} > Edit </button>
      </div>

    </div>
  );
}