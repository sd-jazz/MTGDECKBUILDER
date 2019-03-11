import React from 'react';
import './navBar.css';
import { Link, /* Route */} from 'react-router-dom';
import { connect } from 'react-redux';
import { update_user } from '../../redux/reducer';

const NavBar = () => {
    return (
        <header>

            <Link to="/">
                <h2><a href="#">Home</a></h2>
            </Link>

            <Link to="/deckbuilder">
                <h2><a href="#">Deckbuilder</a></h2>
            </Link>

            <Link to="/my_decks">
            <h2><a href="#">My Decks</a></h2>
                </Link>

            {/* <Link to="/hand_simulator">
                <h2><a href="#">Hand Simulator</a></h2></Link> */}
            {/* </div> */}

            <Link to="/community">
                <h2><a href="#">Community</a></h2>
            </Link>

            <div className="payment">
                <Link to="/payment"><h2><a href="#">Donate</a></h2></Link>
            </div>

        </header>
    )
}

const mapStateToProps = (reducerState) => { 
    return {
            user: reducerState.user
    }
}


export default connect (mapStateToProps, { update_user })(NavBar); 