// Imports
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
// CSS
import './App.css';
// Components
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';

// private route component
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('This is a private route...')
  let user = localStorage.getItem('jwtToken');

  return <Route {...rest} render={ (props) => {
    return user ? 
      <Component {...rest} {...props} /> 
      : <Redirect to='/login' />
  } } />
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    // check to see if there is a token inside of localStorage
    // if not, the user is not authenticated

    if (!localStorage.getItem('jwtToken')) {
      console.log('is not authenticated');
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      console.log('token',token);
      setAuthToken(token);
      setCurrentUser(token);
    }
  },[]);

  const nowCurrentUser = userData => {
    console.log('--- inside nowCurrentUser ---');
    setCurrentUser(userData);
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    // determine if there is a jwt
    // if there is, remove it
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
    }
    // set currentUser to null
    setCurrentUser(null);
    // set is auth to false
    setIsAuthenticated(false);
  }


  return (
    <Router>
      <div className="App">
        <Navbar isAuth={isAuthenticated} handleLogout={handleLogout} />
        <div className="container mt-5">
          <Switch>
            {/* routes will go here */}
            <Route path='/signup' component={Signup} />
            <Route path='/login' render={ (props) => <Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/about' component={About} />
            <Route exact path='/' component={Welcome} />
            <PrivateRoute path='/profile' component={Profile} user={currentUser} handleLogout={handleLogout} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
