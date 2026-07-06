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

leftBtn.ontouchstart=()=>{

keys["a"]=true;

};

leftBtn.ontouchend=()=>{

keys["a"]=false;

};

rightBtn.ontouchstart=()=>{

keys["d"]=true;

};

rightBtn.ontouchend=()=>{

keys["d"]=false;

};

jumpBtn.ontouchstart=()=>{

keys["w"]=true;

};

jumpBtn.ontouchend=()=>{

keys["w"]=false;

};

shootBtn.ontouchstart=()=>{

shoot();

};