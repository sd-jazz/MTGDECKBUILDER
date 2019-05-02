const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require("massive");
const bcrypt = require('bcrypt');
const cors = require('cors'); 
const app = express();
// // SECRET KEY
// const stripe = require("stripe")(/*'sk_test_3RhTa4ylPaVtiHPVJhsXSDuf'*/process.env.STRIPE_SECRET_KEY)
const saltRounds = 12; 
const cc = require("./controller/card_controller")
require("dotenv").config();

massive( process.env.CONNECTION_STRING ).then( db => {
  console.log("connected to db")
  app.set('db', db)
}).catch( err => console.log(err) );

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: "mega hyper ultra secret",
  saveUninitialized: false,
  resave: false,
}));

app.use(express.static(`${__dirname}/../build`));

// API endpoints 
const cardsBaseUrl = "/api/cards"; 
app.post(cardsBaseUrl, cc.create);
app.get(cardsBaseUrl, cc.read);
app.put (cardsBaseUrl, cc.update);
app.delete(`${cardsBaseUrl}/:deck_id`, cc.delete);

// CRUD + DB
app.post('/api/decks', cc.saveDeck);
app.get('/api/get_decks', cc.getDecks);
app.get('/api/get_user_decks/:id', cc.getUserDecks);
app.delete('/api/delete_deck:deck_id', cc.deleteDeck);
app.put('/api/edit_deck_name/deck_name:deck_name', cc.editDeckName);
// app.delete('/api/deleteFromDB', cc.deleteCardFromDB)

// LOGIN and REGISTER endpoints

app.post('/register', (req, res) => {
  // Deconstructing username and password from req.body
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds).then(hashedPassword => {
    // Inserting username and password using create_user.sql
    console.log(username)
    // Runs find_user to make sure there are no duplicates 
    app.get('db').find_user(username).then((user) => {
      console.log(user)
      if(!user.length){
        app.get('db').create_user([username, hashedPassword]).then(() => {
        // After the user record has been created, this creates a user object on the session that contains a username property and the username value
        req.session.user = { username };
        res.json({ username })
        })
        } else {
          throw {message: 'duplicate key'}
        }
    }
).catch(error => {
      console.log('error', error);
      if (error.message.match(/duplicate key/)) {
      // error 409 = duplicate exists
        res.status(409).json({ message: "That user already exists" });
      } else {
        res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
      }
    });
    // UNNECESSARY, PROBABLY???
  }).catch(error => {
    res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
  })
});

app.post('/login', (req, res) => {
  // Deconstructing username and password from req.body
  const { username, password } = req.body;
  app.get('db').find_user([username]).then(data => {
    // Searching for matching records that contain the same username and password properties in the db using find_user.sql
    if (data.length) {
      // data[0] = response from the database 
      bcrypt.compare(password, data[0].password).then(passwordsMatch => {
        if (passwordsMatch) {
          console.log("data", data)
          console.log("username", username)
          console.log("req.session.user", req.session.user)

          req.session.user = { username: data[0].username, id: data[0].user_id };
          console.log("data", data)
          console.log("username", username)
          console.log("req.session.user", req.session.user)
          // If no error occurs, this will create a user object in the session and send that user back as the response
          res.status(200).json( req.session.user );
        // If data[0].password !=== password
        } else {
          res.status(403).json({ message: 'Invalid password' });
        }
      }).catch(error => {
        res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
      })
    // If both username and password are invalid 
    } else {
      res.status(403).json({ message: 'Unknown user' });
    }
  }).catch(error => {
    res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
  });
});

// LOG-IN  
app.get("/api/user-data", (req, res) => {
  res.json({ user: req.session.user });
});

// LOG-OUT
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

// STRIPE AND TWILLIO 

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const myPhoneNumber = process.env.TWILIO_MY_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken);


app.post("/api/stripe", (req, res) => {
  const stripeToken = req.body;
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

  // const stripeToken = req.body.body;
  console.log("TWILIO!")
  client.messages.create({
    to: myPhoneNumber,
    from: 12244354644,
    body: "ALL YOUR BASE ARE BELONG TO US"
  }).then((message) => console.log(message.sid))

  console.log(stripeToken)
  stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      description: 'Example Charge',
      source: stripeToken.body
      // source: stripeToken.id
    }, function(err, charge) {
        console.log('charge', charge)
        if(err){
          res.send({
              success: false,
              message: 'Error'
          })
        } else {
          res.send({
          success: true,
          message: 'Success'
       })
        }
    });

});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = process.env.SERVER_PORT || 4000; 
app.listen(PORT, () => console.log(`Ready to roll out on port ${PORT}`))