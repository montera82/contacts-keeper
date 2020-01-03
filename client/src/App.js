import React, {Fragment} from 'react';
import './App.css';
import Navbar from "./components/layout/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import RegisterUser from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/alerts";
import setTokenGlobally from './utils/setTokenGlobal';
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.getItem('token')) {
	setTokenGlobally(localStorage.getItem('token'));
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar/>
							<div className="container">
								<Alerts/>
								<Switch>
									<PrivateRoute exact path='/' component={Home}/>
									<Route exact path='/about' component={About}/>
									<Route exact path='/register' component={RegisterUser}/>
									<Route exact path='/login' component={Login}/>
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
}

export default App;
