import { useRef } from "react";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"

const CubeMesh = () => {
    const meshRef = useRef(null);

    // useFrame(() => { 
    //     if(!meshRef.current) return

    //     meshRef.current.rotation.x += 0.01;
    //     meshRef.current.rotation.y += 0.01;
    // })

    return (
        <mesh ref={meshRef} rotation={[0,-2,0]}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    )
}

const Cube = () => {  
    return (
        <Canvas>
            <OrbitControls makeDefault />
            <PerspectiveCamera makeDefault fov={50} position={[0,1,2]} />
            <ambientLight />
            <pointLight position={[10,10,10]}/>

            <CubeMesh />
        </Canvas>
    )
}

export default Cube;