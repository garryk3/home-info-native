import express from 'express';
import qs from 'qs';

import axios from '../axios-server';

const router = express.Router();

export default () => {
	router.route('/')
		.post((req, res) => {
			const params = {
				type: 'command',
				param: 'logincheck',
				username: 'Z2FycnlrMw==',
				password: '63ce93b2b78e041d2869176e38ce8569',
				rememberme: false
			};

			if(req.query) {
				axios.post('/json.htm', qs.stringify(params))
					.then((res) => {
						res.send(res)
					})
					.catch((error) => {
						res.send(error.response.data);
						console.error(error);
					})
			}
		});

	return router;
}