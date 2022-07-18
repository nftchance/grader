import { Suspense, useLayoutEffect, useState } from "react";

import { Canvas } from "@react-three/fiber"

import chroma from "chroma-js";

import ColorMath from "./ColorMath";
import LightsAndCamera from "./LightsAndCamera";
import Floor from "./Floor"
import ColorVisualization from "./ColorVisualization"
import ColorPoints from "./ColorPoints"

const ThreeScene = ({ colors, colorMode: mode }) => {
    const SIZE = 10;
    const SEGMENTS = 1;

    const [points, setPoints] = useState([])

    useLayoutEffect(() => {
        if (!colors.every(color => chroma.valid(color.color))) return

        const colorMath = new ColorMath(mode, SIZE, SEGMENTS)

        setPoints(colors.map(color => colorMath.hexToPos(mode, color.color)))
    }, [colors, mode])

    return (
        <>
            <Canvas gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <LightsAndCamera
                        size={SIZE}
                    />

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
                </Suspense>
            </Canvas>
        </>
    )
}

export default ThreeScene;