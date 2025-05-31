import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../Redux/Acions/MoviesAction';
import { addToFavorites, removeFromFavorites } from '../../Redux/Acions/FavoritesAction';
import MyCard from '../../components/MyCard';
import MyTitle from '../../components/MyTitle';
import { useLanguage } from '../../context/LanguageContext';

function MoviesList() {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const { t, language, getApiLanguageCode } = useLanguage();
    
    // Get data from Redux store
    const { movies, loading, error } = useSelector(state => state.myMovies);
    const favorites = useSelector(state => state.myFavorites?.favorites || []);

    useEffect(() => {
        // Dispatch the thunk action when component mounts or language changes
        dispatch(fetchMovies("", getApiLanguageCode()));
    }, [dispatch, language, getApiLanguageCode]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Dispatch the thunk action with search query and language
        dispatch(fetchMovies(searchQuery, getApiLanguageCode()));
    };

    const toggleFavorite = (movie) => {
        const isInFavorites = favorites.some(fav => fav.id === movie.id);
        if (isInFavorites) {
            dispatch(removeFromFavorites(movie.id));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return (
        <>
            <MyTitle myHead={t('popularMovies')} />
            <div className="container mt-4">
                <form onSubmit={handleSearch} className="mb-4">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder={t('search')} 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">{t('search')}</button>
                    </div>
                </form>
                
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">{t('loading')}</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : movies.length === 0 ? (
                    <div className="alert alert-info">{t('noMovies')}</div>
                ) : (
                    <div className="row g-4">
                        {movies.map(movie => (
                            <div key={movie.id} className="col-md-3 col-sm-6">
                                <div className="position-relative">
                                    <button 
                                        onClick={() => toggleFavorite(movie)} 
                                        className="position-absolute top-0 end-0 btn btn-link"
                                        style={{ zIndex: 1 }}
                                    >
                                        <i className={`bi ${isFavorite(movie.id) ? 'bi-star-fill text-warning' : 'bi-star'} fs-4`}></i>
                                    </button>
                                    <MyCard
                                        img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        name={movie.title}
                                        path={`/movies/${movie.id}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default MoviesList;
