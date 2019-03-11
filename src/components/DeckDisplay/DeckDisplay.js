import React from "react";
import './deck_display.css';

const DeckDisplay = (props) => {
    return(
        <div className="deckContainer">
            {props.deck.map(card => {
                return(
                    // mapping over every object in the deck array and creates an image wrapped in a div 
                    <div className="selected_card" key={card.name} onClick={(e) => {props.remove(e.target.alt)} }>
                        <img src={card.image_uris.small} alt={card.id}></img>
                    </div>
                )
            })}
        </div>
    )
}

export default DeckDisplay;
