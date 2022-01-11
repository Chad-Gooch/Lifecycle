import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.tick = this.tick.bind(this)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      countDown: 0,
      showShadow: 0,
      guess: false
    }
  }
  
  tick(){
    if (this.state.countDown > 0) {
      this.setState({countDown: this.state.countDown - 1})
    } else {
      clearInterval(this.timer);
      this.setState({showShadow: 100});
      this.setState({guess: false});
    }
  }
  // hide(){};
  // reveal(){};
  
  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setState({
        pokeInfo: res,
        pokeSprite: res.sprites.front_default,
        pokeName: res.species.name,
      })
    })
    .catch((err) => console.log(err));
    this.setState({countDown:10});
    this.setState({guess:true});
    this.setState({showShadow:0});
    this.timer = setInterval(this.tick, 1000);
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.countDown}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={{filter: `contrast(${this.state.showShadow}%)`}} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{(this.state.guess)?"Who's that Pokemon?":this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;