import ColorPoint from "./ColorPoint"
import ColorLine from "./ColorLine"

export default function ColorPoints({
    points,
    size: SIZE,
    segments: SEGMENTS
}) {
    return (
        <group>
            {points.map((point, idx) => <>
                <ColorPoint
                    key={point}
                    point={point}
                    size={SIZE}
                    segments={SEGMENTS}
                />

                {idx > 0 && <ColorLine
                    coordsFrom={point}
                    coordsTo={points[idx - 1]}
                />}
            </>)}
        </group>
    )
}