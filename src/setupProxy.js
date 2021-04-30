const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		createProxyMiddleware('/api', {
			target: 'https://apiapiapi.run.goorm.io',
			changeOrigin: true
		})
	);
};