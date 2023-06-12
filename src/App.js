import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import MovieCards from './Components/MovieCards/MovieCards';
import SearchBar from './Components/SearchBar/SearchBar'



function App() {
  const apiKey = '2607126720234c217d4458fb23ed8dbe'
  const IMG_PATH = `https://image.tmdb.org/t/p/original`
  const [movies, setMovies] = useState([])
  const [searchStr, setSearchStr] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [movieTrailer, setMovieTrailer] = useState('')
  const [topMovie, setTopMovie] = useState({})


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(res =>{
      setMovies(res.results)
      setTopMovie(res.results[0])
      // console.log(res)
    }) 
  }, [])


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchStr}`)
    .then(res => res.json())
    .then(res =>{
      setSearchResults(res.results)
      // console.log(searchResults)
    }) 
  }, [searchStr])

  function getMovieTrailer(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`)
  .then(res => res.json())
    .then(res => {
      if (res.results.length > 0) {
        const trailerKey = res.results.filter(movie => movie.name.toLowerCase().includes('trailer'))[0].key
        setMovieTrailer(trailerKey);
      }
    })
    .catch(error => {
      console.log('Error fetching movie trailer:', error);
    });
}

function handleChange(e){
  e.preventDefault()
  setSearchStr(e.target.value)
}

// console.log(topMovie)
const movieList = searchStr ? searchResults : movies;

return (
  <div className="App">
    <header className='mo'>
      <span className='appTitle'>JuBoxPremier</span>
    <SearchBar searchStr={searchStr} handleChange={handleChange} />
    </header>
    <div className='top-movie' style={{backgroundImage: `url('${IMG_PATH}${topMovie.backdrop_path}')`}}>
    <div className='top-movie-content'>
      <h1 className='top-movie-title'>{topMovie.title}</h1>
      <button className="button" onClick={() => getMovieTrailer(topMovie.id)}>trailer</button>
      <p>{topMovie.overview}</p>
    </div>
    </div>
    
    <div className='container mo'>
    {movieList.map(movie => (
      <div key={movie.id}>
        <MovieCards movie={movie} getMovieTrailer={getMovieTrailer} movieTrailer={movieTrailer} pickedMovie={topMovie} />
      </div>
    ))}
    </div>
  </div>
  );
}

export default App;