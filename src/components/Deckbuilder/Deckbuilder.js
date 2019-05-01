import React, { Component } from 'react';
import axios from 'axios';
import DeckDisplay from '../DeckDisplay/DeckDisplay';
import { connect } from 'react-redux';
import { update_deck_input, update_card_input, update_card, update_error, update_deck_name, update_deck } from '../../redux/reducer';
import './deckbuilder.css';

class Deckbuilder extends Component {
    constructor (props){
    super(props)
        this.state = {
            deck_input: "",
            card_input: "",
            card: "",
            error: "",
            deck_name: "",
            deck: []
        }
    }

    componentWillMount = () => {
        // const cardsBaseUrl = "http://localhost:4000/api/cards"
        const cardsBaseUrl = "http://mymtgdeck.com/api/cards"
        let deck_name = {deck_name:this.state.deck_name}
        axios.get(cardsBaseUrl).then(
        results =>{
            this.setState({
                deck_name: results.data
            })
        })
    }

    componentDidMount = () => {
        this.setState ({
            // This displays state from Redux 
            deck: this.props.deck
        })
    }

    updateSearch = (text) => {
        this.setState({ card_input: text })
        console.log(this.state.card_input)
    }

    updateName = (text) => {
        this.setState({ deck_input: text})
        console.log(this.state.deck_input)
    }

    searchCard = () => {
        // if input isn't blank, error message remains blank and then fetches the data
        if(this.state.card_input !== ""){
            this.setState({error: ""})
            fetch(`https://api.scryfall.com/cards/named?exact=${this.state.card_input}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // if 404 (not found), will return below message
                if(data.status ===404){
                    this.setState({ error: "Card not found." })
                } else {
                    this.setState({ card: data })
                }
            })
        } else {
            // if input is empty, will return message below 
            this.setState({ error: "Please enter a card name."})
        }
    }

    addCard = (card) => {
        // const cardsBaseUrl = "http://localhost:4000/api/cards"
        const cardsBaseUrl = "http://mymtgdeck.com/api/cards"
        let body = { card: card }
        console.log("card", card)
        if (card !== ""){
        axios.post(cardsBaseUrl, body).then(
            results => {
            // Updating state within Redux
            this.props.update_deck(results.data)
            //   this.setState({
            //     deck: results.data
            //   })
            }
          )
        } else {
          this.setState({ error: "Please search for a card." })
        }
      }

      removeCard = (name) => {
        // const cardsBaseUrl = `http://localhost:4000/api/cards/${name}`
        const cardsBaseUrl = `http://mymtgdeck.com/api/cards/${name}`
        axios.delete(cardsBaseUrl).then(
          results => {
              // Updating state within Redux 
              this.props.update_deck(results.data)
            // this.setState({
            //   deck: results.data
            // })
          }
        )
      }

    saveDeckName = () => {
        // const cardsBaseUrl = "http://localhost:4000/api/cards"
        const cardsBaseUrl = "http://mymtgdeck.com/api/cards"
        let body = {deck_name: this.state.deck_input}
        axios.put(cardsBaseUrl, body).then(
            results => {
                // this.props.update_deck_name()
                this.setState({
                    deck_name: results.data
                }, () => {
                    this.saveDeckToDB()
                })
            }
        )
    }

    saveDeckToDB = () => {
        const { user, deck } = this.props;
        const { username } = this.props.user
        const { deck_name } = this.state;
        const savedDeck = { user: user.id, deck_name, deck, username}
        console.log('savedDeck', savedDeck, "username", username, "this.props.user", this.props.user);
        axios.post('/api/decks', savedDeck)
    }
    
    displayCard = () => {
        if(this.state.card !== ""){
            return <img className="searched_card" src={this.state.card.image_uris.small}></img>            
        } 
    }    

    render(){
        return (
            <div className='deckBuilder'>

                <div className="cardSearch">

                    <div className="search">
                        <h2>Search</h2>
                    </div>
                    <input onChange={(e) => this.updateSearch(e.target.value)}placeholder="Search Card"/>

                    <div className="searchButtons">

                        <button className="search" onClick={() => this.searchCard()}>
                            Search
                        </button>
                    
                        <button className="add" onClick={() => this.addCard(this.state.card)}>
                            Add
                        </button>

                    </div>

                    <div className= "search_error">
                        {this.state.error === "" ? <div></div> : <div>{this.state.error}</div>}
                    </div>

                    <div className="cardContainer">{this.displayCard()}</div>

                </div>



                <div className="deckDisplay">
                    
                    <div className='deck_name'>
                        <h2>{this.state.deck_name}</h2>
                    
                        <input onChange={(e) => this.updateName(e.target.value)}placeholder="Enter Deck Name"/>

                        <button className="saveButton" onClick={(e) => this.saveDeckName()}>
                            Save Deck
                        </button>

                    </div>

                    <div className="saveButton">

                    </div>

                    <div>
                        {/* this.props.deck is displaying state from REDUX */}
                        <DeckDisplay remove={this.removeCard} deck={this.props.deck}/> 
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (reducerState) => { 
    return {
            user: reducerState.user,
            deck_input: reducerState.deck_input,
            card_input: reducerState.card_input,
            card: reducerState.card,
            error: reducerState.error,
            deck_name: reducerState.deck_name,
            deck: reducerState.deck
    }
}

export default connect(mapStateToProps, { update_deck_input, update_card_input, update_card, update_error, update_deck_name, update_deck }) (Deckbuilder);
