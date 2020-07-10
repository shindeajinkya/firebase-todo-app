import React, { useEffect, useContext } from 'react'
import '../../App.css'
import './home.css'
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle, IoMdTrash } from 'react-icons/io'
import app, { db } from '../../base'
import TodoForm from './TodoForm'
import ThemeContext from '../../contexts/theme'

function TodoView() {
    const [todos, setTodos] = React.useState([])
    const [input, setInput] = React.useState('')
    const theme = useContext(ThemeContext)

    const updateFirebase = async (todos) => {
        setTodos(todos)
        await db.collection('users')
        .doc(`${app.auth().currentUser.uid}`)
        .set({
            todos: todos
        })
        .catch(err => console.log(err))
    }

    const handleTodo = (e) => {
        e.preventDefault()
        if(input !== '') {
            const temp = todos.concat({
                task: input,
                isComplete: false,
                date: new Date()
            })
            updateFirebase(temp)
            setInput('')            
        }
    }

    const toggleComplete = (id) => {
        let temp = todos.map((todo) => {
            if(todo.date === id){
                todo.isComplete = todo.isComplete ? false : true
                return todo
            }
            return todo
        })
        updateFirebase(temp)
    }

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const deleteTodo = (id) => {
        let temp = todos.filter((todo) => todo.date !== id)
        updateFirebase(temp)
    }

    useEffect(() => {
        const userid = app.auth().currentUser.uid
        const docRef = db.collection("users").doc(`${userid}`)
        docRef.get()
        .then(doc => {
            if(doc.exists){
                if(todos !== doc.data().todos)
                    setTodos(doc.data().todos)
            }
            else{
                console.log('not found', doc.exists)
            }
        })
        .catch(err => console.log(err, 'error'))

        return () => {
            console.log('unmounted')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <div className={`${theme.state}`}>
            <div className='container'>
                <TodoForm
                input={input}
                handleInput={handleInput}
                handleTodo={handleTodo} />

                <ul className='todo-list'>
                    {
                        todos.map(todo => (
                            <li className={`todo-card todo-card-${theme.state}`} key={todo.date}>
                                <div className='todo-action'>
                                    <label className='check-group'>
                                        <input 
                                        onChange={() => toggleComplete(todo.date)} 
                                        checked={todo.isComplete} 
                                        type='checkbox' 
                                        className='todo-checkbox' />
                                        {
                                            todo.isComplete ? 
                                            <IoIosCheckmarkCircle className='todo-icons' size={40} />
                                            : <IoIosCheckmarkCircleOutline className='todo-icons' size={40} />
                                        }
                                    </label>
                                    <p className={`todo-${todo.isComplete}`}>{todo.task}</p>
                                </div>
                                <button className='todo-delete' onClick={() => deleteTodo(todo.date)} >
                                    <IoMdTrash size={40} className='todo-icons' />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TodoView