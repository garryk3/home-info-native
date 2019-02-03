import express from 'express';

const router = express.Router();

export default () => {
	router.route('/')
		.get((req, res) => {
			res.send({
				message: 'Вы авторизованы'
			})
		});

	return router;
}