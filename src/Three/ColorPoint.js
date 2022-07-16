import { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';

const SEGMENT_FACTOR = 25;

export default function ColorPoint({
    point,
    size: SIZE,
    segments: SEGMENTS
}) {
    const ref = useRef()

    const vectorCoords = (coords) => {
        return new THREE.Vector3(
            coords[0],
            coords[1],
            coords[2]
        )
    }

    useLayoutEffect(() => {
        const pointGeometry = new THREE.SphereBufferGeometry(
            SIZE / 40,
            SEGMENTS * SEGMENT_FACTOR,
            SEGMENTS * SEGMENT_FACTOR
        )

        ref.current.geometry = pointGeometry;
        ref.current.position.set(...vectorCoords(point))
    }, [
        point,
        SIZE,
        SEGMENTS
    ])

    return <mesh ref={ref} />
}