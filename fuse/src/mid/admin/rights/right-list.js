import { FirebaseList } from '../../firebase';
import { rightActions } from './right-actions';
import { Right } from './right';

export const rightList = new FirebaseList(
	{
		onAdd: rightActions.createRightFulfilled,
		onChange: rightActions.updateRightFulfilled,
		onLoad: rightActions.loadRightsFulfilled,
		onRemove: rightActions.removeRightFulfilled
	},
	Right
);
