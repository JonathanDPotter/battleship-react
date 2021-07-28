import React, { Component } from "react";
import "./App.scss";
import Ship from "./components/Ship/Ship.js";
import Board from "./components/Board/Board.js";
import Player from "./components/Player/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt, faCrosshairs } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      humShipsSunk: [],
      comShipsSunk: [],
      message: "Choose a target.",
      gameOver: false,
    };

    this.setup = this.setup.bind(this);
    this.humBoardClick = this.humBoardClick.bind(this);
    this.comBoardClick = this.comBoardClick.bind(this);
    this.toggleOrientation = this.toggleOrientation.bind(this);
    this.comTurn = this.comTurn.bind(this);
    this.tallySunkShip = this.tallySunkShip.bind(this);
    this.fire = this.fire.bind(this);
    this.winner = this.winner.bind(this);
    this.showResult = this.showResult.bind(this);
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
      {
        shipPlaceCount,
        humBoard,
        placementOrientation,
        humAircraftCarrier,
        humBattleShip,
        humCruiser,
        humSubmarine,
        humDestroyer,
      } = this.state;

    const humShips = [
      humAircraftCarrier,
      humBattleShip,
      humCruiser,
      humSubmarine,
      humDestroyer,
      { name: "" },
    ];

    if (shipPlaceCount < 5) {
      if (
        humBoard.place(y, x, placementOrientation, humShips[shipPlaceCount]) ===
        true
      ) {
        this.setState({
          shipPlaceCount: shipPlaceCount + 1,
          currentShip: humShips[shipPlaceCount + 1].name,
        });
      }
    }
  }

  comBoardClick(event) {
    const y = parseInt(event.target.getAttribute("coord")[0]),
      x = parseInt(event.target.getAttribute("coord")[2]),
      comBoardContainer = document.getElementById("com-board-container");

    const {
      comAircraftCarrier,
      comBattleShip,
      comCruiser,
      comSubmarine,
      comDestroyer,
    } = this.state;

    this.fire(
      y,
      x,
      this.state.comBoard,
      comAircraftCarrier,
      comBattleShip,
      comCruiser,
      comSubmarine,
      comDestroyer
    );

    event.target.classList.add("unclickable");

    this.setState({ message: "Computer turn" });
    comBoardContainer.classList.add("unclickable");
    setTimeout(() => {
      this.comTurn();
      comBoardContainer.classList.remove("unclickable");
    }, 500);
  }

  tallySunkShip(player, ship) {
    const { comShipsSunk, humShipsSunk, human, computer } = this.state;

    const humShipsSunkDisplay = document.getElementById("hum-ships-sunk"),
      comShipsSunkDisplay = document.getElementById("com-ships-sunk");

    if (player === "computer") {
      comShipsSunk.push(ship);
      human.sunkShip();
      comShipsSunkDisplay.classList.add("jiggle");
      window.setTimeout(() => {
        comShipsSunkDisplay.classList.remove("jiggle");
      }, 1000);
      if (human.hasWon() === true) {
        this.winner(human);
      }
    } else {
      humShipsSunk.push(ship);
      computer.sunkShip();
      humShipsSunkDisplay.classList.add("jiggle");
      window.setTimeout(() => {
        humShipsSunkDisplay.classList.remove("jiggle");
      }, 1000);
      if (computer.hasWon() === true) {
        this.winner(computer);
      }
    }
  }

  comTurn() {
    const {
      humBoard,
      humAircraftCarrier,
      humBattleShip,
      humCruiser,
      humSubmarine,
      humDestroyer,
    } = this.state;

    let success = true;
    if (this.state.gameOver === false) {
      do {
        success = this.fire(
          Math.floor(Math.random() * 8),
          Math.floor(Math.random() * 8),
          humBoard,
          humAircraftCarrier,
          humBattleShip,
          humCruiser,
          humSubmarine,
          humDestroyer
        );
      } while (success === false);
    }
    this.setState({ message: "Choose a target." });
  }

  fire(
    y,
    x,
    board,
    aircraftCarrier,
    battleship,
    cruiser,
    submarine,
    destroyer
  ) {
    let pointHit = false;

    if (board.points[y][x] === 1 || board.points[y][x] === 2) {
      return false;
    } else {
      pointHit = board.target(y, x);

      this.setState({ shotsFired: this.state.shotsFired + 1 });

      if (pointHit !== 0) {
        let shipId = pointHit.split("")[0];
        let shipPoint = pointHit.split("")[1];
        console.log(shipId, shipPoint);
        switch (shipId) {
          case "a":
            aircraftCarrier.hit(shipPoint);
            if (aircraftCarrier.isSunk()) {
              console.log("Aircraft Carrier sunk!");
              this.tallySunkShip(board.player, aircraftCarrier.name);
            }
            break;
          case "b":
            battleship.hit(shipPoint);
            if (battleship.isSunk()) {
              console.log("Battleship sunk!");
              this.tallySunkShip(board.player, battleship.name);
            }
            break;
          case "c":
            cruiser.hit(shipPoint);
            if (cruiser.isSunk()) {
              console.log("Cruiser sunk!");
              this.tallySunkShip(board.player, cruiser.name);
            }
            break;
          case "d":
            destroyer.hit(shipPoint);
            if (destroyer.isSunk()) {
              console.log("Destroyer sunk!");
              this.tallySunkShip(board.player, destroyer.name);
            }
            break;
          case "s":
            submarine.hit(shipPoint);
            if (submarine.isSunk()) {
              console.log("Submarine sunk!");
              this.tallySunkShip(board.player, submarine.name);
            }
            break;
          default:
            console.log("Some kind of error.");
            break;
        }
      }
      return true;
    }
  }

  winner(player) {
    const winnerMessage = document.getElementById("winner-message");

    player.name === "computer"
      ? this.setState(
          { winner: "Computer", gameOver: true },
          () => (winnerMessage.className = "winner-message fade-in grow")
        )
      : this.setState(
          { winner: "Human", gameOver: true },
          () => (winnerMessage.className = "winner-message fade-in grow")
        );
  }

  showResult(point) {
    if (point === 2) {
      return (
        <FontAwesomeIcon icon={faFireAlt} className="fire icon" size="2x" />
      );
    } else if (point === 1) {
      return (
        <FontAwesomeIcon
          icon={faCrosshairs}
          className="crosshairs icon"
          size="2x"
        />
      );
    }
  }

  refresh() {
    window.location.reload();
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
        {this.state.gameOver === false ? (
          <div
            id="main-display"
            className={
              this.state.shipPlaceCount === 5
                ? "fade-in main-display"
                : "main-display"
            }
          >
            <div id="information" className="information">
              {this.state.shipPlaceCount < 5 ? (
                <h2>
                  Place {this.state.currentShip}{" "}
                  {this.state.placementOrientation === "h"
                    ? "Horizontally"
                    : "Vertically"}
                </h2>
              ) : (
                <h2>{this.state.message}</h2>
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
            ) : (
              <div id="orientation-toggle"></div>
            )}
            {this.state.shipPlaceCount === 5 ? (
              <div id="com-board-container" className="board-container">
                <h2 id="com-board-name" className="board-name">
                  {this.state.comBoard.player} board
                </h2>
                <div
                  id="sub-com-board-container"
                  className="sub-board-container"
                >
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
                            {this.showResult(point)}
                          </div>
                        );
                      });
                    })}
                  </div>
                  <div id="com-ships-sunk" className="ships-sunk">
                    <h3 id="sunk-ship-title" className="sunk-ship">
                      Ships Sunk
                    </h3>
                    {this.state.comShipsSunk.map((ship) => {
                      return (
                        <h3 className="sunk-ship" key={ship + "com"}>
                          {ship} sunk!
                        </h3>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="board-container" id="hum-board-container">
              <h2 id="hum-board-name" className="board-name">
                {this.state.shipPlaceCount === 5
                  ? `${this.state.humBoard.player} board`
                  : null}
              </h2>
              <div id="sub-hum-board-container" className="sub-board-container">
                <div id="hum-board" className="board">
                  {this.state.humBoard.points.map((row, i) => {
                    return row.map((point, j) => {
                      return (
                        <div
                          className={
                            point !== 1 && point !== 2 && point !== 0
                              ? "point ship"
                              : "point"
                          }
                          key={[i, j]}
                          coord={[i, j]}
                          onClick={this.humBoardClick}
                        >
                          {this.showResult(point)}
                        </div>
                      );
                    });
                  })}
                </div>
                {this.state.shipPlaceCount === 5 ? (
                  <div id="hum-ships-sunk" className="ships-sunk">
                    <h3 id="sunk-ship-title" className="sunk-ship">
                      Ships Sunk
                    </h3>
                    {this.state.humShipsSunk.map((ship) => {
                      return (
                        <h3 className="sunk-ship" key={ship + "hum"}>
                          {ship} sunk!
                        </h3>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        <div id="winner-message" className="winner-message hidden">
          <h1 id="winner" className="winner">
            {`${this.state.winner} has won!`}
          </h1>
          <button
            id="play-again"
            className="btn"
            onClick={() => this.refresh()}
          >
            play again
          </button>
        </div>
      </div>
    );
  }
}

export default App;
