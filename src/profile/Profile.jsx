import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './Profile.module.css';

export default function Profile() {
  const navigate = useNavigate();

  const contactProfile = {
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
    };

    const [contact, setContact] = useState(contactProfile);
    const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("UserId");
        const storedEmail = localStorage.getItem("UserEmail");

    if (storedUserId) {
      setUserId(storedUserId);
      setContact((prev) => ({ ...prev, email: storedEmail || "" }));

    } else {
      Swal.fire("User ID not found! Please register again.");
      navigate("/");
    }
  }, [navigate]);

  const [error, setError] = useState("");

  const handleContactInput = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      Swal.fire("User ID not found. Please register again.");
      return;
    }

    try {
        const response = await fetch(`http://localhost:8080/contact/update-userProfile/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed!");
      }

      localStorage.setItem("UserEmail", contact.email);

      Swal.fire(data.message || "Profile updated successfully!");
      navigate("/contact");

    } catch (error) {
      Swal.fire(error.message);
    }
  };

  const handleSkip = () => {
    navigate("/contact");
  };

  return (
    <div className={styles.profileForm}>
      <div className={styles.newProfileForm}>
        <h2>Complete Your Profile</h2>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleProfileSubmit}>
          <label htmlFor="email">Email:</label><br />
          <input name='email' value={contact.email} onChange={handleContactInput}  type="email" placeholder="email" className={styles.email}  required/><br />
  
          <label htmlFor="name">Contact Name:</label><br />
          <input name="name" value={contact.name} onChange={handleContactInput} type="text" placeholder="Contact Name" className={styles.name} /><br />

          <label htmlFor="phoneNumber">Phone Number:</label><br />
          <input name="phoneNumber" value={contact.phoneNumber} onChange={handleContactInput} type="tel" placeholder="Phone Number" className={styles.phoneNumber} /><br />

          <label htmlFor="address">Address:</label><br />
          <input name="address" value={contact.address} onChange={handleContactInput} type="text" placeholder="Address" className={styles.address} /><br />

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>Update Profile</button>
            <button type="button" className={styles.skipButton} onClick={handleSkip}>Skip</button>
          </div>
        </form>
      </div>
    </div>
  );
}