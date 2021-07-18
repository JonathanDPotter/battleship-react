import React, { Component } from "react";
import "./App.scss";
import Ship from "./components/Ship/Ship.js";
import Board from "./components/Board/Board.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changeableText: "boop",
      currentShip: "",
      placementOrientation: "h",
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
      comBoard: new Board("computer"),
      humBoard: new Board("human"),
    };

    this.placeShip = this.placeShip.bind(this);
    this.toggleOrientation = this.toggleOrientation.bind(this);
  }

  toggleOrientation() {
    this.state.placementOrientation === "h"
      ? this.setState({ placementOrientation: "v" })
      : this.setState({ placementOrientation: "h" });
  }

  placeShip() {
    const humShips = [
      this.state.humAircraftCarrier,
      this.state.humBattleShip,
      this.state.humCruiser,
      this.state.humSubmarine,
      this.state.humDestroyer,
    ];

    this.setState({ currentShip: humShips[this.state.shipPlaceCount].name });

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
        <h1 id="game-title" className="title">
          {"Battleship"}
        </h1>
        <h2 id="information" className="information">
          Place {this.state.currentShip}{" "}
          {this.state.placementOrientation === "h"
            ? "Horizontally"
            : "Vertically"}
        </h2>
        <button
          id="orientation-toggle"
          className="btn"
          onClick={this.toggleOrientation}
        >
          Toggle Horiz/Vert
        </button>
        <h2 id="com-board-name" className="board-name">
          {this.state.comBoard.player}
        </h2>
        <div id="com-board" className="board">
          {this.state.comBoard.points.map((row, i) => {
            return row.map((point, j) => {
              return (
                <div className="point" key={[i, j]}>
                  {point}
                </div>
              );
            });
          })}
        </div>
        <h2 id="hum-board-name" className="board-name">
          {this.state.humBoard.player}
        </h2>
        <div id="hum-board" className="board">
          {this.state.humBoard.points.map((row, i) => {
            return row.map((point, j) => {
              return (
                <div className="point" key={[i, j]}>
                  {point}
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default App;
