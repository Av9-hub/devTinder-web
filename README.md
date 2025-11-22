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
- Build /feed and userCard; 


Body 
    NavBar
    Route=/  =>Feed
    Route=/login =>Login
    Route=/profile =>Profile
    Route=/connections=> Connections
