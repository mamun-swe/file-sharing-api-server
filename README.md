
## Getting Started

1. Clone the application.
```bash
git clone https://github.com/Mamun-swe/file-sharing-api-server
```
2. Packages install via this command.       
```bash
npm install
```
3. Create a .env file to the application root and copy all fields from the .env.example file.       
    * Add your MongoDB dev database URI to the.env file as DB_URI
    * Add MongoDB test database URI as TEST_DB_URI
    * Use ENVIRONMENT as TEST before running the test case.
    * Use ENVIRONMENT as DEV before running the application. 

4. Test the application.
```bash
npm test
```

5. Run the application in dev mode.
```bash
npm run dev
```
6. Run the application in production mode.
```bash
npm start
```
7. Browse Postman collection API Documentation [https://documenter.getpostman.com/view/5909130/UzR1M3qm] with your browser to see the result.
    
