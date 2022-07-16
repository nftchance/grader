import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

import ColorspaceTextField from "./ColorspaceTextField";

const ColorspaceColor = (props) => {
    const {
        colors,
        handleColorChange,
        handleColorLock,
        handleColorRemove
    } = props;

    return (
        <>
            {colors.map((color, idx) => (
                <div key={`color:${idx}`}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        marginTop: 20

                    }}>
                        <Button
                            style={{
                                marginRight: "auto",
                            }}
                            onClick={(event) => {
                                handleColorLock(idx)
                            }}
                        >
                            {color.locked ? <FontAwesomeIcon icon={['fal', 'lock']} /> : <FontAwesomeIcon icon={['fal', 'lock-open']} />}
                        </Button>

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
                        }
                    </div>

                    <ColorspaceTextField
                        label={`Color #${idx + 1}`}
                        value={`${color.color}`}
                        id={`color-${idx}`}
                        colorspaceColor={color}
                        onChange={(e) => {
                            handleColorChange(e, idx)
                        }}
                    />
                </div>
            ))}
        </>
    )
}

export default ColorspaceColor;