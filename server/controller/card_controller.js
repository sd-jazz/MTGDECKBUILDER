let deck = [];
let deck_name = "Your Deckname Here"; 
module.exports = {

    // NO DB CRUD

    read: (req, res) => {
        // sets default deckname using variable up top
      res.status(200).send(deck_name)
     },

     create: (req, res) => {
        // desconstructing card from req.body
        // .send can also be .JSON
        const {card} = req.body
        const { name, id, image_uris, cmc, type_line, color_identity, colors, rarity } = card
        let cardValues = {
          name,
          id,
          cmc,
          type_line,
          color_identity,
          colors,
          image_uris,
        }
        deck.push(cardValues)
        res.status(200).send(deck)
     },

     update: (req, res) => {
      // updates the deckName up top to the deckName variable of req.body
      deck_name = req.body.deck_name
      res.status(200).send(deck_name)
     },

     delete: (req, res) => {
      // deconstruct the card id from the request parameters
      let {id} = req.params; 
      // defining index for the card we want to splice
      let index = deck.findIndex((card) => card.id === id);
      // finds the targeted index and removes the 1 value, returns modified array
      deck.splice(index, 1)

      res.status(200).send(deck)
    },

    // DB CRUD

    saveDeck: (req, res, next) => {
      const { user, deck_name, deck, username /*, image_uris */ } = req.body
      console.log( req.body )
      const db = req.app.get('db')
      db.save_deck([user, deck, deck_name, username /* , image_uris */]).then(savedDeck => {
        console.log('res.data', res.data)
        res.status(200).json(savedDeck)
      }).catch(err => console.log("saveDeck", err))
  },

    getDecks: (req, res, next) => {
      console.log("getDecks")
      req.app.get('db').get_decks().then(decks => {
        res.status(200).json(decks);
      }).catch(err => console.log('(getDecks) ERROR', err))
    },

    getUserDecks: (req, res, next) => {
      console.log("getUserDecks")
      const {id} = req.params
      console.log("req.params", req.params)
      req.app.get('db').get_user_decks([id]).then(decks => {
        res.status(200).json(decks);
      }).catch(err => console.log('(getDecks) ERROR', err))
    },

    editDeckName: (req, res, next) => {
      const { deck_name } = req.params
      const { deck_id } = req.query 
      console.log("deck_name", deck_name, "req.params", req.params, "{deck_name}",{deck_name}, "deck_id", deck_id)
      req.app.get('db').edit_deck_name(deck_name, deck_id).then ( response => {
        res.status(200).json(response);
      }).catch(err => console.log('editDeckName ERROR', err))
    },

    deleteDeck: (req, res, next ) => {
      const { deck_id } = req.params;
      console.log("deck_id", deck_id, "req.params", req.params)
      req.app.get('db').delete_deck({ deck_id: deck_id }).then(response =>{
        res.status(200).json(response);
      }).catch(err => console.log ('deleteProduct ERROR', err))
    }
  }
  