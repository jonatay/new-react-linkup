import { lazy } from 'react';
import { authRoles } from 'app/auth';

const LoginPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: { display: false },
				toolbar: { display: false },
				rightSidePanel: { display: false },
				leftSidePanel: { display: false },
				footer: { display: false }
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/login',
			component: lazy(() => import('./LoginPage'))
		}
	]
};

export default LoginPageConfig;
