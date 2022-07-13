import ColorspaceTextField from "./ColorspaceTextField";

const ColorspaceColor = (props) => {
    const { colors, handleColorChange } = props;

    return (
        <>
            {colors.map((color, idx) => (
                <ColorspaceTextField
                    key={`color:${idx}`}
                    label={`Color #${idx + 1}`}
                    defaultValue={`${color.color}`}
                    id={`color-${idx}`}
                    colorspaceColor={color}
                    onChange={(e) => {
                        handleColorChange(e, idx)
                    }}
                />
            ))}
        </>
    )
}

export default ColorspaceColor;