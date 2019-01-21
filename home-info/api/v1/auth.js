import express from 'express';
import axios from '../axios-server';

const router = express.Router();

export default () => {
	const admin = {
		user: 'test',
		password: 'test'
	};

	router.route('/')
		.post((req, res) => {
			const params = {
				type: 'command',
				param: 'getauth'
			};

			if(req.query) {
				axios.get('/json.htm', { params })
					.then((response) => {
						const info = response.data;

						if((response.status === 200) && info) {
							if(info.rights === 2 && info.status === 'OK') {
								res.send({
									code: 200,
									message: 'success'
								})
							} else {
								res.send({
									code: 500,
									message: `Авторизация не удалась, недостаточно прав (${info.rights}-${info.status}-${info.statusText}) `
								})
							}
						} else {
							res.send({
								code: 500,
								message: `Авторизация не удалась, ошибка сервера, статус: ${response.status}`
							})
						}
					})
					.catch((error) => {
						res.send({
							code: 500,
							message: `Ошибка обработки запроса: ${error.message}`
						});
						console.error(error);
					})
			}
		});

	return router;
}