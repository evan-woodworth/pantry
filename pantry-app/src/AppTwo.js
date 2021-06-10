import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import pages
import SingleMeal from './pages/RecipeApi/SingleMeal'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/meal/:id'>
          <SingleMeal />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
