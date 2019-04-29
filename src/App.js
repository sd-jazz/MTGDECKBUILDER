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
  //     // console.log(window.scrollY)
  //     if(window.scrollY > 100){
  //       // console.log('past 100')
  //       this.setState({ scrolled: true })
  //     } else {
  //       this.setState({ scrolled: false })
  //       // console.log('before 100')
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

      <nav className='nav'> 
        <div className='nav'>
        <NavBar myClass={this.state.scrolled ? 'nav scrolled' : 'nav'} /> 
        {routes}
        </div>  
       </nav> 

      </div>
    );
  }
}

export default App;
