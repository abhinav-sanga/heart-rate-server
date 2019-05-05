const express = require('express');
const router = express.Router();
const request = require('request');

const AWS = require("aws-sdk");
const config = require('../config/config.js');
const isProd = process.env.NODE_ENV == 'production';

var dynamodb = new AWS.DynamoDB(config.aws_local_config);
var docClient = new AWS.DynamoDB.DocumentClient(config.aws_local_config);


router.get('/', function(req,res,next){
	// if (isProd) {
	// 	AWS.config.update(config.aws_remote_config);
	// } else {
		AWS.config.update(config.aws_local_config);
	// }

	dynamodb.listTables({Limit: 100}, function(err, data) {
		if (err) {
			console.error("Unable to get tables. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			var isTablePresent = false;
			var tablenamefunc = function(){
				return config.aws_table_name;
			}
			if(data.TableNames.find(tablenamefunc) == config.aws_table_name ){
				isTablePresent = true;
			}
			else {
				request.post({
					url: 'http://192.168.99.100:8085/api/create-table',
					json: true
				},function(err,response,body){
					if (err) {
						console.log("error creating table: ",err);
					} else {
						console.log("New Table Created");
					}
				});
			}
		}
	});
});


router.post('/create-table', function(req,res,next) {

	var params = {
		TableName : "RandomNumbers",
		KeySchema: [       
        	{ AttributeName: "ID", KeyType: "HASH"},  //Partition key
        	{ AttributeName: "randomNumber", KeyType: "RANGE" }  //Sort key
        	],
        	AttributeDefinitions: [       
        	{ AttributeName: "ID", AttributeType: "S" },
        	{ AttributeName: "randomNumber", AttributeType: "N" }
        	],
        	ProvisionedThroughput: {       
        		ReadCapacityUnits: 10, 
        		WriteCapacityUnits: 10
        	}
        };
        dynamodb.createTable(params, function(err, data) {
        	if (err) {
        		console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        	} else {
        		console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        	}
        });
    });


router.post('/', function(req,res,next) {
	// if (isProd) {
	// 	AWS.config.update(config.aws_remote_config);
	// } else {
		AWS.config.update(config.aws_local_config);
	// }
	
	var numId = generateId(5);
	const params = {
		TableName: config.aws_table_name,
		Item: {
			"ID": numId,
			"randomNumber": req.body.randNumber
		},
		ReturnValues: 'ALL_OLD'
	};
	docClient.put(params, function(err, data) {
		if (err) {
			console.log(err);
			res.send({
				success: false,
				message: 'Error: Server error'
			});
		} else {
			console.log('data: ', data);
			res.send({
				success: true,
				message: 'Added Number'
			});
		}
	});
});


// to create a unique id
function generateId(len) {
	var result           = '';
	var chars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charsLength = chars.length;
	for ( var i = 0; i < len; i++ ) {
		result += chars.charAt(Math.floor(Math.random() * charsLength));
	}
	return result;
}

module.exports = router;
