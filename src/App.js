import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";

const App = () => (
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</Router>
	</Provider>
);

export default App;
