# IPFS Uploader

This is a simple application that allows you to pin images to IPFS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
- [Usage](#usage)


## Prerequisites

- [Pinata](https://docs.pinata.cloud/docs) - You must create a JWT and make a Gateway through Pinata.
    - Once this is complete place these inside your .env file. Labled as REACT_APP_JWT and REACT_APP_GATEWAY.
- [Docker](https://www.docker.com/) - You must have Docker installed on your system.

## Getting Started

### Building the Docker Image

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git

2. Navigate to the project directory:
    ```bash
    cd your-repo

3. Build the Docker image:
    ```bash
    docker build -t your-image-name .

### Running the Docker Container

1. ```bash
    docker run -p 8080:80 your-image-name

2. Access the application in your web browser at http://localhost:8080

## Usage

1. Upload a .pdf, .jpg, or a .png.

2. Click Submit

3. Your image is now pinned to IPFS!

## Acknowledgements

This project was built using the Pinata API in order to pin content to IPFS.


