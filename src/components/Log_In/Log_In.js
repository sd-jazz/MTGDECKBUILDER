import React, { Component } from 'react';
import './log_in.css';
import axios from 'axios';
import { Link, Redirect /* Route */} from 'react-router-dom';
import { connect } from 'react-redux';
import { update_user } from '../../redux/reducer'

class Log_In extends Component {
    constructor (props){
    super(props)
        this.state = {
            user: null, 
            username: null,
            username_input: null,
            password: null,
            message: null
        }
    }

    componentDidMount = () =>{
      console.log("user", this.state.user, "this.props.user", this.props.user)
    }

    updateUser = (text) => {
        this.setState({ username: text })
        console.log(this.state.username)
    }

    updatePassword = (text) => {
        this.setState({ password: text })
        console.log(this.state.password)
    }

    getMessage = error => error.response
    ? error.response.data
      ? error.response.data.message
      : JSON.stringify(error.response.data, null, 2)
    : error.message;

    register = () => {
        this.setState({ message: null });

        const username = this.state.username;
        const password = this.state.password;

        axios.post('/register', { username, password}).then(response => {
          // Redirect functionality imported from react-router-dom
          // This function creates a state for redirect
          this.setState({ username: response.data, redirect: true})
          // Logs in and sets state in Redux
          this.props.update_user(response.data);
        }).catch(error => {
          this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
        });
      };

      login = () => {
        this.setState({ message: null });

        const username = this.state.username;
        const password = this.state.password;

        axios.post('/login', { username, password }).then(response => {
          console.log("Login Successful", response.data)
          // This updates state to Redux 
          this.props.update_user(response.data)
          this.setState({ username: response.data, redirect: true })
        }).catch(error => {
          this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
        });
      };
    
      logout = () => {
        axios.post('/logout').then(response => {
          console.log(this.props.username)
          this.setState({ username: null });
        }).catch(error => {
          this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
        });
      };
    


    render(){
      
        return (
          // If redirect is true, redirect to deckbuilder.
          // Initially there is no redirect in state, so it is falsey 
          // Log in / register will set it to true and trigger the redirect
          this.state.redirect ? 
          <Redirect to="/deckbuilder" />
          : 
          <div className="log_in">

           <div className="login_register">

                <div className="fields">
                    <h3>username:</h3><input onChange={(e) => this.updateUser(e.target.value)}placeholder="Username"/>
                    <h3>password:</h3> <input type="password" onChange={(e) => this.updatePassword(e.target.value)}placeholder="Password"/>
                </div>

                <div className="login_buttons">
                    <button className="login_button" onClick={this.login}>
                        Login
                    </button>

                    <button className="register_button" onClick={this.register}>
                        Register
                    </button>
                </div>

                <div className="error_message">
                    {this.state.message}
                </div>

            </div>

          </div>
        )
    }
}

const mapStateToProps = (reducerState) => { 
  return {
          user: reducerState.user
  }
}


export default connect (mapStateToProps, { update_user })(Log_In);