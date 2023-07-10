import React, { useEffect } from 'react'
import './Home.scss'
import { useNavigate } from "react-router-dom";
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, fetchShows, hasFetchedData, isFetchingData } from '../../features/movies/movieSlice'

const Home = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const isFetching = useSelector(isFetchingData);
    const hasData = useSelector(hasFetchedData);
    const movieText = "Harry";
    const showsText = "Friends";
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!hasData) {
            dispatch(fetchMovies(movieText))
            dispatch(fetchShows(showsText))
        }
		if(!token){
			return navigate("/login");
		}
    }, []);

    return (
        <>
            <div className="banner-img"></div>
            {isFetching && <p className='loading'>loading...</p>}
            <MovieListing />
        </>
    )
}

export default Home