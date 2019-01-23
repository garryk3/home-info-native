import express from 'express';
import axios from '../config/axios-server';

import makeError from '../error';

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
					res.send({
						code: 200,
						response: response.data
					})
				})
				.catch((error) => {
					makeError(res, error);
				})
		});

	router.route('/getlog')
		.post((req, res) => {
			/**LOGLEVEL 1 = normal
			2 = status
			4 = error
			268435455 = all

			 LASTLOGTIME  starting with logmessages in LASTLOGTIME seconds since last epoch ( 0 = all available)
			 */
			const type = req.body.params && req.body.params.type || 4;
			const logtime = 0;
			/**
			 *
			 * @type {{param: string, loglevel: (*|number), type: string, laslogtime: number}}
			 */
			const params = {
				type: 'command',
				param: 'getlog',
				laslogtime: logtime,
				loglevel: type
			};

			axios.get('/json.htm', { params })
				.then((response) => {
					res.send({
						code: 200,
						response: response.data
					})
				})
				.catch((error) => {
					makeError(res, error);
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