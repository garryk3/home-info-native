import express from 'express';

import { getDeviceStatus, toggleDeviceStatus } from './../helpers/deviceRequests';
import idx from "../helpers/idx";
import makeError from "./../error";

const router = express.Router();

const lightDevicesIdx = Object.values(idx.light);


export default () => {
	router.route('/')
		.get((req, res) => {
			const lightDeviceInfoRequests = lightDevicesIdx.map((idx) => {
				return getDeviceStatus(req, res, idx, true);
			});

			Promise.all(lightDeviceInfoRequests)
				.then((info) => {
					res.send({
						code: 200,
						info
					});
				})
				.catch((error) => {
					makeError(res, error)
				})
		});

	router.route('/:idx')
		.post((req, res) => {
			const idx = req.params.idx;

			toggleDeviceStatus(req, res, idx)
		});

	router.route('/switchAll')
		.post((req, res) => {
			const lightDeviceSwitchRequests = lightDevicesIdx.map((idx) => {
				return toggleDeviceStatus(req, res, idx, true);
			});

			Promise.all(lightDeviceSwitchRequests)
				.then((info) => {
					console.log('infog', info)
					res.send({
						code: 200,
						info
					});
				})
				.catch((error) => {
					makeError(res, error)
				})
		});

	return router;
}