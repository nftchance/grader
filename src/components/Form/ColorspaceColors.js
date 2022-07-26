import { Button, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ColorspaceTextField from "@components/Form/ColorspaceTextField";
import ColorspaceColorpickerBox from "@components/Form/ColorspaceColorpickerBox";

import "./ColorspaceColors.css";

export default function ColorspaceColors({
    colors,
    handleColorChange,
    handleColorLock
}) {
    return (
        <div className="color-container">
            {colors.map((color, idx) => (
                <div key={`color:${idx}`} className="color-input">
                    <ColorspaceTextField
                        colorspaceColor={color}
                        onChange={handleColorChange}
                        label={`Color #${idx}`}
                        className="color"
                    />

                    <div className="color-input-picker">
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
                    </div>
                </div>
            ))}
        </div>
    )
}