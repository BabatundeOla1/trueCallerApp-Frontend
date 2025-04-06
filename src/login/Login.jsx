import React, {useEffect, useState} from 'react'
import styles from './Login.module.css'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();

    const storedEmail = localStorage.getItem('UserEmail');
    const storedPassword = localStorage.getItem('UserPassword');

    if (profile.email !== storedEmail || profile.password !== storedPassword) {
      setError('Invalid email or password!');
      Swal.fire('Invalid email or password!');
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
  
      const data = await response.json();
      console.log("user Data:", data);

      if (!data.status || data.message !== "successful") {
        throw new Error(data.message || 'Login failed');
      }
  
      Swal.fire('Login successful!');
      navigate("/contact");
  
    } catch (error) {
      console.error("Login Error:", error.message);
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message
      });
    }
  }
  

    return (
      <div className={styles.loginForm}>
        
            <div className={styles.newLoginForm}>
              <form onSubmit = {handleUserSubmit}>        
        
                <label htmlFor="email">Email:</label><br />
                <input name='email' onChange={handleUserInput} required type="email" placeholder="email" className={styles.email} /><br />
        
                <label htmlFor="password">Password:</label><br />
                <input name="password" onChange={handleUserInput} required type="password" placeholder="password" className={styles.password} /><br />
                             
                  <div className= {styles.alreadyHaveAnAccount}>
                      <button  type='submit' >LOGIN</button> 
                    <p>Don't have an Account? 
                      <Link className={styles.linkToSignUp} to={'/'}> SIGN UP </Link> 
                    </p>
                  </div>
        
              </form>        
            </div>
      </div>
    )
}

