import Player from "./Player.js";

test("when player score reaches 5, player has won", () => {
  const testPlayer = new Player();
  testPlayer.sunkShip();
  expect(testPlayer.hasWon()).toBe(false);
  testPlayer.sunkShip();
  expect(testPlayer.hasWon()).toBe(false);
  testPlayer.sunkShip();
  expect(testPlayer.hasWon()).toBe(false);
  testPlayer.sunkShip();
  expect(testPlayer.hasWon()).toBe(false);
  testPlayer.sunkShip();
  expect(testPlayer.hasWon()).toBe(true);
});
