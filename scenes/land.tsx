'use client'

import { useEffect, useRef, useState } from 'react'
import { Bvh, OrbitControls, Plane, useAspect, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  EffectComposer,
  N8AO,
  Outline,
  Select,
  Selection,
  TiltShift2,
  ToneMapping,
} from '@react-three/postprocessing'
import * as THREE from 'three'

import '@/components/layer-material'

import Backdrop from '@/components/backdrop'
import Ground from '@/components/ground'
import Stuffs from '@/components/stuffs'

export default function Land() {
  return (
    <Canvas
      shadows
      gl={{ antialias: false, alpha: true }}
      camera={{ fov: 30, position: [0, 0, 200], far: 800, near: 50 }}
    >
      <color attach="background" args={['#FFE185']} />
      <Inner />

      <Bvh firstHitOnly>
        <Selection>
          <Effects />

          <Select enabled={true}>
            <mesh receiveShadow castShadow position={[0, -5, 0]}>
              <boxGeometry args={[10, 10, 10]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
          </Select>
        </Selection>
      </Bvh>
    </Canvas>
  )
}

function Inner() {
  const group = useRef<THREE.Group>(null)

  const scaleW = useAspect(2000, 1000, 0.9)
  const textures = useTexture(['/textures/leaves-1.png', '/textures/leaves-2.png'])

  const layersRef = useRef<THREE.ShaderMaterial[]>([])
  const [movement] = useState(() => new THREE.Vector3())

  useEffect(() => {
    return () => {
      layersRef.current[0]?.dispose()
      layersRef.current[1]?.dispose()
    }
  }, [])

  useFrame((_, delta) => {
    if (layersRef.current[0]?.uniforms?.time && layersRef.current[1]?.uniforms?.time) {
      layersRef.current[0].uniforms.time.value += delta
      layersRef.current[1].uniforms.time.value += delta
    }
  })

  return (
    <group ref={group}>
      <ambientLight intensity={1.5} />
      <directionalLight castShadow position={[0, 10, 10]} intensity={2} />

      <OrbitControls />

      <group position={[0, -20, 0]} rotation={[0.3, 0, 0]}>
        <Ground />

        <Backdrop />
      </group>

      <Stuffs />

      <Plane scale={scaleW} args={[1, 1, 10, 10]} position={[0, 0, 40]}>
        {/* @ts-expect-error - TODO: fix this */}
        <layerMaterial
          movement={movement}
          textr={textures[1]}
          factor={0.04}
          ref={(el: THREE.ShaderMaterial) => (layersRef.current[0] = el)}
          wiggle={1}
          scale={1}
        />
      </Plane>

      <Plane scale={scaleW} args={[1, 1, 10, 10]} position={[0, 0, 49]}>
        {/* @ts-expect-error - TODO: fix this */}
        <layerMaterial
          movement={movement}
          textr={textures[0]}
          factor={0.03}
          ref={(el: THREE.ShaderMaterial) => (layersRef.current[1] = el)}
          wiggle={0.6}
          scale={1}
        />
      </Plane>
    </group>
  )
}

function Effects() {
  const { size } = useThree()
  // useFrame((state, delta) => {
  //   easing.damp3(state.camera.position, [state.pointer.x, 1 + state.pointer.y / 2, 8 + Math.atan(state.pointer.x * 2)], 0.3, delta)
  //   state.camera.lookAt(state.camera.position.x * 0.9, 0, -4)
  // })

  return (
    <EffectComposer stencilBuffer disableNormalPass autoClear={false} multisampling={4}>
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <Outline
        visibleEdgeColor="white"
        hiddenEdgeColor="white"
        blur
        width={size.width * 1.25}
        edgeStrength={10}
      />
      <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping />
    </EffectComposer>
  )
}
