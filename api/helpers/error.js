export default (res, error) => {
	console.log('err', error)
	res.statusCode = 500;
	res.send({
		message: `Ошибка обработки запроса: ${error.message}`
	});
	console.error(error);
}