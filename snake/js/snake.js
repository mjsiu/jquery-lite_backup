function Coord (x, y) {
  this.x = x;
  this.y = y;
}

var DIRECTIONS = {
  "N": new Coord(0, 1),
  "S": new Coord(0, -1),
  "W": new Coord(-1, 0),
  "E": new Coord(1, 0)
};

function Snake () {
  this.direction = "N"; // E, S, W
  this.segments = [];
  this.head = this.segments[0];
}

function Board (snake) {
  this.snake = snake;
  this.apples = [];

}


Coord.prototype.plus = function (secondCord) {
  var x = this.x + secondCord.x;
  var y = this.y + secondCord.y;
  return new Coord(x,y);
};

Coord.prototype.equals = function (secondCord) {
  return (this.x === secondCord.x && this.y === secondCord.y);
};

Coord.prototype.isOpposite = function (secondCord) {
  return (this.plus(secondCord) === new Coord(0,0));
};

Snake.prototype.move = function () {
  this.segments.unshift(this.head.plus(DIRECTIONS[this.direction]));
  this.segments.pop();
};

Snake.prototype.turn = function (direction) {
  this.direction = direction;
};

module.exports = Board;
