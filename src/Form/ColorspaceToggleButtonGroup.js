import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { alpha, styled } from '@mui/material/styles';

const ColorspaceToggleButtonGroup = styled((props) => {
    const { values } = props;

    return <ToggleButtonGroup
        {...props}
    >
        {values.map(value => (
            <ToggleButton
                key={`toggle-button-${value}`}
                value={value}
                aria-label={value}
            >
                {value}
            </ToggleButton>
        ))}
    </ToggleButtonGroup>
})(({ theme }) => ({
    '&': { 
        width: "100%",
    },
    '& .MuiToggleButtonGroup-grouped': {
        marginTop: 10,
        border: `1px solid ${theme.palette.primary.main}`,
        borderColor: "#fff",
        color: theme.palette.primary.main,
        transition: theme.transitions.create([
			'color',
			'background-color',
		]),
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        }
    },
    '& > button': { 
        fontWeight: 900,
        margin: 0,
        width: "100%",
        "&:hover": {
            color: "rgba(255, 255, 255)",
            backgroundColor: "rgba(255, 255, 255, .05)"
        },
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "rgba(0, 0, 0)",
            backgroundColor: "rgba(255, 255, 255)"
        }
    }
}));

export default ColorspaceToggleButtonGroup;