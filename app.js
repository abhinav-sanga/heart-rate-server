const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Middleware
app.use(bodyParser.json());
app.use(cors());

const index = require('./routes/index');

app.use('/api', index);


let timerId = null,
sockets = new Set();

io.on('connection', socket => {
	sockets.add(socket);

	socket.on('end', () => {
		socket.disconnect();
	})

	socket.on('disconnect', () => {
		console.log(`Deleting client: ${socket.id}`);
		sockets.delete(socket);
		console.log(`Remaining clients: ${sockets.size}`);
	});

	if(!timerId){
		timerId = setInterval(() => {
			if (!sockets.size) {
				clearInterval(timerId);
				timerId = null;
				console.log(`Timer stopped`);
			} else {
				let value = Math.floor((Math.random()*10));
				request.get('http://192.168.99.100:8085/api', function(err,response,body){
					if (err) {
						console.log("error: ",err);
					} else {
						console.log({success: true,message: 'Table OK'});
						request.post({
							body: {
								randNumber: value 
							},
							url: 'http://192.168.99.100:8085/api',
							json: true
						}, function (error, response, body) {
							if (error) {
								console.log(error);
							}
							else {
								console.log("bodyy: ", body);

							}
						});
					}
				});

				for (const s of sockets) {
					console.log(`Emitting value: ${value}`);
					s.emit('data', { data: value });
				}
			}

		}, 2000);
	}

});


const port = process.env.PORT || 9001;

server.listen(port, () => console.log(`Server started on port ${port}`));