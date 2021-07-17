import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { changeableText: "boop" };
    this.changeText = this.changeText.bind(this);
  }

  changeText(string) {
    console.log(string);
  };

  render() {
    return (
      <div id="full-screen" className="full-screen">
        <h1 data-testid="game-title" className="title">
          {"Battleship"}
        </h1>
        <button className="title" onClick={this.changeText("beep")}>
          change text
        </button>
        <h1 data-testid="changeable-text">{this.state.changeableText}</h1>
      </div>
    );
  }
}


export default App;
