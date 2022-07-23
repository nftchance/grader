import { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';

import ColorMath from '@components/Three/ColorMath';

const SEGMENT_FACTOR = 25;

export default function ColorPoint({
    point,
    size: SIZE,
    segments: SEGMENTS
}) {
    const ref = useRef()

    useLayoutEffect(() => {
        const colorMath = new ColorMath()

        const pointGeometry = new THREE.SphereBufferGeometry(
            SIZE / 40,
            SEGMENTS * SEGMENT_FACTOR,
            SEGMENTS * SEGMENT_FACTOR
        )

        ref.current.geometry = pointGeometry;
        ref.current.position.set(...colorMath.vectorCoords(point))
    }, [
        point,
        SIZE,
        SEGMENTS
    ])

    return <mesh ref={ref} />
}