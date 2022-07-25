import { useEffect, useMemo, useState } from 'react';

import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { Helmet } from 'react-helmet-async';

import chroma from "chroma-js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Page from '@components/Page/Page';

import ToolIntro from "@components/Tool/Intro/ToolIntro";
import Toolbar from './Toolbar/Toolbar';
import ThreeScene from "@components/Three/ThreeScene";

import Colorspace2DGradient from '@components/Two/Colorspace2DGradient';
import ColorspaceTextField from '@components/Form/ColorspaceTextField';
import ColorspaceToggleButtonGroup from '@components/Form/ColorspaceToggleButtonGroup';
import ColorspaceColor from '@components/Form/ColorspaceColor';
import ColorMath from '@components/Three/ColorMath';

import 'rc-slider/assets/index.css';

import "./Tool.css";

const Tool = () => {
    const fixedEncodeURIComponent = (str) => {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    const randomRGBValue = () => { return Math.floor(Math.random() * 255) }

    const randomColor = () => {
        return chroma(`rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`).hex();
    }

    const VISUALIZATION_MODES = ['RGB', 'HSL']
    const SCALE_MODES = ['RGB', 'HSL', 'HSV', 'HCL', 'LAB'];
    const POINTS_MODES = ['Input', 'Scale']
    const POINTS_SCALE_FACTOR = 3;

    const [colorMode, setColorMode] = useState(VISUALIZATION_MODES[0])

    const colorMath = useMemo(() => new ColorMath(colorMode, 0, 0), [colorMode]);

    const DEFAULT_GRADIENT = useMemo(() => ([
        colorMath.c(randomColor(), 0, true, false),
        colorMath.c(randomColor(), .25, true, false),
        colorMath.c(randomColor(), 0.5, true, false),
        colorMath.c(randomColor(), 0.75, true, false),
        colorMath.c(randomColor(), 1, true, false)
    ]), [colorMath]);

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

    const [introEnabled, setIntroEnabled] = useState(false);
    const [exportEnabled, setExportEnabled] = useState(false);

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

    const shareMessage = `I just used @trycolorspace and made this${score > 81 ? " perfect " : " "}palette - what's your score?%0A%0A${chromaSaveURL}`;

    const chromaOGURL = `${URLHead}.netlify/functions/opengraph/?` + URLTail;

    const handleIntroEnter = () => {
        setIntroEnabled(true)
    }

    const handleIntroExit = () => {
        setIntroEnabled(false)
    }

    const handleExportToggle = () => {
        setExportEnabled(!exportEnabled)
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
        console.log('updating')
        setColors(colors.map((color, idx) => (
            idx !== colorId ? color : {
                ...color, // keep all the fields the same but color
                color: event.target.value
            }
        )))
    }

    // Handle everything when a new color is added to the mix
    const handleColorAddition = () => {
        if (colors.length >= 5) return

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
    const handlePointsModeChange = (event) => {
        console.log(event.target.value,)
        setPointsMode(POINTS_MODES.indexOf(event.target.value))
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
                <Toolbar
                    chromaSaveURL={chromaSaveURL}
                    shareMessage={shareMessage}
                    code={code}
                    introEnabled={introEnabled}
                    handleIntroEnter={handleIntroEnter}
                    handleIntroExit={handleIntroExit}
                    handleExportToggle={handleExportToggle}
                />

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
                            COLORS

                            <span style={{ marginLeft: "auto " }}>
                                {colors.length < 5 && <Tooltip title="Add">
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
                            </span>
                        </h3>

                        <ColorspaceColor
                            colors={colors}
                            handleColorChange={handleColorChange}
                            handleColorLock={handleColorLock}
                            handleColorRemove={handleColorRemove}
                        />

                        <div style={{ marginBottom: 10, marginTop: 20 }}>
                            <label>POSITION SCALE</label>
                        </div>

                        <div className="scale">
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

                    <div className="step controls">
                        <h3 style={{ display: "flex", alignItems: "center" }}>
                            CONTROLS
                        </h3>

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
                            <label>INTERPOLATION MODE</label>
                        </div>

                        <div className="color-mode">
                            <ColorspaceToggleButtonGroup
                                value={gradientColorMode}
                                values={SCALE_MODES}
                                exclusive
                                aria-label="gradient color scale mode"
                                onChange={handleGradientColorModeChange}
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

                        <div style={{ marginTop: 20 }}>
                            <label>POINTS MODE</label>
                        </div>

                        <div className="color-mode">
                            <ColorspaceToggleButtonGroup
                                value={POINTS_MODES[pointsMode]}
                                values={POINTS_MODES}
                                exclusive
                                aria-label="gradient color scale mode"
                                onChange={handlePointsModeChange}
                            />
                        </div>
                    </div>

                    <div className="step score">
                        <h3>SCORE</h3>

                        <div style={{ marginTop: 20 }}>
                            <p style={{
                                marginTop: 10
                            }}>
                                <strong>SCORE:</strong>
                                <span style={{ float: "right" }}>{score} / 100</span>
                            </p>
                            <p>
                                <strong>BEST:</strong>
                                <span style={{ float: "right" }}>{best} / 100</span>
                            </p>
                        </div>
                    </div>

                    <div className="step output">
                        <h3>Output</h3>
                    </div>

                    {/* Formatted Code Output of Active Gradient */}
                    {/* <div className="step code">
                        <h3>
                            CODE
                            <span style={{ float: "right", alignContent: "center" }}>

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
                    </div> */}
                </div>
            </div>
        </Page>
    )
}

export default Tool;