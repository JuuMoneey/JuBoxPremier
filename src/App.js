import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import MovieCards from './Components/MovieCards/MovieCards';
import SearchBar from './Components/SearchBar/SearchBar'



function App() {
  const apiKey = '2607126720234c217d4458fb23ed8dbe'
  const IMG_PATH = `https://image.tmdb.org/t/p/original`
  //apiKey stores your API key, and IMG_PATH holds the base URL for movie images.
  const [movies, setMovies] = useState([])
  const [searchStr, setSearchStr] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [movieTrailer, setMovieTrailer] = useState('')
  const [topMovie, setTopMovie] = useState({})
// Each variable is paired with a setter function.


  useEffect(() => {
    // This useEffect hook is 
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`)
    // fetching the trending movies of the week from the API when the component mounts. 
    .then(res => res.json())
    // It makes an HTTP request, retrieves the response, then
    .then(res =>{
      setMovies(res.results)
      // sets the movies and 
      setTopMovie(res.results[0])
      // topMovie state variables.
      // console.log(res)
    }) 
  }, [])



  useEffect(() => {
    // This useEffect hook 
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchStr}`)
    // fetches movies based on the search query whenever the searchStr state variable changes. 
    .then(res => res.json())
    // It performs an HTTP request, 
    .then(res =>{
      // retrieves the response, 
      setSearchResults(res.results)
      // and sets the searchResults state variable.
      // console.log(searchResults)
    }) 
  }, [searchStr])


  function getMovieTrailer(movieId) {
    // This function, getMovieTrailer, 
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`)
    // fetches the movie trailer for a given movie ID. 
  .then(res => res.json())
  // It makes an HTTP request, 
    .then(res => {
      // retrieves the response, 
      console.log(res)
        const trailerKey = res.videos.results.filter(movie => movie.name.toLowerCase().includes('trailer'))[0].key
        console.log(trailerKey)
        setMovieTrailer(trailerKey);
        // and sets the `movieTrailer state variable based on the trailer key obtained from the response.
    })
    .catch(error => {
      console.log('Error fetching movie trailer:', error);
    });
}
// console.log(topMovie)

function handleChange(e){
  // This handleChange function is an event handler for the search bar 
  e.preventDefault()
  // It prevents the default form submission behavior 
  setSearchStr(e.target.value)
  // and updates the searchStr state variable with the value entered in the search bar.
}


const movieList = searchStr ? searchResults : movies;
// This line declares a movieList variable, and assign it to either searchResults or movies based on the value of searchStr.


return (
  // It renders the app header, 
  // the top movie section with its title, trailer button (When the button is clicked, call the getMovieTrailer 
  // function with the top movie's ID), backdrop image, and overview. 
  // SearchBar component with searchStr prop and handleChange event handler
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
        // It also renders a container with movie cards based on the movieList variable.
        // map through the movieList, for each movie, render a MovieCards component with props:
        // - movie: current movie object
        // - getMovieTrailer: function to fetch movie trailer
        // - movieTrailer: trailer key for the movie
        // - pickedMovie: top movie object
    ))}
    </div>
  </div>
  );
}

export default App;


// This block of code represents the JSX structure of the App component. 