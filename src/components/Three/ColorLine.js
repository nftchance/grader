import React, { useRef, useLayoutEffect } from "react"

import { extend, useThree } from "@react-three/fiber"

import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry"
import { Line2 } from "three/examples/jsm/lines/Line2"

import ColorMath from "@components/Three/ColorMath";

extend({ LineMaterial, LineGeometry, Line2 })

export default function ColorLine({ coordsFrom, coordsTo }) {
    const ref = useRef()

    const { size } = useThree()

    useLayoutEffect(() => {
        const colorMath = new ColorMath()

        const points = [];
        points.push(colorMath.vectorCoords(coordsFrom));
        points.push(colorMath.vectorCoords(coordsTo));

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
                linewidth={2}
                resolution={[
                    size.width,
                    size.height
                ]} />
        </line2>
    )
}