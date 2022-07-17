import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import ColorspaceColorpickerBox from "./ColorspaceColorpickerBox";

import ColorspaceTextField from "./ColorspaceTextField";

const ColorspaceColor = (props) => {
    const {
        colors,
        handleColorChange,
        handleColorLock,
        handleColorRemove
    } = props;

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginTop: 20
        }} >
            {colors.map((color, idx) => (
                <div key={`color:${idx}`} style={{
                    display: "grid",
                    marginTop: 10,
                    justifyContent: "center"
                }}>
                    {/* COMMENTING THIS OUT REMOVES THE REMOVAL FUNCTIONALITY
                        {idx > 1
                        ? <Button
                            style={{
                                color: "red",
                                marginLeft: "auto"
                            }}
                            onClick={(event) => {
                                handleColorRemove(idx)
                            }}
                        >
                            <FontAwesomeIcon icon={['fal', 'close']} />
                        </Button>
                        : null
                    } */}

                    <ColorspaceColorpickerBox
                        color={color}
                        handleColorChange={handleColorChange}
                        idx={idx}
                    />

                    <Button style={{ marginTop: 10 }}
                        onClick={(event) => {
                            handleColorLock(idx)
                        }}
                    >
                        {color.locked ? <FontAwesomeIcon icon={['fal', 'lock']} /> : <FontAwesomeIcon icon={['fal', 'lock-open']} />}
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default ColorspaceColor;