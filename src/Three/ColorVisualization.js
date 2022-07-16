import { useLayoutEffect, useRef } from 'react';

import * as THREE from 'three';

export default function ColorVisualization(props) {
    const { mode, size: SIZE, segments: SEGMENTS } = props;

    const ref = useRef(null);

    useLayoutEffect(() => {
        // HANDLING THE CONVERSION OF POINTS TO ANGLES
        const p = (x, y) => {
            return { x, y }
        }

        const normalizeAngle = (angle) => {
            if (angle < 0)
                angle += (2 * Math.PI)

            return angle
        }

        const angle = (p1, center, p2) => {
            const transformedP1 = p(p1.x - center.x, p1.y - center.y)
            const transformedP2 = p(p2.x - center.x, p2.y - center.y)

            const angleToP1 = Math.atan2(transformedP1.y, transformedP1.x)
            const angleToP2 = Math.atan2(transformedP2.y, transformedP2.x)

            return normalizeAngle(angleToP2 - angleToP1)
        }

        const toDegrees = (radians) => {
            return 360 * radians / (2 * Math.PI)
        }

        const posToColor = (colorMode, x, y, z) => {
            var color = new THREE.Color(0xffffff);

            // CONVERT POSITION TO COLOR
            if (colorMode === "RGB") {
                const r = 0.5 + x / SIZE;       // R coordinate
                const g = 0.5 + y / SIZE;       // G coordinate
                const b = 0.5 + z / SIZE;       // B coordinate

                color.setRGB(r, g, b);
            } else if (colorMode === "HSL") {
                // CALCULATE ANCLE AROUND CONE
                let h = toDegrees(angle(p(5, 0), p(0, 0), p(x, z))) / 360;
                let s = 1;
                let v = 0.5;

                // DETERMINE IF THE POINT IS IN THE CENTER
                if ((x, Math.abs(y), z) === (0, SIZE / 2, 0)) {
                    s = 0;              // saturation levels of zero
                    v = 0.5 - y / SIZE  // set the light levels for the center
                }

                color.setHSL(h, s, v)
            }

            return color
        }

        const appendColorVertex = (colors, x, y, z) => {
            const posColor = posToColor(mode, x, y, z)

            // BUILD THE VERTEX COLOR ARRAY 3 VALUES AT A TIME
            colors.push(posColor.r, posColor.g, posColor.b);
        }

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
            appendColorVertex(colors, x, y, z);
        }

        // UPDATE THE GEOMETRY
        boxGeometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(colors, 3)
        );

        ref.current.material = material
        ref.current.geometry = boxGeometry

        // Flatten the cube and rotate the cone
        if (mode === "HSL") {
            ref.current.rotation.x = Math.PI;
        } else {
            ref.current.rotation.x = 0;
        }
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