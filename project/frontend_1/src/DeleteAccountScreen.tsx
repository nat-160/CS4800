import { useState } from 'react'
import './DeleteAccountScreen.css'
import TopBar from './TopBar'

const testUsername = "username1"
const testPassword = "password1"

function Delete() {

  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');

  const[loginErrorDisplayed, setLoginErrorDisplayed] = useState(false);
  return (
    <>
    <div className='panel'>
          <p>Please enter your login credentials again: </p>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='Username'/>
                    <br/>
                    <input value={password} onChange={e => setPassword(e.target.value)} type= "password" placeholder='Password'/>
                    <br/>
                    <button onClick={()=>{
                        // in the future, the condition for this if statement should be connected somehow to the database
                        if(username == testUsername && password == testPassword) {
                            // correct username handling here
                            setLoginErrorDisplayed(false)
                        }
                        else {
                            setLoginErrorDisplayed(true)
                        }
                    }}>Delete Account</button>
                    <p hidden={!loginErrorDisplayed}>Incorrect username or password!</p>
                    </div>
    </>
    )
  }
  function DeleteAccountScreen() {
    const [count, setCount] = useState(0)
    return (
        <Delete />
    )
  }
  
  export default DeleteAccountScreen