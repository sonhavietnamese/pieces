import { useEffect, useRef, useState } from 'react'
import { Plane, useAspect, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import '@/components/layer-material'

export default function Leaves() {
  const layersRef = useRef<THREE.ShaderMaterial[]>([])
  const [movement] = useState(() => new THREE.Vector3())

  const scaleW = useAspect(2000, 1000, 1.8)
  const textures = useTexture(['/textures/leaves-1.png', '/textures/leaves-2.png'])

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
    <>
      <Plane scale={scaleW} args={[1, 1, 10, 10]} position={[0, 0, 40]}>
        {/* @ts-expect-error - TODO: fix this */}
        <layerMaterial
          movement={movement}
          textr={textures[1]}
          factor={0.04}
          ref={(el: THREE.ShaderMaterial) => (layersRef.current[0] = el)}
          wiggle={0.9}
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
    </>
  )
}
