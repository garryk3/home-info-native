import axios from "./../config/axios-server";
import makeError from "./../error";

const getDeviceStatus = (req, res, idx, noResponse) => {
	const params = {
		type: 'devices',
		rid: idx
	};

	return axios.get('/json.htm', { params })
		.then((response) => {
			const data = response.data;
			const { Data, Name, Status, Timers, LastUpdate } = data.result[0];
			const formattedData = {
				code: 200,
				status: data.status,
				response: {
					data: Data,
					name: Name,
					status: Status,
					timers: Timers,
					lastupdate: LastUpdate
				}
			};

			if(data) {
				if(!noResponse) {
					res.send(formattedData)
				} else {
					return formattedData
				}
			} else {
				makeError(res, { message: `Произошла ошибка получения данных устройства ${Name}` })
			}

		})
		.catch((error) => {
			makeError(res, error)
		})
};

const toggleDeviceStatus = (req, res, idx, noResponse) => {
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
		idx: idx,
		switchcmd: type
	};

	return axios.get('/json.htm', { params })
		.then((response) => {
			if(!noResponse) {
				console.log('1!!!!!!!!!!!', response.data, noResponse)

				res.send({
					code: 200,
					response: response.data
				})
			} else {
				console.log('!!!!!!', response.data)
				return response.data
			}
		})
		.catch((error) => {
			console.log('!!!!!!!error', error)
			makeError(res, error)
		})
};

export {
	getDeviceStatus,
	toggleDeviceStatus
}