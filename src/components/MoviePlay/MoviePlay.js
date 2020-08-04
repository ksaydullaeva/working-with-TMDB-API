import React from "react";
import axios from '../../axios';
import "./MoviePlay.css"
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_url = "https://image.tmdb.org/t/p/original/";

class MoviePlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies:[],
            movie: {},
            id: this.props.location.myProps.id,
            fetchUrl: this.props.location.myProps.fetchUrl,
            trailerUrl: this.props.location.myProps.trailerUrl
        };
        console.log(this.state.trailerUrl)
    }

    componentWillMount() {
       axios.get(this.state.fetchUrl)
            .then(response =>{
                this.setState({
                    movies: response.data.results
                });
            })
    }


    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
            },
        };

        const handleClick = (movie) => {
            if (this.state.trailerUrl){
                this.setState({
                    trailerUrl: ""
                })
            }else{
                movieTrailer(movie?.name || "")
                    .then(url => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        this.setState({
                            trailerUrl: urlParams.get("v")
                        })
                    }).catch((error) => console.log(error))
            }
        };

        return(
            <div>
                {this.state.movies.map(movie => (
                    <div key={movie.id}>
                        {movie.id == this.state.id ? (() => {this.setState({movie: movie})}) && (
                            <div>
                                <div className="movie__wrapper">
                                    <img className="movie__image" src={`${base_url}${ movie.poster_path }`} alt="movie-img"/>
                                    <div className="movie__descriptionBox">
                                        <h1 className="movie__title">Title: {movie.name}</h1>
                                        <p className="movie__description">Description: {movie.overview}</p>
                                        <button className="movie__button" onClick={() => handleClick(movie)}>Play Trailer</button>
                                    </div>

                                </div>
                                {this.state.trailerUrl && <YouTube className="movie__trailer" videoId={this.state.trailerUrl} opts={opts}/>}
                            </div>
                        ): ""}

                    </div>

                ))}
            </div>
        )
    }
}


export default MoviePlay;


