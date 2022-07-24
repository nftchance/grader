import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Tooltip } from "@mui/material"

import ToolExportModalButton from "@components/Tool/Export/ToolExportModalButton"

const buttonStyle = {
    border: '1px solid #fff'
}

export default function Toolbar({
    chromaSaveURL,
    shareMessage,
    code,
    introEnabled,
    handleIntroEnter,
    handleIntroExit,
    handleExportToggle
}) {
    return (
        <div className="tool-bar">
            <div></div>
            
            <div>
                <Tooltip title="Help">
                    <Button onClick={introEnabled ? handleIntroExit : handleIntroEnter} style={buttonStyle}>
                        <FontAwesomeIcon icon={['fal', 'question']} />
                    </Button>
                </Tooltip>
            </div>

            <ToolExportModalButton
                chromaSaveURL={chromaSaveURL}
                shareMessage={shareMessage}
                code={code}
                buttonStyle={buttonStyle}
            />
        </div>
    )
}