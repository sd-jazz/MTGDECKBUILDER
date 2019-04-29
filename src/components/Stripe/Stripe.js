import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './stripe.css'; 

export default class Stripe extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paid: false
    }
  }
  onToken = (token) => {
    console.log('onToken', token); 
    axios.post('/api/stripe', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: token.id
    }).then( ()=> {
      this.setState({
        paid: true
      })
    })
  }

  render() {
    const { paid } = this.state; 

    return (

      <div>

        <div className="not_paid">
          <h1>
          (STRIPE TEST MODE)
            <div>
            DONATE: $10
            </div>
          </h1>
        </div>

        <StripeCheckout
          token={this.onToken}
          // PUBLISHABLE KEY
          stripeKey="pk_test_3o1ZktybntixHkDxm6ks3LBr"
         />


        { paid && <div className="paid">
          <img className="meme" src="https://i.imgur.com/1NBsdmu.jpg?1" />
        </div>}

      </div>


    )
  }
}