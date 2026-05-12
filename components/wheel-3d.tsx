"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, useTexture, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

function Wheel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const wheelRef = useRef<THREE.Group>(null)
  const rimRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (wheelRef.current) {
      // Continuous rotation
      wheelRef.current.rotation.y += 0.003
      
      // React to mouse movement
      const targetRotationX = mousePosition.y * 0.2
      const targetRotationZ = mousePosition.x * 0.1
      
      wheelRef.current.rotation.x = THREE.MathUtils.lerp(
        wheelRef.current.rotation.x,
        targetRotationX,
        0.05
      )
      wheelRef.current.rotation.z = THREE.MathUtils.lerp(
        wheelRef.current.rotation.z,
        targetRotationZ,
        0.05
      )
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={wheelRef}>
        {/* Tyre outer */}
        <mesh>
          <torusGeometry args={[2, 0.6, 32, 100]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Tyre tread pattern */}
        {[...Array(40)].map((_, i) => {
          const angle = (i / 40) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 2,
                Math.sin(angle) * 2,
                0,
              ]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.15, 0.08, 0.65]} />
              <meshStandardMaterial color="#0d0d0d" roughness={1} />
            </mesh>
          )
        })}

        {/* Rim center */}
        <mesh ref={rimRef}>
          <cylinderGeometry args={[1.4, 1.4, 0.5, 64]} />
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>

        {/* Rim spokes */}
        {[...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2
          return (
            <mesh
              key={`spoke-${i}`}
              position={[
                Math.cos(angle) * 0.7,
                Math.sin(angle) * 0.7,
                0.1,
              ]}
              rotation={[Math.PI / 2, 0, angle + Math.PI / 2]}
            >
              <boxGeometry args={[0.35, 0.15, 1.1]} />
              <meshStandardMaterial
                color="#3a3a3a"
                roughness={0.15}
                metalness={0.98}
              />
            </mesh>
          )
        })}

        {/* Center cap */}
        <mesh position={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Center logo area */}
        <mesh position={[0, 0, 0.38]}>
          <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Rim lip */}
        <mesh>
          <torusGeometry args={[1.4, 0.08, 16, 64]} />
          <meshStandardMaterial
            color="#4a4a4a"
            roughness={0.1}
            metalness={0.98}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#dc2626"
      />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      <Wheel mousePosition={mousePosition} />
      <Environment preset="city" />
    </>
  )
}

export function Wheel3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] md:min-h-[600px]"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition.current} />
        </Suspense>
      </Canvas>
    </div>
  )
}
