# Todo Application

A simple Todo application with a **frontend** built using **React.js** and a **backend** built using **Node.js** (Express.js). The project is fully containerized with **Docker** for ease of development, deployment, and scaling.

## Features

- **Frontend**: A clean and responsive interface to add, view, update, and delete tasks.
- **Backend**: A REST API to handle task management operations such as CRUD (Create, Read, Update, Delete) for todos.
- **Dockerized**: Both frontend and backend are Dockerized for easy setup and deployment.

## Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Containerization**: Docker

## Setup Instructions

### Prerequisites

- Install [Docker](https://www.docker.com/get-started) on your system.
- Docker Desktop should be running.

### Running the Application Locally

**1. Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/todo-application.git
   cd todo-application
   ```

**2. Build the Docker images:**
   
  To build the **frontend** image:
  ```bash
  docker build -t misbahuddintareq/todo-frontend ./todo-frontend
  ```
  To build the **backend** image:
  ```bash
  docker build -t misbahuddintareq/todo-backend ./todo-backend
  ```
**3. Run the Docker containers:**

  To run the **frontend** container on port 3000:
  ```bash
  docker run -p 3000:3000 misbahuddintareq/todo-frontend
  ```
  To run the **backend** container on port 4000:
  ```bash
  docker run -p 4000:4000 misbahuddintareq/todo-backend
  ```

**4. Open your browser and visit the following URLs:**

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:4000](http://localhost:4000)

### Pushing Docker Images to Docker Hub
**1. First, tag your images with your Docker Hub username:**
  ```bash
  docker tag misbahuddintareq/todo-frontend:latest yourusername/todo-frontend:latest
  docker tag misbahuddintareq/todo-backend:latest yourusername/todo-backend:latest
  ```
**2. Push the images to Docker Hub:**
  ```bash
  docker push yourusername/todo-frontend:latest
  docker push yourusername/todo-backend:latest
  ```
