import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginScreen from './LoginScreen.jsx'
import PlaylistScreen from './PlaylistScreen.jsx'
import DeleteAccountScreen from './DeleteAccountScreen.jsx'
import './index.css'
import SongScreen from './SongScreen.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUpScreen from './SignUpScreen.jsx'
import MainApp from './MainApp.jsx'
import GenreSurveyScreen from './GenreSurveyScreen.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <LoginScreen/>,
  },

  {
    path:"/signup",
    element: <SignUpScreen/>
  },

  {
    path:"/app",
    element:<MainApp/>,
    children:[
      {
        path:"genresurvey",
        element:<GenreSurveyScreen/>
      },
      {
        path:"",
        element:<PlaylistScreen/>
      },
      {
        path:"songsurvey",
        element:<SongScreen/>
      },
      {
        path:"delete",
        element:<DeleteAccountScreen/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router = {router} />
  </React.StrictMode>,
)
