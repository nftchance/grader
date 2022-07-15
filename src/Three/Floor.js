import * as THREE from 'three';

import { useLoader } from "@react-three/fiber"

import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Floor({ size: SIZE }) {
    // REPEAT THE TEXTURE A TON OF TIMES
    const floorTexture = useLoader(TextureLoader, 'ground.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(350, 350);

    // Set the material
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);

    return (
        <mesh
            geometry={floorGeometry}
            material={floorMaterial}
            position={[0, -1.01 * SIZE / 2, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow={true}
            receiveShadow={true}
        />
    )
}