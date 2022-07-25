import { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const toolbarStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    border: '1px solid #fff',
    p: 4,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: "10px"
};

const innerButtonStyle = {
    display: 'grid',
    gridTemplateRows: '1.5fr 1fr',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
}

const iconStyle = {
    fontSize: "18px"
}

export default function ToolExportModalButton({
    chromaSaveURL,
    shareMessage,
    code,
    buttonStyle
}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [copied, setCopied] = useState([false, false])

    // Update when someone clicks the copy action
    const handleCopy = (copyIndex) => {
        // Flip the state of the active copy index
        const copiedToggled = (copyIndex, val) => {
            return copied.map((copy, idx) => {
                if (idx === copyIndex) return val

                return copy
            })
        }

        setCopied(copiedToggled(copyIndex, true), setTimeout(() => {
            setCopied(copiedToggled(copyIndex, false))
        }, 2500))
    }

    return (
        <div>
            <Button onClick={handleOpen} style={buttonStyle}>
                <FontAwesomeIcon icon={['fal', 'arrow-up-right-from-square']} />
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={toolbarStyle}>
                    <CopyToClipboard
                        text={chromaSaveURL}
                        onCopy={() => { handleCopy(0) }}
                        leaveDelay={copied[0] ? 1250 : 0}
                    >
                        <Button style={innerButtonStyle}>
                            <FontAwesomeIcon icon={['fal', 'link']} style={iconStyle} />
                            <p>{copied[0] ? 'Copied' : 'Copy Link'}</p>
                        </Button>
                    </CopyToClipboard>

                    <CopyToClipboard
                        text={code}
                        leaveDelay={copied[1] ? 1250 : 0}
                        onCopy={() => { handleCopy(1) }}
                    >
                        <Button style={innerButtonStyle}>
                            <FontAwesomeIcon icon={['fal', 'clipboard']} style={iconStyle} />
                            <p>{copied[1] ? 'Copied' : 'Copy Code'}</p>
                        </Button>
                    </CopyToClipboard>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://twitter.com/intent/tweet?text=${shareMessage}`}
                        style={{
                            display: "inline",
                            justifySelf: "center",
                            width: "100%"
                        }}
                    >
                        <Button style={{ ...innerButtonStyle, width: "100%" }}>
                            <FontAwesomeIcon icon={['fab', 'twitter']} style={iconStyle} />
                            <p>Tweet</p>
                        </Button>
                    </a>
                </Box>
            </Modal>
        </div>
    );
}