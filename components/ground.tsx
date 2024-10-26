import type { ThreeEvent } from '@react-three/fiber'
import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

import { useStuffs } from '@/hooks/use-stuffs'

export default function Ground() {
  const indicatorRef = useRef<THREE.Mesh>(null)

  const groundTexture = useTexture('/textures/ground.png')

  const { appendStuff } = useStuffs()

  groundTexture.wrapS = THREE.RepeatWrapping
  groundTexture.wrapT = THREE.RepeatWrapping
  groundTexture.repeat.set(15, 9)

  const onEnter = (event: ThreeEvent<PointerEvent>) => {
    indicatorRef.current?.position.set(event.point.x + 1, -9.5, event.point.z + 1)
  }

  const onAdd = (event: ThreeEvent<PointerEvent>) => {
    appendStuff({
      id: Date.now().toString(),
      position: [event.point.x + 2, event.point.y, event.point.z + 2],
    })
  }

  return (
    <group>
      <mesh
        onPointerMove={onEnter}
        onPointerUp={onAdd}
        receiveShadow
        position={[0, -10, -100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[500, 300]} />
        <meshStandardMaterial side={THREE.DoubleSide} map={groundTexture} />
      </mesh>

      <mesh ref={indicatorRef} position={[0, -9.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 16]} />
        <meshStandardMaterial color="#6C3F27" />
      </mesh>
    </group>
  )
}
