import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/box/:id" exact component={Box} />
			<Route path="/" exact component={Main} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
