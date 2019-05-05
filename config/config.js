module.exports = {
	aws_table_name: 'RandomNumbers',
	aws_local_config: {
		accessKeyId: 'avantari',
		secretAccessKey: 'frontend',
		endpoint: 'http://192.168.99.100:8000',
		region:'us-east-2'
	},
	aws_remote_config: {
		region: 'us-east-2',
		accessKeyId: 'YOUR_ACCESS_KEY_ID',
		secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
	}
};