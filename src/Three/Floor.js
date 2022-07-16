import { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Floor({ size: SIZE }) {
    const ref = useRef();

    const floorTexture = useLoader(TextureLoader, 'ground.jpg');

    useLayoutEffect(() => {
        // REPEAT THE TEXTURE A TON OF TIMES
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(350, 350);

        // Set the material
        const material = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
        const geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);

        ref.current.material = material
        ref.current.geometry = geometry
        ref.current.position.set(0, -4.01 * SIZE / 2, 0)
        ref.current.rotation.set(Math.PI / 2, 0, 0)
    }, [floorTexture])

    return <mesh ref={ref} receiveShadow />
}