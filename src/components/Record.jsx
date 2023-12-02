import React from 'react'
import { useState } from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged,signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebase-config';

function Record (){
    const [registerEmail,SetRegisterEmail] = useState('');
    const [registerPassword,SetRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

    const [user,SetUser] = useState({});
    onAuthStateChanged(auth,(currentUser) => {
        SetUser(currentUser);
    });

  const register = async () => {
     try {
     const user = await createUserWithEmailAndPassword(auth, registerEmail,registerPassword);
      console.log(user);
    } catch(error) {
      console.log(error.message);
    }
  };
  
  const login = async()=>{
      try {
      const user = await signInWithEmailAndPassword(auth, loginEmail,loginPassword);
       console.log(user);
     } catch(error) {
       console.log(error.message);
     }
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h4>USER LOGGED IN:</h4>
    {user?.email}
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}
export default Record;
