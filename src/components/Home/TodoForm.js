import React from 'react'
import Switch from '../Switch'
import './home.css'
import ThemeContext from '../../contexts/theme'
import app from '../../base'

function TodoForm({ handleInput, input, handleTodo}) {
    const theme = React.useContext(ThemeContext)
    return (
        <div className='header-section'>
            <form className='todo-form' onSubmit={handleTodo}>
                <input 
                    onChange={handleInput} 
                    value={input} 
                    type="text" 
                    name='todo' 
                    className={`todo-input todo-input-${theme.state}`}
                    placeholder='write a task...' />

                <button 
                    type='submit' 
                    className='todo-submit'>
                        Add
                </button>

                <input type='button' onClick={() => app.auth().signOut()} value='Sign Out' className='todo-submit btn-signout' />
            </form>
            <div className='theme-switch'>
            <Switch 
                isOn={theme.state === 'light' ? false : true}
                handleToggle={theme.toggleTheme} />
                {
                    theme.state === 'light' ?
                    <p>Dark Mode</p>
                    : <p>Light Mode</p>
                }
            </div>
        </div>
    )
}

export default TodoForm