# Chomp Recipe Manager API

## Overview

The Chomp Recipe Manager API is an API built with Node.js and MongoDB that facilitates the management of recipes, authors, and associated reviews. In addition, a sample web interface is provided to interact with the API. The service enables full CRUD operations.

![Screenshot 2025-02-02 18 35 57](https://github.com/user-attachments/assets/ca85f8bc-000d-47c5-9272-65a2dd17009f)


## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ayaangrover/chomp.git
   ```
2. **Install Dependencies:**
   ```bash
   cd chomp
   npm install
   ```
3. **Environment Configuration:**
   Create a `.env` file in the root directory and add the following variable:
   ```env
   MONGO_URI=mongodb_connection_string
   ```
## Running the Server

Start the API server with the following command:
```bash
node <file>.js
```
Replace `<file>.js` with the name of the main server file (e.g., `app.js` or `server.js`). The server will run on the port specified in your `.env` file or default to port 3000.

## AI Usage

The readme was AI and human generated. AI was used as an assisant for this project.
