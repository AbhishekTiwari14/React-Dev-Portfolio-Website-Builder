import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Stars() {
  const starsRef = useRef<THREE.Points>(null)

  // Create stars
  const vertices = []
  for (let i = 0; i < 15000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000)
    const y = THREE.MathUtils.randFloatSpread(2000)
    const z = THREE.MathUtils.randFloatSpread(2000)
    vertices.push(x, y, z)
  }
  const positions = new Float32Array(vertices)

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.2} color="#ffffff" />
    </points>
  )
}

export function BackgroundStars() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
        <Stars />
      </Canvas>
    </div>
  )
}
