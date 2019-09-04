import React from "react";
import "./Music.css";

class Music extends React.Component {
  state = {
    play: false
  }
  url = "Portals.mp3";
  audio = new Audio(this.url);

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  }

  render() {
    return (
      
        <button className="playSound" onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
     
    );
  }
}

export default Music;