export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export const CAMERA_DISTANCE = 30;
export const CAMERA_PITCH_DEG = 52;
export const CAMERA_YAW_DEG = 45;
export const FOLLOW_SMOOTHING = 8;

export const degToRad = (deg: number): number => (deg * Math.PI) / 180;

export function cameraOffset(): Vec3 {
  const pitch = degToRad(CAMERA_PITCH_DEG);
  const yaw = degToRad(CAMERA_YAW_DEG);
  const horizontal = CAMERA_DISTANCE * Math.cos(pitch);
  return {
    x: horizontal * Math.sin(yaw),
    y: CAMERA_DISTANCE * Math.sin(pitch),
    z: horizontal * Math.cos(yaw),
  };
}

export function lerp3(current: Vec3, goal: Vec3, alpha: number): Vec3 {
  const t = Math.min(Math.max(alpha, 0), 1);
  return {
    x: current.x + (goal.x - current.x) * t,
    y: current.y + (goal.y - current.y) * t,
    z: current.z + (goal.z - current.z) * t,
  };
}

export function expAlpha(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * Math.max(dt, 0));
}

export function verticalFovDeg(aspect: number, horizontalDeg = 70): number {
  const horizontal = degToRad(horizontalDeg);
  const clampedAspect = Math.max(aspect, 0.1);
  const vertical = 2 * Math.atan(Math.tan(horizontal / 2) / clampedAspect);
  return (vertical * 180) / Math.PI;
}

export function screenToGroundDir(
  x: number,
  y: number,
  yawDeg: number = CAMERA_YAW_DEG,
): { x: number; z: number } {
  const yaw = degToRad(yawDeg);
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  return {
    x: x * cos - y * sin,
    z: -x * sin - y * cos,
  };
}
