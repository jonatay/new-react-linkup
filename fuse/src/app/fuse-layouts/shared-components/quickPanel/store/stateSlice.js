import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
	name: 'quickPanel/state',
	initialState: false,
	reducers: {
		// eslint-disable-next-line
		toggleQuickPanel: (state, action) => !state,
		// eslint-disable-next-line
		openQuickPanel: (state, action) => true,
		// eslint-disable-next-line
		closeQuickPanel: (state, action) => false
	}
});

export const { toggleQuickPanel, openQuickPanel, closeQuickPanel } = stateSlice.actions;

export default stateSlice.reducer;
