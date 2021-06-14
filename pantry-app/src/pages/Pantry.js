import React, { useEffect, useState } from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

// Display ingredients in a pantry

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
  },[allIngs,ingFilter])
  
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
    </div>
  )
}

export default Pantry
