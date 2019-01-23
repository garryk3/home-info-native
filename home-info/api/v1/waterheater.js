import express from 'express';
import axios from '../config/axios-server';

import idx from '../helpers/idx';
import makeError from '../error';

const router = express.Router();

export default () => {
	router.route('/')
		.get((req, res) => {
			const params = {
				type: 'devices',
				rid: idx.waterheater
			};

			axios.get('/json.htm', { params })
				.then((response) => {
					const data = response.data;
					const { Data, Name, Status, Timers, LastUpdate } = data.result[0];

					if(data) {
						res.send({
							code: 200,
							status: data.status,
							response: {
								data: Data,
								name: Name,
								status: Status,
								timers: Timers,
								lastupdate: LastUpdate
							}
						})
					} else {
						makeError(res, { message: 'Произошла ошибка' })
					}

				})
				.catch((error) => {
					makeError(res, error)
				})
		});

	router.route('/toggleSwitch')
		.post((req, res) => {
			const type = req.query.type;

			/**
			 *
			 * @type {
			 * {param: string,
			 * switchcmd: string('On'/'Off'),
			 * type: string,
			 * idx: number}}
			 */
			const params = {
				type: 'command',
				param: 'switchlight',
				idx: idx.waterheater,
				switchcmd: type
			};

			axios.get('/json.htm', { params })
				.then((response) => {
					res.send({
						code: 200,
						response: response.data
					})
				})
				.catch((error) => {
					makeError(res, error)
				})
		});
	return router
}