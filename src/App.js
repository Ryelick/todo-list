import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList';
import './App.css'
const { v1: uuidv1 } = require('uuid');

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv1(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="todo-container">
      <h1 >To Do List</h1>
      <div style={{ display: "flex", marginBottom: "20px", alignItems:"center", justifyContent:"center"}}>
        <input className="input-todo" ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
      />
      <button onClick={handleClearTodos}>Clear Completed</button>
      {/* <div>{todos.filter(todo => !todo.complete).length} Left To Do</div> */}
    </div>
  );
}

export default App;
