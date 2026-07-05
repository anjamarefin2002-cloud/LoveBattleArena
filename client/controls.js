let keys = {};

document.addEventListener(
  "keydown",
  (e) => {

    keys[e.key.toLowerCase()] = true;

    if (
      e.code === "Space"
    ) {
      shoot();
    }

  }
);

document.addEventListener(
  "keyup",
  (e) => {
    keys[e.key.toLowerCase()] = false;
  }
);