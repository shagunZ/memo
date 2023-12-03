const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Your API path, e.g., '/api' or any other relevant prefix
    createProxyMiddleware({
      target: 'https://nodejs-todoapp-r8sb.onrender.com/api/v1', // Your backend server URL
      changeOrigin: true,
    })
  );
};
