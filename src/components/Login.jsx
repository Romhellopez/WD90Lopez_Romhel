import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import './Login.css';


// Import the loader component
import { spiral } from 'ldrs';
spiral.register();

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loader

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      login();
    }
  };

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    // Check local storage for remembered email
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setLoginEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const login = async () => {
    // Set loading to true when starting the login process
    setLoading(true);

    // Validate required fields
    if (!loginEmail || !loginPassword) {
      alert('Please fill in all required fields.');
      setLoading(false); // Set loading to false on error
      return;
    }

    // Validate email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!emailRegex.test(loginEmail)) {
      alert('Invalid email format. Email should contain @ and a dot.');
      setLoading(false);
      return;
    }

    // Validate password
    if (loginPassword.length < 6 || /[!@#$%^&*(),.?":{}|<>]/.test(loginPassword) || loginPassword.toLowerCase() === loginPassword) {
      alert('Password should be at least 6 characters long, no special characters, and should contain at least one uppercase letter.');
      setLoading(false);
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);

      // Remember email if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', loginEmail);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('Login successful!');
      navigate('./MovieList');  // Confirmation message
    } catch (error) {
      console.log(error.message);
    } finally {
      // Set loading to false after the login process completes
      setLoading(false);
    }
  };
  
  const logout = async () => {
    await signOut(auth);
  };

  return (

    <>
    <div className='first' >
      <h1 className='ForTitle'>TheYowMovies</h1>
      <p className='Para col col-sm-6'> Immerse yourself in a world where every frame tells a story, and every moment captivates. Unleash the magic of storytelling with our diverse selection of films, promising entertainment that transcends boundaries. Join us on a journey of visual delight and let TheYowMovies be your gateway to a realm of unforgettable movie moments. Don't just watch, experience the extraordinary with TheYowMovies!".</p>
    </div>


    <div className="login-container">
    <div className='Login'>
      {/* Loader overlay */}
      {loading && (
        <div className="loader-overlay">
          <l-spiral size="40" speed="0.9" color="black" />
        </div>
      )}

      <h3 className='form-title'>LOGIN</h3>
      <div className="input-container">
        <input
          placeholder='Email...'
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />
      </div>
      <div className='input-container'>
        <input
          placeholder='Password...'
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
          type='password'
          onKeyPress={handleKeyPress}
        />
      </div>
      <label className='chkbox'>
        <input 
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        Remember Me
      </label>
      <button type="submit" className="submit" onClick={login} onKeyPress={handleKeyPress}>
      Submit
    </button>
      {/* Ito yung link pag-gamit ng React Router kung gumagamit ka ng router */}
      <p className='signup-link'>Don't have an account? <Link to='/register' className='a'>Sign up Here!</Link></p>
    </div>
    </div>
     </>   
  );
};

export default Login;
