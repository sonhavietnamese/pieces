import { useTexture } from '@react-three/drei'

export default function Backdrop() {
  const backgroundTexture = useTexture('/textures/backdrop.png')

  return (
    <mesh position={[0, 55, -253]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[450, 150]} />
      <meshStandardMaterial map={backgroundTexture} />
    </mesh>
  )
}
