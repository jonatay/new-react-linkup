import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
	name: 'navbar',
	initialState: {
		open: true,
		mobileOpen: false
	},
	reducers: {
		// eslint-disable-next-line
		navbarToggleFolded: (state, action) => {
			state.foldedOpen = !state.foldedOpen;
		},
		// eslint-disable-next-line
		navbarOpenFolded: (state, action) => {
			state.foldedOpen = true;
		},
		// eslint-disable-next-line
		navbarCloseFolded: (state, action) => {
			state.foldedOpen = false;
		},
		// eslint-disable-next-line
		navbarToggleMobile: (state, action) => {
			state.mobileOpen = !state.mobileOpen;
		},
		// eslint-disable-next-line
		navbarOpenMobile: (state, action) => {
			state.mobileOpen = true;
		},
		// eslint-disable-next-line
		navbarCloseMobile: (state, action) => {
			state.mobileOpen = false;
		},
		// eslint-disable-next-line
		navbarClose: (state, action) => {
			state.open = false;
		},
		// eslint-disable-next-line
		navbarOpen: (state, action) => {
			state.open = true;
		},
		// eslint-disable-next-line
		navbarToggle: (state, action) => {
			state.open = !state.open;
		}
	}
});

export const {
	navbarToggleFolded,
	navbarOpenFolded,
	navbarCloseFolded,
	navbarOpen,
	navbarClose,
	navbarToggle,
	navbarOpenMobile,
	navbarCloseMobile,
	navbarToggleMobile
} = navbarSlice.actions;

export default navbarSlice.reducer;
