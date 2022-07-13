import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import CodeTheme from "./Code/ColorspaceCodeTheme";


import chroma from "chroma-js"

import logo from "./images/logo.png"

import Cube from "./Three/Cube";
import Colorspace2DGradient from './Two/Colorspace2DGradient';
import ColorspaceTextField from './Form/ColorspaceTextField';
import ColorspaceToggleButtonGroup from './Form/ColorspaceToggleButtonGroup';
import ColorspaceColor from './Form/ColorspaceColor';

import 'rc-slider/assets/index.css';

import './App.css';

library.add(fab)

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
	const [points, setPoints] = useState(colors.length * pointsColorsFactor)

	const [colorMode, setColorMode] = useState(cubeColorModes[0])
	const [gradientColorMode, setGradientColorMode] = useState(colorsModes[0])
	const [degree, setDegree] = useState(0);

	const [score, setScore] = useState(0);
	const [best, setBest] = useState(score);

	const [code, setCode] = useState(null);

	const handleColorModeChange = (event, newColorMode) => {
		if (newColorMode !== null) {
			setColorMode(newColorMode);
		}
	};

	const handlePointsChange = (event) => {
		setPoints(event.target.value)
	}

	const handleColorAddition = (event) => {
		event.preventDefault();

		let overlapColors = [colors[0]]
		const joiningColors = [...colors.slice(1, colors.length - 1)]
		if (joiningColors)
			overlapColors = overlapColors.concat(joiningColors)

		console.log("DOMAIN TO SET", (1 + colors[colors.length - 2].domain) / 2)

		setColors([
			...overlapColors,
			{
				color: '#000000',
				domain: (1 + colors[colors.length - 2].domain) / 2,
				visible: true
			},
			colors[colors.length - 1]
		])
	}

	const handleColorClear = (event) => {
		event.preventDefault();
		setColors(defaultGradient)
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
		if (domains.length == 2) return

		// loop through all domains
		const domainedColors = colors.map((color, i) => {
			return {
				...color,
				domain: domains[i] / 100,
			}
		})

		setColors(domainedColors)
	}

	useEffect(() => {
		// scales it in certain mode
		const chromaGradient = (gradientColors, gradientDomains) => {
			console.log(gradientColors, gradientDomains)

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
						<h3>
							INPUT
							<span style={{ float: "right" }}>
								<i className="fa fa-shuffle"></i>
								<FontAwesomeIcon icon={['fab', 'twitter']} style={{
									marginLeft: 15
								}} />
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
							defaultValue={points}
							aria-label="color scale points of separation"
							id="points-of-separation"
							type="number"
							onChange={handlePointsChange}
						/>

						<ColorspaceTextField
							label="Angle"
							defaultValue={degree}
							aria-label="angle of rotation on gradient"
							id="degree"
							type="number"
							onChange={(event) => { setDegree(event.target.value); }}
						/>

						<ColorspaceColor
							colors={colors}
							handleColorChange={handleColorChange}
						/>

						<div style={{
							marginTop: 10
						}}>
							<Button
								onClick={handleColorAddition}
							>
								Add Color
							</Button>

							<Button
								onClick={handleColorClear}
								style={{
									float: "right",
									color: "red"
								}}
							>
								Clear
							</Button>
						</div>
					</div>

					<div className="step result">
						<h3>
							SCORE
							<span style={{ float: "right" }}>
								<FontAwesomeIcon icon={['fab', 'twitter']} />
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
						<h3>CODE</h3>
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
		</ThemeProvider>
	);
}

export default App;
