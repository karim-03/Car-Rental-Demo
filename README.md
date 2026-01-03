# Car Rental Demo
![alt text](frontend/src/assets/CarDealershipPage.png)

## Description:
This is a web app meant to show my ability to handle working with React, .NET, and other technologies that will be listed below. 
What the app does is: 
1. Allow the user to place an order on one of 4 types of cars, and attach their information to it, as well as for how long they'd like to rent it out. 
2. Handle this information and immediately display it in the table positioned above, without the need to refresh the page.
3. Allow the user to filter the table contents based on the "From Date" that the user can choose.
4. Allow the user to both delete and edit table entries, while seamlessly updating the table accordingly.

## Technologies used:
1. Frontend:
    - React (19.2.3) as the Framework + React Hooks:
        - useState
        - useEffect
        - useCallBack
    - TypeScript (5.9.3) for props, state, and API responces
    - Axios (1.13.2) to communicate with the backend endpoints
2. Backend:
    - .NET 8 (8.0.416) as the Framework
    - ASP.NET Core Web API (8.0.22) to build REST endpoints
    - Entity Framework Core (8.0.8) for database interactions and relational mapping
3. Database:
    - PostgreSQL (via pgAdmin 4 ver 9.8)
    - Access via EF Core
    - Fairly simple, only 2 tables needed for this project:
        - ![alt text](frontend/src/assets/CarRentalDatabase.png)
