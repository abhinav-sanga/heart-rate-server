# HeartRateServer

## Installation 

1. Clone the repo to your local machine and in the project root directory, open command window and type `npm install`.

2. Provide your aws security credentials like *AWS_ACCESS_KEY_ID*, *AWS_SECRET_ACCESS_KEY* and *AWS_DEFAULT_REGION* in the environment variables of **docker-compose.yml** file.

--------------

**NOTE:** If you run the application using Docker for Windows, use `localhost` instead of `192.168.99.100`, which is the default host address when using Docker Toolbox.
Changes to be made are in **app.js**, **index.js**, **config/config.js** in server project folder and in **./src/environments** folder in (https://github.com/abhinav-sanga/heart-rate-ui.git).

--------------

3. Then enter the command `docker-compose build` in the terminal to build Docker images from the docker-compose.yml file.

4. You can then type `docker-compose up` to run multiple docker images in the containers using the port **8085** for server and **8000** for dynamoDB-local.

5. Make sure that the ports provided above are available.

6. The server and dynamodb-local are now running on docker containers.

7. Clone the **heart-rate-ui** repo (https://github.com/abhinav-sanga/heart-rate-ui.git) in any folder outside the project directory and open command window in that project root directory.

8. Install the dependencies using the command `npm install`.

9. After the completion of installation, enter the command `ng serve` to start the Angular server.

10. Go to (http://localhost:4200/) in your browser.