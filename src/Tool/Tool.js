import { useEffect, useMemo, useState } from 'react';

import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Helmet } from 'react-helmet-async';

import chroma from "chroma-js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ToolIntro from "./ToolIntro";
import ThreeScene from "../Three/ThreeScene";

import Colorspace2DGradient from '../Two/Colorspace2DGradient';
import ColorspaceTextField from '../Form/ColorspaceTextField';
import ColorspaceToggleButtonGroup from '../Form/ColorspaceToggleButtonGroup';
import ColorspaceColor from '../Form/ColorspaceColor';
import CodeTheme from "../Code/ColorspaceCodeTheme";
import ColorMath from '../Three/ColorMath';

import 'rc-slider/assets/index.css';

import "./Tool.css";
import Page from '../Page/Page';

const Tool = () => {
    const fixedEncodeURIComponent = (str) => {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    const VISUALIZATION_MODES = ['RGB', 'HSL']
    const SCALE_MODES = ['RGB', 'HSL', 'HSV', 'HCL', 'LAB'];
    const POINTS_SCALE_FACTOR = 3;

    const [colorMode, setColorMode] = useState(VISUALIZATION_MODES[0])

    const colorMath = useMemo(() => new ColorMath(colorMode, 0, 0), [colorMode]);

    const DEFAULT_GRADIENT = useMemo(() => ([colorMath.c('#ffffff', 0, true, false), colorMath.c("#000000", 1, true, false)]), [colorMath]);

    const [points, setPoints] = useState(DEFAULT_GRADIENT.length * POINTS_SCALE_FACTOR)
    const [pointsMode, setPointsMode] = useState(0); // 0 = input | 1 = scale
    const [degree, setDegree] = useState(90); // left -> right

    const [colors, setColors] = useState(DEFAULT_GRADIENT);
    const [chromaColors, setChromaColors] = useState([]);

    const [score, setScore] = useState(0);
    const [best, setBest] = useState(score);

    const [code, setCode] = useState("");

    const [gradientColorMode, setGradientColorMode] = useState(SCALE_MODES[0])
    const [activeGradient, setActiveGradient] = useState(DEFAULT_GRADIENT);

    const [copied, setCopied] = useState([false, false])

    const [introEnabled, setIntroEnabled] = useState(false);

    const hasMadeChange = useMemo(() => !colors.every((color, idx) => {
        const defaultColor = DEFAULT_GRADIENT[idx]
        return color.color === defaultColor.color && color.domain === defaultColor.domain && color.locked === defaultColor.locked
    }), [colors, DEFAULT_GRADIENT])

    const trimmedColors = useMemo(() => ([...colors.slice(1, colors.length)]), [colors])

    const usingDefaultScale = useMemo(() => {
        return trimmedColors.every((color, idx) => {
            return color.domain === colorMath.indexToDomainPos(trimmedColors, idx + 1);
        })
    }, [colorMath, trimmedColors])

    const colorSquishedDomain = useMemo(() => ((1 + colors[colors.length - 2].domain) / 2), [colors]);

    // Building the color scale with the proper domain
    const joiningColors = useMemo(() => trimmedColors.map((color, idx) => ({
        ...color,
        domain: usingDefaultScale
            ? colorMath.indexToDomainPos(colors, idx + 1)
            : idx !== trimmedColors.length - 1
                ? color.domain
                : colorSquishedDomain
    })), [
        colorMath,
        colors,
        trimmedColors,
        colorSquishedDomain,
        usingDefaultScale
    ])

    // Make sure that the color is added in the right spot 
    const colorAddedColors = useMemo(() => (
        [
            ...[colors[0]],
            ...joiningColors,
            colors[colors.length - 1]
        ]
    ), [colors, joiningColors])

    const URLHead = `${window.location.href.split("?")[0]}`

    const URLTail = fixedEncodeURIComponent(`cm=${colorMode}&gcm=${gradientColorMode}&cs=${colors.map(color => color.color).join("&cs=")}&ds=${colors.map(color => color.domain).join("&ds=")}&d=${degree}&p=${points}&g=${code.replace("background: ", "")}&f=${Math.random() > 0.5 ? true : false}&s=${score}`)

    const chromaSaveURL = `${URLHead}?` + URLTail

    const shareMessage = `I just used @trycolorspace and made this${score > 81 ? " perfect " : " "}palette - what's your score ?%0A%0A${chromaSaveURL}`;

    const chromaOGURL = `${URLHead}.netlify/functions/opengraph/?` + URLTail;

    const handleIntroEnter = () => {
        setIntroEnabled(true)
    }

    const handleIntroExit = () => {
        setIntroEnabled(false)
    }

    const handleURLUpdate = () => {
        // update the url so that someone can just copy-paste
        window.history.replaceState({
            additionalInformation: 'Updated when changing colors.'
        }, 'COLORSPACE', chromaSaveURL)
    }

    if (hasMadeChange)
        handleURLUpdate()

    // Respond to the change between RGB & HSL viewing mode
    const handleColorModeChange = (event, newColorMode) => {
        console.log('changing color mode to', newColorMode)
        if (newColorMode !== null) setColorMode(newColorMode);
    };

    // Check when the user updates the number of Domain Points
    const handlePointsChange = (event) => {
        if (event.target.value > colors.length * 10) return

        setPoints(event.target.value)
    }

    // Control the change of the gradient degree (within 0 - 360)
    const handleDegreeChange = (event) => {
        if (event.target.value == null) return
        if (event.target.value < 0 || event.target.value > 360) return

        setDegree(event.target.value);
    }

    // Update the color when the user changes it 
    const handleColorChange = (event, colorId) => {
        setColors(colors.map((color, idx) => (
            idx !== colorId ? color : {
                ...color, // keep all the fields the same but color
                color: event.target.value
            }
        )))
    }

    // Handle everything when a new color is added to the mix
    const handleColorAddition = () => {
        if (colors.length >= 10) return

        // if the default points value is being used, continue using it
        if (points === (colorAddedColors.length - 1) * POINTS_SCALE_FACTOR)
            setPoints(colorAddedColors.length * POINTS_SCALE_FACTOR)

        setColors(colorAddedColors)
    }

    // Update the locked state of a color
    const handleColorLock = (colorId) => {
        setColors(colors.map((color, idx) => {
            return colorMath.c(
                color.color,
                color.domain,
                color.visible,
                idx === colorId ? !color.locked : color.locked
            )
        }))
    }

    // Remove a color from the list
    const handleColorRemove = (colorId) => {
        setColors(colors.filter((color, idx) => idx !== colorId))
    }

    // Full reset of the dashboard -- Updating these two things update
    // everything else that is needed
    const handleColorClear = () => {
        // update the url so that someone can just copy-paste
        window.history.replaceState({
            additionalInformation: 'Updated when changing colors.'
        }, 'COLORSPACE', URLHead)
        setPoints(DEFAULT_GRADIENT.length * POINTS_SCALE_FACTOR)
        setColors(DEFAULT_GRADIENT)
    }

    const handleGradientColorModeChange = (event) => {
        setGradientColorMode(event.target.value)
    }

    // Update the domain of the scale as the slider is used
    const handleDomainChange = (domains) => {
        // dont allow users to move the solo base anchors
        if (domains.length === 2) return

        const domainedColors = colors.map((color, i) => ({
            ...color,
            domain: domains[i] / 100,
        }))

        setColors(domainedColors)
    }

    // Generate a random and new palette based on scaled anchors points
    const handleShuffle = () => {
        const randomRGBValue = () => { return Math.floor(Math.random() * 255) }

        const randomColor = () => {
            return chroma(`rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`).hex();
        }

        const shuffledColors = () => {
            return chroma.scale([
                randomColor(),
                randomColor(),
            ]).colors(colors.length);
        }

        const shuffledGradient = () => {
            return colors.map((color, i) => {
                if (color.locked) return color

                // keep the color but update the color.color
                return {
                    ...color,
                    color: shuffledColors()[i]
                }
            })
        }

        setColors(shuffledGradient())
    }

    // Allow the user to flip the point display mode
    const handlePointsModeChange = () => {
        setPointsMode(Math.abs(pointsMode - 1))
    }

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

    // Handle the query params on the first load
    useEffect(() => {
        const queryParams = new URLSearchParams(decodeURIComponent(window.location.search))

        const handleQueryParams = () => {
            console.log('using query params')
            setColorMode(queryParams.get('cm'));
            setGradientColorMode(queryParams.get('gcm'))

            if (queryParams.getAll('cs').length !== 0 && queryParams.getAll('ds').length !== 0) {
                const queryParamsColors = queryParams
                    .getAll('cs')
                    .map((color, colorIdx) => colorMath.c(
                        color,
                        parseFloat(queryParams.getAll('ds')[colorIdx]),
                        true,
                        false
                    )) // when loaded by query parameters all are locked

                setPoints(queryParams.get('p'));
                setColors(queryParamsColors);
            }
        }

        if (queryParams.getAll('cs').length !== 0)
            handleQueryParams();
    }, [colorMath])

    // Keep tracking of the best score
    useEffect(() => {
        const handleBest = () => {
            if (score > best) setBest(score);
        }

        handleBest();
    }, [score, best])

    // Update the score when the key values are updated
    useEffect(() => {
        const chromaGradientCode = (colors) => {
            return `background: linear-gradient(\n\t${degree}deg,${colors.map(color => `\n\t${chroma(color).css('hsl')}`)}\n)`;
        }

        const chromaStringGradient = (incomingColors) => {
            try {
                const gradientColors = colorMath.chromaGradient(
                    incomingColors.map(color => color.color),
                    incomingColors.map(color => color.domain),
                    gradientColorMode,
                    points
                );

                // Enabling the display of the points in the visualization
                setChromaColors(gradientColors.map(color => ({ color })))

                const gradientString = `linear-gradient(\n\t${degree}deg,
						${gradientColors} 
					)
				`;

                // Enables 2D display of gradient
                setActiveGradient(gradientString)
                setCode(chromaGradientCode(gradientColors))

                return gradientColors;
            } catch (e) {
                console.log('Failed to update:', e)
            }

            return null
        }

        if (!colors.every(color => chroma.valid(color.color))) return

        setScore(colorMath.chromaGradientScore(
            chromaStringGradient(colors)
        ))
    }, [
        colorMath,
        gradientColorMode,
        points,
        degree,
        colors,
        chromaSaveURL
    ])

    return (
        <Page>
            <Helmet>
                <meta property="og:image" content={chromaOGURL} />
                <meta name="twitter:image" content={chromaOGURL} />
            </Helmet>

            <ToolIntro
                introEnabled={introEnabled}
                handleIntroExit={handleIntroExit}
            />

            <div className="container">
                <div className="header">
                    <h1>BUILD THE PERFECT COLOR PALETTE. WITH EASE.</h1>
                    <p className="lead">Finding an objectively good digital palette is an actual science. Tired of having grey-filled color scales that look like they were chosen by a color-blind person? Scroll down and make that perfect combination.</p>
                </div>

                <div style={{ height: 60, width: "100%" }}>
                    <Tooltip title="Help">
                        <Button onClick={introEnabled ? handleIntroExit : handleIntroEnter} style={{ float: "right", border: "1px solid #fff" }}>
                            HELP
                        </Button>
                    </Tooltip>
                </div>

                <div className="tool">
                    <div className="step cube">
                        <ThreeScene
                            colors={pointsMode === 0 ? colors : chromaColors}
                            colorMode={colorMode} />
                    </div>

                    <div className="step input">
                        <h3 style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            SETUP
                            <span style={{ marginLeft: "auto" }}>
                                <CopyToClipboard text={chromaSaveURL} onCopy={() => { handleCopy(0) }} leaveDelay={copied[0] ? 1250 : 0}>
                                    <Tooltip title={copied[0] ? "Copied" : "Copy Input Link"}>
                                        <Button>
                                            <FontAwesomeIcon icon={['fal', 'link']} />
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard>

                                <Tooltip title="Share on Twitter">
                                    <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${shareMessage}`} style={{
                                        display: "inline",
                                        justifySelf: "center"
                                    }}>
                                        <Button>
                                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                                        </Button>
                                    </a>
                                </Tooltip>
                            </span>
                        </h3>

                        <div style={{ marginTop: 20 }}>
                            <div style={{
                                display: "inline-grid",
                                marginTop: 5
                            }}>
                                <label>COLORS</label>
                            </div>

                            {colors.length < 10 && <Tooltip title="Add">
                                <Button onClick={handleColorAddition} style={{ float: "right" }}>
                                    <FontAwesomeIcon icon={['fal', 'plus']} />
                                </Button>
                            </Tooltip>}

                            <Tooltip title="Shuffle">
                                <Button onClick={handleShuffle} style={{ float: "right" }}>
                                    <FontAwesomeIcon icon={['fal', 'shuffle']} />
                                </Button>
                            </Tooltip>

                            {hasMadeChange && <Tooltip title="Clear">
                                <Button
                                    onClick={handleColorClear}
                                    style={{
                                        float: "right",
                                        color: "red",
                                        fontWeight: 900
                                    }}
                                >
                                    <FontAwesomeIcon icon={['fal', 'trash']} />
                                </Button>
                            </Tooltip>}
                        </div>

                        <ColorspaceColor
                            colors={colors}
                            handleColorChange={handleColorChange}
                            handleColorLock={handleColorLock}
                            handleColorRemove={handleColorRemove}
                        />

                        <div style={{ marginTop: 20 }}>
                            <label>SCALE</label>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10
                        }}>
                            <ColorspaceTextField
                                label="Points"
                                value={points}
                                aria-label="color scale points of separation"
                                id="points-of-separation"
                                type="number"
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '/^-?d+(?:.d+)?$/g',
                                    min: colors.length,
                                    max: colors.length * 10
                                }}
                                onChange={handlePointsChange}
                            />

                            <ColorspaceTextField
                                label="Angle"
                                aria-label="angle of rotation on gradient"
                                id="degree"
                                type="number"
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '/^-?d+(?:.d+)?$/g',
                                    min: 0,
                                    max: 360
                                }}
                                value={degree}
                                onChange={handleDegreeChange}
                            />
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <label>VISUALIZATION MODE</label>
                        </div>

                        <ColorspaceToggleButtonGroup
                            value={colorMode}
                            values={VISUALIZATION_MODES}
                            exclusive
                            aria-label="cube color mode"
                            onChange={handleColorModeChange}
                        />

                        <div style={{ marginTop: 20 }} className="score">
                            <p>
                                <strong>SCORE:</strong>
                                <span style={{ float: "right" }}>{score} / 100</span>
                            </p>
                            <p>
                                <strong>BEST:</strong>
                                <span style={{ float: "right" }}>{best} / 100</span>
                            </p>
                        </div>
                    </div>

                    {/* Formatted Code Output of Active Gradient */}
                    <div className="step code">
                        <h3>
                            CODE
                            <span style={{ float: "right", alignContent: "center" }}>
                                <CopyToClipboard text={code} leaveDelay={copied[1] ? 1250 : 0} onCopy={() => { handleCopy(1) }}>
                                    <Tooltip title={copied[1] ? "Copied" : "Copy Code"}>
                                        <Button>
                                            <FontAwesomeIcon icon={['fal', 'clipboard']} />
                                        </Button>
                                    </Tooltip>
                                </CopyToClipboard>

                                <Tooltip title={pointsMode === 0 ? 'Visualize Code' : 'Visualize Input'}>
                                    <Button onClick={handlePointsModeChange}>
                                        <FontAwesomeIcon icon={pointsMode === 0 ? ['fal', 'eye-dropper'] : ['fal', 'droplet']} />
                                    </Button>
                                </Tooltip>
                            </span>
                        </h3>

                        <pre style={{ maxHeight: 500, overflowY: "scroll" }}>
                            <SyntaxHighlighter
                                language="css"
                                style={CodeTheme()}
                                PreTag="div"
                                children={code}
                            />
                        </pre>
                    </div>

                    <div className="scale">
                        {/* Gradient Color Mode Control */}
                        <div className="color-mode">
                            <ColorspaceToggleButtonGroup
                                value={gradientColorMode}
                                values={SCALE_MODES}
                                exclusive
                                aria-label="gradient color scale mode"
                                onChange={handleGradientColorModeChange}
                            />
                        </div>

                        <div className="scale-gradient" style={{
                            gridColumn: "1 / span 4"
                        }}>
                            {/* 2D Gradient Visualization */}
                            <Colorspace2DGradient
                                colors={colors}
                                gradient={activeGradient}
                                onChange={handleDomainChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Tool;