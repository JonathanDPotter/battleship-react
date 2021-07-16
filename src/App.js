import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { thing: 5 };
  }

  double(num) {
    return num * 2;
  }

  render() {
  return <h2>{this.double(2)}</h2>
  }
}

export default App;
