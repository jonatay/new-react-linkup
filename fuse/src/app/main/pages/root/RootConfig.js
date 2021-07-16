import { lazy } from 'react';
import { authRoles } from 'app/auth';

const RootConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/',
			exact: true,
			component: lazy(() => import('./Root')),
			auth: authRoles.user
		}
	]
};

export default RootConfig;
