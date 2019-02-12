import base64 from 'base-64';

import config from './config/config';

export default class Transport {
	constructor() {
		this.baseURL = `${config.baseURL}/api/v1`;
		this.headers = new Headers({
			"Content-Type": "text/plain",
		});
		this.params = {
			headers: this.headers,
			mode: 'no-cors',
			credentials: 'include'
		}
		//this.setAuthHeader = this.setAuthHeader.bind(this)
	}

	setHeader(key, value) {
		this.headers.set(key, value);
	}

	setAuthHeader(user) {
		this.setHeader("Authorization", `Basic ${base64.encode(`${user.name}:${user.password}`)}`)
	}

	async request(method, url, params) {
		const config = params ? {...this.params, ...params} : this.params;
		const requestURL = url.startsWith('http') ? url : `${this.baseURL}/${url}`;

		config.method = method.toUpperCase();

		try {
			const res = await fetch(requestURL, config);
			const json = await res.json();
			
			if (res.ok) {
				return {
					result: json,
					error: null
				};
			}
			else {
				return {
					result: null,
					error: json
				};
			}
		}
		catch (error) {
			return {
				result: null,
				error
			};
		}
	}
}