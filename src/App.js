import React, { Component } from 'react';
import Game from './matchGame';
import Footer from "./components/Footer/Footer"


class App extends Component {

    render() {
      return (
        <div>
        <Game/>
        <Footer/>
        </div>
      );
    }
}

export default App;