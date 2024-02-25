# task-manager

Project Description:

This project is a news aggregator. It fetches news based on user preferences.
A user can sign using email id and password. It uses jwt to detremine the auth access time period. 

This is a Node and Express based projects and other necessary NPM packages.

You can get started with the project using these npm commands :
 
    1.  Intall node module using the command : 
        npm i

    2.  Run the Express Project :
        npm run dev 

    3.  For Running the test cases  you can use :
        npm run test



Different endpoints offered by the projects are :

    POST /signup      : Register a new user. 

    POST /login       : Log in a user.  
    
    GET /preferences  : Retrieve the news preferences for the logged-in user.
    
    PUT /preferences  : Update the news preferences for the logged-in user.
    
    GET /news         : Fetch news articles based on the logged-in user's preferences.







