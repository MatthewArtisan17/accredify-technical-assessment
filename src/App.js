import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/MainLayout";

const App = () => (
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</Router>
	</Provider>
);

export default App;
