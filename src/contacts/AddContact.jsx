import { useState, useEffect } from 'react'
import React from 'react'
import styles from './AddContact.module.css'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';



export default function AddContact() {

  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: ""
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = contact;
    console.log(newContact);

    if (!contact.name || !contact.phoneNumber || !contact.email || !contact.address) {
      setError("Please fill in all required fields!");
      Swal.fire("Please fill in all required fields!");
      return;
    }

    fetchData();
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/contact/saveContact', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(contact),
      });

    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message);
    }

    Swal.fire({
      icon: "success",
      title: "Contact Saved",
      text: "Your contact has been added successfully!",
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
      {/* <h2 className={styles.title}>Add New Contact</h2> */}

      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Add New Contact</h2>

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
