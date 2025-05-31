
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../../Redux/Acions/FavoritesAction';
import MyCard from '../../components/MyCard';
import MyTitle from '../../components/MyTitle';
import { useLanguage } from '../../context/LanguageContext';

function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.myFavorites.favorites);
    const { t } = useLanguage();

    const handleRemove = (id) => {
        dispatch(removeFromFavorites(id));
    };

    return (
        <div className="container mt-4">
            <MyTitle myHead={t('myFavorites')} />
            
            {favorites.length === 0 ? (
                <div className="alert alert-info">
                    {t('noFavorites')}
                </div>
            ) : (
                <div className="row g-4">
                    {favorites.map(movie => (
                        <div key={movie.id} className="col-md-3 col-sm-6">
                            <div className="position-relative">
                                <button 
                                    onClick={() => handleRemove(movie.id)} 
                                    className="position-absolute top-0 end-0 btn btn-danger btn-sm rounded-circle"
                                    style={{ zIndex: 2, margin: '5px' }}
                                >
                                    <i className="bi bi-x-lg"></i>
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
    );
}

export default Favorites;
