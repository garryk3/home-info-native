import express from 'express';
import axios from '../config/axios-server';

import idx from '../helpers/idx';

const router = express.Router();

export default () => {
	router.route('/')
		.get((req, res) => {
			const params = {
				type: 'device',
				rid: idx.waterheater
			};

			axios.get('/json.htm', { params })
				.then((response) => {
					console.log('ressssssss', response)
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
	return router
}