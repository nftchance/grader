import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";

import ColorspaceTextField from "@components/Form/ColorspaceTextField";
import ColorspaceColorpickerBox from "@components/Form/ColorspaceColorpickerBox";

import "./ColorspaceColor.css";

const ColorspaceColor = (props) => {
    const {
        colors,
        handleColorChange,
        handleColorLock,
        handleColorRemove,
    } = props;

    return (
        <div className="color-container">
            {colors.map((color, idx) => (
                <div key={`color:${idx}`} style={{
                    display: "grid",
                    gridTemplateColumns: "8fr 2fr 2fr",
                    alignItems: "center",
                    borderLeft: "none"
                }}>
                    {/* COMMENTING THIS OUT REMOVES THE REMOVAL FUNCTIONALITY */}

                    <ColorspaceTextField
                        colorspaceColor={color}
                        onChange={handleColorChange}
                        label={`Color #${idx}`}
                        className="color"
                    />

                    <div style={{
                        border: "1px solid #fff",
                        borderLeft: "none",
                        height: "100%",
                        width: "100%",
                        display: "grid",
                        alignItems: "center",
                    }}>
                        <ColorspaceColorpickerBox
                            color={color}
                            handleColorChange={handleColorChange}
                            idx={idx}
                        />
                    </div>

                    <div style={{ marginLeft: 10 }}>
                        <Tooltip title="Lock">
                            <Button onClick={() => { handleColorLock(idx) }}>
                                {color.locked
                                    ? <FontAwesomeIcon icon={['fal', 'lock']} />
                                    : <FontAwesomeIcon icon={['fal', 'lock-open']} />
                                }
                            </Button>
                        </Tooltip>

                        {/* {idx > 1 && <div style={{ marginLeft: "auto " }}>
                            <Tooltip title="Remove">
                                <Button style={{ color: "red" }} onClick={() => { handleColorRemove(idx) }}>
                                    <FontAwesomeIcon icon={['fal', 'close']} />
                                </Button>
                            </Tooltip>
                        </div>} */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ColorspaceColor;