
import "./ColorspaceColor.css";
import ColorspaceColor from "./ColorspaceColor";

export default function ColorspaceColors(props) {
    const {
        colors,
        handleColorChange,
        handleColorLock,
        handleColorRemove
    } = props;

    return (
        <div className="color-container">
            {colors.map((color, idx) => (
                <ColorspaceColor 
                    key={`${color.color}-${idx}`}
                    color={color}
                    idx={idx}
                    handleColorChange={handleColorChange}
                    handleColorLock={handleColorLock}
                    handleColorRemove={handleColorRemove}
                />
            ))}
        </div>
    )
}