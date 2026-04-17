import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import type { GLTF } from "three-stdlib";
import { AnimationMixer, LoopRepeat, Vector3 } from "three";
import type { Group, Object3D } from "three";

const CAMERA_OFFSET_X = 0;
const CAMERA_OFFSET_Y = 0;
const CAMERA_OFFSET_Z = 4.0;
const LOOK_AT_OFFSET_X = 0;
const LOOK_AT_OFFSET_Y = 0;
const LOOK_AT_OFFSET_Z = 0;
const CAMERA_DAMPING = 8;

type Vector3Tuple = [number, number, number];

type TeamMemberThreeModelProps = {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
  cameraOffset?: Vector3Tuple;
  lookAtOffset?: Vector3Tuple;
  modelPosition?: Vector3Tuple;
  cameraDamping?: number;
  autoRotateYSpeedDeg?: number;
};

type AnimatedModelActorProps = {
  src: string;
  scale: number;
  cameraOffset: Vector3Tuple;
  lookAtOffset: Vector3Tuple;
  modelPosition: Vector3Tuple;
  cameraDamping: number;
  autoRotateYSpeedDeg: number;
};

const AnimatedModelActor = ({
  src,
  scale,
  cameraOffset,
  lookAtOffset,
  modelPosition,
  cameraDamping,
  autoRotateYSpeedDeg,
}: AnimatedModelActorProps) => {
  const modelRootRef = useRef<Group>(null);
  const followTargetRef = useRef<Object3D | null>(null);
  const worldPositionRef = useRef(new Vector3());
  const desiredCameraPositionRef = useRef(new Vector3());
  const desiredLookAtRef = useRef(new Vector3());
  const mixerRef = useRef<AnimationMixer | null>(null);
  const autoRotateYSpeedRad = (autoRotateYSpeedDeg * Math.PI) / 180;
  const gltf = useGLTF(src) as GLTF;
  const clonedScene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene],
  );

  const preferredClip = useMemo(() => {
    const clips = gltf.animations;
    if (clips.length === 0) {
      return null;
    }

    const keywordClip = clips.find((clip) =>
      /formal|bow|dance|hip|break|step|walk|run/i.test(clip.name),
    );

    if (keywordClip) {
      return keywordClip;
    }

    return clips.reduce((longest, current) =>
      current.duration > longest.duration ? current : longest,
    );
  }, [gltf.animations]);

  useEffect(() => {
    let followTarget: Object3D | null = null;

    clonedScene.traverse((node) => {
      if (followTarget) {
        return;
      }

      const boneNode = node as Object3D & { isBone?: boolean };
      if (!boneNode.isBone) {
        return;
      }

      const normalizedName = node.name.toLowerCase();
      if (
        normalizedName.includes("hips") ||
        normalizedName.includes("pelvis") ||
        normalizedName.includes("root")
      ) {
        followTarget = node;
      }
    });

    followTargetRef.current = followTarget ?? clonedScene;
  }, [clonedScene]);

  useEffect(() => {
    if (!preferredClip) {
      return;
    }

    const mixer = new AnimationMixer(clonedScene);
    mixerRef.current = mixer;
    const action = mixer.clipAction(preferredClip);
    action.reset();
    action.setLoop(LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.play();

    return () => {
      action.stop();
      mixer.stopAllAction();
      mixer.uncacheRoot(clonedScene);
      mixerRef.current = null;
    };
  }, [clonedScene, preferredClip]);

  useFrame(({ camera }, delta) => {
    mixerRef.current?.update(delta);

    if (modelRootRef.current && autoRotateYSpeedRad !== 0) {
      modelRootRef.current.rotation.y =
        (modelRootRef.current.rotation.y + autoRotateYSpeedRad * delta) %
        (Math.PI * 2);
    }

    const followTarget = followTargetRef.current ?? modelRootRef.current;
    if (!followTarget) {
      return;
    }

    const worldPosition = worldPositionRef.current;
    const desiredCameraPosition = desiredCameraPositionRef.current;
    const desiredLookAt = desiredLookAtRef.current;

    followTarget.getWorldPosition(worldPosition);

    desiredCameraPosition.set(
      worldPosition.x + cameraOffset[0],
      worldPosition.y + cameraOffset[1],
      worldPosition.z + cameraOffset[2],
    );
    desiredLookAt.set(
      worldPosition.x + lookAtOffset[0],
      worldPosition.y + lookAtOffset[1],
      worldPosition.z + lookAtOffset[2],
    );

    const smoothing = 1 - Math.exp(-cameraDamping * delta);
    camera.position.lerp(desiredCameraPosition, smoothing);
    camera.lookAt(desiredLookAt);
  });

  return (
    <group ref={modelRootRef} position={modelPosition} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
};

const TeamMemberThreeModel = ({
  src,
  alt,
  className = "mt-4 w-full aspect-video min-h-[264px] sm:min-h-[288px] lg:min-h-[312px]",
  scale = 0.9,
  cameraOffset = [CAMERA_OFFSET_X, CAMERA_OFFSET_Y, CAMERA_OFFSET_Z],
  lookAtOffset = [LOOK_AT_OFFSET_X, LOOK_AT_OFFSET_Y, LOOK_AT_OFFSET_Z],
  modelPosition = [0, -1.1, 0],
  cameraDamping = CAMERA_DAMPING,
  autoRotateYSpeedDeg = 0,
}: TeamMemberThreeModelProps) => {
  return (
    <div className={className} aria-label={alt}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{
          position: cameraOffset,
          fov: 30,
          near: 0.1,
          far: 100,
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />

        <Suspense fallback={null}>
          <AnimatedModelActor
            src={src}
            scale={scale}
            cameraOffset={cameraOffset}
            lookAtOffset={lookAtOffset}
            modelPosition={modelPosition}
            cameraDamping={cameraDamping}
            autoRotateYSpeedDeg={autoRotateYSpeedDeg}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TeamMemberThreeModel;
