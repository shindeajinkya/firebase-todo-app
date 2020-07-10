import React, { useCallback, useContext, useState } from 'react'
import '../../App.css'
import './login.css'
import app from '../../base';
import { IoMdLock } from 'react-icons/io'
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '../../contexts/Auth';
import { Link } from 'react-router-dom';

function Login({history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = useCallback(async event => {
        event.preventDefault()
        const { email, password } = event.target.elements
        await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(res => history.push('/'))
            .catch(err => {
                alert('email or password maybe wrong.')
                console.log(err)
            })
    }, [history])

    const validator = () => {
        if (email.length > 0 && password.length >= 6) {
            return false
        }
        return true
    }

    const { currentUser } = useContext(AuthContext)

    if(currentUser) {
        return <Redirect to='/' />
    }

    return (
        <div className='container flex'>
            <div className='child-container login'>
                <IoMdLock className='lock-icon' size={60} />
                <form onSubmit={handleLogin} className='login-form'>
                    <label>
                        <p>Email</p>
                        <input 
                            name='email' 
                            className='email text-input' 
                            type='email' 
                            placeholder='abcd@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input 
                            name='password' 
                            className='password text-input' 
                            type='password' 
                            placeholder='...' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button disabled={validator()} className='btn primary' type='submit' > Log In</button>
                    <Link 
                    style={{
                        textDecoration: 'none'
                    }}
                    className='btn secondary'
                    to='/signup'>
                        <p>Sign Up</p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login)