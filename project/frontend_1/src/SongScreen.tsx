import { useState, useEffect } from 'react'
import './SongScreen.css'
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';

const api = "http://ec2-18-191-32-136.us-east-2.compute.amazonaws.com"

function SongList(){

    const[username,setUsername] = useState('')
    const [titles, setTitles] = useState([]);
    const [images, setImages] = useState([]);
    const [artists, setArtists] = useState([]);

    async function getSongData() {

      try {
          const response = await fetch(api + "/genreSongs", {
            method: "POST",
            // data is to be sent in a simple two-attribute object
            body: JSON.stringify({
                "username": window.localStorage.getItem("username"),
                "artists": artists,
                "images": images,
                "titles": titles
            }),
            headers: {
                "Content-type": "application/json"
            }
          });

          const responseObject = await response.json();
          console.log(JSON.stringify(responseObject))
          return responseObject;
      }
      catch(error) {
        console.error("http request failed");
    }  
  }
  useEffect(() => {
    const a = async () => {
        var songData = await getSongData()
        setArtists(songData.artists)
        setImages(songData.images)
        setTitles(songData.titles)
        console.log(songData)
    }
    a()
  }, [])

  return (
    <ol>
        <li><input type="checkbox" name = {artists[0] + " - " + titles[0]}></input>{artists[0]} - {titles[0]}</li>
        <li><input type="checkbox" name = {artists[1] + " - " + titles[1]}></input>{artists[1]} - {titles[1]}</li>
        <li><input type="checkbox" name = {artists[2] + " - " + titles[2]}></input>{artists[2]} - {titles[2]}</li>
        <li><input type="checkbox" name = {artists[3] + " - " + titles[3]}></input>{artists[3]} - {titles[3]}</li>
        <li><input type="checkbox" name = {artists[4] + " - " + titles[4]}></input>{artists[4]} - {titles[4]}</li>
        <li><input type="checkbox" name = {artists[5] + " - " + titles[5]}></input>{artists[5]} - {titles[5]}</li>
        <li><input type="checkbox" name = {artists[6] + " - " + titles[6]}></input>{artists[6]} - {titles[6]}</li>
        <li><input type="checkbox" name = {artists[7] + " - " + titles[7]}></input>{artists[7]} - {titles[7]}</li>
        <li><input type="checkbox" name = {artists[8] + " - " + titles[8]}></input>{artists[8]} - {titles[8]}</li>
        <li><input type="checkbox" name = {artists[9] + " - " + titles[9]}></input>{artists[9]} - {titles[9]}</li>
    </ol>
  )
}
  function SongScreen() {
    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate();

    async function submitHandler(e) {
      setSubmitting(true)
      // prevent the page from getting reloaded
      e.preventDefault()

      // get the data of the form
      const formData = new FormData(e.target)

      // turn the data into a more convenient object
      const jsondata = Object.fromEntries(formData.entries())
      console.log(jsondata)
      // and get the genres by getting just the keys of that object
      const outArray = Object.keys(jsondata)

      var httpSuccess = false
        // http request to submit
        try {
            const response = await fetch(api + "/genreSongs/submit", {
                method: "POST",
                body: JSON.stringify({
                    "username": window.localStorage.getItem("username"),
                    "checkedGenreSongs": outArray
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseObject = await response.json();

            console.log(responseObject.message)
            httpSuccess = responseObject.success
        }
        catch (error) {
            console.error("http request failed: " + error);
        }

        if (httpSuccess) {
            navigate("/app/playlist")
        }
        setSubmitting(false)
    }
    return (
      <>
        <h1 hidden={submitting}>Select Songs</h1>
        <h2 hidden={submitting}>Tell us what songs you like! Please select the songs from this selection that you enjoy.</h2>
        <div className='textcenter panel wider' hidden={submitting}>
        <form onSubmit={submitHandler} className='playlist'>
          <ol className="songs">
            <SongList />
            <button className='backButton' onClick={()=>navigate("/app/genresurvey")}>Back</button>
            <button type='submit'>Finish</button>      
          </ol>
        </form>
        </div>
        <h2 hidden={!submitting}>Generating your playlist...</h2>
        <div hidden={!submitting}><Spinner/></div>
      </>
      )
  }
  
  export default SongScreen