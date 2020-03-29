import React, {Component} from 'react';
import './App.scss';
import {hot} from 'react-hot-loader';
import Main from './layout/Main';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
 
    }
  }

  render(){
    return(
      <>
        <Main />
      </>
    );
  }
}

export default hot(module)(App);