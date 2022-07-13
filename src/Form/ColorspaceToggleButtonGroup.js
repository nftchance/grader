import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { alpha, styled } from '@mui/material/styles';

const ColorspaceToggleButtonGroup = styled((props) => {
    const { values } = props;

    return <ToggleButtonGroup
        {...props}
        sx={{
            width: "100%"
        }}
    >
        {values.map(value => (
            <ToggleButton
                key={`toggle-button-${value}`}
                value={value}
                aria-label={value}
                sx={{
                    width: "100%",
                    margin: 0
                }}
            >
                {value}
            </ToggleButton>
        ))}
    </ToggleButtonGroup>
})(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        marginTop: 10,
        // background: 'red',
        // border: `1px solid ${theme.palette.primary.main}`,
        borderColor: "#fff",
        color: theme.palette.primary.main,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
    // .MuiButton-label { /* … */ }
    // .MuiButton-outlined { /* … */ }
    // .MuiButton-outlined.Mui-disabled { /* … */ }
    // .MuiButton-outlinedPrimary: { /* … */ }
    // .MuiButton-outlinedPrimary:hover { /* … */ }
    // '& .MuiFilledInput-root': {
    //     border: `1px solid ${theme.palette.primary.main}`,
    //     overflow: 'hidden',
    //     borderRadius: 0,
    //     color: theme.palette.primary.main,
    //     backgroundColor: '#000',
    //     transition: theme.transitions.create([
    //         'border-color',
    //         'background-color',
    //         'box-shadow',
    //     ]),
    //     '&:hover': {
    //         backgroundColor: 'transparent',
    //     },
    //     '&.Mui-focused': {
    //         backgroundColor: 'transparent',
    //         boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    //         borderColor: theme.palette.primary.main,
    //     }
    // },
}));

export default ColorspaceToggleButtonGroup;