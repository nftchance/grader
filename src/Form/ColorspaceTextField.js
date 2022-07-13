import { useState } from 'react';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import { ChromePicker } from 'react-color';

import { alpha, styled } from '@mui/material/styles';

import "./ColorspaceTextField.css";

const ColorspaceTextField = styled((props) => {
	const { colorspaceColor, onChange, ...textInputProps } = props;

	const [displayColorPicker, setDisplayColorPicker] = useState(false);

	const handleDisplayColorPickerChange = (event) => {
		setDisplayColorPicker(!displayColorPicker)
	}

	const handleClose = (event) => {
		setDisplayColorPicker(false);
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
			<TextField
				InputProps={{ disableUnderline: true }}
				variant="filled"
				onChange={onChange}
				{...textInputProps}
			/>

			{/* Appends the display of a color to a text field with color picker control */}
			{colorspaceColor &&
				<>
					<div
						className="color-picker"
						onClick={handleDisplayColorPickerChange}
						style={{
							background: `${colorspaceColor.color}`,
							border: '1px solid #fff',
							borderLeft: 'none',
							height: 58,
							width: 58,
						}}
					/>

					{/* 'Click anywhere' closer */}
					{displayColorPicker ?
						<div style={{
							position: 'absolute',
							zIndex: 2,
						}}>
							{/* Color preview */}
							<div style={{
								position: 'fixed',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0
							}} onClick={handleClose} />

							{/* Color picker */}
							<ChromePicker
								triangle='top-right'
								color={colorspaceColor.color}
								onChange={(event) => onChange(
									{ target: { value: event.hex } }
								)}
							/>
						</div> : null
					}
				</>
			}
		</Box>
	)
})(({ theme }) => ({
	'&': {
		marginTop: 10,
		width: "100%",
		"& .MuiInputLabel-root": { color: 'white' },
		"& .MuiOutlinedInput-root": {
			"& > fieldset": { borderColor: "white" },
		}
	},
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
		}
	},
}));

export default ColorspaceTextField;