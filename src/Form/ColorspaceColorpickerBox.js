import { useState } from 'react';

import { ChromePicker } from 'react-color';

const ColorspaceColorpickerBox = (props) => {
    const { color, handleColorChange, idx } = props;

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleDisplayColorPickerChange = (event) => {
        setDisplayColorPicker(!displayColorPicker)
    }

    const handleClose = (event) => {
        setDisplayColorPicker(false);
    }

    return (
        <>
            <div className="color-picker"
                onClick={handleDisplayColorPickerChange}
                style={{
                    background: `${color.color}`,
                    border: '1px solid #fff',
                    borderRadius: "50%",
                    height: 50,
                    width: 50,
                    margin: "auto"
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