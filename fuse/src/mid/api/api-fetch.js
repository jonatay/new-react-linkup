export const statusHelper = response => {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	}
	return Promise.reject(new Error(response.statusText));
};

export const apiFetch = (path, token, params) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'json');
	myHeaders.append('Authorization', `Bearer ${token}`);
	const myInit = {
		method: 'GET',
		headers: myHeaders,
		cache: 'default',
		accept: 'application/json'
	};
	const query = params ? `/${encodeURIComponent(JSON.stringify(params))}` : '';
	return fetch(`/api/${path}${query}`, myInit);
};

export const apiRemove = (path, key, token) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'json');
	myHeaders.append('Authorization', `Bearer ${token}`);
	const myInit = {
		method: 'DELETE',
		headers: myHeaders,
		accept: 'application/json'
	};
	return fetch(`/api/${path}/${key}`, myInit);
};

export const apiInsert = (path, value, token) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', `Bearer ${token}`);
	const myInit = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(value),
		accept: 'application/json'
	};
	return fetch(`/api/${path}`, myInit);
};

export const apiUpdate = (path, key, changes, token) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', `Bearer ${token}`);
	const myInit = {
		method: 'PUT',
		headers: myHeaders,
		body: JSON.stringify(changes),
		accept: 'application/json'
	};
	return fetch(`/api/${path}/${key}`, myInit);
};

export const apiCustom = (path, key, action, data, method, token) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', `Bearer ${token}`);
	const myInit = {
		method,
		headers: myHeaders,
		body: JSON.stringify(data),
		accept: 'application/json'
	};
	return fetch(`/api/${path}${key === null ? '' : `/${key}`}/${action}`, myInit);
};

export const apiPdf = (path, action, params, token) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'blob');
	myHeaders.append('Authorization', `Bearer ${token}`);
	const myInit = {
		method: 'GET',
		headers: myHeaders,
		// body: JSON.stringify(params),
		accept: 'blob'
	};
	const query = params ? `/${encodeURIComponent(JSON.stringify(params))}` : '';

	return fetch(`/api/${path}/${action}${query}`, myInit);
};
