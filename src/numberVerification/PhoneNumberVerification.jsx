import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PhoneNumberVerification.module.css'

export default function PhoneNumberVerification() {

  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:8080/phone/verifyNumber/${phoneNumber}`,{
          method: 'GET',
          headers: {'Content-Type': 'application/json',},
        }
      );            

      if (!response.ok) {
        throw new Error('Failed to fetch number details');
      }

      const data = await response.json();
      setResult(data);
      console.log(data)
    } catch (err) {
      setError(err.message);
    }
  };


  const handleBackToContact = () => {
    navigate(`/contact`); 
  }


  return (
    <div className={styles.verificationPage}>
      <h2 className={styles.title}>Verify Phone Number</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number (e.g., 14158586273)" className={styles.input} />    
       
        <button type="submit" className={styles.submitButton}>
          Verify
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <div className={styles.resultBox}>
          <h3>Number Details</h3>
          <p><strong>Valid:</strong> {result.valid ? 'Yes' : 'No'}</p>
          <p><strong>Number:</strong> {result.number}</p>
          <p><strong>Line Type:</strong> {result.line_type}</p>
          <p><strong>Local format:</strong> {result.local_format}</p>
          <p><strong>Country:</strong> {result.country_name}</p>
          <p><strong>Carrier:</strong> {result.carrier}</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p><strong>Line Type:</strong> {result.line_type}</p>
        </div>
      )}

      <button className={styles.backButton} onClick={handleBackToContact} > ← </button>          
</div>
  );
}