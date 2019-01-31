export default (res, error) => {
	res.send({
		code: 500,
		message: `Ошибка обработки запроса: ${error.message}`
	});
	console.error(error);
}