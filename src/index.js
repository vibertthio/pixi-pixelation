import * as PIXI from 'pixi.js';

import './index.scss';
import bunnyImg from './assets/bunny.png';

// setup
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xbeeef7,
  transparent: false,
});
document.body.appendChild(app.view);

// check WebGL support
console.log(PIXI.utils.isWebGLSupported());
console.log(PIXI.RENDERER_TYPE);
console.log(app.renderer.type);

// use image
const bunny = PIXI.Sprite.from(bunnyImg);
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
app.stage.addChild(bunny);

// animation
app.ticker.add((delta) => {
  bunny.rotation += 0.1 * delta;
});

// resize
window.onresize = function (e) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  app.renderer.resize(w, h);
};
