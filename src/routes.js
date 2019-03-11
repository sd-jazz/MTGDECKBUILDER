import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Deckbuilder from './components/Deckbuilder/Deckbuilder';
import Community from './components/Community/Community';
import Hand_Simulator from './components/Hand_Simulator/Hand_Simulator';
import My_Decks from './components/My_Decks/My_Decks';
import Log_In from './components/Log_In/Log_In';
import Stripe from './components/Stripe/Stripe';

export default (
    <Switch>
        <Route component={ Home } exact path="/" />
        <Route component={ Deckbuilder } path="/deckbuilder" />
        <Route component={ Hand_Simulator } path="/hand_simulator" />
        <Route component={ My_Decks } path="/my_decks" />
        <Route component={ Community } path="/community" />
        <Route component={ Log_In } path="/login" /> 
        <Route component={ Stripe } path="/payment" />
    </Switch>
)
