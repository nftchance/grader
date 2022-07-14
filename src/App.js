import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import loadable from "@loadable/component";

import './App.css';

const LoadableOpenGraph = loadable(() => import("./OpenGraph/OpenGraph"), { fallback: "Loading..." })
const LoadableHome = loadable(() => import("./Home/Home"), { fallback: "Loading..." })

const theme = createTheme({
	palette: {
		primary: { main: "#fff" },
		secondary: { main: "#fff" }
	},
	shape: { borderRadius: 0 }
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path="opengraph/" element={<LoadableOpenGraph />} />
					<Route exact path="/" element={<LoadableHome />} />
				</Routes>
			</Router>
		</ThemeProvider >
	);
}

export default App;
