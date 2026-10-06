import { PerspectiveCamera } from 'three';
import { cameraOffset, expAlpha, FOLLOW_SMOOTHING, lerp3, verticalFovDeg } from './cameraMath';
import type { Vec3 } from './cameraMath';

export class CameraRig {
  readonly camera: PerspectiveCamera;
  private smoothedTarget: Vec3 = { x: 0, y: 0, z: 0 };

  constructor(aspect: number) {
    this.camera = new PerspectiveCamera(verticalFovDeg(aspect), aspect, 0.1, 250);
  }

  update(dt: number, goal: Vec3): void {
    this.smoothedTarget = lerp3(this.smoothedTarget, goal, expAlpha(FOLLOW_SMOOTHING, dt));
    const offset = cameraOffset();
    this.camera.position.set(
      this.smoothedTarget.x + offset.x,
      this.smoothedTarget.y + offset.y,
      this.smoothedTarget.z + offset.z,
    );
    this.camera.lookAt(this.smoothedTarget.x, this.smoothedTarget.y, this.smoothedTarget.z);
  }

  setAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.fov = verticalFovDeg(aspect);
    this.camera.updateProjectionMatrix();
  }
}
