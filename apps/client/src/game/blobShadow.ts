import { CircleGeometry, Mesh, MeshBasicMaterial } from 'three';

export function createBlobShadow(radius: number): Mesh {
  const geometry = new CircleGeometry(radius, 24);
  const material = new MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.02;
  mesh.renderOrder = 1;
  return mesh;
}
