import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import chroma from "chroma-js"

import Cube from "./Three/Cube";
import Colorspace2DGradient from './Two/Colorspace2DGradient';
import ColorspaceTextField from './Form/ColorspaceTextField';
import ColorspaceToggleButtonGroup from './Form/ColorspaceToggleButtonGroup';
import ColorspaceColor from './Form/ColorspaceColor';
import CodeTheme from "./Code/ColorspaceCodeTheme";

import logo from "./images/logo.png"
import link from "./icons/link.png"
import shuffle from "./icons/shuffle.png";
import clipboard from "./icons/clipboard.png";
import twitter from "./icons/twitter.png";

import 'rc-slider/assets/index.css';
import './App.css';

const theme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		secondary: {
			main: "#fff",
		}
	},
	shape: {
		borderRadius: 0
	}
});

function App() {
	const defaultGradient = [
		{ color: '#ffffff', domain: 0, visible: true },
		{ color: '#000000', domain: 1, visible: true }
	];

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

	const pointsColorsFactor = 3;

	const [activeGradient, setActiveGradient] = useState(defaultGradient);
	const [colors, setColors] = useState(defaultGradient);
	const [points, setPoints] = useState(defaultGradient.length * pointsColorsFactor)

	const [colorMode, setColorMode] = useState(cubeColorModes[0])
	const [gradientColorMode, setGradientColorMode] = useState(colorsModes[0])
	const [degree, setDegree] = useState(0);

	const [score, setScore] = useState(0);
	const [best, setBest] = useState(score);

	const [code, setCode] = useState(null);

	const randomColor = () => {
		return chroma(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`).hex();
	}

	function fixedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16);
		});
	}

	const saveURL = () => {
		const urlColors = colors.map(color => color.color).join("&cs=")
		const urlDomains = colors.map(color => color.domain).join("&ds=")

		return fixedEncodeURIComponent(`${window.location.href.split("?")[0]}?cm=${colorMode}&gcm=${gradientColorMode}&cs=${urlColors}&ds=${urlDomains}&d=${degree}`)
	}

	const shareMessage = () => {
		return `I justed used @trycolorspace and made this ${score > 70 ? "perfect " : " "}pallete - whats your score ?%0A%0A${saveURL()}`
	}

	const handleColorModeChange = (event, newColorMode) => {
		if (newColorMode !== null) {
			setColorMode(newColorMode);
		}
	};

	const handleDegreeChange = (event) => {
		if (event.target.value == null) return

		if (event.target.value < 0 || event.target.value > 360) return

		setDegree(event.target.value);
	}

	const handlePointsChange = (event) => {
		if (event.target.value > colors.length * 10) return

		setPoints(event.target.value)
	}

	const handleColorAddition = (event) => {
		event.preventDefault();

		let overlapColors = [colors[0]]
		const joiningColors = [...colors.slice(1, colors.length - 1)]
		if (joiningColors)
			overlapColors = overlapColors.concat(joiningColors)

		const colorAddedColors = [
			...overlapColors,
			{
				color: '#000000',
				domain: (1 + colors[colors.length - 2].domain) / 2,
				visible: true
			},
			colors[colors.length - 1]
		]

		// if the default points value is being used, continue using it
		if (points === (colorAddedColors.length - 1) * pointsColorsFactor)
			setPoints(colorAddedColors.length * pointsColorsFactor)

		setColors(colorAddedColors)
	}

	const handleColorClear = (event) => {
		event.preventDefault();
		setColors(defaultGradient)
		setPoints(defaultGradient.length * pointsColorsFactor)
	}

	const handleColorChange = (e, colorId) => {
		const _colors = colors.map((color, idx) => (
			idx !== colorId ? color : {
				color: e.target.value,
				domain: color.domain,
				visible: color.visible
			}
		))

		setColors(_colors)
	}

	const handleDomainChange = (domains) => {
		// dont allow users to move the solo base anchors
		if (domains.length === 2) return

		// loop through all domains
		const domainedColors = colors.map((color, i) => {
			return {
				...color,
				domain: domains[i] / 100,
			}
		})

		setColors(domainedColors)
	}

	const handleSave = () => {
		console.log(saveURL())
	}

	const handleShuffle = () => {
		const shuffledColors = chroma.scale([
			randomColor(),
			randomColor(),
		]).colors(colors.length);

		setColors(colors.map((color, i) => ({
			...color,
			color: shuffledColors[i]
		})))
	}

	useEffect(() => {
		// scales it in certain mode
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

				const chromaGradientString = `linear-gradient(\n\t90deg,
						${chromaColors} 
					)
				`;

				setActiveGradient(chromaGradientString)
				setScore(75);
				setCode(chromaGradientCode(chromaColors))
			} catch (e) {
				console.log('Failed to update:', e)
			}
		}

		if (!colors.every(color => chroma.valid(color.color))) return

		chromaStringGradient(colors)
	}, [
		activeGradient,
		colors,
		gradientColorMode,
		points,
		degree
	])

	useEffect(() => {
		if (score > best) setBest(score);
	}, [score, best])

	return (
		<ThemeProvider theme={theme}>
			<div className="container">
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
								<CopyToClipboard text={saveURL()}>
									<Tooltip title="Copy Input Link">
										<Button>
											<img src={link} className="fa" alt="link icon" />
										</Button>
									</Tooltip>
								</CopyToClipboard>

								<Tooltip title="Shuffle">
									<Button onClick={handleShuffle}>
										<img src={shuffle} className="fa" alt="shuffle icon" />
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
						/>

						<div style={{
							marginTop: 10,
						}}>
							<Button
								style={{
									fontWeight: 900,
								}}
								onClick={handleColorAddition}
							>
								Add Color
							</Button>

							<Button
								onClick={handleColorClear}
								style={{
									float: "right",
									color: "red",
									fontWeight: 900
								}}
							>
								Clear
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
											<img src={twitter} className="fa" alt="twitter icon" />
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
								<CopyToClipboard text={code}>
									<Tooltip title="Copy Code">
										<Button>
											<img src={clipboard} className="fa" alt="clipboard icon" />
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
		</ThemeProvider >
	);
}

export default App;
