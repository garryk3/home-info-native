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
	}

	setHeader(key, value) {
		this.headers.set(key, value);
	}

	request(method, url, params) {
		const config = params ? {...this.params, ...params} : this.params;
		const requestURL = url.startsWith('http') ? url : `${this.baseURL}/${url}`;

		config.method = method.toUpperCase();

		return fetch(requestURL, config).then((res) => {
			return res.json().then((json) => {
				if(res.ok) {
					return {
						result: json,
						error: null
					}
				} else {
					return {
						result: null,
						error: json
					}
				}
			})
		}).catch((error) => {
			return {
				result: null,
				error
			}
		})
	}
}