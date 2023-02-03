import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'example-component',
				title: 'Example',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'whatshot',
				url: '/example'
			}
		]
	},
	{
		id: 'fleet',
		title: 'Fleet',
		translate: 'Fleet',
		type: 'group',
		icon: 'emoji_transportation',
		children: [
			{
				id: 'page-fleet-drivers',
				title: 'Drivers',
				translate: 'Drivers',
				type: 'item',
				icon: 'airline_seat_recline_normal',
				url: '/page-fleet-drivers'
			},
			{
				id: 'page-fleet-vehicles',
				title: 'Vehicles',
				translate: 'Vehicles',
				type: 'item',
				icon: 'directions_car',
				url: '/page-fleet-vehicles'
			},
			{
				id: 'page-fleet-transactions',
				title: 'Transactions',
				translate: 'Transactions',
				type: 'item',
				icon: 'local_gas_station',
				url: '/page-fleet-transactions'
			},
			{
				id: 'page-fleet-settings',
				title: 'Settings',
				translate: 'Settings',
				type: 'item',
				icon: 'settings_applications',
				url: '/page-fleet-settings'
			}
		]
	},
	{
		id: 'hr',
		title: 'HR',
		translate: 'HR',
		type: 'group',
		icon: 'group',
		children: [
			{
				id: 'page-employees',
				title: 'Employees',
				translate: 'Employees',
				type: 'item',
				icon: 'group',
				url: '/page-hr-employees'
			},
			{
				id: 'page-advances',
				title: 'Advances',
				translate: 'Advances',
				type: 'item',
				icon: 'account_balance_wallet',
				url: '/page-hr-advances'
			},
			{
				id: 'page-hr-leave',
				title: 'Leave',
				translate: 'Leave',
				type: 'item',
				icon: 'beach_access',
				url: '/page-hr-leave'
			},
			{
				id: 'page-hr-attendance',
				title: 'Attendance',
				translate: 'Attendance',
				type: 'item',
				icon: 'timer',
				url: '/page-hr-attendance'
			},
			{
				id: 'page-hr-shifts',
				title: 'Shifts',
				translate: 'Shifts',
				type: 'item',
				icon: 'event',
				url: '/page-hr-shifts'
			}
		]
	},
	{
		id: 'admin',
		title: 'Admin',
		translate: 'Admin',
		type: 'group',
		icon: 'admin_panel_settings',
		children: [
			{
				id: 'page-users',
				title: 'Users',
				translate: 'Users',
				type: 'item',
				icon: 'account_box',
				url: '/page-admin-users'
			},
			{
				id: 'page-rights',
				title: 'Rights',
				translate: 'Rights',
				type: 'item',
				icon: 'policy',
				url: '/page-admin-rights'
			}
		]
	}
];

export default navigationConfig;
