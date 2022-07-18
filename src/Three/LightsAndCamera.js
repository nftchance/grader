import { useState, useRef } from "react";

import { useFrame } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { EffectComposer, SSAO, SMAA } from "@react-three/postprocessing"

export default function LightsAndCamera({ size: SIZE }) {
    const ref = useRef();

    const [frame, setFrame] = useState(0);

    useFrame(() => {
        if (frame > 200) return

        ref.current.position.z += 0.05
        setFrame(frame + 1)
    })

    return (
        <>
            <ambientLight />
            <pointLight shadow intensity={5} position={[10, 10, 10]} />

            <OrbitControls 
                makeDefault 
                minDistance={SIZE * 1.25} 
                maxDistance={SIZE * 5} 
            />
            <PerspectiveCamera 
                makeDefault 
                fov={50} 
                position={[15, 15, 15]} 
                ref={ref} 
            />

            <fog attach="fog" args={['black', 15, 150]} />

            <EffectComposer multisampling={2}>
                <SSAO
                    samples={31}
                    radius={5}
                    intensity={50}
                    luminanceInfluence={0.5}
                    color="white" />
                <SMAA />
            </EffectComposer>
        </>
    )
}