class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.sunkShip = () => {
      this.score++;
    }
    this.hasWon = () => {
      if (this.score === 5) {
        return true;
      } else {
        return false;
      }
    }
  }


}

export default Player;