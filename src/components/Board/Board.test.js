import Board from "./Board.js";
import Ship from "../Ship/Ship.js";

test("new Board initializes with name and 2d array 8x8 0s", () => {
  const humBoard = new Board("human");
  expect(humBoard.player).toBe("human");
  expect(humBoard.points).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Board marks a targeted point with a 1", () => {
  const humBoard = new Board("human");
  humBoard.target(2, 3);
  expect(humBoard.points).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Board returns point of ship hit when a ship is targeted", () => {
  const humBoard = new Board("human");
  const battleship = new Ship("battleship", 4, "b");
  humBoard.place(0, 0, "h", battleship);
  expect(humBoard.target(0, 0)).toBe("b0");
  expect(humBoard.target(0, 2)).toBe("b2");
});

test("Board creates and places ships horizontally", () => {
  const humBoard = new Board("human");
  const battleship = new Ship("battleship", 4, "b");

  humBoard.place(2, 3, "h", battleship);

  expect(humBoard.points).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "b0", "b1", "b2", "b3", 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Board creates and places ships vertically", () => {
  const humBoard = new Board("human");
  const battleship = new Ship("battleship", 4, "b");

  humBoard.place(2, 3, "v", battleship);

  expect(humBoard.points).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "b0", 0, 0, 0, 0],
    [0, 0, 0, "b1", 0, 0, 0, 0],
    [0, 0, 0, "b2", 0, 0, 0, 0],
    [0, 0, 0, "b3", 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("board will not place a ship off the edge of the battlefield", () => {
  const humBoard = new Board("human");
  const battleship = new Ship("battleship", 4, "b");

  expect(humBoard.place(6, 6, "h", battleship)).toBe(false);
  expect(humBoard.place(6, 6, "v", battleship)).toBe(false);
});

test("board won't place one ship on top of another", () => {
  const humBoard = new Board("human");
  const battleship = new Ship("battleship", 4, "b");
  const submarine = new Ship("submarine", 3, "s");

  humBoard.place(2, 2, "h", battleship);
  expect(humBoard.place(0, 2, "v", submarine)).toBe(false);
  expect(humBoard.place(2, 0, "h", submarine)).toBe(false);
  expect(humBoard.place(0, 0, "h", submarine)).toBe(true);
});

test("random placement of computer ships works", () => {
  const comShips = [
    new Ship("Aircraft Carrier", 5, "a"),
    new Ship("Battleship", 4, "b"),
    new Ship("Cruiser", 3, "c"),
    new Ship("Submarine", 3, "s"),
    new Ship("Destroyer", 2, "d"),
  ];
  const comBoard = new Board("computer");
  let placedShips = 0;

  comShips.forEach((ship) => {
    let placed = true;
    do {
      placed = comBoard.place(
        Math.floor(Math.random() * 8),
        Math.floor(Math.random() * 8),
        Math.random() < 0.5 ? "h" : "v",
        ship
      );
      if (placed === true) {
        placedShips = placedShips + 1;
      }
    } while (placed === false);
  });

  expect(placedShips).toBe(5);
});

test("find points on two or more boards", () => {
  const humSub = new Ship("Submarine", 3, "s"),
    comSub = new Ship("Submarine", 3, "s"),
    jerSub = new Ship("Submarine", 3, "s");

  const humBoard = new Board("human"),
    comBoard = new Board("computer"),
    jerBoard = new Board("jerry");

  humBoard.place(0, 0, "h", humSub);
  comBoard.place(0, 0, "h", comSub);
  jerBoard.place(0, 0, "h", jerSub);

  expect(humBoard.points[0][0]).toBe("s0");
  expect(comBoard.points[0][5]).toBe(0);
  expect(jerBoard.points[0][0]).toBe("s0");
});
