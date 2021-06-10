// Imports
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css'

// Components
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Login from './components/Login'
import About from './components/About'

import Pantry from './pages/Pantry'
import MyRecipes from './pages/MyRecipes'
import CookNow from './pages/CookNow'

// import Search from './pages/Search'
import ShoppingList from './pages/ShoppingList'
import RecipeInfo from './pages/RecipeInfo'
import AddRecipe from './pages/AddRecipe'


// Private Route Component
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('This is a private route...')
  let user = localStorage.getItem('jwtToken')
  return (<Route {...rest} render={(props) => {
      return user ? (<Component {...rest} {...props} />) : (<Redirect to='/login' />)}} />
  )
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      console.log('is not authenticated')
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      console.log('token', token)
      setAuthToken(token)
      setCurrentUser(token)
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('--- inside nowCurrentUser ---')
    setCurrentUser(userData)
    setIsAuthenticated(true)
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
    }
    setCurrentUser(null)
    setIsAuthenticated(false)
  };

  return (
    <Router>
      <div className='App'>
        <Navbar isAuth={isAuthenticated} handleLogout={handleLogout} />
        <div className='container mt-5'>
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route path='/login' render={(props) => (<Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated}/>)} />
            <Route path='/about' component={About} />
            <Route exact path='/' component={Welcome} />
            <PrivateRoute path='/profile' component={Profile} user={currentUser} handleLogout={handleLogout} />

            <PrivateRoute
              path='/pantry'
              component={Pantry}
              user={currentUser}
            />

            <PrivateRoute
              path='/myrecipes'
              component={MyRecipes}
              user={currentUser}
            />

            <PrivateRoute
              path='/cooknow'
              component={CookNow}
              user={currentUser}
            />

            {/* <Route path='/search' component={Search} user={currentUser} /> */}

            <Route
              path='/shoppinglist'
              component={ShoppingList}
              user={currentUser}
            />
            <Route
              path='/recipeinfo'
              component={RecipeInfo}
              user={currentUser}
            />
            <PrivateRoute
              path='/addrecipe'
              component={AddRecipe}
              user={currentUser}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
