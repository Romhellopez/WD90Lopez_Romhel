import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Grid, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { lineSpinner } from 'ldrs';
import './MovieList.css';
import './ProfileBox.css';
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import Footer from './Footer';
import ProfileBox from './ProfileBox';

lineSpinner.register()

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentVideoKey, setCurrentVideoKey] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, searchTerm]);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const apiKey = "c388a605dffee0a3ce9d27e9d931668c";
      let endpoint;

      if (searchTerm.trim() === '') {
        endpoint = "https://api.themoviedb.org/3/movie/popular";
      } else {
        endpoint = "https://api.themoviedb.org/3/search/movie";
      }

      const params = { api_key: apiKey, page, query: searchTerm };
      const response = await axios.get(endpoint, { params });
      setMovies((prevMovies) => {
        return page === 1 ? response.data.results : [...prevMovies, ...response.data.results];
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVideoKey = async (movieId) => {
    try {
      const apiKey = "c388a605dffee0a3ce9d27e9d931668c";
      const videoEndpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
      const params = { api_key: apiKey };
      const response = await axios.get(videoEndpoint, { params });

      if (response.data.results.length > 0) {
        return response.data.results[0].key;
      } else {
        console.error("No video found for this movie.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching video key:", error);
      return null;
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const apiKey = "c388a605dffee0a3ce9d27e9d931668c";
      const detailsEndpoint = `https://api.themoviedb.org/3/movie/${movieId}`;
      const params = { api_key: apiKey };
      const response = await axios.get(detailsEndpoint, { params });

      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const watchTrailer = async (movieId) => {
    const videoKey = await getVideoKey(movieId);

    if (videoKey) {
      setCurrentVideoKey(videoKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error("Unable to get video key.");
    }
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const handleImageClick = async (movieId) => {
    const videoKey = await getVideoKey(movieId);
    const details = await getMovieDetails(movieId);

    setSelectedMovie({ movieId, videoKey, details });
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
     <Navbar/> <br/>
     
     <div className='Trailer'>
        {currentVideoKey && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h3">MOVIE</Typography>
            <iframe className= 'Iframe'
              width="800%"
              height="315"
              src={`https://www.youtube.com/embed/${currentVideoKey}`}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <h1 className='Popular'>SELECTIONS</h1>
        <Searchbar className='Searchbar' onSearch={handleSearch} />

        {isLoading && <l-line-spinner stroke="3" speed="2" color="white"/>}

        <Grid container spacing={4}>
        {movies.slice((page - 1) * 10, page * 9).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={4}>
            <Card className='Card'>
              <CardContent className='CardContent-title'>
                <Typography variant="h5" component="div" className='CardContent-title '>
                  {movie.title}
                </Typography>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: '10px', cursor: 'pointer' }}
                  onClick={() => handleImageClick(movie.id)}
                />
                <Typography variant="body2" className='Overview'>
                  {movie.overview}
                </Typography>
                <Button className='CardContent-button' variant="contained" color="primary" onClick={() => watchTrailer(movie.id)} style={{ marginTop: '10px' }}>
                  Watch Movie
                </Button>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>

        <Modal
          open={selectedMovie !== null}
          onClose={handleCloseModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%', height: '80%', backgroundColor: 'white', borderRadius: '10px', fontSize: '14px','@media (max-width: 375px)': {fontSize: '12px', width: '90%', height: '90%',},}}>
            {selectedMovie && (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.details?.poster_path}`}
                  alt={selectedMovie.details?.title}
                  style={{ width: '40%', height: '100%', objectFit: 'cover', borderRadius: '10px 0 0 10px' }}
                />
                <div style={{ padding: '20px', width: '60%' }}>
                <IconButton
                 edge="end"
                color="inherit"
                onClick={handleCloseModal}
                 aria-label="close"
                   style={{
                    position: 'fixed',
                      top: '20px',
                      right: '20px',
                      zIndex: 999, 
                      color: 'gray',
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography className="Modh5" variant="h4" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', color: 'blue' }}>
                    {selectedMovie.details?.title}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    IMDb Rating: {selectedMovie.details?.vote_average}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Year: {selectedMovie.details?.release_date}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Language: {selectedMovie.details?.original_language}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Rated: {selectedMovie.details?.adult ? 'Adult' : 'General Audience'}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Released: {selectedMovie.details?.release_date}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Runtime: {selectedMovie.details?.runtime} minutes
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Genre: {selectedMovie.details?.genres.map(genre => genre.name).join(', ')}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Director: {selectedMovie.details?.production_companies.map(company => company.name).join(', ')}
                  </Typography>
                  <Typography className='Modh6' variant="h6" style={{ marginBottom: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Actors: {selectedMovie.details?.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ')}
                  </Typography>
                  <Typography className='ModOver' variant="body1" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    Plot: {selectedMovie.details?.overview}
                  </Typography>
              </div>
                <Button className='ModButton'
                  variant="contained"
                  color="primary"
                  onClick={() => watchTrailer(selectedMovie.movieId)}
                  style={{ position: 'absolute', bottom: '100px' }}
                >
                  Watch Movie
                </Button>
              </>
            )}
          </div>
        </Modal>

      <div className='Page'>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(1)}
            style={{ margin: '5px' }}
          >
            1
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(2)}
            style={{ margin: '5px' }}
          >
            2
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(3)}
            style={{ margin: '5px' }}
          >
            3
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(4)}
            style={{ margin: '5px' }}
          >
            4
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(5)}
            style={{ margin: '5px' }}
          >
            5
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(6)}
            style={{ margin: '5px' }}
          >
            6
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(7)}
            style={{ margin: '5px' }}
          >
            7
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(8)}
            style={{ margin: '5px' }}
          >
            8
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(9)}
            style={{ margin: '5px' }}
          >
            9
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changePage(10)}
            style={{ margin: '5px' }}
          >
            10
          </Button>
          </div>
      </div>
      <Footer/>
    </>
  );
};

export default MovieList;
