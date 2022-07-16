import React, { useRef, useLayoutEffect } from "react"

import * as THREE from 'three';

import { extend, useThree } from "@react-three/fiber"

import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry"
import { Line2 } from "three/examples/jsm/lines/Line2"

extend({ LineMaterial, LineGeometry, Line2 })

export default function ColorLine({ coordsFrom, coordsTo }) {
    const ref = useRef()

    const { size } = useThree()

    const vectorCoords = (coords) => {
        return new THREE.Vector3(
            coords[0],
            coords[1],
            coords[2]
        )
    }

    useLayoutEffect(() => {
        const points = [];
        points.push(vectorCoords(coordsFrom));
        points.push(vectorCoords(coordsTo));

        ref.current.setPositions(points.reduce((acc, { x, y, z }) => [...acc, x, y, z], [], []))
    }, [
        coordsFrom,
        coordsTo
    ])

    return (
        <line2>
            <lineGeometry ref={ref} />
            <lineMaterial
                color="white"
                linewidth={3}
                resolution={[
                    size.width,
                    size.height
                ]} />
        </line2>
    )
}