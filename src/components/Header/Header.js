import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { update_user } from '../../redux/reducer';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            empty: "",
            // Getting state from Redux
            user: this.props.user
        }        
    }

    componentDidMount(){
        axios.get("/api/user-data").then(res=> {
            console.log(res.data)
        })
    }
    
    logout = () => {
        axios.post('/logout').then(response => {
            console.log(this.state)
            this.props.update_user(response.data)
          this.setState({ username: null });
        }).catch(error => {
          this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
        });
      };

    render(){
        // Deconstructing user from Redux 
        const { user } = this.props; 
        return (
        <div className="header">
            <div className="logo">
                <h1>MTG Deck Builder</h1>
            </div>
            {/* Conditional rendering wether or not there is a user logged in or not*/}
            {!user && <div className="conditional_render_login">
                <div className="log_in">
                    <Link to="/login"><h2><a href="#">Log In</a></h2></Link>
                </div>
            </div>}

            {user && <div className="conditional_render_logout">
                <div className="log_out">
                {/* NEEDS LOG OUT FUNNCTIONALITY */}
                    <Link to="/login" onClick={this.logout}>
                        <h2 /*onClick={this.logout}*/>
                            Log Out 
                            {/* {this.props} */}
                        </h2>
                    </Link>
                </div>
            </div>}
        </div>
        )
    }
}

const mapStateToProps = (reducerState) => { 
    return {
            user: reducerState.user
    }
}

export default connect (mapStateToProps, { update_user })(Header); 