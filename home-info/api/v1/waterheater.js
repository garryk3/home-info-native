import express from 'express';

import idx from '../helpers/idx';
import { getDeviceStatus, toggleDeviceStatus } from './../helpers/deviceRequests';

const router = express.Router();

export default () => {
	router.route('/')
		.get((req, res) => {
			getDeviceStatus(req, res, idx.waterheater)
		});

	router.route('/toggleSwitch')
		.post((req, res) => {
			toggleDeviceStatus(req, res, idx.waterheater)
		});
	return router
}