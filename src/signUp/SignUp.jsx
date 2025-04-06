import React, {useEffect, useState} from 'react'
import styles from './SignUp.module.css'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const navigate = useNavigate();

  const userProfile = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contact: {
      email: "",
    }
  };
  
  const [profile, setProfile] = useState(userProfile);
  const [error, setError] = useState("");
  
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  const handleContactInput = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev, contact: {...prev.contact, [name]: value }}));
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();

     const { password, confirmPassword} = profile;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      Swal.fire("Passwords do not match!");
      return;
    }
      fetchData();
  }


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(profile),
    });

    const data = await response.json();
    console.log("Data: ", data)

    if(!response.ok){
      const errorMessage = data.message || "Registration failed!";
      console.log("error Message: ", errorMessage)
      throw new Error(data.message);
    }

      const getUserId = data.data;

      localStorage.setItem("UserId", getUserId);
      localStorage.setItem("UserEmail", profile.contact.email);
      localStorage.setItem("UserPassword", profile.password);

      Swal.fire('Registeration successful!');
      navigate('/update-profile');

    } 
    
    catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An unexpected error occurred."
      });
    }
  };

  return (
    <div className={styles.signUpForm}>

    <div className={styles.newSignUpForm}>
      <form onSubmit = {handleUserSubmit}>
        <label htmlFor="firstName" > First Name:</label> <br />
        <input name='firstName' onChange={handleUserInput}  type="text" placeholder="firstName"   className={styles.firstName}  required/><br />
    
        <label htmlFor="lastName">Last Name:</label><br />
        <input name = "lastName" onChange={handleUserInput}  type="text" placeholder="last Name" className={styles.lastName} required/><br />

        <label htmlFor="email">Email:</label><br />
        <input name='email' onChange={handleContactInput}  type="email" placeholder="email" className={styles.email}  required/><br />
     
        <label htmlFor="password">Password:</label><br />
        <input name="password" onChange={handleUserInput}  type="password" placeholder="password" className={styles.password} required/><br />
           
        <label htmlFor="confirmPassword">Confrim Password:</label><br />
        <input name="confirmPassword" onChange={handleUserInput}  type="password" placeholder="Confirm password" className={styles.confirmPassword} required /><br />

        <div className= {styles.alreadyHaveAnAccount}>
            <button  type='submit' >SIGN UP</button> 
          <p>Already have an Account? 
            <Link className={styles.linkToLogin} to={'/Login'}> LOGIN </Link> 
          </p> <br />
        </div>

      </form>        
    </div>
     
  </div>
   
  )
  }