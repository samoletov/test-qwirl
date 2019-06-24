#### Right now the application deployed at http://35.167.252.218/

# Report

I started with backend using NodeJs. Wrote a test for getting quotes by symbol. 
Wrote methods for adjust balance and to manage shares holdings. Add exceptions processing. 
Used Postman to run test calls of API.

Create docker compose for backend and frontend.

Start building the UI using Angular. Used Bootstrap. Create component for balance/shares display. Extent it with form for change balance. Add component for order creation. Modify backend to use JSON body for post order.
Balance need to be refreshed after order creation, so it took me a while to manage it because other component need to be updated. I used BalanceService to refreshBalance and add subscription for balance change in BalanceComponent.

Next I added price feature to show current symbol price on the page. It takes not much time because backend function was all ready there. Next feature was typeahead for getting available symbols. It took 2 hours. Added one method to backend, and a test. There was a problem with Typescript validation, cause typeahead component retrieve data with another format and angular use it as model. Although, all works I add skipping of typescript on several lines. And added retrieval of price on symbol selection. Made some CSS to better look.

Deploy on AWS. Add to github   

# TODO
* Right now UI use hardcoded backend url (http://35.167.252.218:3000) through Angular environment file. Use .env to set it during deployment
* CORS in backend accept any domain. Use .env to set whitelisted domains during deployment
* API_KEY for AlphaVantage hardcoded. Need to use .env for deployment
* Tests for angular


# Installation

This application build with NodeJs, TypeScript and Angular, so this packages should be installed.  

##### Frontend
```
cd frontend
npm install
ng serve
```
It will run UI on: http://localhost:4200/

To build dist that will be used on production use (will replace backend URL with production domain)
```
ng build --prod 
```

#### Backend 
```
cd backend
npm install
npm run prod
```
It will build and run API on: http://localhost:3000/

# Testing
Only backend tests available

```
cd backend
npm test
```

# Running

Use docker-compose to run application.
```
docker-compose up
```

Frontend: http://localhost
Backend: http://localhost:3000
