import { Button, Tooltip } from "@mui/material";

import { Lock, LockOpen } from "lucide-react";

import ColorspaceTextField from "@components/Form/ColorspaceTextField";
import ColorspaceColorpickerBox from "@components/Form/ColorspaceColorpickerBox";

import "./ColorspaceColors.css";

export default function ColorspaceColors({
    colors,
    handleColorChange,
    handleColorLock,
}) {
    return (
        <div className="color-container">
            {colors.map((color, idx) => (
                <div key={`color:${idx}`} className="color-input">
                    <ColorspaceTextField
                        colorspaceColor={color}
                        onChange={(event) => {
                            handleColorChange(event, idx);
                        }}
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
                            <Button
                                onClick={() => {
                                    handleColorLock(idx);
                                }}
                            >
                                {color.locked ? <Lock /> : <LockOpen />}
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            ))}
        </div>
    );
}
