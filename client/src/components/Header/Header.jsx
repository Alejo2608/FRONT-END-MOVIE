import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import user from '../../assets/user.png'
import logo from '../../assets/movie-icon.png'
import './Header.scss'
import { useDispatch } from 'react-redux'
import { fetchMovies, fetchShows } from '../../features/movies/movieSlice'

const Header = () => {
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchMovies(term));
        dispatch(fetchShows(term));
        setTerm("");
    }

    return (
        <div className="header">
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="app-logo" />
                    <span>MovieApp</span>
                </div>
            </Link>
            <div className="searchbar">
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        value={term}
                        placeholder='Search Movies or Shows'
                        onChange={(e) => {
                            setTerm(e.target.value);
                        }}
                    />
                    <button type="Submit">🔍</button>
                </form>
            </div>
            <div className="user-image">
                <img src={user} alt="user" />
            </div>
        </div>
    )
}

export default Header