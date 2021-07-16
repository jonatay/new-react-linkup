import { firebaseDb } from './firebase';

export class FirebaseAclData {
	constructor(actions) {
		this._actions = actions;
	}

	subscribe(emit) {
		const ref = firebaseDb.ref('acl/');
		let initialized = false;
		let data = {};

		ref.once('value', () => {
			initialized = true;
			emit(this._actions.onLoad(data));
		});

		ref.on('child_added', snapshot => {
			if (initialized) {
				emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
			} else {
				// list.push(this.unwrapSnapshot(snapshot));
				const newData = this.unwrapSnapshot(snapshot);
				data = { ...data, ...newData };
			}
		});

		ref.on('child_changed', snapshot => {
			emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
		});

		ref.on('child_removed', snapshot => {
			emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
		});

		return () => ref.off();
	}

	// eslint-disable-next-line class-methods-use-this
	unwrapSnapshot(snapshot) {
		return { [snapshot.key]: snapshot.val() };
	}
}

// console.log(snapshot.val())
// let attrs = snapshot.val();
// attrs.key = snapshot.key;
// return new this._modelClass(attrs);
