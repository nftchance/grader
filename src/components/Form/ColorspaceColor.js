import { useState } from "react";

import { Button, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ColorspaceTextField from "@components/Form/ColorspaceTextField";
import ColorspaceColorpickerBox from "@components/Form/ColorspaceColorpickerBox";

const menuStyle = {
    background: "#000",
    color: "#fff",
    fontWeight: 900
}

const iconStyle = {
    marginRight: 10
}

export default function ColorspaceColor({ color, idx, handleColorChange, handleColorLock, handleColorRemove }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
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
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={["fal", "ellipsis-vertical"]} />
                </Button>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{
                        '.MuiList-root': {
                            padding: 0,
                            border: "1px solid #fff"
                        },
                        '.MuiMenuItem-root:hover': {
                            background: "#000"
                        }
                    }}
                >
                    <MenuItem onClick={() => { handleColorLock(idx) }} sx={menuStyle}>
                        {!color.locked
                            ? <FontAwesomeIcon style={iconStyle} icon={['fal', 'lock']} />
                            : <FontAwesomeIcon style={iconStyle} icon={['fal', 'lock-open']} />
                        }

                        {color.locked ? "Unlock" : "Lock"}
                    </MenuItem>

                    {/* {idx > 1 && <MenuItem onClick={() => { handleColorRemove(idx) }} style={{ ...menuStyle, color: "red " }}>
                        <FontAwesomeIcon icon={['fal', 'close']} style={iconStyle} />
                        Remove
                    </MenuItem>} */}
                </Menu>

                {/*  <div style={{ marginLeft: "auto " }}>
                            <Tooltip title="Remove">
                                <Button style={{ color: "red" }} >
                                </Button>
                            </Tooltip>
                        </div>} */}
            </div>
        </div>
    )
}