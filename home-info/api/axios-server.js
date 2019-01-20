import axios from 'axios';
import config from './config';

const instance = axios.create({
	baseURL: config.domoticzUrl,
	timeout: config.timeouts.server
});

export default instance;