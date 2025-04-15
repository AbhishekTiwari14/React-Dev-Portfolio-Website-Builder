import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei"
import * as THREE from "three"

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  // Load earth textures
  const textures = useTexture({
    map: "/map.jpg",
    bumpMap: "/bump_map.jpg",
    specularMap: "/specular_map.jpg",
  })

  // Add subtle auto-rotation when not interacting
  useFrame((_state, delta) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        bumpScale={0.05}
        specularMap={textures.specularMap}
        specular={new THREE.Color(0x333333)}
        shininess={15}
      />
    </mesh>
  )
}

export default function InteractiveGlobe() {
  return (
    <div className="w-full h-[500px] relative rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Globe />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          rotateSpeed={0.5}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
