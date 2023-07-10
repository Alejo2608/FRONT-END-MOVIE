import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import user from '../../assets/user.png'
import logo from '../../assets/movie-icon.png'
import './Header.scss'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { fetchMovies, fetchShows } from '../../features/movies/movieSlice'

const Header = () => {
    const [term, setTerm] = useState('');
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.clear("token");
		navigate('/login')
	};

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchMovies(term));
        dispatch(fetchShows(term));
        setTerm("");
    }
    useEffect(() => {
		if(!token){
			return navigate("/login");
		}
	}, []);

    return (
        <div className="t">
            {token?
            <div className="header">
                <Link to="/home">
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
                <Link to={'/cre'}>
                    <h1 className='i'>CREAR</h1>
                </Link>
                <div className="cer">
                    <button onClick={handleLogout}><h1 className='i'>LOGOUT</h1></button>
                </div>
            </div>:
                <div className="header">
                <Link to={'/home'}>
                    <div className="logo">
                        <img src={logo} alt="app-logo" />
                        <span>MovieApp</span>
                    </div>
                </Link>
                <div className="flex flex-basic">
                    <Link to={'/login'}>
                        <h1 className='i'>SING IN</h1>
                    </Link>
                    <Link to={'/regi'}>
                        <h1 className='i'>SING UP</h1>
                    </Link>
                </div>
                </div>
            
            }
        </div>
    )
}

export default Header