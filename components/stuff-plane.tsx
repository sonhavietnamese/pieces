import { forwardRef, useDeferredValue } from 'react'
import { useTexture } from '@react-three/drei'
import { MeshProps } from '@react-three/fiber'
import * as THREE from 'three'

import type { Stuff } from '@/hooks/use-stuffs'

type StuffPlaneProps = {
  stuff: Stuff
} & MeshProps

const StuffPlane = forwardRef<THREE.Mesh, StuffPlaneProps>(({ stuff, ...props }, ref) => {
  const deferredTexture = useDeferredValue(stuff.texture)
  const texture = useTexture(deferredTexture)

  return (
    <mesh ref={ref} position={stuff.position} rotation={[-0.3, 0, 0]} {...props}>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  )
})

export default StuffPlane
