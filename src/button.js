import React from "react";

class Button extends React.Component {
  state = {
    src: "//img42.com/fPWGc+"
  };

  down = () => {
    this.audio.play();
    this.setState({ src: "//img42.com/5PwtX+" });
  };

  up = () => {
    this.setState({ src: "//img42.com/fPWGc+" });
  };

  componentDidMount = () => {
    this.audio = new Audio('images/instantrapairhorn.mp3');

    this.audio.addEventListener('ended', () => {
        this.setState({ src: "//img42.com/fPWGc+" });
      })


  }
  

  render() {
    return (
      <img
        id="button"
        className="button"
        src={this.state.src}
        onMouseDown={this.down}
        alt="button"
        width="50%"
      />
    );
  }
}

export default Button;
