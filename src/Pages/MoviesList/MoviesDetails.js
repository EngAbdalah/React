import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../Redux/Acions/FavoritesAction';
import MyCard from '../../components/MyCard';
import MyTitle from '../../components/MyTitle';
import { useLanguage } from '../../context/LanguageContext';

function MoviesDetails() {
    const id = useParams().Id;
    const [movieDetails, setMovieDetails] = useState({});
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.myFavorites.favorites);
    const { t, getApiLanguageCode } = useLanguage();

    useEffect(() => {
        const language = getApiLanguageCode();
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=29cf44b93ca83bf48d9356395476f7ad&language=${language}`)
            .then((res) => setMovieDetails(res.data))
            .catch((err) => console.log(err));
    }, [id, getApiLanguageCode]);

    const toggleFavorite = () => {
        const isInFavorites = favorites.some(fav => fav.id === parseInt(id));
        if (isInFavorites) {
            dispatch(removeFromFavorites(parseInt(id)));
        } else {
            dispatch(addToFavorites(movieDetails));
        }
    };

    const isFavorite = () => {
        return favorites.some(movie => movie.id === parseInt(id));
    };

    return (
        <div className="container mt-5">
            <MyTitle myHead={t('movieDetails')} />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <button 
                            onClick={toggleFavorite} 
                            className="btn btn-outline-danger"
                        >
                            <i className={`bi ${isFavorite() ? 'bi-star-fill' : 'bi-star'} me-2`}></i>
                            {isFavorite() ? t('removeFromFavorites') : t('addToFavorites')}
                        </button>
                    </div>
                    <MyCard
                        img={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        name={movieDetails.title}
                        num={movieDetails.vote_average}
                        loc={movieDetails.release_date}
                        info={movieDetails.overview}
                    />
                </div>
            </div>
        </div>
    );
}

export default MoviesDetails;
