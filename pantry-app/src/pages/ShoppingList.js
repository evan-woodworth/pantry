// Generate a shopping list from recipe’s ingredients

// When a shopping list is generated:
// A shopping list generated locally in an object
// - if user is signed in, they can save the shopping list (list is created in the database and associated with a pantry)

// Shopping list generation:
// Pull ingredients from recipe -> recipeIngredients
// Create an empty shopping list -> shoppingList
// If the user is signed in
// pull ingredients from a pantry -> pantryIngredients
// Iterate through recipeIngredients
// If recipeIngredient is in pantryIngredients, add recipeIngredient to shoppingList
// If user is not signed in, all recipeIngredients are added to shoppingList

import React, { useState, useEffect, PureComponent } from 'react'
import GenPDF from './GenPDF'
import jsPDF from 'jspdf'
import Data from './Ingredients'
import Api from '../AppTwo'
import { AppProvider } from '../context'
import MealList from '../components/RecipeApi/MealList'
import SearchForm from '../components/RecipeApi/SearchForm'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list])
  return <p className={`alert ${type}`}>{msg}</p>
}

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className=''>
      {items.map((item) => {
        const { id, title } = item
        return (
          <article className='item' key={id}>
            <p className=''>{title}</p>
            <div className=''>
              <button
                type='submit'
                className='btn'
                onClick={() => editItem(id)}
              >
                {' '}
                Edit{' '}
              </button>
              <button
                type='submit'
                className='btn'
                onClick={() => removeItem(id)}
              >
                {' '}
                Delete{' '}
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function App(props) {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )

      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  useEffect(() => {
    if (props.shoppingList) {
      localStorage.setItem('list', JSON.stringify(props.shoppingList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  console.log(list)
  console.log('=============HERE=======================')

  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>shopping list</h3>
        <div className='item'>
          <input
            type='text'
            className=''
            placeholder='Add items here'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='btn'>
            {' '}
            {isEditing ? 'edit' : 'submit'}{' '}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className=''>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='btn' onClick={clearList}>
            {' '}
            Clear items{' '}
          </button>
        </div>
      )}
      <div>
        <GenPDF list={list} />
      </div>
      {/* <div>
        <Data />
      </div> */}
      {/* <div>
        <AppProvider>
          <Api />
          <SearchForm />
          <MealList />
        </AppProvider>
      </div> */}
    </section>
  )
}

export default App
