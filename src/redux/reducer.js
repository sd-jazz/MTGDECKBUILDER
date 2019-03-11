const initialState = {
    user: "",
    deck_input: "",
    card_input: "",
    card: "",
    error: "",
    deck_name: "",
    deck: [],
    username: null,
    password: null,
    message: null,
    user_decks: []

}

const UPDATE_DECK_INPUT = "UPDATE_DECK_INPUT";
const UPDATE_CARD_INPUT = "UPDATE_CARD_INPUT";
const UPDATE_CARD = "UPDATE_CARD";
const UPDATE_ERROR = "UPDATE_ERROR";
const UPDATE_DECK_NAME = "UPDATE_DECK_NAME";
const UPDATE_DECK = "UPDATE_DECK";
const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const UPDATE_MESSAGE = "UPDATE_MESSAGE"
const UPDATE_USER = "UPDATE_USER";
const UPDATE_USER_DECKS = "UPDATE_USER_DECKS";


function reducer (state = initialState, action){
    switch(action.type){
    
        case UPDATE_DECK_INPUT:
        return{...state, deck_input: action.payload}

        case UPDATE_CARD_INPUT:
        return{...state, card_input: action.payload}

        case UPDATE_CARD:
        return{...state, card: action.payload}

        case UPDATE_ERROR:
        return{...state, error: action.payload}

        case UPDATE_DECK_NAME:
        return{...state, deck_name: action.payload}

        case UPDATE_DECK:
        return{...state, deck: action.payload}

        case UPDATE_USERNAME:
        return{...state, username: action.payload}

        case UPDATE_PASSWORD:
        return{...state, password: action.payload}

        case UPDATE_MESSAGE:
        return{...state, message: action.payload}

        case UPDATE_USER:
        return{...state, user: action.payload}

        case UPDATE_USER_DECKS:
        return{...state, user_decks: action.payload}

        default: 
        return state; 

    }
}

export function update_deck_input( deck_input ){
    return {
        type: UPDATE_DECK_INPUT,
        payload: deck_input
    }
}

export function update_card_input( card_input ){
    return {
        type: UPDATE_CARD_INPUT,
        payload: card_input
    }
}

export function update_card( card ){
    return {
        type: UPDATE_CARD,
        payload: card
    }
}

export function update_error( error ){
    return {
        type: UPDATE_ERROR,
        payload: error
    }
}

export function update_deck_name( deck_name ){
    return {
        type: UPDATE_DECK_NAME,
        payload: deck_name
    }
}

export function update_deck( deck ){
    return {
        type: UPDATE_DECK,
        payload: deck
    }
}

export function update_username( username ){
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function update_password( password ){
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export function update_message( message ){
    return {
        type: UPDATE_MESSAGE,
        payload: message
    }
}

export function update_user( user ){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function update_user_decks( user_decks ){
    return {
        type: UPDATE_USER_DECKS,
        payload: user_decks 
    }
}

export default reducer;