import axios from 'axios';
import config from './config';

const instance = axios.create({
	baseURL: config.domoticzUrl,
	timeout: config.timeouts.server,
	headers: {
		'Authorization': 'Basic Z2FycnlrMzpnYWdhcmExOTgy'
	}
});

export default instance;