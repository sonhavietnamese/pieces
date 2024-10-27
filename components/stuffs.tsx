import { useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { useDebounceCallback } from 'usehooks-ts'

import { useStuffs } from '@/hooks/use-stuffs'

export default function Stuffs() {
  const { stuffs } = useStuffs()
  const [value, setValue] = useState('')

  const debounced = useDebounceCallback(setValue, 50)

  return (
    <group>
      {stuffs.map((stuff) => (
        <Select enabled={stuff.id === value}>
          <mesh
            onPointerOver={() => debounced(stuff.id)}
            onPointerOut={() => debounced('')}
            key={stuff.id}
            position={stuff.position}
            rotation={[0.3, 0, 0]}
          >
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </Select>
      ))}
    </group>
  )
}
