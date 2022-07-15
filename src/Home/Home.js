import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'

import chroma from "chroma-js"

import Cube from "../Three/Cube";
import Colorspace2DGradient from '../Two/Colorspace2DGradient';
import ColorspaceTextField from '../Form/ColorspaceTextField';
import ColorspaceToggleButtonGroup from '../Form/ColorspaceToggleButtonGroup';
import ColorspaceColor from '../Form/ColorspaceColor';
import CodeTheme from "../Code/ColorspaceCodeTheme";

import logo from "../images/logo.png"

import 'rc-slider/assets/index.css';

import './Home.css';

library.add(fab, fal)

function Home({ theme }) {
    const cubeColorModes = [
        'RGB',
        'HSL'
    ]

    const colorsModes = [
        'RGB',
        'HSL',
        'HSV',
        'HCL',
        'LAB',
    ];

    const buildColor = (color, domain, visible, locked) => {
        return {
            color,
            domain,
            visible,
            locked
        }
    }

    const defaultGradient = [
        buildColor('#ffffff', 0, true, false),
        buildColor("#000000", 1, true, false),
    ];

    const pointsColorsFactor = 3;

    const [activeGradient, setActiveGradient] = useState(defaultGradient);
    const [colors, setColors] = useState(defaultGradient);
    const [points, setPoints] = useState(defaultGradient.length * pointsColorsFactor)

    const [colorMode, setColorMode] = useState(cubeColorModes[0])
    const [gradientColorMode, setGradientColorMode] = useState(colorsModes[0])
    const [degree, setDegree] = useState(90);

    const [score, setScore] = useState(0);
    const [best, setBest] = useState(score);

    const [code, setCode] = useState("");

    const [saveURL, setSaveURL] = useState("");
    const [ogURL, setOGURL] = useState("");
    const [linkCopied, setLinkCopied] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);

    const fixedEncodeURIComponent = (str) => {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    const shareMessage = () => {
        return `I justed used @trycolorspace and made this ${score > 81 ? "perfect " : " "}pallete - whats your score ?%0A%0A${saveURL}`
    }

    const randomColor = () => {
        return chroma(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`).hex();
    }

    // Respond to the change between RGB & HSL viewing mode
    const handleColorModeChange = (event, newColorMode) => {
        if (newColorMode !== null) {
            setColorMode(newColorMode);
        }
    };

    // Control the change of the gradient degree (within 0 - 360)
    const handleDegreeChange = (event) => {
        if (event.target.value == null) return
        if (event.target.value < 0 || event.target.value > 360) return

        setDegree(event.target.value);
    }

    // Make sure the user cannot add an insane amount of points
    const handlePointsChange = (event) => {
        if (event.target.value > colors.length * 10) return

        setPoints(event.target.value)
    }

    // Make sure we are updating the full dataset of colors when
    // any piece is being edited
    const handleColorChange = (e, colorId) => {
        const _colors = colors.map((color, idx) => (
            idx !== colorId ? color : buildColor(
                e.target.value,
                color.domain,
                color.visible,
                color.locked
            )
        ))

        setColors(_colors)
    }

    const chromaScaleDomainPosition = (colors, index) => {
        if (index === 0) return 0

        return (index / colors.length)
    }

    // Handle everything when a new color is added to the mix
    const handleColorAddition = (event) => {
        const trimmedColors = [...colors.slice(1, colors.length)];

        const usingDefaultScale = trimmedColors.every((color, idx) => {
            return color.domain === chromaScaleDomainPosition(trimmedColors, idx + 1);
        })

        // Building the color scale with the proper domain
        const joiningColors = trimmedColors.map((color, idx) => {
            const colorSquishedDomain = (1 + colors[colors.length - 2].domain) / 2
            const colorDomain = usingDefaultScale
                ? chromaScaleDomainPosition(colors, idx + 1)
                : idx !== trimmedColors.length - 1
                    ? color.domain
                    : colorSquishedDomain

            return {
                ...color,
                domain: colorDomain
            }
        })

        // Make sure that the color is added in the right spot 
        const colorAddedColors = [
            ...[colors[0]],
            ...joiningColors,
            colors[colors.length - 1]
        ]

        // if the default points value is being used, continue using it
        if (points === (colorAddedColors.length - 1) * pointsColorsFactor)
            setPoints(colorAddedColors.length * pointsColorsFactor)

        setColors(colorAddedColors)
    }

    // Update the locked state of a color
    const handleColorLock = (event, colorId) => {
        setColors(colors.map((color, idx) => {
            return buildColor(
                color.color,
                color.domain,
                color.visible,
                idx === colorId ? !color.locked : color.locked
            )
        }))
    }

    // Remove a color from the list
    const handleColorRemove = (event, colorId) => {
        setColors(colors.filter((color, idx) => idx !== colorId))
    }

    // Full reset of the dashboard -- Updating these two things update
    // everything else that is needed
    const handleColorClear = (event) => {
        setPoints(defaultGradient.length * pointsColorsFactor)
        setColors(defaultGradient)
    }

    // Update the domain of the scale as the slider is used
    const handleDomainChange = (domains) => {
        // dont allow users to move the solo base anchors
        if (domains.length === 2) return

        const domainedColors = colors.map((color, i) => {
            return {
                ...color,
                domain: domains[i] / 100,
            }
        })

        setColors(domainedColors)
    }

    // Generate a random and new pallete based on scaled anchors points
    const handleShuffle = () => {
        const shuffledColors = chroma.scale([
            randomColor(),
            randomColor(),
        ]).colors(colors.length);

        setColors(colors.map((color, i) => {
            if (color.locked) return color

            // keep the color but update the color.color
            return {
                ...color,
                color: shuffledColors[i]
            }
        }))
    }

    // Control the tooltip for copying the input link
    const onLinkCopy = () => {
        setLinkCopied(true)
        setTimeout(() => {
            setLinkCopied(false)
        }, 1500);
    }

    // Control the tooltip for copying the code of the scale
    const onCodeCopy = () => {
        setCodeCopied(true)
        setTimeout(() => {
            setCodeCopied(false)
        }, 1500);
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(decodeURIComponent(window.location.search))

        const handleQueryParams = () => {
            setColorMode(queryParams.get('cm'));
            setGradientColorMode(queryParams.get('gcm'))

            if (queryParams.get('cs') && queryParams.get('ds')) {
                const queryParamsColors = queryParams
                    .getAll('cs')
                    .map((color, colorIdx) => buildColor(
                        color,
                        queryParams.getAll('ds')[colorIdx],
                        true,
                        false // when loaded by query parameters all are locked
                    ));

                setColors(queryParamsColors);
                setPoints(queryParams.get('p'));
            }

            return null
        }

        if (queryParams.values.length !== 0)
            handleQueryParams();
    }, [])

    // Keep tracking of the best score
    useEffect(() => {
        if (score > best) setBest(score);
    }, [score, best])

    // Update the gradient when the key values are updated
    useEffect(() => {
        const chromaGradient = (gradientColors, gradientDomains) => {
            return chroma
                .scale(gradientColors)
                .domain(gradientDomains)
                .mode(gradientColorMode.toLowerCase())
                .colors(points)
        }

        const chromaGradientCode = (colors) => {
            return `background: linear-gradient(\n\t${degree}deg,${colors.map(color => `\n\t${chroma(color).css('hsl')}`)}\n)`;
        }

        const chromaStringGradient = (gradientColors) => {
            try {
                const chromaColors = chromaGradient(
                    gradientColors.map(color => color.color),
                    gradientColors.map(color => color.domain)
                );

                const chromaGradientString = `linear-gradient(\n\t${degree}deg,
						${chromaColors} 
					)
				`;

                setActiveGradient(chromaGradientString)
                setCode(chromaGradientCode(chromaColors))

                return chromaColors;
            } catch (e) {
                console.log('Failed to update:', e)
            }

            return null
        }

        const chromaLightnessMaxDiff = (chromaLightness) => {
            const chromeLightnessDeviations = chromaLightness.map((color, idx) => {
                if (idx > 0)
                    return Math.floor(Math.abs(chromaLightness[idx] - chromaLightness[idx - 1]))
                return 0
            })

            return Math.max.apply(null, chromeLightnessDeviations);
        }

        const chromaLightnessAverageDiff = (chromaLightness) => {
            const chromaLightnessSum = chromaLightness.reduce((sum, lightness) => sum + lightness, 0);
            const chromaLightnessAverage = chromaLightnessSum / chromaLightness.length;

            const chromaLightnessMedian = chromaLightness[Math.ceil((chromaLightness.length - 1) / 2)]

            return Math.abs(chromaLightnessAverage - chromaLightnessMedian);
        }

        const chromaLightnessBumpiness = (chromaLightness) => {
            const chromaLightnessDirections = chromaLightness.map((color, idx) => {
                if (idx === 0) return undefined

                return color >= chromaLightness[idx - 1]
            })

            const chromaLightnessBumps = chromaLightnessDirections
                .filter((direction, idx) => {
                    if (direction === undefined) return false
                    if (idx <= 1) return false

                    return direction !== chromaLightnessDirections[idx - 1]
                }).length


            return chromaLightnessBumps
        }

        const chromaGradientScore = (chromaColors) => {
            let score = 100;

            // Factor in maximum devitation
            const chromaLightness = chromaColors.map(color => chroma(color).hsl()[2] * 100);
            const lightnessMaxDiff = chromaLightnessMaxDiff(chromaLightness)
            score = score - lightnessMaxDiff

            // Factor in the miss from the average
            const lightnessAverageDiff = chromaLightnessAverageDiff(chromaLightness);
            score = score - lightnessAverageDiff

            // Handling the 'rollercoaster effect'
            const lightnessBumpiness = chromaLightnessBumpiness(chromaLightness)
            score = score - lightnessBumpiness * 5

            return Math.ceil(score)
        }

        if (!colors.every(color => chroma.valid(color.color))) return

        const gradient = chromaStringGradient(colors)
        const score = chromaGradientScore(gradient)

        setScore(score);

        const chromaSaveURL = () => {
            const urlColors = colors.map(color => color.color).join("&cs=")
            const urlDomains = colors.map(color => color.domain).join("&ds=")
            const url = window.location.href.split("?")[0]

            return `${url}?` + fixedEncodeURIComponent(`cm=${colorMode}&gcm=${gradientColorMode}&cs=${urlColors}&ds=${urlDomains}&d=${degree}&p=${points}&g=${code.replace("background: ", "")}&f=${Math.random() > 0.5 ? true : false}&s=${score}&url=${url}`)
        }

        const chromaOGURL = () => {
            const urlColors = colors.map(color => color.color).join("&cs=")
            const urlDomains = colors.map(color => color.domain).join("&ds=")
            const url = window.location.href.split("?")[0]

            return `${url}.netlify/functions/opengraph/?` + fixedEncodeURIComponent(`cm=${colorMode}&gcm=${gradientColorMode}&cs=${urlColors}&ds=${urlDomains}&d=${degree}&p=${points}&g=${code.replace("background: ", "")}&f=${Math.random() > 0.5 ? true : false}&s=${score}&url=${url}`)
        }

        // update the url so that someone can just copy-paste
        window.history.replaceState({
            additionalInformation: 'Updated when changing colors.'
        }, 'COLORSPACE', chromaSaveURL())

        setSaveURL(chromaSaveURL())
        setOGURL(chromaOGURL())
    }, [
        colorMode,
        gradientColorMode,
        points,
        degree,
        colors,
        code,
        activeGradient,
    ])

    return (
        <div className="container">
            <Helmet>
                <meta property="og:image" content={ogURL} />
                <meta name="twitter:image" content={ogURL} />
            </Helmet>

            <div className="navbar">
                <a href="/"><img src={logo} alt="navbar logo" /></a>

                <div className={`theme-controls ${theme}`} />
            </div>

            <h1>BUILD THE PERFECT GRADIENT. WITH EASE.</h1>
            <p className="lead">Finding an objectively good gradient is an actual science. Tired of having grey-filled gradients that look like they were chosen by a color-blind person? Scroll down and make that perfect gradient.</p>

            <div className="tool">
                <div className="step cube">
                    <Cube colors={colors} colorMode={colorMode} />
                </div>

                <div className="step input">
                    <h3 style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        INPUT
                        <span style={{ marginLeft: "auto", display: "grid", alignItems: "center", gridTemplateColumns: "1fr 1fr" }}>
                            <CopyToClipboard text={saveURL} onCopy={onLinkCopy} leaveDelay={linkCopied ? 1250 : 0}>
                                <Tooltip title={linkCopied ? "Copied" : "Copy Input Link"}>
                                    <Button>
                                        <FontAwesomeIcon icon={['fal', 'link']} />
                                    </Button>
                                </Tooltip>
                            </CopyToClipboard>

                            <Tooltip title="Shuffle">
                                <Button onClick={handleShuffle}>
                                    <FontAwesomeIcon icon={['fal', 'shuffle']} />
                                </Button>
                            </Tooltip>
                        </span>
                    </h3>

                    <label>CUBE COLOR MODE</label>
                    <ColorspaceToggleButtonGroup
                        value={colorMode}
                        values={cubeColorModes}
                        exclusive
                        aria-label="cube color mode"
                        onChange={handleColorModeChange}
                    />

                    <ColorspaceTextField
                        label="Domain Points"
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

                    <ColorspaceColor
                        colors={colors}
                        handleColorChange={handleColorChange}
                        handleColorLock={handleColorLock}
                        handleColorRemove={handleColorRemove}
                    />

                    <div style={{ marginTop: 10 }}>
                        <Button style={{ fontWeight: 900 }}
                            onClick={handleColorAddition}
                        >
                            <FontAwesomeIcon icon={['fal', 'plus']} />
                        </Button>

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
                    </div>
                </div>

                <div className="step result">
                    <h3>
                        SCORE
                        <span style={{ float: "right", alignContent: "center" }}>
                            <Tooltip title="Share on Twitter">
                                <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${shareMessage()}`} style={{
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

                    <p>
                        <strong>SCORE:</strong>
                        <span style={{ float: "right" }}>{score} / 100</span>
                    </p>
                    <p>
                        <strong>BEST:</strong>
                        <span style={{ float: "right" }}>{best} / 100</span>
                    </p>
                </div>

                {/* Formatted Code Output of Active Gradient */}
                <div className="step code">
                    <h3>
                        CODE
                        <span style={{ float: "right", alignContent: "center" }}>
                            <CopyToClipboard text={code} leaveDelay={codeCopied ? 1250 : 0} onCopy={onCodeCopy}>
                                <Tooltip title={codeCopied ? "Copied" : "Copy Code"}>
                                    <Button>
                                        <FontAwesomeIcon icon={['fal', 'clipboard']} />
                                    </Button>
                                </Tooltip>
                            </CopyToClipboard>
                        </span>
                    </h3>

                    <>
                        <pre>
                            <SyntaxHighlighter
                                language="css"
                                style={CodeTheme()}
                                PreTag="div"
                                children={code}
                            />
                        </pre>
                    </>
                </div>

                {/* Gradient Color Mode Control */}
                <div className="color-mode">
                    <ColorspaceToggleButtonGroup
                        value={gradientColorMode}
                        values={colorsModes}
                        exclusive
                        aria-label="gradient color scale mode"
                        onChange={(event) => { setGradientColorMode(event.target.value) }}
                    />
                </div>

                {/* 2D Gradient Visualization */}
                <Colorspace2DGradient
                    colors={colors}
                    gradient={activeGradient}
                    onChange={handleDomainChange}
                />
            </div>

            <div className="grey">
                <div className="step">
                    <h2>YOUR GRADIENTS DON'T HAVE TO SUCK SO BAD.</h2>
                    <p className="lead">Combining the power of visual fidelity and actual proven fact, the ability to create a gradient that stands the ability to backstop a brand is suddenly a possibility. Instead of being a <strong><em>Gradient God</em></strong>, just hop over here and do a little gradient-generating cheating.</p>

                    <p className="lead">You can still tell your boss and friends you came up with it. Who cares? Not me! Let's get you that raise you deserve.</p>
                </div>
                <div className="goo">
                    <div className="step"></div>
                </div>
            </div>

            <div className="footer">
                <a href="/">
                    <img src={logo} alt="footer logo" />
                </a>

                <p>
                    A solution by <a
                        href="https://twitter.com/nftchance/"
                        target="_blank"
                        rel="noreferrer">CHANCE</a>.
                </p>
            </div>
        </div>
    );
}

export default Home;
