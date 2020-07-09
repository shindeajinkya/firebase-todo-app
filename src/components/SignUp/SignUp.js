import React, { useCallback, useState } from 'react';
import '../../App.css'
import './signup.css'
import app, { db } from '../../base';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


function SignUp( {history} ) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = useCallback(async event => {
    event.preventDefault()
    const { email, password, username } = event.target.elements
    await app
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(res => {
        history.push('/')
        return db.collection('users').doc(res.user.uid).set({
          todos: []
        })
      })
      .catch(err => alert('Invalid credentials, please enter valid info'))
    await app
      .auth()
      .currentUser
      .updateProfile({
        displayName: username.value
      })
    return () => {
      console.log('')
    }
  }, [history])

  const validator = () => {
    if(username.length > 0 && email.length > 0 && password.length >= 6) {
      return false
    }
    return true
  }
  
  return (
    <div className="container flex">
      <div className='signup'>
          <form className='signup-form' onSubmit={handleSignUp}>

            <label>
              <p>username</p>
              <input 
              className='username text-input' 
              placeholder='coder' name='username' 
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}  />
            </label>

            <label>
              <p>Email</p>
              <input 
              className='email text-input' 
              placeholder='abcd@gmail.com' 
              name='email' 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              <p>Password</p>
              <input 
              className='password text-input' 
              placeholder='mininum 6 char...' 
              name='password' 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button disabled={validator()} className='btn primary' type='submit'>Sign Up</button>

            <Link 
              style={{
                    textDecoration: 'none'
              }}
              className='btn secondary'
            to='/login'>
              <p>Log In</p>
            </Link>

          </form>
          <img src={require('../../assets/background.png')} className='image' alt='signup'/>
        </div>
    </div>
  );
}

export default withRouter(SignUp);
