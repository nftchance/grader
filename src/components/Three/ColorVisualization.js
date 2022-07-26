import { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';

import ColorMath from '@components/Three/ColorMath';

export default function ColorVisualization(props) {
    const { mode, size: SIZE, segments: SEGMENTS } = props;

    const ref = useRef(null);

    useLayoutEffect(() => {
        const colorMath = new ColorMath(mode, SIZE, SEGMENTS)

        // ENABLE THE ABILITY TO COLOR THE CUBE BY VERTEX
        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: .75
        });

        // DEFINE THE GEOMETRY
        var boxGeometry = new THREE.BoxGeometry(
            SIZE,
            SIZE,
            SIZE,
            SEGMENTS,
            SEGMENTS,
            SEGMENTS
        );
        if (mode === "HSL") {
            boxGeometry = new THREE.ConeBufferGeometry(
                SIZE / 2,
                SIZE,
                SEGMENTS * 50
            )
        }

        const vertexPositions = boxGeometry.attributes.position.array;

        // STORE THE COLORS NEEDED FOR THE VERTEXES
        const colors = [];

        // LOOP THROUGH EVERY VERTEX
        for (let vertex = 0; vertex < vertexPositions.length; vertex += 3) {
            // CALCULATE THE POSITION OF THE VERTEX
            const x = vertexPositions[vertex];      // X coordinate
            const y = vertexPositions[vertex + 1];  // Y coordinate
            const z = vertexPositions[vertex + 2];  // Z coordinate

            // DETERMINE THE PROPER COLOR FOR THIS VERTEX
            const posColor = colorMath.posToColor(mode, {x, y, z})

            // BUILD THE VERTEX COLOR ARRAY 3 VALUES AT A TIME
            colors.push(posColor.r, posColor.g, posColor.b);
        }

        // UPDATE THE GEOMETRY
        boxGeometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(colors, 3)
        );

        ref.current.material = material
        ref.current.geometry = boxGeometry

        // Flatten the cube and rotate the cone
        if (mode === "HSL")
            ref.current.rotation.x = Math.PI;
        else
            ref.current.rotation.x = 0;
    }, [
        mode,
        SIZE,
        SEGMENTS
    ])

    return (
        <>
            <mesh
                ref={ref}
                castShadow={true}
                receiveShadow={true}
            />
        </>
    )
}