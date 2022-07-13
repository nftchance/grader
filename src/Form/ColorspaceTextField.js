import TextField from '@mui/material/TextField';

import { alpha, styled } from '@mui/material/styles';

const ColorspaceTextField = styled((props) => (
	<TextField 
		InputProps={{ disableUnderline: true }}
		{...props}
		variant="filled"
		style={{ 
			marginTop: 10,
			width: "100%"
		}} 
		sx={{
			"& .MuiInputLabel-root": { color: 'white' },
			"& .MuiOutlinedInput-root": {
				"& > fieldset": { borderColor: "white" },
			}
		}}
	/>
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
		}
	},
}));

export default ColorspaceTextField;