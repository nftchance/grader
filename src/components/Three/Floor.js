export default function Floor({ size: SIZE }) {
    return (
        <mesh
            visible
            position={[0, -1 * SIZE * 3, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeBufferGeometry attach="geometry" args={[5000, 5000, 1000, 1000]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                roughness={1}
                metalness={0}
                wireframe
            />
        </mesh>
    );
}