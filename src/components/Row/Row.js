import React, {useState, useEffect} from "react";
import axios from '../../axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import {Link} from "react-router-dom";


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl){
            setTrailerUrl("");
        }else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                }).catch((error) => console.log(error))
        }

    };
    return(
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {/*several row__posters*/}
                {movies.map(movie => (
                    <div className="row__posterWrapper" key={movie.id}>
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                            alt={movie?.name}/>
                        <div className="row__movieHover">
                            <button className="row__button" onClick={() => handleClick(movie)}>Play</button>
                            <Link to={{pathname: "/movie-details",
                                myProps: {
                                    fetchUrl: fetchUrl,
                                    id: movie.id,
                                    trailerUrl: trailerUrl
                                }}}>
                                <button className="row__button">More</button>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>
            {trailerUrl && <YouTube className="row__trailer" videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;