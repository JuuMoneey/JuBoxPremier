import './MovieCards.css'
import { useState } from 'react';

export default function MovieCards(props){
    // This line defines the MovieCards component as a default export. It accepts props as a parameter.
    const [hoveredMovie, setHoveredMovie] = useState(false);
    // This line uses the useState hook to declare the hoveredMovie state variable and its corresponding setter function, setHoveredMovie. 
    // The initial state of hoveredMovie is set to false.
    // console.log(props)
    return (
        <div className='movieCard'
        // It renders a movie card with a hover effect. 
        onMouseEnter={() => {
            // When the mouse enters the card, 
            setHoveredMovie(true)
            // the hoveredMovie state is set to true, 
        props.getMovieTrailer(props.movie.id)
        // and the getMovieTrailer function is called to fetch the movie trailer based on the movie ID. 
    }} 
    onMouseLeave={() => setHoveredMovie(false)}>
        {hoveredMovie ? (
            // When the mouse leaves the card, the hoveredMovie state is set to false. 
            <div className='movieCardOtherSide'>
                <h1 className='title'>{props.movie.title}</h1>
                
                <p className='movieInfo'>{props.movie.overview}</p>
                    <iframe
                        className='movie-trailer'
                        src={`https://www.youtube.com/embed/${props.movieTrailer}?enablejsapi=1`}
                        // If hoveredMovie is true, it displays the movie information and an embedded YouTube video player with the movie trailer. 
                        allowFullScreen
                        title='Movie Trailer'
                        ></iframe>
            </div>    
        ) :
        <div>
        <img className='movie-cover' src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`} alt={props.title}/>
        <p>{props.movie.title}</p>
        </div>
        // If hoveredMovie is false, it displays the movie cover image.
    }
    </div>
    );
}

// This block of code represents the JSX structure of the MovieCards component. 
