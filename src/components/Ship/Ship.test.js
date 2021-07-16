import Ship from "./Ship.js"

test("new ship has correct name and points", () => {
  const battleship = new Ship("battleship", 4, "b");
  expect(battleship.name).toBe("battleship");
  expect(battleship.id).toBe("b")
  expect(battleship.points).toStrictEqual([0, 0, 0, 0]);
});

test("battleship.hit marks the correct point as hit", () => {
  const battleship = new Ship("battleship", 4, "b");
  battleship.hit(2);
  expect(battleship.points).toStrictEqual([0, 0, 1, 0]);
});

test("battleship.isSunk returns true only if all points hit", () => {
  const battleship = new Ship("battleship", 4, "b");
  battleship.hit(0);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(1);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(2);
  expect(battleship.isSunk()).toBe(false);
  battleship.hit(3);
  expect(battleship.isSunk()).toBe(true);
});