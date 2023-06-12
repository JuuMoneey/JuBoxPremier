import './MovieCards.css'
import { useState } from 'react';

export default function MovieCards(props, getMovieTrailer){
    const [hoveredMovie, setHoveredMovie] = useState(false);
    // console.log(props)
    return (
    <div className='movieCard' onClick={() => getMovieTrailer(props.id)} 
    onMouseEnter={() => setHoveredMovie(true)} 
    onMouseLeave={() => setHoveredMovie(false)}>
        {hoveredMovie ? (
            <div className='movieCardOtherSide'>
                {props.movie.title}
                <p className='movieInfo'>{props.movie.overview}</p>
                    <iframe
                        className='movie-trailer'
                        src={`https://www.youtube.com/embed/${props.movieTrailer}?enablejsapi=1`}
                        allowFullScreen
                    ></iframe>
            </div>    
        ) :
        
        <img className='movie-cover' src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`} alt={props.title}/>
        }
    </div>
    );
}
