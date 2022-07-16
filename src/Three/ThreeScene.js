import { Suspense, useLayoutEffect, useState } from "react";

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { EffectComposer, SSAO, SMAA } from "@react-three/postprocessing"

import Floor from "./Floor"
import ColorVisualization from "./ColorVisualization"

import ColorPoints from "./ColorPoints"
import ColorMath from "./ColorMath";
import chroma from "chroma-js";

// TODO: On hover make it have an opacity
// TODO: On hover show the points of the circle

const ThreeScene = ({ colors, colorMode: mode }) => {
    const SIZE = 10;
    const SEGMENTS = 1;

    const [points, setPoints] = useState([])

    useLayoutEffect(() => { 
        if(!colors.every(color => chroma.valid(color.color))) return

        const colorMath = new ColorMath(mode, SIZE, SEGMENTS)

        setPoints(colors.map(color => colorMath.hexToPos(color.color)))
    }, [colors, mode])

    return (
        <Canvas gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
                <ambientLight />
                <pointLight shadow intensity={1} position={[10, 10, 10]} />

                <OrbitControls makeDefault minDistance={SIZE * 1.25} maxDistance={SIZE * 5} />
                <PerspectiveCamera makeDefault fov={50} position={[15, 15, 15]} />

                <fog attach="fog" args={['black', 1, 150]} />

                <Floor
                    receiveShadow
                    size={SIZE} />

                <ColorVisualization
                    receiveShadow
                    mode={mode}
                    size={SIZE}
                    segments={SEGMENTS * 5} />

                <ColorPoints
                    receiveShadow
                    points={points}
                    mode={mode}
                    size={SIZE}
                    segments={SEGMENTS} />

                <EffectComposer multisampling={0}>
                    <SSAO
                        samples={31}
                        radius={5}
                        intensity={50}
                        luminanceInfluence={0.5}
                        color="white" />
                    <SMAA />
                </EffectComposer>
            </Suspense>
        </Canvas>
    )
}

export default ThreeScene;