<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
>>>>>>> dd8b3d2fe10d23c6484218957884c41a4f2d52f0

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

<<<<<<< HEAD
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
=======
const Pantry = (props) => {
  const [ingredientList, setIngredientList] = useState([]);
  const [pantId, setPantId] = useState('');
  const [allIngs, setAllIngs] = useState([]);
  const [ingsToDisplay, setIngsToDisplay] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [ingFilter, setIngFilter] = useState('');

  useEffect(async ()=>{
    const pantResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/pantries`);
    const pantData = pantResponse.data.pantryList[0];
    const pantryPayload = {
      id: pantData
    }
    const ingResponse = await axios.put(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, pantryPayload);
    const ingData = ingResponse.data.ingredientList; // array
    console.log(ingResponse)
    const allIngResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/ingredients`);
    const allIngData = allIngResponse.data.theIngredients;
    const allIngArray = [];
    console.log('allIngData',allIngData)
    allIngData.forEach(ing => {
      if (!ingData.includes(ing.name)) {
        allIngArray.push(ing.name)
      }
    });
    setIngredientList(ingData);
    setPantId(pantData._id);
    setAllIngs(allIngArray.sort());
    console.log('ingData',ingData);
    console.log('pantData',pantData._id);
    console.log('allIngs',allIngs);
    setIngsToDisplay(allIngs);
    setFinishedLoading(true);
  },[]);

  useEffect(()=>{
    const filterIngs = allIngs.sort().filter(ing=>{
      return ing.toLowerCase().includes(ingFilter.toLowerCase())
    })
    setIngsToDisplay(filterIngs);
  },[allIngs])
  const addIng = async (e, ing) => {
    const payload = {
      name: ing,
      id: pantId
    }
    const response = await axios.put(`${REACT_APP_SERVER_URL}/api/pantries/addIngredient`, payload)
    setAllIngs( allIngs.filter(item => item != ing).sort() );
    setIngredientList( [ ...ingredientList, ing ].sort() );
  }
  const deleteIng = async (e, ing) => {
    const payload = {
      name: ing,
      id: pantId
    }
    console.log("pantry id:",pantId)
    const response = await axios.put(`${REACT_APP_SERVER_URL}/api/pantries/deleteIngredient`, payload);
    setIngredientList( ingredientList.filter(item => item != ing).sort() );
    setAllIngs( [...allIngs, ing ].sort() )
  }

  const ingDisplay = ingredientList.map((ing,idx)=>(
    <li key={idx}>
      {ing}<button onClick={e=>deleteIng(e, ing)}>Remove from Pantry</button>
      {/* implement note feature here */}
    </li>
  ))

  const remainIngDisplay = ingsToDisplay.slice(0,(ingsToDisplay.length<25?ingsToDisplay.length:25)).map((ing, idx)=>(
    <li key={idx}>{ing}<button onClick={e=>addIng(e, ing)}>Add to Pantry</button></li>
  ))

  const handleFilter = (e) => {
    e.preventDefault();
    setIngFilter(e.target.value);

    const filterIngs = allIngs.sort().filter(ing=>{
      return ing.toLowerCase().includes(ingFilter.toLowerCase())
    })
    setIngsToDisplay(filterIngs);
  }

  if (!finishedLoading) {
    return (<p>...Loading</p>)
  }
  return (
    <div>
      <h1>My Pantry</h1>
      <div className="userIngredients">
        <h3>Ingredients in my pantry:</h3>
        <ul className="ingredientList">
          {ingDisplay}
        </ul>
      </div>
      <div className="allIngredients">
        <h3>Ingredients not in my pantry:</h3>
        <label htmlFor="ing-filter">Filter for Ingredients </label>
        <input type="text" name="ing-filter" id="ing-filter"
        value={ingFilter} onChange={e=>handleFilter(e)} />
        <ul className="ingredientList">
          {remainIngDisplay}
        </ul>
      </div>
>>>>>>> dd8b3d2fe10d23c6484218957884c41a4f2d52f0
    </div>
  )
}

function App() {
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
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Items in your Pantry</h3>
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
    </section>
  )
}

export default App
