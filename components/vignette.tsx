export default function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9] h-screen w-screen"
      style={{
        boxShadow: '0 0 160px #032F03 inset',
      }}
    />
  )
}
