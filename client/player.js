let player = {
  x: 100,
  y: 300,
  width: 40,
  height: 40,

  speed: 5,

  dx: 0,
  dy: 0,

  gravity: 0.6,
  jumpPower: -12,

  onGround: false,

  hp: 100,
  kills: 0
};

let enemy = {
  x: 800,
  y: 300,
  width: 40,
  height: 40,

  hp: 100,
  kills: 0
};

let bullets = [];