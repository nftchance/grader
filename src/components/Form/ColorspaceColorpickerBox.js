import { useState } from 'react';

import { ChromePicker } from 'react-color';

const ColorspaceColorpickerBox = ({ color, handleColorChange, idx }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleDisplayColorPickerChange = () => setDisplayColorPicker(!displayColorPicker)

    const handleClose = () => setDisplayColorPicker(false);

    return (
        <>
            <div className="color-picker"
                onClick={handleDisplayColorPickerChange}
                style={{
                    background: `${color.color}`,
                    border: '1px solid #fff',
                    borderRadius: "50%",
                    height: 40,
                    width: 40,
                    margin: "auto",
                    marginRight: 10
                }}
            />

            {/* 'Click anywhere' closer */}
            {displayColorPicker ?
                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                }}>
                    {/* Color preview */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }} onClick={handleClose} />

                    {/* Color picker */}
                    <ChromePicker color={color.color}
                        onChange={(event) => handleColorChange(
                            { target: { value: event.hex } },
                            idx
                        )}
                    />
                </div> : null
            }
        </>
    )
}

export default ColorspaceColorpickerBox;