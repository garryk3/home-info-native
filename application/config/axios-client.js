import axios from 'axios';
import config from './config';

const instance = axios.create({
	baseURL: `${config.baseURL}/api/v1`,
	timeout: config.timeouts.client

});

export default instance;