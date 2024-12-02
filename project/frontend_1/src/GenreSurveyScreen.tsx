import { useState, useEffect } from 'react'

import reactLogo from './assets/react.svg' // temp logo

import { useNavigate } from "react-router-dom";

import Spinner from './Spinner';

const api = "http://ec2-18-191-32-136.us-east-2.compute.amazonaws.com"

interface Genre {
    name: string;
}

const GENRES = [
    { name: "Pop" },
    { name: "Rock" },
    { name: "Jazz" },
    { name: "Hip-Hop" },
    { name: "Indie" },
    { name: "EDM" },
    { name: "Country" },
    { name: "Classical" },
    { name: "R&B" },
    { name: "Metal" },
]

const rowCount = 3;

function GenreSurveyScreen() {
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
        // and get the genres by getting just the keys of that object
        const outArray = Object.keys(jsondata)

        var httpSuccess = false
        // http request to submit
        try {
            const response = await fetch(api + "/genreSurvey/submit", {
                method: "POST",
                body: JSON.stringify({
                    "username": window.localStorage.getItem("username"),
                    "checkedGenres": outArray
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
            navigate("/app/songsurvey")
        }
        setSubmitting(false)
    }

    return (
        <>
            <h1 hidden={submitting}>Genre Survey</h1>
            <div className='panel' hidden={submitting}>
                <form onSubmit={submitHandler}>
                    <p>Please indicate which genres you are interested in:</p>
                    <GenresTable genres={GENRES} />
                    <button type='submit'>Confirm</button>
                </form>
            </div>
            <h2 hidden={!submitting}>Finding some songs for you...</h2>
            <div hidden={!submitting}><Spinner/></div>
        </>
    )
}

function GenreRow({ genre, checkedGenres }: { genre: Genre, checkedGenres: Array<String> }) {
    return (
        <span>
            <label>
                <input name={genre.name} type='checkbox' defaultChecked={checkedGenres.includes(genre.name)} />
                {genre.name}
            </label>
        </span>
    )
}

function GenresTable({ genres }: { genres: Array<Genre> }) {
    const [loading, setLoading] = useState(true)
    const [checkedGenres, setCheckedGenres] = useState([])

    async function getCheckedGenres() {

        try {
            const response = await fetch(api + "/genreSurvey", {
                method: "POST",
                body: JSON.stringify({
                    "username": window.localStorage.getItem("username")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseObject = await response.json();

            return responseObject.checkedGenres
        }
        catch (error) {
            console.error("http request failed: " + error);
        }
    }

    const rows: Array<JSX.Element> = [];


    useEffect(() => {
        const a = async () => {
            setLoading(true)
            var acheckedGenres = await getCheckedGenres()
            setCheckedGenres(acheckedGenres)

            setLoading(false)
        }
        a()
    }, [])
    var counter = 0;
    genres.forEach((genre: Genre) => {
        counter++;
        rows.push(
            <GenreRow genre={genre} checkedGenres={checkedGenres} />
        );
        if (counter >= rowCount) {
            rows.push(<br />);
            counter = 0;
        }
    })

    if (loading) {
        return (
            <><Spinner/><br/></>
            
        )
    }
    else {
        return (
            <div className='centertext'>{rows}</div>
        )
    }
}

export default GenreSurveyScreen