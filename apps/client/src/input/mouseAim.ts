import { Plane, Raycaster, Vector2, Vector3 } from 'three';
import type { PerspectiveCamera } from 'three';
import type { InputManager } from './InputManager';

export function attachMouseAim(
  input: InputManager,
  camera: PerspectiveCamera,
  getOrigin: () => Vector3,
): () => void {
  const raycaster = new Raycaster();
  const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
  const ndc = new Vector2();
  const hit = new Vector3();

  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') {
      return;
    }
    ndc.x = (event.clientX / window.innerWidth) * 2 - 1;
    ndc.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    if (!raycaster.ray.intersectPlane(groundPlane, hit)) {
      return;
    }
    const origin = getOrigin();
    const dx = hit.x - origin.x;
    const dz = hit.z - origin.z;
    input.setAim(dx, dz);
  };

  window.addEventListener('pointermove', onPointerMove);
  return () => {
    window.removeEventListener('pointermove', onPointerMove);
  };
}
