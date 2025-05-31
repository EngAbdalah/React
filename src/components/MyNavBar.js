import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';

function MyNavBar() {
    const favoritesCount = useSelector(state => state.myFavorites.favorites.length);
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">{t('home')}</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/movies">{t('movies')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">
                                {t('favorites')}
                                {favoritesCount > 0 && (
                                    <span className="badge bg-danger ms-1">{favoritesCount}</span>
                                )}
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button 
                                className="btn btn-outline-secondary mx-2" 
                                onClick={toggleLanguage}
                            >
                                {language === "EN" ? "AR" : "EN"}
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="bi bi-box-arrow-in-right"></i> {t('login')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                <i className="bi bi-person-plus"></i> {t('register')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MyNavBar
