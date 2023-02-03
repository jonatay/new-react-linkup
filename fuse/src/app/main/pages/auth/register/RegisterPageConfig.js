import { lazy } from 'react';
import { authRoles } from 'app/auth';

const RegisterPageConfig = {
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
	routes: [
		{
			path: '/pages/auth/register',
			component: lazy(() => import('./RegisterPage')),
			auth: authRoles.onlyGuest
		}
	]
};

export default RegisterPageConfig;
