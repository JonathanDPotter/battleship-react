class Ship {
  constructor(name, length, id) {
    this.name = name;
    this.length = length;
    this.points = new Array(length).fill(0);
    this.id = id;

    this.hit = (point) => {
      this.points[point] = 1;
    };

    this.isSunk = () => {
      if (this.points.every((point) => point === 1)) {
        return true;
      } else {
        return false;
      }
    };
  }
}

export default Ship;
