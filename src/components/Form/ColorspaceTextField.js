import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import { alpha, styled } from '@mui/material/styles';

import ColorspaceColorpickerBox from "@components/Form/ColorspaceColorpickerBox";

import "./ColorspaceTextField.css";

const ColorspaceTextField = styled((props) => {
	const { colorspaceColor, colorIndex, onChange, ...textInputProps } = props;

	return (
		<>
			{/* Standard styled input for Colorspace */}
			<TextField
				InputProps={{ disableUnderline: true }}
				variant="filled"
				value={colorspaceColor ? colorspaceColor.color : ''}
				onChange={onChange}
				{...textInputProps}
			/>
		</>
	)
})(({ theme }) => ({
	'&': {
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
	'&.color .MuiFilledInput-root': { 
		borderRight: "none"
	}
}));

export default ColorspaceTextField;