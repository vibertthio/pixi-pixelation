import * as PIXI from 'pixi.js';

import './index.scss';
import bunnyImg from './assets/bunny.png';
import venusImg from './assets/venus_1000.jpg';

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

// texture
const venusTexture = PIXI.Texture.from(venusImg);
const { baseTexture, frame } = venusTexture;
const crop = new PIXI.Rectangle(
  venusTexture.frame.x,
  venusTexture.frame.y,
  venusTexture.frame.width * 0.5,
  venusTexture.frame.height * 0.5,
);
const trim = new PIXI.Rectangle(
  venusTexture.frame.x + 100,
  venusTexture.frame.y + 100,
  venusTexture.frame.width * 0.3,
  venusTexture.frame.height * 0.3,
);
const rotatedTexture = new PIXI.Texture(baseTexture, frame, crop, trim, 0);
const venusSprite = new PIXI.TilingSprite(rotatedTexture, window.innerWidth, window.innerHeight);
venusSprite.anchor.set(0);
app.stage.addChild(venusSprite);

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
