import ColorPoint from "./ColorPoint"
import ColorLine from "./ColorLine"

function ColorPointAndLine({
    points,
    point,
    idx,
    size: SIZE,
    segments: SEGMENTS
}) {
    return <>
        <ColorPoint
            point={point}
            size={SIZE}
            segments={SEGMENTS}
        />

        {idx > 0 && <ColorLine
            coordsFrom={point}
            coordsTo={points[idx - 1]}
        />}
    </>
}

export default function ColorPoints(props) {
    const { points } = props;

    return (
        <group>
            {points.map((point, idx) => <ColorPointAndLine
                key={point}
                idx={idx}
                point={point}
                {...props}
            />)}
        </group>
    )
}