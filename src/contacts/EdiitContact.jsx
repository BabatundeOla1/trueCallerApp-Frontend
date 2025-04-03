import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './EditContact.module.css';


export default function EdiitContact() {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const contactProfile = {
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
    };

  const [contact, setContact] = useState(contactProfile);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!contact.name || !contact.phoneNumber || !contact.email || !contact.address) {
      setError("Please fill in all required fields!");
      Swal.fire("Please fill in all required fields!");
      return;
    }

    fetchData();
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/contact/editContact', { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(contact),
      });

    const updatedContact = await response.json();
    console.log("Stored cotact: " + updatedContact)

    if(!response.ok){
      throw new Error(updatedContact.message);
    }

    Swal.fire({
      icon: "success",
      title: "Contact Saved",
      text: "Your contact has been edited successfully!",
    });

    navigate("/contact"); 

  } catch (error) {
    setError(error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
  }


  return (
    <div className={styles.addContactPage}>

      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Edit Contact</h2>

        <label htmlFor="name">Name:</label>
        <input name="name" type="text" placeholder="Name" value={contact.name} 
        onChange={handleInputChange} className={styles.input} required />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input name="phoneNumber" type="tel" placeholder="Phone Number" value={contact.phoneNumber}
          onChange={handleInputChange} className={styles.input} required />

        <label htmlFor="email">Email:</label>
        <input name="email" type="email" placeholder="Email" value={contact.email}
          onChange={handleInputChange} className={styles.input} required/>

        <label htmlFor="address">Address:</label>
        <input name="address" type="address" placeholder="Address" value={contact.address}
          onChange={handleInputChange} className={styles.input} required/>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>Save Contact</button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate("/contact")} >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
