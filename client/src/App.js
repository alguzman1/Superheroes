import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Heroes from './Heroes'
import Home from './Home'
import NavBar from './NavBar'
import CreateHeroContainer from './CreateHeroContainer'
import $ from 'jquery'


class App extends Component {
  state = {
    heroes: undefined
  }

componentDidMount () {
  this.loadHeroesFromServer()
}

loadHeroesFromServer = () => {
  $.ajax({
    url: '/api/heroes',
    method: 'GET'
  }).done((response) => {
    this.setState({heroes: response.heroes})
  })
}



render() {
  return (
<Router>
  <div>
    <NavBar />
    <Route exact path='/' component={Home} />
    <Route path='/create-hero' render={() => <CreateHeroContainer loadHeroesFromServer={this.loadHeroesFromServer}/>} />
    {
       this.state.heroes
      ? <Route path='/heroes' render={() => <Heroes heroes={this.state.heroes} />} />
      : 'Error!'
    }
  </div>
</Router>
  )
 }
}



export default App