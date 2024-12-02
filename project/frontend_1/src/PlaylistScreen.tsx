import { useState, useEffect } from 'react'
import './PlaylistScreen.css'
import TopBar from './TopBar.tsx'

const api = "http://ec2-18-191-32-136.us-east-2.compute.amazonaws.com"

function SongList(){

    const[username,setUsername] = useState('')
    const [titles, setTitles] = useState([]);
    const [images, setImages] = useState([]);
    const [artists, setArtists] = useState([]);

    async function getSongData() {

      try {
          const response = await fetch(api + "/playlist", {
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
        <li><img src={images[0]}></img>{artists[0]} - {titles[0]}</li>
        <li><img src={images[1]}></img>{artists[1]} - {titles[1]}</li>
        <li><img src={images[2]}></img>{artists[2]} - {titles[2]}</li>
        <li><img src={images[3]}></img>{artists[3]} - {titles[3]}</li>
        <li><img src={images[4]}></img>{artists[4]} - {titles[4]}</li>
        <li><img src={images[5]}></img>{artists[5]} - {titles[5]}</li>
        <li><img src={images[6]}></img>{artists[6]} - {titles[6]}</li>
        <li><img src={images[7]}></img>{artists[7]} - {titles[7]}</li>
        <li><img src={images[8]}></img>{artists[8]} - {titles[8]}</li>
        <li><img src={images[9]}></img>{artists[9]} - {titles[9]}</li>
    </ol>
  )
}

function Playlists() {

  return (
    <>
    <h1>Your Playlist</h1>
      <div className='textcenter panel wider'>
      <nav className='playlist'>
        <ol id="songList" className="songs">
          <SongList />    
        </ol>
      </nav>
      </div>
    </>
    )
  }
  function PlaylistScreen() {
    const [count, setCount] = useState(0)
    return (
        <Playlists />
    )
  }
  
  export default PlaylistScreen