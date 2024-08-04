import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import MainLayout from "./layouts/MainLayout";

const App = () => (
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<MainLayout />}>
					<Route index element={<HomePage />} />
					{/* Define other routes here */}
				</Route>
			</Routes>
		</Router>
	</Provider>
);

export default App;
