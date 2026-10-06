import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import { CameraRig } from './game/camera';
import { createBlobShadow } from './game/blobShadow';
import { createRenderer, resizeRenderer } from './game/renderer';
import { createScene } from './game/scene';
import { InputManager } from './input/InputManager';
import { attachKeyboard } from './input/keyboard';
import { attachMouseAim } from './input/mouseAim';
import { createTouchControls } from './input/touchControls';
import { hudStore } from './state/hudStore';
import { createHud } from './ui/Hud';

const container = document.querySelector<HTMLDivElement>('#app');
if (!container) {
  throw new Error('#app not found');
}
container.innerHTML = '';

const renderer = createRenderer(container);
const scene = createScene();

const initialSize = resizeRenderer(renderer, container);
const rig = new CameraRig(initialSize.width / initialSize.height);
scene.add(rig.camera);

const player = new Mesh(new BoxGeometry(1, 1, 1), new MeshLambertMaterial({ color: 0xe74c3c }));
player.position.set(0, 0.5, 0);

const playerShadow = createBlobShadow(0.7);
playerShadow.position.y = -0.48;
player.add(playerShadow);
scene.add(player);

const input = new InputManager();
const detachKeyboard = attachKeyboard(input);
const detachMouseAim = attachMouseAim(input, rig.camera, () => player.position);
const touchControls = createTouchControls(input);
const hud = createHud(touchControls.buttons);
container.append(hud.element, touchControls.element);

const PLAYER_SPEED = 8;
const WORLD_LIMIT = 60;
const COOLDOWN_SECONDS = [6, 8, 10, 12];
const cooldownRemaining = [0, 0, 0, 0];

input.onAbility((slot) => {
  if (cooldownRemaining[slot] <= 0) {
    cooldownRemaining[slot] = COOLDOWN_SECONDS[slot];
  }
});

const onResize = (): void => {
  const { width, height } = resizeRenderer(renderer, container);
  rig.setAspect(width / height);
};

window.addEventListener('resize', onResize);

const clampWorld = (value: number): number =>
  Math.min(Math.max(value, -WORLD_LIMIT), WORLD_LIMIT);

function update(dt: number): void {
  const move = input.moveVector;
  player.position.x = clampWorld(player.position.x + move.x * PLAYER_SPEED * dt);
  player.position.z = clampWorld(player.position.z + move.y * PLAYER_SPEED * dt);

  if (move.x !== 0 || move.y !== 0) {
    player.rotation.y = Math.atan2(move.x, move.y);
  }

  for (let slot = 0; slot < cooldownRemaining.length; slot += 1) {
    cooldownRemaining[slot] = Math.max(0, cooldownRemaining[slot] - dt);
    const total = COOLDOWN_SECONDS[slot];
    hudStore.getState().setCooldown(slot, cooldownRemaining[slot] / total);
  }

  rig.update(dt, player.position);
}

let lastTime = performance.now();

function frame(now: number): void {
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;
  update(dt);
  renderer.render(scene, rig.camera);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

window.addEventListener('beforeunload', () => {
  detachKeyboard();
  detachMouseAim();
  touchControls.destroy();
  hud.destroy();
});
