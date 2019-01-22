import express from 'express';
import axios from '../config/axios-server';

const router = express.Router();

const admin = {
	user: 'test',
	password: 'test'
};

export default () => {
	router.route('/')
		.post((req, res) => {
			const testRequestData = {
				name: 'test',
				password: 'test'
			};

			if(testRequestData.name === admin.name && testRequestData.password === admin.password) {
				const params = {
					type: 'command',
					param: 'getauth'
				};

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
									code: 401,
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
			} else {
				res.send({
					code: 401,
					message: `Авторизация не удалась, некорректные данные пользователя`
				})
			}
		});

	return router;
}