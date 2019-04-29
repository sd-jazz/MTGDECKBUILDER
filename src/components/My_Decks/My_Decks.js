import React, { Component } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { update_user_decks, update_user } from '../../redux/reducer';
import './myDecks.css'; 

class My_Decks extends Component {
    constructor (props){
    super(props)
        this.state = {
            user_decks: [],
            user: this.props.user
        }
    }

    componentDidMount = () => {
        this.fetchDecks()
    }
    
    fetchDecks = () => {
        axios.get(`/api/get_user_decks/${this.props.user.id}`).then(response => {
            console.log("fetchDecks!")
            this.props.update_user_decks(response.data)
            this.setState({
                user_decks: response.data
            })
            console.log("user_decks", response.data)
            // console.log("fetchDecks REDUX", this.props.user_decks)
        })
    }



    deleteDeck = (deck_id) => {
        console.log("deck_id", deck_id)
        axios.delete(`/api/delete_deck${deck_id}`).then(() => {
            console.log("DECK DELETED")
            this.fetchDecks()
        })
    }

    updateDeckName = (deck_name, deck_id) => {
        // const { deck_name } = this.state.user_deck 
        console.log("updated deck name", this.state[deck_name], "current deck name", deck_name)
        // passing ?deck_id=${deck_id} as a QUERY
        axios.put(`/api/edit_deck_name/deck_name${this.state[deck_name]}?deck_id=${deck_id}`).then(() => {
            console.log("deck name edited!")
            this.fetchDecks() 
        })
    }

    // INCOMPLETE BACKEND, MAY NEED TO UPDATE THE WAY WE SAVE CARDS TO DB???
    // deleteCardFromDB = (name) => {
    //     axios.delete('/api/deleteFromDB').then(results =>{
    //         this.setState({
    //             user_decks: results.data
    //         })
    //     })
    // }

    updateDeckNameInputs = (text) => {
        // text.target.name = original deck name
        // text.target.value = what's in the input 
        console.log( "updateDeckNameInputs", "TEXT.TARGET", text.target, "TEXT.TARGET.NAME",text.target.name, "TEXT.TARGET.VALUE", text.target.value)
        this.setState({
            // Wrapped in square brackets because if you want the key to be a string 
            [text.target.name]: text.target.value
        })
    }

    render(){
        let cmc ; 
        const { user } = this.props;
        const { user_decks } = this.state
        const displayDecks = user_decks.map((decks, i) => {
            console.log("displayDecks", decks)
            return (
            <div className="deck">

                <h2>{decks.deck_name}</h2>

                <div className='my_deck_name_input'>

                    <input name={decks.deck_name} onChange={ (e) => this.updateDeckNameInputs(e)}placeholder="Edit Deck Name"/> 
                                        
                </div>

                <div>

                    <button onClick={() => this.updateDeckName(decks.deck_name, decks.deck_id)}>Save Deck Name</button>
                    <button onClick={() => this.deleteDeck(decks.deck_id)}>Delete Deck</button>

                </div>

                <div className="my_deck_name"> 
                
                    {decks.deck.map((card) => {
                    // needs to parse from JSON 
                        card = JSON.parse(card)
                        // console.log(card)
                        // console.log("TEST USER", user)
                        cmc = 
                        decks.deck.map((card) => {
                            card = JSON.parse(card)
                            console.log("cmc", cmc)
                            return  {
                                label: card.name,data: [card.cmc],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                    'rgba(255, 99, 132, 0.6)' 
                                ]
                            }
                        })

                    return(
                <div className="my_deck_container">

                        {console.log("card", card)}
                            <div className="card">
                                <img src={card.image_uris.small} alt={card.id}></img>
                            </div>

                </div>  

                )}
                )}
                        
                </div>

                <div className="deck_charts">

<Bar 
    data={{ 
        datasets: cmc 
    }}
    options={{
        title: {
            display: "CMC CHART",
            text: 'CMC CHART',
            fontSize: 25,
        }
    }}
   
    
/>


</div>


        </div>
        )
            
        }
        )
    
    return (
         <div className="myDecks">

            {!user && <div className="not_logged_in"> 
                <Link to="/login">
                    <h2>Please Log In or Register</h2>
                </Link>
            </div>} 


            {user && 
                <div className="conditional_display"> 

                    <div className="display_decks">
                        {displayDecks}
                    </div>
                    
                 </div>
            } 

        </div>
    )
    }
}

const mapStateToProps = (reducerState) => {
    return {
        // user_decks: reducerState.user_decks,
        user: reducerState.user
    }
}

export default connect (mapStateToProps, { update_user_decks, update_user })(My_Decks);