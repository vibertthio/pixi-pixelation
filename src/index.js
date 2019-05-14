import * as PIXI from 'pixi.js';

import './index.scss';
import venusImg from './assets/venus_1000.jpg';
import * as dat from 'dat.gui';

// setup app
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xbeeef7,
  transparent: false,
});
document.body.appendChild(app.view);

// load
app.loader
  .add(venusImg)
  .load(setup);


// check WebGL support
console.log(PIXI.utils.isWebGLSupported());
console.log(PIXI.RENDERER_TYPE);
console.log(app.renderer.type);

// variables
let loading = true;
const sprites = [];
const masks = [];
const unit = 70;
const xRepeat = Math.floor(window.innerWidth / unit) + 1;
const yRepeat = Math.floor(window.innerHeight / unit) + 1;
const bufferRatio = 1.3;
let ratio;

const effectController = {
  speed: 0.001,
  distortion: 0.2,
  zoom: 0.4,
};


// gui
const gui = new dat.GUI();
gui.add(effectController, 'speed', 0.0005, 0.005);
gui.add(effectController, 'distortion', 0.08, 0.3);
gui.add(effectController, 'zoom', 0, 1);


function setup(loader, resources) {

  const texture = resources[venusImg].texture;
  const { baseTexture, frame } = texture;
  const orig = frame;
  const trim = frame;
  const anchor = new PIXI.Point(0.5, 0.5);
  const fullTexture = new PIXI.Texture(baseTexture, frame, orig, trim, 0, anchor);
  ratio = ((frame.width / frame.height) > (window.innerWidth / window.innerHeight)) ? (window.innerHeight / frame.height) : (window.innerWidth / frame.width);

  for (let j = 0; j < yRepeat; j = j + 1) {
    for (let i = 0; i < xRepeat; i = i + 1) {
      const venusSprite = new PIXI.Sprite(fullTexture);
      const maskGraphic = new PIXI.Graphics();
      maskGraphic.beginFill(0xff0000);
      // maskGraphic.drawRect(0, 0, unit, unit);
      maskGraphic.drawRect(i * unit, j * unit, unit, unit);
      maskGraphic.endFill();
      venusSprite.mask = maskGraphic;
      venusSprite.x = i * unit;
      venusSprite.y = j * unit;

      app.stage.addChild(venusSprite);
      masks.push(maskGraphic);
      sprites.push(venusSprite);
    }
  }

  loading = false;
}

app.ticker.add((delta) => {
  if (!loading) {
    const { distortion, speed, zoom } = effectController;
    sprites.forEach((s, index) => {
      const i = Math.floor(index % xRepeat);
      const j = Math.floor(index / xRepeat);

      s.x = (i + 0.5) * unit;
      s.x -= (s.x - window.innerWidth * 0.5) * zoom;
      s.x += 15 * Math.sin(Date.now() * speed);

      s.y = (j + 0.5) * unit;
      s.y -= (s.y - window.innerHeight * 0.5) * zoom;
      s.y += 15 * Math.sin(Date.now() * speed + i * 0.5 + j * 0.2 + Math.PI * 0.5);

      s.scale.set(
        (1 + distortion * Math.sin(Date.now() * speed + i * 0.9 + j * 0.5)) * ratio * (zoom + 0.1) * (1 / (1 - distortion))
      );
    });
  }
});

// resize
window.onresize = function (e) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  app.renderer.resize(w, h);
};
