import { Suspense } from "react";

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import Floor from "./Floor"
import CubeMesh from "./CubeMesh"

const SIZE = 10;
const SEGMENTS = 1;

// TODO: On hover make it have an opacity
// TODO: On hover show the points of the circle

const ThreeScene = (props) => {
    const { colors, colorMode: mode } = props;

    console.log(colors)

    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight />
            <pointLight shadow intensity={1} position={[10, 10, 10]} />

            <fog attach="fog" args={['black', 1, 150]} />

            <Suspense fallback={null}>
                <Floor receiveShadow size={SIZE} />
                <CubeMesh receiveShadow mode={mode} size={SIZE} segments={SEGMENTS} />
                {/* TODO: Implement group */}
                {/* TODO: Implement array of scale colors */}
            </Suspense>

            <OrbitControls makeDefault minDistance={SIZE * 1.5} maxDistance={SIZE * 3} />
            <PerspectiveCamera makeDefault fov={50} position={[10, 10, 10]} />
        </Canvas>
    )
}

export default ThreeScene;