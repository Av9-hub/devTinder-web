# DevTinder

- create a vite +react application
- remove unecessary code and create a hello world
- Install tailwind css
- Install daisy UI
- Add navbar componenent to App.jsx
- Create a NavBar.jsx separate component file
- Install react router dom
- Create BrowserRouter >Routes>Route =/Body> Route children
- Create a Outlet in your Body component
- Create a footer
- Create a  login page
- Bind state variables with input boxes
- make api call using axios in backend with values
- In backend, setUp cors middleware with configuration : orgin, credentials:true
- In frontend whenever making api call pass in axios =>withCredentials:true
- Install react-redux reduxjs/toolkit 
- Configure store=> Provider => createSlice => add reducer to store
- add reduxdev toolkit in chrome
- login and check data coming then dispatch action to store(add:data ) check showing in store
- useSelector to get data and show user on navBar only when login
- Refactor our code to add constants file + create a components folder 

- if page refresh redux store data cleared but cookies still there, make api call if page refresh 
 make sure user is still login
- if data in redux store so while navigating page should not make api call again and again
- You should not access other routes without login
- If token is not present i.e without login redirect to login page
- Logout feature + error error handling on invalid login
- Get the feed and add in the store
- Build /feed and userCard; 
- Build Edit Profile feature
- Show toast message on save of profile
- New- Page: See all my connections
- New- Page: See all my reuests
- Review request receieved
- Send connection request


Body 
    NavBar
    Route=/  =>Feed
    Route=/login =>Login
    Route=/profile =>Profile
    Route=/connections=> Connections

# Bug fixed by me
- Clear all slices after logout

# Deployment

- Signup on AWS 
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend    
    - npm install  -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"

    Frontend = http://43.204.96.49/
    Backend = http://43.204.96.49:7777/

    Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

    nginx config : 

    server_name 43.204.96.49;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

# Addding a custom Domain name
- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- DNS record: A devtinder.in 43.204.96.49
- Enable SSL for website 

# Sending Emails via SES
- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK - v3 
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAm under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJS
- Installing node-cron
- Learning about cron expressions syntax - crontab.guru
- Schedule a job
- date-fns
- Find all the unique  email Id who have got connection Request in previous day
- Send Email
- Explore queue mechanim to send bulk emails
- Amazon SES Bulk Emails
- Make sendEmail function dynamic
- bee-queue & bull npm packages

# There is bug in edit profile feature
- If fields with type enum(degree,gender) are empty then and clicked on save then we will get error
- We can add empty string in enum in backend (Backend change)
- We can filter out the changed field only and send to backend (frontend change) so that required field give us error is it become empty
- If we try to ignore the "" then required field will not change also will not give error on setting it to "" so better to use 2nd apprach

# Razorpay Payment Gateway Inegration
    - Sign up on Razorpay & complete KYC 
    - Cerated a UI for premium page
    - Creating an API for create order in backend
    - added my key and secret in env file
    - Intialized Razorpay in utils
    - creating order on Razorpay
    - create Schema and model
    - saved the order in payments collection
    - make the API dynamic
    - Setup RRazorpay webhook on your live APi
    - Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
    - Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
    - Ref - https://razorpay.com/docs/webhooks/validate-test/
    - Ref - https://razorpay.com/docs/webhooks/payloads/payments/
    - Ref - https://razorpay.com/docs/webhooks/payloads/payments/


# Real Time Chat using Websocket(Socket.io)
    - Build the UI for a chat window on /chat/:targetUserId
    - Setup socket.io in backend
    - npm i socket.io
    - Setup frontend socket.io-client
    - Initialise the chat
    - createSocketConnection
    - Listen to events
    - Homework:  improve the UI
    - Homework: Fix Security Bug - auth in web ockets
    - Homework: Fix bug - If I'm not fried, then I should not be able to send message
    - Homework: feat: Show Green Symbol when online???? - [last Seen 2 hours ago]
    - Homework: Limit messages when fetching from DB
    - Project Ideas: Tic tac toe game
    - Project Idea 2 : Chess

