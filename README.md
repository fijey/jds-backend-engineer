# Jabar Digital Service Backend Engineer Repository
Welcome to the repository for becoming a **Backend Engineer** at Jabar Digital Service! Follow these steps to set up and run the project:

## Getting Started

1. **Clone the repository**  
   Clone this repository to your local machine:  
   ```bash
   git clone https://github.com/fijey/jds-backend-engineer.git

2.  **Navigate to the project directory**  
    Change into the project folder:
    
    ```bash
     cd jds-backend-engineer 
    
3.  **Install dependencies**  
    Run the following command to install Husky dependencies:
    ```bash
    npm install
    npm run setup:env
4.  **Install all required packages**  
    Execute this script to install all necessary packages for both `npm` and `composer`:
    
    ```bash
    npm run install-all 
    
5.  **Run the development server**  
    Start the project in development mode with:
    
    ```bash
    npm run dev 
##### The project will run by default on **port 1111** and **port 8000**.

## Running with Docker

Alternatively, you can use Docker to set up and run the project effortlessly. Follow these steps:

1.  **Run the Docker setup**  
    Use the following command to start the project with Docker:
    ```bash 
    npm run docker:up
2.  **Resolve storage access issues**  
    If you encounter an error like "access denied to read storage," run these commands to resolve it:
    ```bash
    npm run docker:fetch:down
    npm run docker:fetch:up
    docker exec fetch-app chmod -R 775 /var/www/storage
    docker exec fetch-app chown -R www-data:www-data /var/www/storage 
## What's Next?

Once the installation is successful, you can access the following:

-   **Authentication App Documentation**:  
    Visit [http://localhost:1111/api-docs](http://localhost:1111/api-docs).
-   **Fetch App Documentation**:  
    Visit [http://localhost:8000/api/documentation](http://localhost:8000/api/documentation).
