import React, { Component } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from '../Charts/Chart'
import { connect } from 'react-redux'; 
import { update_user_decks } from '../../redux/reducer';
import './community.css'

class Community extends Component {
    constructor (props){
    super(props)
        this.state = {
            user_decks: [],
        }
    }

    componentDidMount = () => {
        this.fetchDecks()
    }
    
    fetchDecks = () => {
        axios.get('/api/get_decks').then(response => {
            this.props.update_user_decks(response.data)
            this.setState({
                user_decks: response.data
            })
            console.log("user_decks", response.data)
            // console.log("fetchDecks REDUX", this.props.user_decks)
        })
    }

    render(){
        const { user_decks } = this.state
        let cmc ; 
        const displayDecks = user_decks.map((decks, i) => {
            console.log("displayDecks", decks)
            return (
            <div className="community_decks">

                <h2>{decks.deck_name} <a className="deck_author">by { decks.username } </a></h2> 

                {/* <div className="deck_author"> 

                    <h3>Built by { decks.username }</h3>

                </div>
 */}
                <div className="my_deck_name"> 
                
                    {decks.deck.map((card) => {
                    // needs to parse from JSON 
                        card = JSON.parse(card)
                        console.log(card)
                    return(
                    <div className="my_deck_container">

                            {console.log("card", card)}
                                <div className="community_cards">
                                    <img src={card.image_uris.small} alt={card.id}></img>
                                </div>
                    </div>  
                    )}
                    )}

                </div>

            <div className="community_charts">
                <Chart legendPosition ="bottom"/>
                    { cmc = 
                        decks.deck.map((card) => {
                            card = JSON.parse(card)
                            console.log("cmc", cmc)
                            return ( card.cmc ) 
                        })
                    }
                <Bar 
                    data={{
                        datasets: [
                            {
                                label: "Converted Mana Costs",
                                data: [0, 1, 2, 3, 4]
                            }
                        ]
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
        )})
    
        return (
            <div className="myDecks">

                    <div className="display_decks">
                        {displayDecks}
                    </div>

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

export default connect (mapStateToProps, { update_user_decks})(Community);