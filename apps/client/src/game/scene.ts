import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Fog,
  Group,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  Scene,
} from 'three';

const SKY_COLOR = 0x8ec5e8;
const GROUND_COLOR = 0x6aa84f;
const TRUNK_COLOR = 0x7a5230;
const LEAF_COLOR = 0x3f7d2e;
const ROCK_COLOR = 0x8a8f98;

const GROUND_SIZE = 140;

interface PropPlacement {
  x: number;
  z: number;
}

const TREES: PropPlacement[] = [
  { x: -18, z: -12 },
  { x: 16, z: -20 },
  { x: 24, z: 10 },
  { x: -25, z: 18 },
  { x: 6, z: 26 },
  { x: -8, z: -28 },
];

const ROCKS: PropPlacement[] = [
  { x: -6, z: 14 },
  { x: 12, z: 4 },
  { x: -20, z: -22 },
  { x: 28, z: -6 },
];

export function createScene(): Scene {
  const scene = new Scene();
  scene.background = new Color(SKY_COLOR);
  scene.fog = new Fog(SKY_COLOR, 45, 110);

  const ambient = new AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const sun = new DirectionalLight(0xfff3dc, 1.1);
  sun.position.set(24, 45, 14);
  sun.castShadow = false;
  scene.add(sun);

  scene.add(createGround());
  scene.add(createProps());

  return scene;
}

function createGround(): Mesh {
  const geometry = new PlaneGeometry(GROUND_SIZE, GROUND_SIZE);
  const material = new MeshLambertMaterial({ color: GROUND_COLOR });
  const ground = new Mesh(geometry, material);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = false;
  return ground;
}

function createProps(): Group {
  const group = new Group();

  const trunkGeometry = new BoxGeometry(1, 2.2, 1);
  const trunkMaterial = new MeshLambertMaterial({ color: TRUNK_COLOR });
  const leafGeometry = new BoxGeometry(3.2, 3.2, 3.2);
  const leafMaterial = new MeshLambertMaterial({ color: LEAF_COLOR });

  for (const { x, z } of TREES) {
    const trunk = new Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 1.1, z);
    const leaves = new Mesh(leafGeometry, leafMaterial);
    leaves.position.set(x, 3.8, z);
    group.add(trunk, leaves);
  }

  const rockGeometry = new BoxGeometry(1.6, 1.2, 1.6);
  const rockMaterial = new MeshLambertMaterial({ color: ROCK_COLOR });
  for (const { x, z } of ROCKS) {
    const rock = new Mesh(rockGeometry, rockMaterial);
    rock.position.set(x, 0.6, z);
    rock.rotation.y = (x + z) * 0.2;
    group.add(rock);
  }

  return group;
}
