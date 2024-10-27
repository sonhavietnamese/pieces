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
    indicatorRef.current?.position.set(event.point.x + 1, -2.5, event.point.z + 1)
  }

  const onAdd = (event: ThreeEvent<PointerEvent>) => {
    // appendStuff({
    //   id: Date.now().toString(),
    //   position: [event.point.x + 2, event.point.y + 5, event.point.z + 2],
    //   texture: '/textures/ground.png',
    // })
    // "Create a pixel art illustration with a deliberately chunky, low-resolution style (approximately 16x16 or 24x24 grid). Style elements should include: Large, distinct pixel blocks (each 'pixel' should be clearly visible and intentional), Soft, pastel color palette with emphasis on sky blues, warm oranges, and natural greens, Atmospheric lighting with subtle color gradients between blocks, Mild color dithering for transitions between shades,Simple cloud shapes using 2-3 shades of off-white/cream,Stylized landscape with minimal detail but clear shapes, Strong contrast between foreground and background elements, A dreamy, nostalgic mood similar to early video game art. Subject: A sunflower in a decorative pot/vase. Style: warm earth-tone palette, limited color range (4-6 colors), showing details through blocky pixel clusters. Lighting: soft ambient light with subtle shadows at the base. Features should include: Clear silhouette with chunky pixel shapes Bold, saturated main colors Simple background in a complementary neutral tone Minimal anti-aliasing for that classic pixel art look Clear foreground/background separation Slight dithering effects where colors transition"
  }

  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (stage === 'edit' && selectedStuff) {
      setSelectedStuff(null)
      updateStuff({
        ...selectedStuff,
        position: [event.point.x + 2, event.point.y + 5, event.point.z + 2],
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
