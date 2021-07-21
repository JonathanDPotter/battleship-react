import React, { Component } from "react";
import "./App.scss";
import Ship from "./components/Ship/Ship.js";
import Board from "./components/Board/Board.js";
import Player from "./components/Player/Player";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changeableText: "boop",
      currentShip: "",
      placementOrientation: "h",
      shipsPlaced: false,
      shipPlaceCount: 0,
      humAircraftCarrier: new Ship("Aircraft Carrier", 5, "a"),
      humBattleShip: new Ship("Battleship", 4, "b"),
      humCruiser: new Ship("Cruiser", 3, "c"),
      humSubmarine: new Ship("Submarine", 3, "s"),
      humDestroyer: new Ship("Destroyer", 2, "d"),
      comAircraftCarrier: new Ship("Aircraft Carrier", 5, "a"),
      comBattleShip: new Ship("Battleship", 4, "b"),
      comCruiser: new Ship("Cruiser", 3, "c"),
      comSubmarine: new Ship("Submarine", 3, "s"),
      comDestroyer: new Ship("Destroyer", 2, "d"),
      comBoard: new Board("computer"),
      humBoard: new Board("human"),
      computer: new Player("computer"),
      human: new Player("human"),
      shotsFired: 0,
    };

    this.setup = this.setup.bind(this);
    this.humBoardClick = this.humBoardClick.bind(this);
    this.comBoardClick = this.comBoardClick.bind(this);
    this.toggleOrientation = this.toggleOrientation.bind(this);
  }

  toggleOrientation() {
    this.state.placementOrientation === "h"
      ? this.setState({ placementOrientation: "v" })
      : this.setState({ placementOrientation: "h" });
  }

  setup() {
    const comShips = [
      this.state.comAircraftCarrier,
      this.state.comBattleShip,
      this.state.comCruiser,
      this.state.comSubmarine,
      this.state.comDestroyer,
    ];

    const humShips = [
      this.state.humAircraftCarrier,
      this.state.humBattleShip,
      this.state.humCruiser,
      this.state.humSubmarine,
      this.state.humDestroyer,
    ];

    comShips.forEach((ship) => {
      let placed = true;
      do {
        placed = this.state.comBoard.place(
          Math.floor(Math.random() * 8),
          Math.floor(Math.random() * 8),
          Math.random() < 0.5 ? "h" : "v",
          ship
        );
      } while (placed === false);
    });

    this.setState({ currentShip: humShips[this.state.shipPlaceCount].name });
  }

  humBoardClick(event) {
    const y = parseInt(event.target.getAttribute("coord")[0]),
      x = parseInt(event.target.getAttribute("coord")[2]),
      { shipPlaceCount, humBoard, placementOrientation } = this.state;

    const humShips = [
      this.state.humAircraftCarrier,
      this.state.humBattleShip,
      this.state.humCruiser,
      this.state.humSubmarine,
      this.state.humDestroyer,
      { name: "" },
    ];

    if (shipPlaceCount < 5) {
      humBoard.place(y, x, placementOrientation, humShips[shipPlaceCount]);
      this.setState({
        shipPlaceCount: shipPlaceCount + 1,
        currentShip: humShips[shipPlaceCount + 1].name,
      });
    }
  }

  comBoardClick(event) {
    const y = parseInt(event.target.getAttribute("coord")[0]),
      x = parseInt(event.target.getAttribute("coord")[2]),
      { comBoard, shotsFired } = this.state;

    comBoard.target(y, x);
    this.setState({ shotsFired: shotsFired + 1 });
  }

  componentDidMount() {
    this.setup();
  }

  render() {
    return (
      <div id="full-screen" className="full-screen">
        <h1 id="game-title" className="title">
          {"Battleship"}
        </h1>
        <div id="information" className="information">
          {this.state.shipPlaceCount < 5 ? (
            <h2>
              Place {this.state.currentShip}{" "}
              {this.state.placementOrientation === "h"
                ? "Horizontally"
                : "Vertically"}
            </h2>
          ) : (
            <h2>Some other stuff.</h2>
          )}
        </div>
        {this.state.shipPlaceCount < 5 ? (
          <button
            id="orientation-toggle"
            className="btn"
            onClick={this.toggleOrientation}
          >
            Toggle Horiz/Vert
          </button>
        ) : <div id="orientation-toggle"></div>
        }
        <h2 id="com-board-name" className="board-name">
          {this.state.comBoard.player} board
        </h2>
        <div id="com-board" className="board">
          {this.state.comBoard.points.map((row, i) => {
            return row.map((point, j) => {
              return (
                <div
                  className="point"
                  key={[i, j]}
                  coord={[i, j]}
                  onClick={this.comBoardClick}
                >
                  {point}
                </div>
              );
            });
          })}
        </div>
        <h2 id="hum-board-name" className="board-name">
          {this.state.humBoard.player} board
        </h2>
        <div id="hum-board" className="board">
          {this.state.humBoard.points.map((row, i) => {
            return row.map((point, j) => {
              return (
                <div
                  className="point"
                  key={[i, j]}
                  coord={[i, j]}
                  onClick={this.humBoardClick}
                >
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
