import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'

import { useStuffs } from '@/hooks/use-stuffs'

// extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass })

export default function Stuffs() {
  const { stuffs } = useStuffs()

  return (
    <group>
      {/* {stuffs.map((stuff) => (
        <mesh key={stuff.id} position={stuff.position} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}

      <Outline>
        <mesh position={[50, -50, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="lightgreen" />
        </mesh>
      </Outline> */}
    </group>
  )
}
