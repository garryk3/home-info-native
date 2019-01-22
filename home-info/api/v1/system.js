import express from 'express';
import axios from '../config/axios-server';

import json from 'circular-json';

const router = express.Router();

export default () => {
	router.route('/')
		.get((req, res) => {
			res.send('success')
		});

	router.route('/getversion')
		.get((req, res) => {
			const params = {
				type: 'command',
				param: 'getversion'
			};

			axios.get('/json.htm', { params })
				.then((response) => {
					console.log('!!!!!', response)

					res.send({
						code: 200,
						response: response.data
					})
				})
				.catch((error) => {
					res.send({
						code: 500,
						message: `Ошибка обработки запроса: ${error.message}`
					});
					console.error(error);
				})
		});

	router.route('/reboot')
		.get((req, res) => {
			const params = {
				type: 'command',
				param: 'system_reboot'
			};

			axios.get('/json.htm', { params });
			res.send({
				code: 200,
				message: 'success'
			})
		});

	return router
}