import type { ThreeEvent } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { Select } from '@react-three/postprocessing'
import * as THREE from 'three'

import { useStage } from '@/hooks/use-stage'
import { useStuffs } from '@/hooks/use-stuffs'
import StuffPlane from './stuff-plane'

export default function Ground() {
  const indicatorRef = useRef<THREE.Mesh>(null)

  const groundTexture = useTexture('/textures/ground.png')

  const { appendStuff, selectedStuff, setSelectedStuff, updateStuff } = useStuffs()
  const { stage, setStage } = useStage()

  groundTexture.wrapS = THREE.RepeatWrapping
  groundTexture.wrapT = THREE.RepeatWrapping
  groundTexture.repeat.set(15, 9)

  const onEnter = (event: ThreeEvent<PointerEvent>) => {
    indicatorRef.current?.position.set(event.point.x + 1, 2, event.point.z + 1)
  }

  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (stage === 'edit' && selectedStuff) {
      setSelectedStuff(null)
      updateStuff({
        ...selectedStuff,
        position: [event.point.x + 2, event.point.y + 12, event.point.z + 2],
      })
    }
  }

  return (
    <group>
      <mesh
        onPointerMove={onEnter}
        onPointerUp={onPointerUp}
        receiveShadow
        position={[0, -10, -100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[500, 300]} />
        <meshStandardMaterial side={THREE.DoubleSide} map={groundTexture} />
      </mesh>

      <Suspense fallback={null}>
        {selectedStuff && (
          <Select enabled={true}>
            <StuffPlane ref={indicatorRef} stuff={selectedStuff} />
          </Select>
        )}
      </Suspense>
    </group>
  )
}
