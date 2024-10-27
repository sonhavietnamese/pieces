import { Suspense, useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import { useDebounceCallback } from 'usehooks-ts'

import { useStage } from '@/hooks/use-stage'
import { Stuff, useStuffs } from '@/hooks/use-stuffs'
import StuffPlane from './stuff-plane'

export default function Stuffs() {
  const { stuffs, updateStuff, setSelectedStuff } = useStuffs()
  const [value, setValue] = useState('')

  const { stage, setStage } = useStage()

  const debounced = useDebounceCallback(setValue, 50)

  const onPointerUp = (event: ThreeEvent<PointerEvent>, stuff: Stuff) => {
    event.stopPropagation()

    if (stage !== 'idle' && stage !== 'edit') return

    updateStuff({
      ...stuff,
      position: [0, -100, 0],
    })
    setSelectedStuff({
      ...stuff,
      position: [event.point.x + 2, 2, event.point.z + 2],
    })
    setStage('edit')
  }

  return (
    <group>
      <Suspense fallback={null}>
        {stuffs.map((stuff) => (
          <Select enabled={stuff.id === value}>
            <StuffPlane
              stuff={stuff}
              onPointerOver={() => debounced(stuff.id)}
              onPointerOut={() => debounced('')}
              onPointerUp={(e) => onPointerUp(e, stuff)}
              key={stuff.id}
              position={stuff.position}
            />
          </Select>
        ))}
      </Suspense>
    </group>
  )
}
