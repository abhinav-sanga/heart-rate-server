# HeartRateServer

## Installation 

1. Clone the repo to your local machine and in the project root directory, open command window and type `npm install`.

2. Soon after the packages get installed, enter the command `docker build -t node-docker-app .` in the terminal to build Docker image from the Dockerfile.

3. You can then type `docker run -p 8085:9001 node-docker-app` to run the docker image in an isolated container using the port **8085**

4. Now, open another command prompt window in the project root directory and enter `docker run -p 8000:8000 amazon/dynamodb-local`. 

5. The server is now running on docker container.

6. Clone the **heart-rate-ui** repo (https://github.com/abhinav-sanga/heart-rate-ui.git) in any folder outside the project directory and open command window in that project root directory.

7. Install the dependencies using the command `npm install`.

8. After the completion of installation, enter the command `ng serve` to start the Angular server.

9. Go to (http://localhost:4200/) in your browser.