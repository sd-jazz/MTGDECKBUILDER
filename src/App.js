import React, { Component } from 'react';
import './App.css'
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import routes from './routes';

// import './reset.css';

class App extends Component {

  constructor(props){
    super(props)
      this.state = {
        scrolled: false
      }
  }

  // componentDidMount(){
  //   window.addEventListener('scroll', () => {
  //     const isTop = window.scrollY < 100; 
  //     console.log(window.scrollY)
  //     if(isTop !== true){
  //       this.setState({ scrolled: true })
  //     } else {
  //       this.setState({ scrolled: false })
  //     }
  //   });
  // };

  // componentWillUnmount(){
  //   window.removeEventListener('scroll');
  // }


  render() {
  
    return (
      <div className="App">
        <div className='Header'>
          <Header />
        </div>

      {/* <nav className={this.state.scrolled ? 'nav scrolled' : 'nav'}> */}
        {/* <div className={this.state.scrolled ? 'nav scrolled' : 'nav'}> */}
        <NavBar /> 
        {routes}
        {/* </div>  */}
      {/* </nav> */}

      </div>
    );
  }
}

export default App;
