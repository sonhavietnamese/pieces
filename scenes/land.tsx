'use client'

import { useRef } from 'react'
import { Bvh, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Outline, Selection, ToneMapping } from '@react-three/postprocessing'
import { easing } from 'maath'
import * as THREE from 'three'

import '@/components/layer-material'

import Backdrop from '@/components/backdrop'
import Ground from '@/components/ground'
import Leaves from '@/components/leaves'
import Stuffs from '@/components/stuffs'

export default function Land() {
  return (
    <Canvas
      shadows
      gl={{ antialias: false, alpha: true }}
      camera={{ fov: 30, position: [0, 0, 100], far: 800, near: 50 }}
    >
      <color attach="background" args={['#FFE185']} />
      <Bvh firstHitOnly>
        <Selection>
          <Effects />
          <Inner />
        </Selection>
      </Bvh>
    </Canvas>
  )
}

function Inner() {
  const group = useRef<THREE.Group>(null)

  return (
    <group ref={group}>
      <ambientLight intensity={1.5} />
      <directionalLight castShadow position={[0, 10, 10]} intensity={2} />

      <group position={[0, -20, 0]} rotation={[0.3, 0, 0]}>
        <Ground />

        <Backdrop />
      </group>

      <Stuffs />

      <Leaves />
    </group>
  )
}

function Effects() {
  const { size } = useThree()

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x, 8 + state.pointer.y * 2, 200 + Math.atan(state.pointer.x * 20)],
      0.3,
      delta,
    )
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4)
  })

  return (
    <EffectComposer stencilBuffer enableNormalPass={false} autoClear={false} multisampling={4}>
      <Outline
        visibleEdgeColor={0xffffff}
        hiddenEdgeColor={0xffffff}
        blur
        width={size.width * 1.05}
        edgeStrength={200}
      />
      <ToneMapping />
    </EffectComposer>
  )
}
