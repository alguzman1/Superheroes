import React, {Component} from 'react'
import HeroForm from './HeroForm'
import PropTypes from 'prop-types'
import $ from 'jquery'
import {
  withRouter
} from 'react-router-dom'

class CreateHeroContainer extends Component {
  state = {
    name: undefined,
    superPower: undefined,
    img: undefined,
    universe: undefined,
    nemesis: undefined
  }

  static propTypes = {
    loadHeroesFromServer: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  onNameChange = (e) => this.setState({ name: e.target.value})

  onSuperPowerChange = (e) => this.setState({ superPower: e.target.value})

  onImageChange = (e) => this.setState({ img: e.target.value })
  
  onUniverseChange = (e) => this.setState({ universe: e.target.value})

  onNemesisChange = (e) => this.setState({ nemesis: e.target.value })


  handleSubmit = (e) => {
    e.preventDefault()
    const {name, superPower, img, universe, nemesis} = this.state
    const hero = {name, superPower, img, universe, nemesis}
    $.ajax({
      url: '/api/heroes',
      method: 'POST',
      data: hero
    }).done((response) => {
      this.props.loadHeroesFromServer()
      this.props.history.push('/heroes')
    })
  }

  render() {
    return (
      <div className='HeroesBody'>
        <h3 className='createHero'> Create Hero </h3>
        <div className='heroForm'>
        <HeroForm 
            name={this.state.name}
            img={this.state.img}
            superPower={this.state.superPower}
            universe={this.state.universe}
            nemesis={this.state.nemesis}
            onNameChange={this.onNameChange}
            onSuperPowerChange={this.onSuperPowerChange}
            onImageChange={this.onImageChange}
            onUniverseChange={this.onUniverseChange}
            onNemesisChange={this.onNemesisChange}
            handleSubmit={this.handleSubmit}
        />
        </div>
      </div>
    )
  }
  }


export default withRouter(CreateHeroContainer)