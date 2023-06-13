import './NewMovies.css'


export default function NewMovies(props) {
    return (
        <div>
            <div className='top-movie' style={{ backgroundImage: `url('${IMG_PATH}${topMovie.backdrop_path}')` }}>
                <div className='top-movie-content'>
                    <h1 className='top-movie-title'>{topMovie.title}</h1>
                    <button className="button" onClick={() => getMovieTrailer(topMovie.id)}>trailer</button>
                    <p>{topMovie.overview}</p>
                </div>
            </div>
        </div>
    )
}

