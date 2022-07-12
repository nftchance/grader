import { useEffect, useState } from 'react';

import logo from "./images/logo.png"

import TextField from '@mui/material/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { alpha, styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Cube from "./Cube";

import './App.css';

library.add(fab)

const RedditTextField = styled((props) => (
	<TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
	'& .MuiFilledInput-root': {
		border: `1px solid ${theme.palette.primary.main}`,
		overflow: 'hidden',
		borderRadius: 0,
		color: theme.palette.primary.main,
		backgroundColor: '#000',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow',
		]),
		'&:hover': {
			backgroundColor: 'transparent',
		},
		'&.Mui-focused': {
			backgroundColor: 'transparent',
			boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
			borderColor: theme.palette.primary.main,
		},
	},
}));

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			secondary: {
				main: "#fff",
			},
		},
	});

	const defaultGradient = [
		{ color: '#ffffff', visible: true },
		{ color: '#000000', visible: true }
	];

	const colorsModes = [
		'RGB',
		'HSL',
		'HSV',
		'HCL',
		'LAB',
	];

	const [colorMode, setColorMode] = useState(colorsModes[0])
	const [colors, setColors] = useState(defaultGradient);
	const [points, setPoints] = useState(0) // points of seperation

	const [gradientColorMode, setGradientColorMode] = useState(colorsModes[0])

	const [score, setScore] = useState(0);
	const [best, setBest] = useState(score);

	const [code, setCode] = useState(null);

	const stringGradient = () => {
		const colorStrings = colors.map(color => {
			return `${color.color}`
		});

		return `
			linear-gradient(
				90deg,
				${colorStrings} 
			)
		`;
	}

	const handleColorAddition = (e) => {
		e.preventDefault();
		setColors([
			...colors,
			{ color: '#000000', visible: true }
		])
	}

	const handleColorClear = (e) => {
		e.preventDefault();
		setColors(defaultGradient)
	}

	const handleColorChange = (e, colorId) => {
		const _colors = colors.map((color, idx) => {
			return idx != colorId ? color : {
				color: e.target.value,
				visible: color.visible
			}
		})

		setColors(_colors)

		// TODO: Grade the gradient
	}

	useEffect(() => {
		if (score > best) setBest(score);
	}, [score])

	return (
		<>
			<ThemeProvider theme={theme}>
				<div className="container">
					<div className="navbar">
						<a href="/">
							<img src={logo} />
						</a>

						<div className={`theme-controls ${theme}`}>
						</div>
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
							<div className="option-toggle">
								<div
									className={colorMode === 'RGB' ? "active" : ""}
									onClick={() => { setColorMode('RGB') }}
								>RGB</div>
								<div
									className={colorMode === 'HSL' ? "active" : ""}
									onClick={() => { setColorMode('HSL') }}
								>HSL</div>
							</div>

							<div className="points">
							<RedditTextField
								label="Reddit"
								defaultValue="react-reddit"
								id="reddit-input"
								variant="filled"
								style={{ marginTop: 11 }}
							/>
								{/* <TextField
									// defaultValue={`${color.color}`}
									label={`Points`}
									variant="outlined"
									sx={{
										input: {
											color: 'white',
										},
										"& .MuiInputLabel-root": { color: 'white' },//styles the label
										"& .MuiOutlinedInput-root": {
											"& > fieldset": { borderColor: "white" },
										},
										'&:hover fieldset': {
											borderColor: 'yellow',
										},
									}}
									onChange={(e) => {
										// handleColorChange(e, idx)
									}}
								/> */}
							</div>

							<div className="colors">
								{colors.map((color, idx) => {
									return <div
										key={`color:${idx}`}
										className="option-toggle color"
									>
										<div>
											<span>
												<TextField
													defaultValue={`${color.color}`}
													label={`Color #${idx + 1}`}
													variant="outlined"
													sx={{
														input: {
															color: 'white',
															padding: '10px 15px',
															width: '100%',
															borderRadius: 14
														},
														"& .MuiInputLabel-root": { color: 'white' },//styles the label
														"& .MuiOutlinedInput-root": {
															"& > fieldset": { borderColor: "white", paddingRight: 15, borderRadius: 14 },
														},
													}}
													onChange={(e) => {
														handleColorChange(e, idx)
													}}
												/>
											</span>
										</div>
									</div>
								})}
							</div>

							<p style={{
								marginBottom: 20
							}}>
								<a
									href="#"
									onClick={handleColorAddition}
								>
									Add Color
								</a>
								<a
									href="#"
									onClick={handleColorClear}
									style={{
										float: "right",
										color: "red"
									}}
								>
									Clear
								</a></p>
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
						<div className="step code">
							<h3>CODE</h3>
							<code>
								{code}
							</code>
						</div>

						<div className="color-mode">
							{colorsModes.map(((colorModeOption, idx) => (
								<div
									key={`gradientColorMode:${idx}`}
									className={gradientColorMode === colorModeOption ? 'step active' : 'step'}
									onClick={() => { setGradientColorMode(colorModeOption) }}
								>
									{colorModeOption}
								</div>
							)))}
						</div>

						<div
							className="step gradient"
							style={{
								background: stringGradient()
							}}
						>

						</div>
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
		</>
	);
}

export default App;
