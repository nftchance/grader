import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import logo from "./logo.png"

import Cube from "./Cube";

import './App.css';

library.add(fab)

function App() {
	const [theme, setTheme] = useState('light')

	const defaultGradient = [
		{color: '#ffffff', visible: true},
		{color: '#000000', visible: true}
	];

	const [colorMode, setColorMode] = useState('RGB')
	const [viewMode, setViewMode] = useState('Colors');

	const [colors, setColors] = useState(defaultGradient);

	const [score, setScore] = useState(0);
	const [best, setBest] = useState(score);

	const [code, setCode] = useState(null);

	const handleColorAddition = (e) => { 
		e.preventDefault();
		setColors([
			...colors,
			{color: '#000000', visible: true}
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

		console.log(_colors)

		setColors(_colors)
	}

	useEffect(() => {
		if (score > best) setBest(score);
	}, [score])

	return (
		<>
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
						<Cube colors={colors} />
					</div>
					<div className="step input">
						<h3>INPUT</h3>

						<label>COLOR ENTRY MODE</label>
						<div className="option-toggle">
							<div 
								className={colorMode === 'RGB' ? "active" : ""}
							>RGB</div>
							<div 
								className={colorMode === 'HSL' ? "active" : ""}
							>HSL</div>
						</div>	

						<label>COLORS</label>
						<div className="colors">
							{colors.map((color, idx) => { 
								return <div
									key={`color:${idx}`}
									className="option-toggle"
								>
									<div>
										<span>
											<TextField
												defaultValue={`${color.color}`}
												sx={{ input: { 
													color: 'white',
													padding: 0,
													outline: 'none',
													borer: 'none', 
													boxShadow: 'none'
												} }}
												onChange={(e) => { 
													handleColorChange(e, idx)
												}}
											/>
										</span>
									</div>
									<div>
									</div>
								</div>
							})}
						</div>

						<p style={{
							marginBottom: 20
						}}><a
						 	href="#"
							onClick={handleColorAddition}
						>
							Add Color
						</a> <a
						 	href="#"
							onClick={handleColorClear}
						>
							Clear
						</a></p>

						<label>CUBE VIEW</label>
						<div className="option-toggle">
							<div 
								className={viewMode === 'Colors' ? "active" : ""}
							>Colors</div>
							<div 
								className={viewMode === 'Spectrum' ? "active" : ""}
							>Spectrum</div>
						</div>	
					</div>
					<div className="step result">
						<h3>
							RESULT
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
		</>
	);
}

export default App;
