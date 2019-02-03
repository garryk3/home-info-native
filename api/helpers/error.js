export default (res, error) => {
	res.statusCode = 500;
	res.send({
		message: `Ошибка обработки запроса: ${error.message}`
	});
	console.error(error);
}