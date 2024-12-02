import { useState } from 'react'

import reactLogo from './assets/react.svg' // temp logo
import { useNavigate } from "react-router-dom";

import Spinner from './Spinner';

const usernameTakenErrorMsg = "Username has already been taken!"
const emptyFieldsErrorMsg = "Please fill out all required fields!"

const api = "http://ec2-18-191-32-136.us-east-2.compute.amazonaws.com"

function SignUpScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessageVisible, setErrorMessageVisible] = useState(false)

    const [errorMsg, setErrorMsg] = useState(usernameTakenErrorMsg)

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate();

    async function continueButtonHandler() {
        setSubmitting(true)

        var registerSuccess = false;

        try {
            const response = await fetch(api + "/register", {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseObject = await response.json();

            registerSuccess = responseObject.success;
        }
        catch (error) {
            console.error("http request failed: " + error);
            registerSuccess = false;
        }

        if (username == "" || password == "") {
            setErrorMsg(emptyFieldsErrorMsg)
            setErrorMessageVisible(true)
        }

        else if (!registerSuccess) {
            setErrorMsg(usernameTakenErrorMsg)
            setErrorMessageVisible(true)
        }
        else {
            // temp; in the future this should instead tell the backend to create a new account
            setErrorMessageVisible(false)
            // make login credentials persistent
            window.localStorage.setItem("username", username)
            window.localStorage.setItem("password", password)

            navigate("/app/genresurvey")
        }
        setSubmitting(false)
    }

    return (
        <>
            <div className="textcenter contentdiv">
                    <img src="/dynamix_logo.png" className="biglogo" alt="Logo" />
                <h3>personalized music recommender</h3>
                <div className='textcenter panel' hidden={!submitting}><Spinner/></div>
                <div className='textcenter panel' hidden={submitting}>
                    <h2>CREATE PROFILE</h2>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='Username' />
                    <br />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />
                    <br />
                    <p hidden={!errorMessageVisible}>{errorMsg}</p>
                    <button className='backButton' onClick={() => navigate("/")}>Back</button>
                    <button onClick={continueButtonHandler}>Continue</button>
                </div>

            </div>
        </>
    )
}

export default SignUpScreen