import React, { Component } from "react";
import "./App.css";
import Ship from "./components/Ship/Ship.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeableText: "boop",
      information: "",
      shipsPlaced: false,
      shipPlaceCount: 0,
      humAircraftCarrier: new Ship("Aircraft Carrier", 5),
      humBattleShip: new Ship("Battleship", 4),
      humCruiser: new Ship("Cruiser", 3),
      humSubmarine: new Ship("Submarine", 3),
      humDestroyer: new Ship("Destroyer", 2),
      comAircraftCarrier: new Ship("Aircraft Carrier", 5),
      comBattleShip: new Ship("Battleship", 4),
      comCruiser: new Ship("Cruiser", 3),
      comSubmarine: new Ship("Submarine", 3),
      comDestroyer: new Ship("Destroyer", 2),
    };
    this.placeShip = this.placeShip.bind(this);
  }

  placeShip() {
    const humShips = [
      this.state.humAircraftCarrier,
      this.state.humBattleShip,
      this.state.humCruiser,
      this.state.humSubmarine,
      this.state.humDestroyer,
    ];
    this.setState({
      information: `Place ${humShips[this.state.shipPlaceCount].name}`,
    });

    if (this.state.shipPlaceCount < 4) {
      this.setState({ shipPlaceCount: this.state.shipPlaceCount + 1 });
    }
  }

  componentDidMount() {
    this.placeShip();
  }

  render() {
    return (
      <div id="full-screen" className="full-screen">
        <h1 data-testid="game-title" className="title">
          {"Battleship"}
        </h1>
        <h2 id="information" className="information">
          {this.state.information}
        </h2>
        <button className="btn" onClick={this.placeShip}>
          place ship
        </button>
      </div>
    );
  }
}

export default App;
