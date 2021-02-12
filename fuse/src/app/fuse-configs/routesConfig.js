import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';

const routeConfigs = [...pagesConfigs, ExampleConfig, LogoutConfig, LoginConfig, RegisterConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/example" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
