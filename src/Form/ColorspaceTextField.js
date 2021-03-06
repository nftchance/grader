import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import { alpha, styled } from '@mui/material/styles';

import "./ColorspaceTextField.css";

const ColorspaceTextField = styled((props) => {
	const { colorspaceColor, onChange, ...textInputProps } = props;

	return (
		<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
			{/* Standard styled input for Colorspace */}
			<TextField
				InputProps={{ disableUnderline: true }}
				variant="filled"
				value={colorspaceColor ? colorspaceColor.color : ''}
				onChange={onChange}
				{...textInputProps}
			/>
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