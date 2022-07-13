import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import chroma from "chroma-js"

import logo from "./images/logo.png"

import Cube from "./Three/Cube";
import ColorspaceTextField from './Form/ColorspaceTextField';
import ColorspaceToggleButtonGroup from './Form/ColorspaceToggleButtonGroup';

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
		{ color: '#ffffff', visible: true },
		{ color: '#000000', visible: true }
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

	const [score, setScore] = useState(0);
	const [best, setBest] = useState(score);

	const [code, setCode] = useState(null);

	const chromaGradient = (gradientColors) => {
		return chroma.scale(gradientColors).mode(gradientColorMode.toLowerCase()).colors(points)
	}

	const stringGradient = (gradientColors) => {
		try {
			const chromaColors = chromaGradient(
				gradientColors.map((color, colordx) => (color.color))
			);

			const chromaGradientString = `
				linear-gradient(
					90deg,
					${chromaColors} 
				)
			`;

			setActiveGradient(chromaGradientString)
		} catch (e) {
			console.log('Failed to update:', e)
		}
	}

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
		setColors([
			...colors,
			{ color: '#000000', visible: true }
		])
	}

	const handleColorClear = (event) => {
		event.preventDefault();
		setColors(defaultGradient)
	}

	const handleColorChange = (e, colorId) => {
		const _colors = colors.map((color, idx) => (
			idx != colorId ? color : {
				color: e.target.value,
				visible: color.visible
			}
		))

		setColors(_colors)
	}

	useEffect(() => {
		stringGradient(colors)
	}, [colors, gradientColorMode, points])

	useEffect(() => {
		if (score > best) setBest(score);
	}, [score])

	return (
		<ThemeProvider theme={theme}>
			<div className="container">
				<div className="navbar">
					<a href="/"><img src={logo} /></a>

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

						{colors.map((color, idx) => (
							<ColorspaceTextField
								key={`color:${idx}`}
								label={`Color #${idx + 1}`}
								defaultValue={`${color.color}`}
								id={`color-${idx}`}
								onChange={(e) => {
									handleColorChange(e, idx)
								}}
							/>
						))}

						<div style={{
							marginTop: 10
						}}>
							<a href="#" onClick={handleColorAddition}>Add Color</a>
							<a href="#" onClick={handleColorClear} style={{
								float: "right",
								color: "red"
							}}>
								Clear
							</a>
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
						<code>{code}</code>
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
					<div className="step gradient" style={{
						background: activeGradient
					}} />
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
						<img src={logo} />
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
