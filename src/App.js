import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";
import DocumentsPage from "./pages/DocumentsPage";
import CareerGoalPage from "./pages/CareerGoalPage";
import SecurityPage from "./pages/SecurityPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";

const App = () => (
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/documents' element={<DocumentsPage />} />
					<Route path='/career-goal' element={<CareerGoalPage />} />
					<Route path='/security' element={<SecurityPage />} />
					<Route path='/settings' element={<SettingsPage />} />
				</Route>
			</Routes>
		</Router>
	</Provider>
);

export default App;
