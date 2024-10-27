import { forwardRef, useDeferredValue } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

import type { Stuff } from '@/hooks/use-stuffs'

interface StuffPlaneProps {
  stuff: Stuff
}

const StuffPlane = forwardRef<THREE.Mesh, StuffPlaneProps>(({ stuff }, ref) => {
  const deferredTexture = useDeferredValue(stuff.texture)
  const texture = useTexture(deferredTexture)

  return (
    <mesh ref={ref} position={stuff.position} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  )
})

export default StuffPlane
