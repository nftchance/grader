import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { EffectComposer, SSAO, SMAA } from "@react-three/postprocessing"

export default function LightsAndCamera({ size: SIZE }) {
    return (
        <>
            <ambientLight />
            <pointLight shadow intensity={1} position={[10, 10, 10]} />

            <OrbitControls makeDefault minDistance={SIZE * 1.25} maxDistance={SIZE * 5} />
            <PerspectiveCamera makeDefault fov={50} position={[15, 15, 15]} />

            <fog attach="fog" args={['black', 1, 150]} />

            <EffectComposer multisampling={0}>
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