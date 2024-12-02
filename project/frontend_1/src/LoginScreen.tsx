import { useState } from 'react'

import reactLogo from './assets/react.svg' // temp logo
import { useNavigate, redirect } from "react-router-dom";

import Spinner from './Spinner';

//import './App.css'

const api = "http://ec2-18-191-32-136.us-east-2.compute.amazonaws.com"


function LoginScreen() {

    var currentUser = window.localStorage.getItem("username");

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const[submitting, setSubmitting] = useState(false);

    const [loginErrorDisplayed, setLoginErrorDisplayed] = useState(false);

    async function loginHandler() {
        setSubmitting(true);

        // if loginSuccess is true, the login will proceed; otherwise, show an error
        var loginSuccess = true;

        try {
            // attempt the http request
            // fetch is javascript's built-in http request
            const response = await fetch(api + "/login", {
                method: "POST",
                // data is to be sent in a simple two-attribute object in the JSON format
                // (for other stuff later, this is how to send data)
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                }),
                // this only header tells the API that we are sending data in JSON
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // if the http request succeeds, attempt to parse the response as JSON
            const responseObject = await response.json();

            // if we get past this point, responseObject is now a javascript object
            // backend told me the response should be a simple object with two attributes: "success", a boolean, and "message", a string
            // (for other stuff later we'll need to confer with backend)
            loginSuccess = responseObject.success;
        }
        // if anything goes wrong in the entire process, log the error to the console
        catch(error) {
            console.error("http request failed: " + error);
            loginSuccess = false;
        }

      if (loginSuccess) {
            setLoginErrorDisplayed(false)
            // make login credentials persistent
            window.localStorage.setItem("username", username)
            window.localStorage.setItem("password", password)
            // move to main app page
            navigate("/app")
        }
        else {
            setSubmitting(false)
            setLoginErrorDisplayed(true)
        }
    }

    return (
        <>
            <div className = "textcenter contentdiv">
                <img src="/dynamix_logo.png" className="biglogo" alt="Logo" />
                <h3>personalized music recommender</h3>
                <div className = "textcemter panel" hidden={!submitting}><Spinner/></div>
                <div className="textcenter panel" hidden={submitting}>
                    <p hidden={!loginErrorDisplayed}>Incorrect username or password!</p>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='Username' />
                    <br />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />
                    <br />
                    <button onClick={() => {
                        loginHandler()
                    }}>Log In</button>
                </div>

                <a className='registerlink' hidden={submitting} onClick={() => { navigate("signup") }}>Don't have an account? Register here!</a>

            </div>
        </>
    )
}

export default LoginScreen