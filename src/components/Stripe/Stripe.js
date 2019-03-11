import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Stripe extends React.Component {

  onToken = (token) => {
    console.log('onToken', token); 
    axios.post('/api/stripe', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: token.id
    })/*.then(res => res.json()) */
      .then(json => {
        console.log('json', json)
      })
  }

  render() {
    return (
       // ...
      <StripeCheckout
        token={this.onToken}
        // PUBLISHABLE KEY
        stripeKey="pk_test_3o1ZktybntixHkDxm6ks3LBr"
      />
    )
  }
}